package com.doccure.BE.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorRating {
    private Long doctorId;
    private String fullName;
    private Long experience;
    private String hospital;
    private String avatar;
    private List<RatingSpecialization> ratings;
}
