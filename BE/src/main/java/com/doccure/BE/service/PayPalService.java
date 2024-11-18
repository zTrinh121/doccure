package com.doccure.BE.service;

import com.doccure.BE.model.Appointment;
import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.model.Invoice;
import com.doccure.BE.model.Slot;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

public interface PayPalService {
    Payment createPayment(Long slotId,
                          Long specializationId,
                          HttpServletRequest request) throws Exception;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

    Appointment manageSlotForAppointment(Long doctorId, Long slotId, Long specializationId, HttpServletRequest request) throws Exception;

    com.doccure.BE.model.Invoice insertInvoiceAfterAppointment(Long appointmentId);

    void cancelPayment(Long appointmentId, Long invoiceId);

    Map<String, Object> successPayment(Long appointmentId, Long invoiceId, Long slotId, Long userId) throws IOException, GeneralSecurityException;

    Credential getCredentials(NetHttpTransport HTTP_TRANSPORT) throws IOException;

    Event createEvent(Calendar service, Invoice invoice, Slot slot) throws IOException;

}
