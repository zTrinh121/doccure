package com.doccure.BE.mapper;

import com.doccure.BE.model.Rating;
import com.doccure.BE.model.RatingExample;
import com.doccure.BE.model.RatingSpecialization;

import java.time.LocalDate;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RatingMapper {
    long countByExample(RatingExample example);

    int deleteByExample(RatingExample example);

    int deleteByPrimaryKey(Long ratingId);

    int insert(Rating row);

    int insertSelective(Rating row);

    List<Rating> selectByExample(RatingExample example);

    Rating selectByPrimaryKey(Long ratingId);
    Rating selectByAppointmentId(Long appointmentId);

    Rating selectByDoctorId(Long doctorId);

    int updateByExampleSelective(@Param("row") Rating row, @Param("example") RatingExample example);

    int updateByExample(@Param("row") Rating row, @Param("example") RatingExample example);

    int updateByPrimaryKeySelective(Rating row);

    int updateByPrimaryKey(Rating row);

    List<RatingSpecialization> getAllDoctorRatings();

    List<RatingSpecialization> getDoctorRatingsByDoctorId(Long doctorId);

    List<RatingSpecialization> getDoctorRatingsByStartEndDate(@Param("doctorId") Long doctorId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}