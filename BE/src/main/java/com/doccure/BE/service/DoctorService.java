package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.response.DoctorRatingResponse;
import com.doccure.BE.response.DoctorSlotResponse;

import java.time.LocalDate;
import java.util.List;

public interface DoctorService {
    //Doctor with specializations
    List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException;
    DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException;
    List<DoctorFullResponse> getDoctorFullByKeyword(String keyword) throws Exception;

    //Doctor with rating 
    List<DoctorRatingResponse> getAllDoctorRatings() throws DataNotFoundException;
    List<DoctorRatingResponse> getAllDoctorRatingsPagination(int offset, int limit) throws DataNotFoundException;
    DoctorRatingResponse getDoctorRatingByDoctorId(Long doctorId) throws DataNotFoundException;
    List<DoctorRatingResponse> filterDoctorRating(String ratingType, String orderType) throws Exception;

    //Doctor with slots
    List<DoctorSlotResponse> getAllDoctorSlots() throws DataNotFoundException;
    DoctorSlotResponse getDoctorSlotByDoctorId(Long doctorId) throws DataNotFoundException;
    DoctorSlotResponse getAvailabilitySlot(Long doctorId) throws DataNotFoundException;
    DoctorSlotResponse getSlotFromStartEndDate(Long doctorId, LocalDate startDate, LocalDate endDate) throws DataNotFoundException;

}
