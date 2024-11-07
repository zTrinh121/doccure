package com.doccure.BE.response;

import java.time.LocalDateTime;

import com.doccure.BE.model.Rating;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingResponse {
    @JsonProperty("rating_id")
    private Long ratingId;
    @JsonProperty("comment")
    private String commentRating;
    @JsonProperty("rating")
    private Long rating;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    @JsonProperty("appointment_id")
    private Long appointmentId;

    public static RatingResponse fromRating(Rating rating){
        return RatingResponse
                .builder()
                .ratingId(rating.getRatingId())
                .commentRating(rating.getCommentRating())
                .rating(rating.getRating())
                .createdAt(rating.getCreatedAt())
                .appointmentId(rating.getAppointmentId())
                .build();
    }

    
}