package com.doccure.BE.response;

import com.doccure.BE.model.Specialization;
import com.doccure.BE.request.SpecializationRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SpecializationResponse {
    @JsonProperty("specialization_id")
    private Long specializationId;

    @JsonProperty("specialization_name")
    private String specializationName;


    public static SpecializationResponse fromSpecialization(Specialization specialization){
        return SpecializationResponse.builder()
                .specializationId(specialization.getSpecializationId())
                .specializationName(specialization.getSpecializationName())
                .build();
    }
}
