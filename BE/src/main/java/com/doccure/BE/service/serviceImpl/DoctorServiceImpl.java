package com.doccure.BE.service.serviceImpl;

import com.cloudinary.Cloudinary;
import com.doccure.BE.enums.OrderType;
import com.doccure.BE.enums.RatingType;
import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.DoctorMapper;
import com.doccure.BE.mapper.DoctorSpecializationMapper;
import com.doccure.BE.mapper.SlotMapper;
import com.doccure.BE.mapper.SpecializationMapper;
import com.doccure.BE.model.*;
import com.doccure.BE.request.DoctorInsertRequest;
import com.doccure.BE.request.DoctorSpecializationRequest;
import com.doccure.BE.response.*;
import com.doccure.BE.service.DoctorService;
import com.doccure.BE.util.CloudinaryUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
    private final DoctorMapper doctorMapper;
    private final SlotMapper slotMapper;
    private  final DoctorSpecializationMapper doctorSpecializationMapper;
    private final SpecializationMapper specializationMapper;
    private final Cloudinary cloudinary;
    private final float MAX_RATING = 5;

    @Override
    public DoctorInsertResponse insert(DoctorInsertRequest doctorInsertRequest) {
        Doctor doctor = Doctor.fromDoctorInsertRequest(doctorInsertRequest);
        doctorMapper.insert(doctor);

        DoctorSpecializationRequest doctorSpecializationRequest = new DoctorSpecializationRequest(
                doctor.getDoctorId(),
                doctorInsertRequest.getSpecializationId());
        doctorSpecializationMapper.insert(DoctorSpecialization.fromDoctorSpecialization(doctorSpecializationRequest));
        Specialization specialization = specializationMapper.selectByPrimaryKey(doctorInsertRequest.getSpecializationId());

        return DoctorInsertResponse.fromDoctorInsertRequest(doctor, specialization);
    }

    public DoctorInsertResponse update(DoctorInsertRequest doctorInsertRequest, Long doctorId, Long oldSpecialization) throws Exception{
        Doctor doctor = doctorMapper.selectByPrimaryKey(doctorId);
        if(doctor == null) throw new DataNotFoundException("No doctor found with doctor ID = " + doctorId);

        doctor.setFirstName(doctorInsertRequest.getFirstName());
        doctor.setLastName(doctorInsertRequest.getLastName());
        doctor.setHospital(doctorInsertRequest.getHospital());
        doctor.setExperience(doctorInsertRequest.getExperience());
        doctor.setAvatar(doctorInsertRequest.getAvatar());
        doctorMapper.updateByPrimaryKey(doctor);
        DoctorSpecialization doctorSpecialization = doctorSpecializationMapper.selectByDoctorAndSpecId(
                doctor.getDoctorId(),
                oldSpecialization
        );
        if(doctorSpecialization == null) throw new DataNotFoundException("Not found doctor match with specialization");

        Specialization specialization = specializationMapper.selectByPrimaryKey(doctorInsertRequest.getSpecializationId());

        doctorSpecialization.setSpecializationId(specialization.getSpecializationId());
        doctorSpecializationMapper.updateByPrimaryKey(doctorSpecialization);
        return DoctorInsertResponse.fromDoctorInsertRequest(doctor, specialization);
    }

    @Override
    public List<DoctorFullResponse> getAllDoctor(HttpServletResponse response) throws DataNotFoundException {
            List<DoctorFull> doctorFullResponseList = doctorMapper.getAllDoctorFulls();
        if (doctorFullResponseList.isEmpty())
            throw new DataNotFoundException("No doctor found in list");

        doctorFullResponseList = insertMaxMinPrice(doctorFullResponseList);
        response.setHeader("X-Total-Count", String.valueOf(doctorFullResponseList.size()));
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
        doctorFulls = insertMaxMinPrice(doctorFulls);
        return doctorFulls.stream()
                .map(DoctorFullResponse::fromDoctorFull)
                .toList();
    }

    @Override
    public List<DoctorFullResponse> getDoctorFullBySpecializationId(Long specializationId) throws Exception {
        List<DoctorFull> doctorFulls = doctorMapper.getDoctorFullBySpecializationId(specializationId);
        if(doctorFulls.isEmpty()) throw new DataNotFoundException("No doctor found with " + specializationId + " specialization");
        doctorFulls = insertMaxMinPrice(doctorFulls);
        return doctorFulls.stream()
                .map(DoctorFullResponse::fromDoctorFull)
                .toList();
    }

    @Override
    public List<DoctorRatingResponse> getAllDoctorRatings() throws Exception {
        List<DoctorRating> doctorRatingList = doctorMapper.getAllDoctorRatings();
        return insertAvgSumRating(doctorRatingList);
    }

    @Override
    public List<DoctorRatingResponse> getAllDoctorRatingsPagination(int offset, int limit, HttpServletResponse response) throws Exception {
        List<DoctorRating> doctorRatingList = doctorMapper.getAllDoctorRatings(new RowBounds(offset, limit));
        response.setHeader("X-Total-Count", String.valueOf(doctorMapper.getAllDoctorRatings().size()));
        return insertAvgSumRating(doctorRatingList);
    }

    public List<DoctorRatingResponse> insertAvgSumRating(List<DoctorRating> doctorRatingList) throws Exception {
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
    public List<DoctorRating> getDoctorRatingsByStartEndDate(Long doctorId, LocalDate startDate, LocalDate endDate, int offset, int limit) throws Exception {
        List<DoctorRating> doctorRatingList = doctorMapper.getDoctorRatingsByStartEndDate(doctorId, startDate, endDate, new RowBounds(offset, limit));
        if(doctorRatingList.isEmpty()) throw new DataNotFoundException(String.format("No rating for doctor found from %s to %S", startDate, endDate));
        return doctorRatingList;
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

    public List<DoctorFull> insertMaxMinPrice(List<DoctorFull> doctorFulls){
        for(DoctorFull doctor: doctorFulls){
            SlotPrice slotPrice = slotMapper.getMaxMinPriceByDoctorId(doctor.getDoctorId());
            if(slotPrice == null) break;
            doctor.setMaxPrice(slotPrice.getMaxPrice());
            doctor.setMinPrice(slotPrice.getMinPrice());
        }
        return doctorFulls;
    }

    @Override
    public Doctor updateAvatar(Long doctorId, MultipartFile file) throws Exception {
        Doctor doctor = doctorMapper.selectByPrimaryKey(doctorId);
        if(doctor == null){
            throw new DataNotFoundException("No doctor found with id = " + doctorId);
        }
        //Handle avatar
        if(!file.isEmpty()){
            CloudinaryUtil.assertAllowed(file, CloudinaryUtil.IMAGE_PATTERN);
            final String fileName = CloudinaryUtil.getFileName(file.getOriginalFilename());
            Map<String, String> responseFileMap = uploadFile(file, fileName);
            doctor.setAvatar(responseFileMap.get("url"));
        }

//        user.setUserId(userId);
        doctorMapper.updateByPrimaryKeySelective(doctor);
        return doctor;
    }

    @Transactional
    public Map<String, String> uploadFile(final MultipartFile file, final String fileName) throws Exception {
        try {
            final Map result   = this.cloudinary.uploader()
                    .upload(file.getBytes(),
                            Map.of("public_id",
                                    "doctor/ava/"
                                            + fileName));
            final String url = (String) result.get("url");
            Map<String, String> fileMap = new HashMap<>();
            fileMap.put("url", url);
            return fileMap;

        } catch (final Exception e) {
            throw new DataIntegrityViolationException("Failed to upload file");
        }
    }
}
