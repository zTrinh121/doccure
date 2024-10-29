package com.doccure.BE.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SlotPrice {
    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("max_price")
    private BigDecimal maxPrice;

    @JsonProperty("min_price")
    private BigDecimal minPrice;

}