package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.SpecializationMapper;
import com.doccure.BE.model.Specialization;
import com.doccure.BE.service.SpecializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializationServiceImpl implements SpecializationService {

    private final SpecializationMapper specializationMapper;
    @Override
    public List<Specialization> getAllSpecialization() throws DataNotFoundException {
        List<Specialization> specializations = specializationMapper.getAllSpecializations();
        if(specializations.size() == 0) throw new DataNotFoundException("No specializations found");
        return specializations;
    }
}
