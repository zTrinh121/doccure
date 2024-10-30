package com.doccure.BE.controller;


import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.AppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${apiPrefix}/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllAppointmentDetails(
            @RequestParam("status") String status,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit,
            HttpServletRequest request
    ) throws Exception {
        return ResponseHandler.responseBuilder("List appointment in detail",
                HttpStatus.OK,
                appointmentService.getSlotDetailWithStatus(status, offset, limit, request));
    }
}
