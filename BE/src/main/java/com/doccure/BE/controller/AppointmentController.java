package com.doccure.BE.controller;

import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.AppointmentService;
import com.doccure.BE.util.DateFormatUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("${apiPrefix}/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllAppointmentDetails(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit,
            HttpServletRequest request
    ) throws Exception {
        return ResponseHandler.responseBuilder("List appointment in detail",
                HttpStatus.OK,
                appointmentService.getAppointmentDetailWithStatus(status, offset, limit, request));
    }

    @GetMapping("/all/date")
    public ResponseEntity<Object> getAppointmentDetailWithStatusByDate(
            @RequestParam("status") String status,
            @RequestParam("start_date") String startDate,
            @RequestParam("end_date") String endDate,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit,
            HttpServletRequest request
    ) throws Exception {
        LocalDate start = DateFormatUtil.parseStringToDate(startDate);
        LocalDate end = DateFormatUtil.parseStringToDate(endDate);
        if ( start.isAfter(end)){
            return ResponseEntity.badRequest().body("Invalid date range. Start date must before end date.");
        }
        return ResponseHandler.responseBuilder(String.format("List appointment in detail from %s to %s", start, end),
                HttpStatus.OK,
                appointmentService.getAppointmentDetailWithStatusByDate(status, start, end, offset, limit, request));
    }

    @GetMapping("/all/keyword")
    public ResponseEntity<Object> getAppointmentDetailWithStatusByKeyword(
            @RequestParam("status") String status,
            @RequestParam("keyword") String keyword,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit,
            HttpServletRequest request
    ) throws Exception {
        
        return ResponseHandler.responseBuilder(String.format("List appointment in detail with keyword = %s", keyword),
                HttpStatus.OK,
                appointmentService.getAppointmentDetailWithStatusByKeyword(status, keyword, offset, limit, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAppointmentDetailWithStatusByKeyword(
            @PathVariable("id") Long appointmentId,
            HttpServletRequest request
    ) throws Exception {
        
        return ResponseHandler.responseBuilder(String.format("Detail appointment in ID = %d", appointmentId),
                HttpStatus.OK,
                appointmentService.getAppointmentDetailById(appointmentId, request));
    }
}
