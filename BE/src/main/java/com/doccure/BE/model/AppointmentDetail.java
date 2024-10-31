package com.doccure.BE.model;

import java.math.BigDecimal;


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
public class AppointmentDetail {
    
    private Long appointmentId;
    private String status;
    private BigDecimal price;
    private Long slotId;
    private Long doctorSpecializationId;
    private Long userId;
    private Doctor doctor;
    private SlotAppointment slot;
    private Specialization specialization;
    private Invoice invoice;
    
}