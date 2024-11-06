package com.doccure.BE.service;

import com.doccure.BE.model.Slot;
import com.doccure.BE.request.SlotRequest;
import com.doccure.BE.response.SlotResponse;

public interface SlotService {
    SlotResponse getSlotBySlotId(Long slotId) throws Exception;

    SlotResponse insertSlot(SlotRequest slot) throws Exception;
}
