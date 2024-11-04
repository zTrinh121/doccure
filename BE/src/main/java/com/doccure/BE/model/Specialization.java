package com.doccure.BE.model;

import com.doccure.BE.request.SpecializationRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Specialization {
    @JsonProperty("specialization_id")
    private Long specializationId;

    @JsonProperty("specialization_name")
    private String specializationName;


    public static Specialization fromSpecializationRequest(SpecializationRequest specializationRequest){
        return Specialization.builder().specializationName(specializationRequest.getSpecializationName()).build();
    }
}