package com.doccure.BE.response;

import java.math.BigDecimal;

import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.model.Slot;
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
@JsonPropertyOrder({"appointmentId", "status", "price", "slotId",
                     "doctorSpecializationId", "userId", 
                     "doctor", "slot", "specialization"})
public class AppointmentDetailResponse {
    
    @JsonProperty("appointment_id")
    private Long appointmentId;
    
    private String status;
    private BigDecimal price;

    @JsonProperty("slot_id")
    private Long slotId;

    @JsonProperty("doctor_specialization_id")
    private Long doctorSpecializationId;

    @JsonProperty("user_id")
    private Long userId;

    private DoctorResponse doctor;
    private SlotAppointment slot;
    private Specialization specialization;

    public static AppointmentDetailResponse fromAppointmentDetail(AppointmentDetail appointmentDetail){
        return AppointmentDetailResponse.builder()
                .appointmentId(appointmentDetail.getAppointmentId())
                .status(appointmentDetail.getStatus())
                .price(appointmentDetail.getPrice())
                .slotId(appointmentDetail.getSlotId())
                .doctorSpecializationId(appointmentDetail.getDoctorSpecializationId())
                .userId(appointmentDetail.getUserId())
                .doctor(DoctorResponse.fromDoctor(appointmentDetail.getDoctor()))
                .slot(appointmentDetail.getSlot())
                .specialization(appointmentDetail.getSpecialization())
                .build();
    }
    
}