package com.doccure.BE.model;

import com.doccure.BE.request.DoctorSpecializationRequest;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorSpecialization {
    private Long doctorSpecializationId;
    private Long doctorId;
    private Long specializationId;

    public static DoctorSpecialization fromDoctorSpecialization(DoctorSpecializationRequest doctorSpecializationRequest){
        return DoctorSpecialization.builder()
                .doctorId(doctorSpecializationRequest.getDoctorId())
                .specializationId(doctorSpecializationRequest.getSpecializationId())
                .build();
    }
}