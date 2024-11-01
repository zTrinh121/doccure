package com.doccure.BE.mapper;

import com.doccure.BE.model.DoctorSpecialization;
import com.doccure.BE.model.DoctorSpecializationExample;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface DoctorSpecializationMapper {
    long countByExample(DoctorSpecializationExample example);

    int deleteByExample(DoctorSpecializationExample example);

    int deleteByPrimaryKey(Long doctorSpecializationId);

    int insert(DoctorSpecialization row);

    int insertSelective(DoctorSpecialization row);

    List<DoctorSpecialization> selectByExample(DoctorSpecializationExample example);

    DoctorSpecialization selectByDoctorAndSpecId(@Param("doctorId") Long doctorId,
     @Param("specializationId") Long specializationId);

    DoctorSpecialization selectByPrimaryKey(Long doctorSpecializationId);

    int updateByExampleSelective(@Param("row") DoctorSpecialization row, @Param("example") DoctorSpecializationExample example);

    int updateByExample(@Param("row") DoctorSpecialization row, @Param("example") DoctorSpecializationExample example);

    int updateByPrimaryKeySelective(DoctorSpecialization row);

    int updateByPrimaryKey(DoctorSpecialization row);
}