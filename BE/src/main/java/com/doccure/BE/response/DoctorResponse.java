package com.doccure.BE.response;

import com.doccure.BE.model.Doctor;
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
@JsonPropertyOrder({"doctorId", "fullName", "experience", "hospital", "avatar"})
public class DoctorResponse {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("full_name")
    private String fullName;

    private Long experience;
    private String hospital;
    private String avatar;

    public static DoctorResponse fromDoctor(Doctor doctor){
        return DoctorResponse.builder()
                .doctorId(doctor.getDoctorId())
                .fullName(doctor.getFirstName() + " " + doctor.getLastName())
                .experience(doctor.getExperience())
                .hospital(doctor.getHospital())
                .avatar(doctor.getAvatar())
                .build();
    }

   
}