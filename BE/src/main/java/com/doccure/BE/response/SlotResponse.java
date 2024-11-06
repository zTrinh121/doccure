package com.doccure.BE.response;

import com.doccure.BE.model.Slot;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SlotResponse {
    @JsonProperty("slot_id")
    private Long slotId;

    @JsonProperty("start_date_time")
    private LocalDateTime startDatetime;

    @JsonProperty("end_date_time")
    private LocalDateTime endDatetime;

    @JsonProperty("doctor_id")
    private Long doctorId;

    @JsonProperty("price")
    private BigDecimal price;

    public static SlotResponse fromSlot(Slot slot){
        return SlotResponse.builder()
                .slotId(slot.getSlotId())
                .startDatetime(slot.getStartDatetime())
                .endDatetime(slot.getEndDatetime())
                .doctorId(slot.getDoctorId())
                .price(slot.getPrice())
                .build();
    }

}