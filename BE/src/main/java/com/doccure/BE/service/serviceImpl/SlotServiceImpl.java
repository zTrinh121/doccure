package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.SlotMapper;
import com.doccure.BE.model.Slot;
import com.doccure.BE.request.SlotRequest;
import com.doccure.BE.response.SlotResponse;
import com.doccure.BE.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

    @Override
    public SlotResponse insertSlot(SlotRequest slot) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("doctorId", slot.getDoctorId());
        params.put("startDatetime", slot.getStartDatetime());
        params.put("endDateTime", slot.getEndDatetime());

        if(slotMapper.selectByStartEndDateAndDoctorId(params) != null){
            throw new DataIntegrityViolationException("Slot have been existed for this doctor ID = " + slot.getDoctorId());
        }

        Slot newSlot = Slot.fromSlotRequest(slot);
        slotMapper.insert(newSlot);
        newSlot = slotMapper.selectByStartEndDateAndDoctorId(params);
        return SlotResponse.fromSlot(newSlot);
    }
}
