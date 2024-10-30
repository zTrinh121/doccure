package com.doccure.BE.service;

import com.doccure.BE.response.AppointmentDetailResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.util.List;


public interface AppointmentService {
    List<AppointmentDetailResponse> getSlotDetailWithStatus(String status,
                                                            int offset,
                                                            int limit,
                                                            HttpServletRequest request) throws Exception;

    List<AppointmentDetailResponse> getSlotDetailWithStatusByDate(String status,
                                                                  LocalDate startDate,
                                                                  LocalDate endDate,
                                                                  int offset,
                                                                  int limit,
                                                                  HttpServletRequest request) throws Exception;
}
