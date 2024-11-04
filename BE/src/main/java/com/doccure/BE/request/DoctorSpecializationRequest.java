package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorSpecializationRequest {
    @JsonProperty("doctor_id")
    @NotNull(message = "Doctor ID cannot be empty")
    private Long doctorId;

    @JsonProperty("specialization_id")
    @NotNull(message = "Specialization ID cannot be empty")
    private Long specializationId;

}