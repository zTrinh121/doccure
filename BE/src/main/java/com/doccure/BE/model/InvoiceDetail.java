package com.doccure.BE.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDetail {
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

    @JsonProperty("invoice_items")
    private List<InvoiceItem> invoiceItems;



}