package com.doccure.BE.response;

import com.doccure.BE.model.DoctorRating;
import com.doccure.BE.model.Rating;
import com.doccure.BE.model.RatingSpecialization;
import com.doccure.BE.model.Specialization;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonPropertyOrder({"doctorId", "firstName", "lastName", "experience", "hospital", "avatar", "ratings"})
public class DoctorRatingResponse {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;
    private Long experience;
    private String hospital;
    private String avatar;
    private List<RatingSpecialization> ratings;

    @JsonProperty("count_ratings")
    private int countRatings;

    @JsonProperty("avg_rating")
    private float avgRating;

    @JsonProperty("percent_rating")
    private float percentRating;
//    private List<Rating> ratings;

    public static DoctorRatingResponse fromDoctorRating(DoctorRating doctor){
        return DoctorRatingResponse.builder()
                .doctorId(doctor.getDoctorId())
                .firstName(doctor.getFirstName())
                .lastName(doctor.getLastName())
                .experience(doctor.getExperience())
                .hospital(doctor.getHospital())
                .avatar(doctor.getAvatar())
                .ratings(doctor.getRatings())
//                .ratings(doctor.getRatings())
                .build();
    }
}
