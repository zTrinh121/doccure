package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingRequest {
    @JsonProperty("comment")
    @NotEmpty(message = "Comment is required")
    private String commentRating;
    @JsonProperty("rating")
    @NotNull(message = "Rating is required")
    @Range(min = 1, max = 5)
    private Long rating;
    @JsonProperty("appointment_id")
    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;
}
