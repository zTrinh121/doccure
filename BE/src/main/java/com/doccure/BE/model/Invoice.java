package com.doccure.BE.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Invoice {
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

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getInvoiceName() {
        return invoiceName;
    }

    public void setInvoiceName(String invoiceName) {
        this.invoiceName = invoiceName;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}