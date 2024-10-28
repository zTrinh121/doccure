package com.doccure.BE.response;

import com.doccure.BE.model.DoctorFull;
import com.doccure.BE.model.Rating;
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
@JsonPropertyOrder({"doctorId", "firstName", "lastName", "experience", "hospital", "avatar", "specializations"})
public class DoctorFullResponse {
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


    public static DoctorFullResponse fromDoctorFull(DoctorFull doctorFull){
        return DoctorFullResponse.builder()
                .doctorId(doctorFull.getDoctorId())
                .firstName(doctorFull.getFirstName())
                .lastName(doctorFull.getLastName())
                .experience(doctorFull.getExperience())
                .hospital(doctorFull.getHospital())
                .avatar(doctorFull.getAvatar())
                .specializations(doctorFull.getSpecializations())
                .build();
    }
}
