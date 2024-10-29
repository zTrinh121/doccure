package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.enums.OrderType;
import com.doccure.BE.enums.RatingType;
import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.DoctorMapper;
import com.doccure.BE.mapper.SlotMapper;
import com.doccure.BE.model.*;
import com.doccure.BE.response.DoctorFullResponse;
import com.doccure.BE.response.DoctorRatingResponse;
import com.doccure.BE.response.DoctorSlotResponse;
import com.doccure.BE.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorMapper doctorMapper;
    private final SlotMapper slotMapper;
    private final float MAX_RATING = 5;

    @Override
    public List<DoctorFullResponse> getAllDoctor() throws DataNotFoundException {
        List<DoctorFull> doctorFullResponseList = doctorMapper.getAllDoctorFulls();
        if (doctorFullResponseList.isEmpty())
            throw new DataNotFoundException("No doctor found in list");

        for(DoctorFull doctor: doctorFullResponseList){
            SlotPrice slotPrice = slotMapper.getMaxMinPriceByDoctorId(doctor.getDoctorId());
            if(slotPrice == null) break;
            doctor.setMaxPrice(slotPrice.getMaxPrice());
            doctor.setMinPrice(slotPrice.getMinPrice());
        }
        return doctorFullResponseList.stream()
                .map(DoctorFullResponse::fromDoctorFull)
                .toList();
    }

    @Override
    public DoctorFullResponse getDoctorById(Long doctorId) throws DataNotFoundException {
        DoctorFull doctor = doctorMapper.getDoctorFullById(doctorId);
        if (doctor == null) throw new DataNotFoundException("No doctor found with id = " + doctorId);
        SlotPrice slotPrice = slotMapper.getMaxMinPriceByDoctorId(doctorId);
        if(slotPrice != null){
            doctor.setMaxPrice(slotPrice.getMaxPrice());
            doctor.setMinPrice(slotPrice.getMinPrice());
        }
        return DoctorFullResponse.fromDoctorFull(doctor);
    }

    @Override
    public List<DoctorFullResponse> getDoctorFullByKeyword(String keyword) throws Exception {
        List<DoctorFull> doctorFulls = doctorMapper.getDoctorFullByKeyword(keyword);
        if(doctorFulls.isEmpty()) throw new DataNotFoundException("No doctor found with " + keyword + " keyword");
        return doctorFulls.stream()
                .map(DoctorFullResponse::fromDoctorFull)
                .toList();
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
    public List<DoctorRatingResponse> getAllDoctorRatingsPagination(int offset, int limit) throws DataNotFoundException {
        List<DoctorRating> doctorRatingList = doctorMapper.getAllDoctorRatings(new RowBounds(offset, limit));
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
    public List<DoctorRatingResponse> filterDoctorRating(String type, String order) throws Exception {
        RatingType ratingTypeEnum;
        OrderType ratingOrderEnum;

        try {
            ratingTypeEnum = RatingType.fromString(type);
            ratingOrderEnum = OrderType.fromString(order);
        } catch (IllegalArgumentException e) {
            throw new DataNotFoundException("Invalid type or order parameter.Type value (avgRating, countRating). Order value (lowToHigh and highToLow)");
        }
        List<DoctorRatingResponse> doctorRatingResponseList = new ArrayList<>(getAllDoctorRatings());
        Comparator<DoctorRatingResponse> comparator;
        if (ratingTypeEnum == RatingType.AVG_RATING) {
            comparator = Comparator.comparing(DoctorRatingResponse::getAvgRating);
        } else if (ratingTypeEnum == RatingType.COUNT_RATING) {
            comparator = Comparator.comparing(DoctorRatingResponse::getCountRatings);
        } else {
            throw new DataIntegrityViolationException("Unexpected value: " + ratingTypeEnum);
        }

        if (ratingOrderEnum == OrderType.HIGH_TO_LOW) {
            comparator = comparator.reversed();
        }

        doctorRatingResponseList.sort(comparator);

        return doctorRatingResponseList;
    }



    @Override
    public List<DoctorSlotResponse> getAllDoctorSlots() throws DataNotFoundException {
        List<DoctorSlot> doctorSlotList = doctorMapper.getAllDoctorSlots();
        if (doctorSlotList.isEmpty())
            throw new DataNotFoundException("No slots for any doctors found in list");
        List<DoctorSlotResponse> doctorSlotResponses = doctorSlotList
                                                        .stream()
                                                        .map(DoctorSlotResponse::fromDoctorSlot)
                                                        .toList();   
        for(DoctorSlotResponse doctor : doctorSlotResponses){
            int bookedAppointments = (int) doctor.getSlots()
                                             .stream()
                                             .filter(slot -> "BOOKED".equals(slot.getStatus()))
                                             .count();
            doctor.setBookedAppoinments(bookedAppointments);
        }
        return doctorSlotResponses;
    }

    @Override
    public DoctorSlotResponse getDoctorSlotByDoctorId(Long doctorId) throws DataNotFoundException {
        DoctorSlot doctor = doctorMapper.getDoctorSlotsById(doctorId);
        if (doctor == null)
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);
        DoctorSlotResponse doctorSlotResponse = DoctorSlotResponse.fromDoctorSlot(doctor);
        doctorSlotResponse.setBookedAppoinments((int) doctor.getSlots()
                                        .stream()
                                        .filter(slot -> "BOOKED".equals(slot.getStatus()))
                                        .count());
        return doctorSlotResponse;
    }

    @Override
    public DoctorSlotResponse getAvailabilitySlot(Long doctorId) throws DataNotFoundException {
        DoctorSlot doctor = doctorMapper.getDoctorSlotsById(doctorId);
        if (doctor == null)
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);
        DoctorSlotResponse doctorSlotResponse = DoctorSlotResponse.fromDoctorSlot(doctor);
        doctorSlotResponse.setSlots(doctorSlotResponse.getSlots().stream().filter(slot -> slot.getStatus() == null).collect(Collectors.toList()));

        return doctorSlotResponse;
    }

    @Override
    public DoctorSlotResponse getSlotFromStartEndDate(Long doctorId, LocalDate startDate, LocalDate endDate) throws DataNotFoundException {
        DoctorSlot doctor = doctorMapper.getDoctorSlotsById(doctorId);
        if (doctor == null) {
            throw new DataNotFoundException("No slot found for doctor with id = " + doctorId);
        }

        List<SlotAppointment> filteredSlots = doctor.getSlots()
                .stream()
                .filter(slot -> {
                    LocalDate slotDate = slot.getDateSlot();
                    return (slotDate.isEqual(startDate) || slotDate.isAfter(startDate)) &&
                            (slotDate.isEqual(endDate) || slotDate.isBefore(endDate));
                })
                .collect(Collectors.toList());

        if (filteredSlots.isEmpty()) {
            throw new DataNotFoundException("No slots found for doctor with id = " + doctorId + " in the specified date range");
        }

        DoctorSlotResponse doctorSlotResponse = DoctorSlotResponse.fromDoctorSlot(doctor);
        doctorSlotResponse.setSlots(filteredSlots);

        return doctorSlotResponse;
    }

}
