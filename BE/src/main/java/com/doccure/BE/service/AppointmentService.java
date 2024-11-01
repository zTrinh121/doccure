package com.doccure.BE.service;

import com.doccure.BE.response.AppointmentDetailResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.util.List;


public interface AppointmentService {
    List<AppointmentDetailResponse> getAppointmentDetailWithStatus(String status,
                                                            int offset,
                                                            int limit,
                                                            HttpServletRequest request) throws Exception;

    List<AppointmentDetailResponse> getAppointmentDetailWithStatusByDate(String status,
                                                                  LocalDate startDate,
                                                                  LocalDate endDate,
                                                                  int offset,
                                                                  int limit,
                                                                  HttpServletRequest request) throws Exception;
    List<AppointmentDetailResponse> getAppointmentDetailWithStatusByKeyword(String status,
                                                                            String keyword,
                                                                            int offset,
                                                                            int limit,
                                                                            HttpServletRequest request) throws Exception;
    AppointmentDetailResponse getAppointmentDetailById(Long appointmentId,
                                                       HttpServletRequest request) throws Exception;
}
