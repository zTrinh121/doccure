package com.doccure.BE.service;

import com.doccure.BE.response.SlotResponse;

public interface SlotService {
    SlotResponse getSlotBySlotId(Long slotId) throws Exception;
}
