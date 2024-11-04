package com.doccure.BE.model;

import java.util.List;
import java.math.BigDecimal;

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
    private String fullName;
    private Long experience;
    private String hospital;
    private String avatar;
    private BigDecimal maxPrice;
    private BigDecimal minPrice;
    private List<Specialization> specializations;


}
