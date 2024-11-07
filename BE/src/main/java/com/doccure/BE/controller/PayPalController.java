package com.doccure.BE.controller;

import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.PayPalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${apiPrefix}/paypal")
@RequiredArgsConstructor
public class PayPalController {
    private final PayPalService payPalService;
    public static final String SUCCESS_URL = "/pay/success";
    public static final String CANCEL_URL = "/pay/cancel";

    @PostMapping("/pay")
    public ResponseEntity<Object> payment(@RequestParam("slot_id") Long slotId,
                          @RequestParam("specialization_id") Long specializationId,
                          HttpServletRequest request) {
        try {
            Payment payment = payPalService.createPayment(slotId, specializationId, request);
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    return ResponseHandler.responseBuilder("Redirect link back for paypal",
                            HttpStatus.OK,
                            "redirect:"+link.getHref());
                }
            }

        } catch (PayPalRESTException e) {
            return ResponseHandler.responseBuilder("There some errors happen while payment",
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            return ResponseHandler.responseBuilder("There some errors happen while payment",
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }

        return ResponseHandler.responseBuilder("Redirect link back for paypal",
                HttpStatus.OK,
                "redirect:/");
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay(@RequestParam("appointment_id") Long appointmentId,
                            @RequestParam("invoice_id") Long invoiceId) {
        payPalService.cancelPayment(appointmentId, invoiceId);
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    public ResponseEntity<Object> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam("appointment_id") Long appointmentId,
                                     @RequestParam("invoice_id") Long invoiceId, @RequestParam("slot_id") Long slotId,
                                     @RequestParam("user_id") Long userId) {
        try {
            Payment payment = payPalService.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            AppointmentDetail appointmentDetail = payPalService.successPayment(appointmentId, invoiceId, slotId, userId);
            if (payment.getState().equals("approved")) {
                return ResponseHandler.responseBuilder("Invoice in detail with ID = " + invoiceId,
                        HttpStatus.OK,
                        appointmentDetail);
            }
        } catch (PayPalRESTException e) {
            return ResponseHandler.responseBuilder("Something error just happen with invoice ID = " + invoiceId,
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
        return ResponseHandler.responseBuilder("Invoice in detail with ID = " + invoiceId,
                HttpStatus.OK,
                "redirect:/");
    }
}
