package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.response.DoctorRatingResponse;
import com.doccure.BE.response.DoctorSlotResponse;

import java.util.List;

public interface DoctorService {
    //Doctor with specializations
    List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException;
    DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException;

    //Doctor with rating 
    List<DoctorRatingResponse> getAllDoctorRatings() throws DataNotFoundException;
    DoctorRatingResponse getDoctorRatingByDoctorId(Long doctorId) throws DataNotFoundException;

    //Doctor with slots
    List<DoctorSlotResponse> getAllDoctorSlots() throws DataNotFoundException;
    DoctorSlotResponse getDoctorSlotByDoctorId(Long doctorId) throws DataNotFoundException;

}
