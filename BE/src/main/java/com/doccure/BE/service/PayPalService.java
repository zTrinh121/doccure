package com.doccure.BE.service;

import com.doccure.BE.model.Appointment;
import com.doccure.BE.model.AppointmentDetail;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;

public interface PayPalService {
    Payment createPayment(Long slotId,
                          Long specializationId,
                          HttpServletRequest request) throws Exception;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

    Appointment manageSlotForAppointment(Long doctorId, Long slotId, Long specializationId, HttpServletRequest request) throws Exception;

    com.doccure.BE.model.Invoice insertInvoiceAfterAppointment(Long appointmentId);

    void cancelPayment(Long appointmentId, Long invoiceId);

    AppointmentDetail successPayment(Long appointmentId, Long invoiceId, Long slotId, Long userId);

}
