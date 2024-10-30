package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.DoctorRating;
import com.doccure.BE.response.AppointmentDetailResponse;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.response.DoctorRatingResponse;
import com.doccure.BE.response.DoctorSlotResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.util.List;


public interface AppointmentService {
    List<AppointmentDetailResponse> getSlotDetailWithStatus(String status,
                                                            int offset,
                                                            int limit,
                                                            HttpServletRequest request) throws Exception;
}
