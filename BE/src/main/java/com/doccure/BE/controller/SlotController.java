package com.doccure.BE.controller;

import com.doccure.BE.request.SlotRequest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.SlotService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiPrefix}/slot")
@RequiredArgsConstructor
public class SlotController {
    private final SlotService slotService;

    @GetMapping("/{slotId}")
    public ResponseEntity<Object> getSlotBySlotId(@PathVariable("slotId") Long slotId) throws  Exception{
        return ResponseHandler.responseBuilder("Slot in detail with ID = " + slotId,
                HttpStatus.OK,
                slotService.getSlotBySlotId(slotId));
    }

    @PostMapping("/insert")
    public ResponseEntity<Object> insertSlot(@RequestBody @Valid SlotRequest slot, BindingResult result) throws  Exception{
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }
        return ResponseHandler.responseBuilder("Insert successfully new slot ",
                HttpStatus.OK,
                slotService.insertSlot(slot));
    }
}
