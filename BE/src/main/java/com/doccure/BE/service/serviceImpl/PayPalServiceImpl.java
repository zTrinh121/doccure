package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.BeApplication;
import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.*;
import com.doccure.BE.model.*;
import com.doccure.BE.model.Invoice;
import com.doccure.BE.model.InvoiceItem;
import com.doccure.BE.service.PayPalService;
import com.doccure.BE.util.TokenUtil;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PayPalServiceImpl implements PayPalService {
    private final APIContext apiContext;
    private final AppointmentMapper appointmentMapper;
    private final TokenMapper tokenMapper;
    private final SlotMapper slotMapper;
    private final DoctorMapper doctorMapper;
    private final DoctorSpecializationMapper doctorSpecializationMapper;
    private final InvoiceMapper invoiceMapper;
    private final InvoiceItemMapper invoiceItemMapper;
    private final String APPLICATION_NAME = "Doccure";
    private final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private final String TOKENS_DIRECTORY_PATH = "tokens";
    private final List<String> SCOPES = Collections.singletonList("https://www.googleapis.com/auth/calendar");

    private final String CREDENTIALS_FILE_PATH = "/credentials.json";

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Payment createPayment(
            Long slotId,
            Long specializationId,
            HttpServletRequest request) throws Exception {
        Slot slot = slotMapper.selectByPrimaryKey(slotId);
        Appointment appointment = manageSlotForAppointment(slot.getDoctorId(), slotId, specializationId, request);
        Invoice invoice = insertInvoiceAfterAppointment(appointment.getAppointmentId());
        double total = appointment.getPrice().doubleValue();
        String description = "Invoice for appointment " + appointment.getAppointmentId();

        String currency = "THB";
        String method = "paypal";
        String intent = "sale";
        String cancelUrl= "http://localhost:5173/pay/cancel?appointment_id="+appointment.getAppointmentId()+"&invoice_id="+invoice.getInvoiceId()+"&slot_id="+slotId;
        String successUrl= "http://localhost:5173/pay/success?appointment_id="+appointment.getAppointmentId()+"&invoice_id="+invoice.getInvoiceId()+"&slot_id="+slotId+"&user_id="+appointment.getUserId();

        Amount amount = new Amount();
        amount.setCurrency(currency);
        total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);

    }

    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }

    public Appointment manageSlotForAppointment(Long doctorId, Long slotId, Long specializationId, HttpServletRequest request) throws Exception{
        DoctorSlot doctor = doctorMapper.getDoctorSlotsById(doctorId);
        DoctorFull doctorFull = doctorMapper.getDoctorFullById(doctorId);
        Slot chooseSlot = slotMapper.selectByPrimaryKey(slotId);
        if (doctor == null)
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);

        if (chooseSlot.getStartDatetime().toLocalDate().isBefore(LocalDate.now())){
            throw new DataIntegrityViolationException("The selected slot is in the past and cannot be booked");
        }

        boolean isBooked = doctor.getSlots().stream()
                .anyMatch(slot -> slot.getSlotId().equals(slotId) && "BOOKED".equals(slot.getStatus()));
        if (isBooked) {
            throw new DataIntegrityViolationException("Slot with id " + slotId + " is already booked.");
        }

        List<Specialization> specializations = doctorFull.getSpecializations();
        if (specializations.isEmpty()) {
            throw new DataNotFoundException("Doctor with id " + doctorId + " has no associated specializations.");
        }
        if (specializations.size() > 1 && specializationId == null) {
            throw new IllegalArgumentException("Doctor with id " + doctorId + " has multiple specializations. Please choose a specific specialization.");
        }

        List<Appointment> appointments = appointmentMapper.selectBySlotId(slotId);
        String token = TokenUtil.checkToken(request);
        Long userId = tokenMapper.findByAccessToken(token).getUserId();

        Optional<Appointment> slotToProcess = appointments.stream()
                .filter(appointment -> appointment.getSlotId().equals(slotId) &&
                        ("PENDING_PAYMENT".equals(appointment.getStatus())))
                .findFirst();

        if (slotToProcess.isPresent()) {
            List<Appointment> existingAppointments = appointmentMapper.selectBySlotId(slotId);
            Optional<Appointment> userAppointment = existingAppointments.stream()
                    .filter(appointment -> appointment.getUserId().equals(userId) && "PENDING_PAYMENT".equals(appointment.getStatus()))
                    .findFirst();
            if (userAppointment.isPresent()) {
                throw new DataIntegrityViolationException("You already booked this appointment but have not completed payment. Please continue to payment.");
            }
        }
        Specialization specialization = specializations.get(0);
        DoctorSpecialization doctorSpecialization = doctorSpecializationMapper.selectByDoctorAndSpecId(doctorId,
                specialization.getSpecializationId());
        if(doctorSpecialization == null) throw new DataNotFoundException("Not found any doctor with that specialization");

        Appointment appointment = new Appointment();
        appointment.setPrice(chooseSlot.getPrice());
        appointment.setSlotId(slotId);
        appointment.setDoctorSpecializationId(doctorSpecialization.getDoctorSpecializationId());
        appointment.setUserId(userId);

        appointmentMapper.insert(appointment);
        return appointment;
    }

    @Override
    public com.doccure.BE.model.Invoice insertInvoiceAfterAppointment(Long appointmentId){
        com.doccure.BE.model.Invoice invoice = new Invoice();
        invoice.setInvoiceName("Invoice of appointment = " + appointmentId);
        invoice.setAppointmentId(appointmentId);
        invoiceMapper.insert(invoice);
        invoice = invoiceMapper.selectByAppointmentId(appointmentId);
        return invoice;
    }

    @Override
    public void cancelPayment(Long appointmentId, Long invoiceId){
        appointmentMapper.deleteByPrimaryKey(appointmentId);
        invoiceMapper.deleteByPrimaryKey(invoiceId);
    }

    @Override
    public Map<String, Object> successPayment(Long appointmentId, Long invoiceId, Long slotId, Long userId) throws IOException, GeneralSecurityException {
        appointmentMapper.updateStatusById("BOOKED", appointmentId);
        invoiceMapper.updateStatusByInvoiceId("SUCCESS", invoiceId);
        Slot slot = slotMapper.selectByPrimaryKey(slotId);

        InvoiceItem invoiceItem = new InvoiceItem();
        invoiceItem.setItemName("Invoice item for invoice #"+invoiceId);
        invoiceItem.setQuantity(BigDecimal.valueOf(1));
        invoiceItem.setPrice(slot.getPrice().longValue());
        invoiceItem.setInvoiceId(invoiceId);

        invoiceItemMapper.insert(invoiceItem);
        Map<String, Object> params = new HashMap<>();
        params.put("userId",userId);
        params.put("appointmentId", appointmentId);

        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Calendar service =
                new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                        .setApplicationName(APPLICATION_NAME)
                        .build();
        Event newEvent = createEvent(service, invoiceMapper.selectByPrimaryKey(invoiceId), slot);
        System.out.println("New event created: " + newEvent);
        Map<String, Object> result = new HashMap<>();
        result.put("appointmentDetail", appointmentMapper.getAppointmentDetailById(params));
        result.put("event", newEvent.getHtmlLink());
        return result;
    }



    @Override
    public Credential getCredentials(NetHttpTransport HTTP_TRANSPORT)
            throws IOException {
        // Load client secrets.
        System.out.println("Path: " + CREDENTIALS_FILE_PATH);
        InputStream in = BeApplication.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8080).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    public com.google.api.services.calendar.model.Event createEvent(Calendar service, Invoice invoice, Slot slot) throws IOException {
        com.google.api.services.calendar.model.Event event = new com.google.api.services.calendar.model.Event()
                .setSummary(invoice.getInvoiceName())
                .setLocation("Da Nang")
                .setDescription(invoice.getInvoiceName());

        String startDatetime = String.valueOf(slot.getStartDatetime());
        DateTime startDateTime = new DateTime(startDatetime+":00-00:00");
        EventDateTime start = new EventDateTime()
                .setDateTime(DateTime.parseRfc3339(String.valueOf(startDateTime)))
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setStart(start);


        String endDatetime = String.valueOf(slot.getEndDatetime());
        DateTime endDateTime = new DateTime(endDatetime+":00-00:00");
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setEnd(end);

        String[] recurrence = new String[] {"RRULE:FREQ=DAILY;COUNT=1"};
        event.setRecurrence(Arrays.asList(recurrence));


        EventReminder[] reminderOverrides = new EventReminder[] {
                new EventReminder().setMethod("email").setMinutes(24 * 60),
                new EventReminder().setMethod("popup").setMinutes(10),
        };
        com.google.api.services.calendar.model.Event.Reminders reminders = new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(Arrays.asList(reminderOverrides));
        event.setReminders(reminders);

        String calendarId = "primary";
        event = service.events().insert(calendarId, event).execute();
        System.out.printf("Event created: %s\n", event.getHtmlLink());
        return  event;
    }

}
