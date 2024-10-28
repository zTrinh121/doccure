package com.doccure.BE.response;

import com.doccure.BE.model.DoctorSlot;
import com.doccure.BE.model.SlotAppointment;
import com.doccure.BE.model.Specialization;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonPropertyOrder({"doctorId", "firstName", "lastName", "experience", "hospital", "avatar", "specializations", "slots"})
public class DoctorSlotResponse {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;
    private Long experience;
    private String hospital;
    private String avatar;
    private List<Specialization> specializations;
    private List<SlotAppointment> slots;
    // private SlotAppointment appointment;

    public static DoctorSlotResponse fromDoctorSlot(DoctorSlot doctor){
        return DoctorSlotResponse.builder()
                .doctorId(doctor.getDoctorId())
                .firstName(doctor.getFirstName())
                .lastName(doctor.getLastName())
                .experience(doctor.getExperience())
                .hospital(doctor.getHospital())
                .avatar(doctor.getAvatar())
                .specializations(doctor.getSpecializations())
                .slots(doctor.getSlots())
                // .appointment(doctor.getAppointment())
                .build();
    }
}
