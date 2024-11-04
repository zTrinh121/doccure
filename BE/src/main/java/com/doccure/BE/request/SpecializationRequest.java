package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SpecializationRequest {
    @JsonProperty("specialization_name")
    @NotEmpty(message = "Specialization name is required")
    private String specializationName;
}
