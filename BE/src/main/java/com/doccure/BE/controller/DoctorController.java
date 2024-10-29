package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

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
    @GetMapping("")
    public ResponseEntity<Object> getDoctorFullByKeyword(@RequestParam("keyword") String keyword) throws Exception {
        return ResponseHandler.responseBuilder("List doctors in detail",
                HttpStatus.OK,
                doctorService.getDoctorFullByKeyword(keyword));
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
        return ResponseHandler.responseBuilder("List rating doctors in detail",
                HttpStatus.OK,
                doctorService.getAllDoctorRatings());
    }

    @GetMapping("/rating/all/pagination")
    public ResponseEntity<Object> getAllDoctorRatingsPagination(@RequestParam("offset") int offset,
                                                                @RequestParam("limit") int limit) throws DataNotFoundException {
        return ResponseHandler.responseBuilder(String.format("List rating doctor with pagination offset = %d and limit = %d", offset, limit),
                HttpStatus.OK,
                doctorService.getAllDoctorRatingsPagination(offset, limit));
    }

    @GetMapping("/rating/{id}")
    public ResponseEntity<Object> getRatingDoctorById(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Requested rating for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorRatingByDoctorId(id));
    }

    @GetMapping("/rating/filter")
    public ResponseEntity<Object> filterDoctorRating(@RequestParam("type") String type,
                                                     @RequestParam("order") String order) throws Exception {
        return ResponseHandler.responseBuilder("Doctors list filter ",
                HttpStatus.OK,
                doctorService.filterDoctorRating(type, order));
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

    @GetMapping("/slot/availability/{id}")
    public ResponseEntity<Object> getAvailabilitySlot(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Availability slot for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getAvailabilitySlot(id));
    }

    @GetMapping("/slot/date")
    public ResponseEntity<Object> getSlotFromStartEndDate(@RequestParam("id") Long id,
                                                          @RequestParam("start_date") String startDate,
                                                          @RequestParam("end_date") String endDate) throws DataNotFoundException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate start;
        LocalDate end;
        try {
            start = LocalDate.parse(startDate, formatter);
            end = LocalDate.parse(endDate, formatter);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
        }

        return ResponseHandler.responseBuilder("Availability slot for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getSlotFromStartEndDate(id, start, end));
    }



}
