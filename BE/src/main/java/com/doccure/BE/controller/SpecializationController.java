package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.request.SpecializationRequest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.SpecializationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PostMapping("/insert")
    public ResponseEntity<Object> insertSpecialization(@RequestBody @Valid SpecializationRequest specializationName,
                                                       BindingResult result) {
        if(result.hasErrors()){
            List<String> errorMessages =  result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }
        return ResponseHandler.responseBuilder("Insert successfully",
                HttpStatus.CREATED,
                specializationService.insert(specializationName));
    }
}
