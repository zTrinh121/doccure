package com.doccure.BE.response;

import com.doccure.BE.model.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceGeneralResponse {
    
    @JsonProperty("invoice_id")
    private Long invoiceId;

    @JsonProperty("invoice_name")
    private String invoiceName;

    @JsonProperty("created_at")
    private Date createdAt;

    @JsonProperty("status")
    private String status;

    @JsonProperty("appointment_id")
    private Long appointmentId;

    @JsonProperty("updated_at")
    private Date updatedAt;

    @JsonProperty("appointment")
    private Appointment appointment;

    @JsonProperty("doctor")
    private DoctorResponse doctor;

    @JsonProperty("slot")
    private SlotAppointment slot;
    
    @JsonProperty("specialization")
    private Specialization specialization;


    public static InvoiceGeneralResponse fromInvoiceGeneral(InvoiceGeneral invoiceGeneral){
        return InvoiceGeneralResponse.builder()
                .invoiceId(invoiceGeneral.getInvoiceId())
                .invoiceName(invoiceGeneral.getInvoiceName())
                .createdAt(invoiceGeneral.getCreatedAt())
                .status(invoiceGeneral.getStatus())
                .appointmentId(invoiceGeneral.getAppointmentId())
                .updatedAt(invoiceGeneral.getUpdatedAt())
                .appointment(invoiceGeneral.getAppointment())
                .doctor(DoctorResponse.fromDoctor(invoiceGeneral.getDoctor()))
                .slot(invoiceGeneral.getSlot())
                .specialization(invoiceGeneral.getSpecialization())
                .build();
    }
    
}