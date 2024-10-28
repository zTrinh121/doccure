package com.doccure.BE.model;

import lombok.*;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingSpecialization {
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
    private Date createdAt;

    @JsonProperty("appointment_id")
    private Long appointmentId;

}