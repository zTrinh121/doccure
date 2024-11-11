package com.doccure.BE.controller;

import com.doccure.BE.request.RatingRequest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.RatingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${apiPrefix}/rating")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @PostMapping(value = "/insert",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> insertNewComment(@RequestBody @Valid RatingRequest ratingRequest,
                                                   BindingResult result, HttpServletRequest request) throws Exception {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }
        return ResponseHandler.responseBuilder("Insert a new comment successfully",
                HttpStatus.CREATED,
                ratingService.insert(ratingRequest, request));
    }
}
