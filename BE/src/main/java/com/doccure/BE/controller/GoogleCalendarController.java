package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.request.GoogleEventResquest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.PayPalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@RequestMapping("${apiPrefix}/google-calendar")
@RequiredArgsConstructor
public class GoogleCalendarController {
    private final PayPalService payPalService;

    @PostMapping("create-event")
    public ResponseEntity<Object> createEvent(@RequestBody GoogleEventResquest googleEventResquest,
                                              BindingResult result) throws GeneralSecurityException, IOException, DataNotFoundException {

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
                HttpStatus.OK,
                payPalService.createEvent(googleEventResquest));
    }

}
