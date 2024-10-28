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

    //Doctors with specialization
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

    // Rating for doctors
    @GetMapping("/rating/all")
    public ResponseEntity<Object> getAllDoctorRatings() throws DataNotFoundException {
        return ResponseHandler.responseBuilder("List rating doctos in detail",
                HttpStatus.OK,
                doctorService.getAllDoctorRatings());
    }

    @GetMapping("/rating/{id}")
    public ResponseEntity<Object> getRatingDoctorById(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Requested rating for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorRatingByDoctorId(id));
    }

    // Slots for doctors
    @GetMapping("/slot/all")
    public ResponseEntity<Object> getAllDoctorSlots() throws DataNotFoundException {
        return ResponseHandler.responseBuilder("List slot doctors in detail",
                HttpStatus.OK,
                doctorService.getAllDoctorSlots());
    }

    @GetMapping("/slot/{id}")
    public ResponseEntity<Object> getSlotDoctorById(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Requested slot for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorSlotByDoctorId(id));
    }
}
