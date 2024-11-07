package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.*;
import com.doccure.BE.model.*;
import com.doccure.BE.model.Invoice;
import com.doccure.BE.model.InvoiceItem;
import com.doccure.BE.service.PayPalService;
import com.doccure.BE.util.TokenUtil;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    @Override
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
        Slot chooseSlot = slotMapper.selectByPrimaryKey(slotId);
        if (doctor == null)
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);

        boolean isBooked = doctor.getSlots().stream()
                .anyMatch(slot -> slot.getSlotId().equals(slotId) && "BOOKED".equals(slot.getStatus()));
        if (isBooked) {
            throw new DataIntegrityViolationException("Slot with id " + slotId + " is already booked.");
        }

        List<Specialization> specializations = doctor.getSpecializations();
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
    public AppointmentDetail successPayment(Long appointmentId, Long invoiceId, Long slotId, Long userId){
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
        return appointmentMapper.getAppointmentDetailById(params);
    }

}
