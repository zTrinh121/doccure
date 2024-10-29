package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.SpecializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiPrefix}/specialization")
@RequiredArgsConstructor
public class SpecializationController {
    private final SpecializationService specializationService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllSpecializations() throws DataNotFoundException {
        return ResponseHandler.responseBuilder("List specializations",
                HttpStatus.OK,
                specializationService.getAllSpecialization());
    }
}
