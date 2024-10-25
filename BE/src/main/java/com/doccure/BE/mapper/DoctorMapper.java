package com.doccure.BE.mapper;

import com.doccure.BE.model.Doctor;
import com.doccure.BE.model.DoctorExample;
import com.doccure.BE.model.DoctorFull;

import java.util.List;

import org.apache.ibatis.annotations.Param;

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

}