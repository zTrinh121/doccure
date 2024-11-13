package com.doccure.BE.model;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingSpecialization {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("specialization_id")
    private Long specializationId;

    @JsonProperty("specialization_name")
    private String specializationName;

    @JsonProperty("rating_id")
    private Long ratingId;

    @JsonProperty("comment_rating")
    private String commentRating;
    
    private Long rating;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("appointment_id")
    private Long appointmentId;

    public void setCreatedAtFromOffsetDateTime(OffsetDateTime offsetDateTime) {
        this.createdAt = offsetDateTime
                .withOffsetSameInstant(ZoneOffset.ofHours(7))
                .toLocalDateTime();
    }

}
