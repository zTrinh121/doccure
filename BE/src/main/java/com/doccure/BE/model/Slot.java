package com.doccure.BE.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.doccure.BE.request.SlotRequest;
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
public class Slot {
    private Long slotId;

    private LocalDateTime startDatetime;

    private LocalDateTime endDatetime;

    private Long doctorId;

    private BigDecimal price;

    public static Slot fromSlotRequest(SlotRequest slotRequest) {
        return Slot.builder()
                .startDatetime(slotRequest.getStartDatetime())
                .endDatetime(slotRequest.getEndDatetime())
                .doctorId(slotRequest.getDoctorId())
                .price(slotRequest.getPrice())
                .build();
    }

}