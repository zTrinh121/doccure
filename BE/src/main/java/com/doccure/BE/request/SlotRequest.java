package com.doccure.BE.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
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
public class SlotRequest {
    @JsonProperty("start_date_time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @NotNull(message = "The start date time must be specified")
    private LocalDateTime startDatetime;

    @JsonProperty("end_date_time")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @NotNull(message = "The end date time must be specified")
    private LocalDateTime endDatetime;

    @JsonProperty("doctor_id")
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @JsonProperty("price")
    @NotNull(message = "Price is required")
    private BigDecimal price;

}