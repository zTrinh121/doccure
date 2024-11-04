package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.SlotMapper;
import com.doccure.BE.model.Slot;
import com.doccure.BE.response.SlotResponse;
import com.doccure.BE.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {
    private final SlotMapper slotMapper;
    @Override
    public SlotResponse getSlotBySlotId(Long slotId) throws Exception {
        Slot slot = slotMapper.selectByPrimaryKey(slotId);
        if(slot == null) throw new DataNotFoundException("Slot not found with slot id = " + slotId);
        return SlotResponse.fromSlot(slot);
    }
}
