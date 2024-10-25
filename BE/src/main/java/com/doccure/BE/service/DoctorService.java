package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.response.DoctorFullResponse;

import java.util.List;

public interface DoctorService {
    List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException;

    DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException;
}
