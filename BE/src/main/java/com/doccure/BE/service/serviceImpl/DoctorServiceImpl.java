package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.DoctorMapper;
import com.doccure.BE.model.DoctorFull;
import com.doccure.BE.model.DoctorRating;
import com.doccure.BE.model.DoctorSlot;
import com.doccure.BE.model.RatingSpecialization;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.response.DoctorRatingResponse;
import com.doccure.BE.response.DoctorSlotResponse;
import com.doccure.BE.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorMapper doctorMapper;
    private final float MAX_RATING = 5;

    @Override
    public List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException {
        List<DoctorFull> doctorFullResponseList = doctorMapper.getAllDoctorFulls();
        if (doctorFullResponseList.isEmpty())
            throw new DataNotFoundException("No doctor found in list");
        return doctorFullResponseList.stream()
                .map(DoctorFullResponse::fromDoctorFull)
                .toList();
    }

    @Override
    public DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException {
        DoctorFull doctor = doctorMapper.getDoctorFullById(doctorId);
        if (doctor == null)
            throw new DataNotFoundException("No doctor found with id = " + doctorId);
        return DoctorFullResponse.fromDoctorFull(doctor);
    }

    @Override
    public List<DoctorRatingResponse> getAllDoctorRatings() throws DataNotFoundException {
        List<DoctorRating> doctorRatingList = doctorMapper.getAllDoctorRatings();
        if (doctorRatingList.isEmpty())
            throw new DataNotFoundException("No ratings for any doctors found in list");
        List<DoctorRatingResponse> doctorRatingResponses = doctorRatingList.stream()
                .map(DoctorRatingResponse::fromDoctorRating)
                .toList();
        for (DoctorRatingResponse drp : doctorRatingResponses) {
            drp.setCountRatings(drp.getRatings().size());
            drp.setAvgRating((float) drp.getRatings().stream()
                    .mapToDouble(RatingSpecialization::getRating)
                    .average()
                    .orElse(0.0));
            drp.setPercentRating((drp.getAvgRating() / MAX_RATING) * 100);
        }
        return doctorRatingResponses;
    }

    @Override
    public DoctorRatingResponse getDoctorRatingByDoctorId(Long doctorId) throws DataNotFoundException {
        DoctorRating doctor = doctorMapper.getDoctorRatingsById(doctorId);
        if (doctor == null)
            throw new DataNotFoundException("No rating found for doctor with id = " + doctorId);
        DoctorRatingResponse doctorResponse = DoctorRatingResponse.fromDoctorRating(doctor);
        doctorResponse.setCountRatings(doctor.getRatings().size());
        doctorResponse.setAvgRating((float) doctor.getRatings().stream()
                .mapToDouble(RatingSpecialization::getRating)
                .average()
                .orElse(0.0));
        doctorResponse.setPercentRating((doctorResponse.getAvgRating() / MAX_RATING) * 100);

        return doctorResponse;
    }

    @Override
    public List<DoctorSlotResponse> getAllDoctorSlots() throws DataNotFoundException {
        List<DoctorSlot> doctorSlotList = doctorMapper.getAllDoctorSlots();
        if (doctorSlotList.isEmpty())
            throw new DataNotFoundException("No slots for any doctors found in list");
        return doctorSlotList.stream()
                .map(DoctorSlotResponse::fromDoctorSlot)
                .toList();
    }

    @Override
    public DoctorSlotResponse getDoctorSlotByDoctorId(Long doctorId) throws DataNotFoundException {
        DoctorSlot doctor = doctorMapper.getDoctorSlotsById(doctorId);
        if (doctor == null)
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);
        return DoctorSlotResponse.fromDoctorSlot(doctor);
    }
}
