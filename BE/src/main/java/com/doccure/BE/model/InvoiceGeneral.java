package com.doccure.BE.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceGeneral {
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
    private Doctor doctor;

    @JsonProperty("slot")
    private SlotAppointment slot;
    
    @JsonProperty("specialization")
    private Specialization specialization;

}