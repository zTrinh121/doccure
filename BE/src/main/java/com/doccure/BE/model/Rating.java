package com.doccure.BE.model;

import java.time.LocalDateTime;

import com.doccure.BE.request.RatingRequest;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rating {
    private Long ratingId;

    private String commentRating;

    private Long rating;

    private LocalDateTime createdAt;

    private Long appointmentId;


    public static Rating fromRatingRequest(RatingRequest ratingRequest){
        return Rating
                .builder()
                .commentRating(ratingRequest.getCommentRating())
                .rating(ratingRequest.getRating())
                .appointmentId(ratingRequest.getAppointmentId())
                .build();
    }
}