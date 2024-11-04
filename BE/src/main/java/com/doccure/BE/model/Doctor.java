package com.doccure.BE.model;


import com.doccure.BE.request.DoctorInsertRequest;
import lombok.*;

import javax.print.Doc;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Doctor {
    private Long doctorId;
    private String firstName;
    private String lastName;
    private Long experience;
    private String hospital;
    private String avatar;

    public static Doctor fromDoctorInsertRequest(DoctorInsertRequest doctorInsertRequest){
        return Doctor.builder()
                .firstName(doctorInsertRequest.getFirstName())
                .lastName(doctorInsertRequest.getLastName())
                .experience(doctorInsertRequest.getExperience())
                .hospital(doctorInsertRequest.getHospital())
                .avatar(doctorInsertRequest.getAvatar())
                .build();
    }

}