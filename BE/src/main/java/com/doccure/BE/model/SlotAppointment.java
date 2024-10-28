package com.doccure.BE.model;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"slotId", "startDatetime", "endDatetime", "price", "status"})
public class SlotAppointment {
    @JsonProperty("slot_id")
    private Long slotId;

    @JsonProperty("start_date_time")
    private Date startDatetime;

    @JsonProperty("end_date_time")
    private Date endDatetime;

    private BigDecimal price;
    
    private String status;

}