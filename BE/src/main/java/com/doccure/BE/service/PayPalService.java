package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.Appointment;
import com.doccure.BE.request.GoogleEventResquest;
import com.doccure.BE.response.AppointmentDetailResponse;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface PayPalService {
    Payment createPayment(Long slotId,
                          Long specializationId,
                          HttpServletRequest request) throws Exception;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

    Appointment manageSlotForAppointment(Long doctorId, Long slotId, Long specializationId, HttpServletRequest request) throws Exception;

    com.doccure.BE.model.Invoice insertInvoiceAfterAppointment(Long appointmentId);

    void cancelPayment(Long appointmentId, Long invoiceId);

    AppointmentDetailResponse successPayment(Long appointmentId, Long invoiceId, Long slotId, Long userId) throws IOException, GeneralSecurityException;

    Credential getCredentials(NetHttpTransport HTTP_TRANSPORT) throws IOException;

    com.google.api.services.calendar.model.Event createEvent(GoogleEventResquest googleEventResquest) throws IOException, GeneralSecurityException, DataNotFoundException;

    String checkGoogleAuthorization(NetHttpTransport HTTP_TRANSPORT) throws IOException;

    Credential processAuthorizationCode(NetHttpTransport httpTransport, String code) throws IOException;
}
