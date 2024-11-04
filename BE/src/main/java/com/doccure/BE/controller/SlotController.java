package com.doccure.BE.controller;

import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiPrefix}/slot")
@RequiredArgsConstructor
public class SlotController {
    private final SlotService slotService;
    @GetMapping("/{slotId}")
    public ResponseEntity<Object> getSlotbySlotId(@PathVariable("slotId") Long slotId) throws  Exception{
        return ResponseHandler.responseBuilder("Slot in detail with ID = " + slotId,
                HttpStatus.OK,
                slotService.getSlotBySlotId(slotId));
    }
}
