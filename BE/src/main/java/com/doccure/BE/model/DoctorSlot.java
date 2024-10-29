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
public class DoctorSlot {
    private Long doctorId;
    private String fullName;
    private Long experience;
    private String hospital;
    private String avatar;
    private List<Specialization> specializations;
    private List<SlotAppointment> slots;
}
