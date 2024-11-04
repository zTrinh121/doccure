package com.doccure.BE.response;

import com.doccure.BE.model.Doctor;
import com.doccure.BE.model.Specialization;
import com.doccure.BE.request.DoctorInsertRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorInsertResponse {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("experience")
    private Long experience;

    @JsonProperty("hospital")
    private String hospital;

    @JsonProperty("avatar")
    private String avatar;

    @JsonProperty("specialization_id")
    private Long specializationId;

    @JsonProperty("specialization_name")
    private String specializationName;

    public static DoctorInsertResponse fromDoctorInsertRequest(Doctor doctor, Specialization specialization){
        return DoctorInsertResponse
                .builder()
                .doctorId(doctor.getDoctorId())
                .fullName(doctor.getFirstName() + " " + doctor.getLastName())
                .experience(doctor.getExperience())
                .hospital(doctor.getHospital())
                .specializationId(specialization.getSpecializationId())
                .specializationName(specialization.getSpecializationName())
                .build();
    }



}
