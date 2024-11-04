package com.doccure.BE.request;

import com.doccure.BE.model.Doctor;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorInsertRequest {

    @JsonProperty("first_name")
    @NotEmpty(message = "First name is required")
    private String firstName;

    @JsonProperty("last_name")
    @NotEmpty(message = "Last name is required")
    private String lastName;

    @JsonProperty("experience")
    @NotNull(message = "Experience is required")
    private Long experience;

    @JsonProperty("hospital")
    @NotEmpty(message = "Hospital is required")
    private String hospital;

    @JsonProperty("avatar")
    private String avatar;

    @JsonProperty("specialization_id")
    @NotNull(message = "Specialization is required")
    private Long specializationId;


}
