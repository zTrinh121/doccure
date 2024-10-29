package com.doccure.BE.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
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
@JsonPropertyOrder({"slotId", "dateSlot", "startTime", "endTime", "price", "status"})
public class SlotAppointment {
    @JsonProperty("slot_id")
    private Long slotId;

    @JsonProperty("date_slot")
    private LocalDate dateSlot;

    @JsonProperty("start_time")
    private LocalTime startTime;

    @JsonProperty("end_time")
    private LocalTime endTime;

    private BigDecimal price;
    
    private String status;

    public void setDateFromOffsetDateTime(OffsetDateTime offsetDateTime) {
        this.dateSlot = offsetDateTime
                    .withOffsetSameInstant(ZoneOffset.ofHours(7))
                    .toLocalDate();
    }

    public void setStartTimeFromOffsetDateTime(OffsetDateTime offsetDateTime) {
        this.startTime = offsetDateTime
                .withOffsetSameInstant(ZoneOffset.ofHours(7))
                .toLocalTime();
    }

    public void setEndTimeFromOffsetDateTime(OffsetDateTime offsetDateTime) {
        this.endTime = offsetDateTime
                .withOffsetSameInstant(ZoneOffset.ofHours(7))
                .toLocalTime();
    }

}