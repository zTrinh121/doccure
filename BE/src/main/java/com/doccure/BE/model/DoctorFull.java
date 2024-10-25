package com.doccure.BE.model;

import java.util.List;

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
public class DoctorFull {
    private Long doctorId;
    private String firstName;
    private String lastName;
    private Long experience;
    private String hospital;
    private String avatar;
    // private Long specializationId;
    // private String specializationName;
    private List<Specialization> specializations;
}
