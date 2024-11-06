package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.Doctor;
import com.doccure.BE.request.DoctorInsertRequest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.DoctorService;
import com.doccure.BE.util.DateFormatUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("${apiPrefix}/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping("/insert")
    public ResponseEntity<Object> insertDoctorWithSpecialization(@RequestBody @Valid DoctorInsertRequest doctorInsertRequest,
                                                       BindingResult result) throws Exception {
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
                doctorService.insert(doctorInsertRequest));
    }

    @PutMapping("/avatar/{doctorId}")
    public ResponseEntity<Object> updateAvatar(@PathVariable("doctorId") Long doctorId,
                                             @RequestPart final MultipartFile file
    ) throws Exception {

        return ResponseHandler.responseBuilder("Update avatar successfully for doctor id = " + doctorId,
                HttpStatus.OK,
                doctorService.updateAvatar( doctorId, file));
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody @Valid DoctorInsertRequest doctor,
                                         @RequestParam("doctor_id") Long doctorId,
                                         @RequestParam("old_specialization_id") Long oldSpecializationId,
                                               BindingResult result
                                               ) throws Exception {
        if(result.hasErrors()){
            List<String> errorMessages =  result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }

        return ResponseHandler.responseBuilder("Update doctor successfully for doctor id = " + doctorId,
                HttpStatus.OK,
                doctorService.update(doctor, doctorId, oldSpecializationId));
    }


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
    
    @GetMapping("/specialization")
    public ResponseEntity<Object> getDoctorFullBySpecialization(@RequestParam("specialization") Long specialization) throws Exception {
        return ResponseHandler.responseBuilder("List doctors in detail by specialization",
                HttpStatus.OK,
                doctorService.getDoctorFullBySpecializationId(specialization));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getDoctorById(@PathVariable("id") Long id) throws Exception {
        return ResponseHandler.responseBuilder("Requested doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorById(id));
    }

    // Rating for doctors
    @GetMapping("/rating/all")
    public ResponseEntity<Object> getAllDoctorRatings() throws Exception {
        return ResponseHandler.responseBuilder("List rating doctors in detail",
                HttpStatus.OK,
                doctorService.getAllDoctorRatings());
    }

    @GetMapping("/rating/all/pagination")
    public ResponseEntity<Object> getAllDoctorRatingsPagination(@RequestParam("offset") int offset,
                                                                @RequestParam("limit") int limit) throws Exception {
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
                                                          @RequestParam("end_date") String endDate) throws Exception {
        LocalDate start = DateFormatUtil.parseStringToDate(startDate);
        LocalDate end = DateFormatUtil.parseStringToDate(endDate);
        if (start == null || end == null){
            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
        }

        return ResponseHandler.responseBuilder("Availability slot for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getSlotFromStartEndDate(id, start, end));
    }

    @GetMapping("/rating/date")
    public ResponseEntity<Object> getDoctorRatingsByStartEndDate(@RequestParam("id") Long id,
                                                          @RequestParam("start_date") String startDate,
                                                          @RequestParam("end_date") String endDate,
                                                          @RequestParam("offset") int offset,
                                                          @RequestParam("limit") int limit) throws Exception {
        LocalDate start = DateFormatUtil.parseStringToDate(startDate);
        LocalDate end = DateFormatUtil.parseStringToDate(endDate);
        if (start == null || end == null){
            return ResponseEntity.badRequest().body("Invalid date format. Please use yyyy-MM-dd.");
        }

        return ResponseHandler.responseBuilder("Availability slot for doctor detail with id = " + id ,
                HttpStatus.OK,
                doctorService.getDoctorRatingsByStartEndDate(id, start, end, offset, limit));
    }


}
