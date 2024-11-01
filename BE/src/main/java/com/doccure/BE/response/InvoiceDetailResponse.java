package com.doccure.BE.response;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.doccure.BE.model.Appointment;
import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.model.Doctor;
import com.doccure.BE.model.Invoice;
import com.doccure.BE.model.InvoiceDetail;
import com.doccure.BE.model.InvoiceItem;
import com.doccure.BE.model.SlotAppointment;
import com.doccure.BE.model.Specialization;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

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
public class InvoiceDetailResponse {
    
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

    @JsonProperty("invoice_items")
    private List<InvoiceItem> invoiceItems;


    public static InvoiceDetailResponse fromInvoiceDetail(InvoiceDetail invoiceDetail){
        return InvoiceDetailResponse.builder()
                .invoiceId(invoiceDetail.getInvoiceId())
                .invoiceName(invoiceDetail.getInvoiceName())
                .createdAt(invoiceDetail.getCreatedAt())
                .status(invoiceDetail.getStatus())
                .appointmentId(invoiceDetail.getAppointmentId())
                .updatedAt(invoiceDetail.getUpdatedAt())
                .appointment(invoiceDetail.getAppointment())
                .doctor(DoctorResponse.fromDoctor(invoiceDetail.getDoctor()))
                .slot(invoiceDetail.getSlot())
                .specialization(invoiceDetail.getSpecialization())
                .invoiceItems(invoiceDetail.getInvoiceItems())
                .build();
    }
    
}