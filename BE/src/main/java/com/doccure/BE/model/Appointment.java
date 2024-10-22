package com.doccure.BE.model;

import java.math.BigDecimal;

public class Appointment {
    private Long appointmentId;

    private String status;

    private BigDecimal price;

    private Long slotId;

    private Long doctorSpecializationId;

    private Long userId;

    
    public Long getAppointmentId() {
        return appointmentId;
    }

    
    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    
    public String getStatus() {
        return status;
    }

    
    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    
    public BigDecimal getPrice() {
        return price;
    }

    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    
    public Long getSlotId() {
        return slotId;
    }

    
    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }

    
    public Long getDoctorSpecializationId() {
        return doctorSpecializationId;
    }

    
    public void setDoctorSpecializationId(Long doctorSpecializationId) {
        this.doctorSpecializationId = doctorSpecializationId;
    }

    
    public Long getUserId() {
        return userId;
    }

    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}