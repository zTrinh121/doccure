package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${apiPrefix}/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllDoctorDetails() throws DataNotFoundException {
        return ResponseHandler.responseBuilder("List doctors in detail",
                HttpStatus.OK,
                doctorService.getAllDoctor());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getDoctorById(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Requested doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorById(id));
    }
}
