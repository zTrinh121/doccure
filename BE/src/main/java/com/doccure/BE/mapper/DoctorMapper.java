package com.doccure.BE.mapper;

import com.doccure.BE.model.Doctor;
import com.doccure.BE.model.DoctorExample;
import com.doccure.BE.model.DoctorFull;
import com.doccure.BE.model.DoctorRating;
import com.doccure.BE.model.DoctorSlot;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface DoctorMapper {
    long countByExample(DoctorExample example);

    int deleteByExample(DoctorExample example);

    int deleteByPrimaryKey(Long doctorId);

    int insert(Doctor row);

    int insertSelective(Doctor row);

    List<Doctor> selectByExample(DoctorExample example);

    Doctor selectByPrimaryKey(Long doctorId);

    int updateByExampleSelective(@Param("row") Doctor row, @Param("example") DoctorExample example);

    int updateByExample(@Param("row") Doctor row, @Param("example") DoctorExample example);

    int updateByPrimaryKeySelective(Doctor row);

    int updateByPrimaryKey(Doctor row);

    List<DoctorFull> getAllDoctorFulls();

    DoctorFull getDoctorFullById(Long doctorId);

    List<DoctorFull> getDoctorFullByKeyword(String keyword);
    
    List<DoctorFull> getDoctorFullBySpecialization(String specialization);

    List<DoctorFull> getDoctorFullBySpecializationId(Long specializationId);

    List<DoctorRating> getAllDoctorRatings();
   
    List<DoctorRating> getAllDoctorRatings(RowBounds rowBounds);

    List<DoctorRating> getDoctorRatingsByStartEndDate(@Param("doctorId") Long doctorId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    DoctorRating getDoctorRatingsById(Long doctorId);

    List<DoctorSlot> getAllDoctorSlots();

    DoctorSlot getDoctorSlotsById(Long doctorId);


    

}