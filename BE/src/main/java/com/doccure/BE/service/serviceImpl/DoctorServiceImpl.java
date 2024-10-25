package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.DoctorMapper;
import com.doccure.BE.model.DoctorFull;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorMapper doctorMapper;


    @Override
    public List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException {
        List<DoctorFull> doctorFullResponseList = doctorMapper.getAllDoctorFulls();
        if(doctorFullResponseList.isEmpty()) throw new DataNotFoundException("No doctor found in list");
        return doctorFullResponseList.stream()
        .map(DoctorFullResponse::fromDoctorFull)
        .toList();
    }

    @Override
    public DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException {
        DoctorFull doctor = doctorMapper.getDoctorFullById(doctorId);
        if(doctor == null) throw new DataNotFoundException("No doctor found with id = " + doctorId);
        return DoctorFullResponse.fromDoctorFull(doctor);
    }
}
