package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.Specialization;
import com.doccure.BE.response.DoctorFullResponse;

import java.util.List;

public interface SpecializationService {
    List<Specialization> getAllSpecialization() throws DataNotFoundException;
}
