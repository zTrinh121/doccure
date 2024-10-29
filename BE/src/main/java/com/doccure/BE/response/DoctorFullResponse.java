package com.doccure.BE.response;
import java.math.BigDecimal;

import com.doccure.BE.model.DoctorFull;
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
@JsonPropertyOrder({"doctorId", "fullName", "experience", "hospital", "avatar", "maxPrice", "minPrice", "specializations"})
public class DoctorFullResponse {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("full_name")
    private String fullName;

    private Long experience;
    private String hospital;
    private String avatar;
    @JsonProperty("max_price")
    private BigDecimal maxPrice;

    @JsonProperty("min_price")
    private BigDecimal minPrice;


    private List<Specialization> specializations;


    public static DoctorFullResponse fromDoctorFull(DoctorFull doctorFull){
        return DoctorFullResponse.builder()
                .doctorId(doctorFull.getDoctorId())
                .fullName(doctorFull.getFullName())
                .experience(doctorFull.getExperience())
                .hospital(doctorFull.getHospital())
                .avatar(doctorFull.getAvatar())
                .maxPrice(doctorFull.getMaxPrice())
                .minPrice(doctorFull.getMinPrice())
                .specializations(doctorFull.getSpecializations())
                .build();
    }
}
