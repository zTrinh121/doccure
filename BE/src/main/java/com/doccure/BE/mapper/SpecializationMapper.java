package com.doccure.BE.mapper;

import com.doccure.BE.model.Specialization;
import com.doccure.BE.model.SpecializationExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SpecializationMapper {
    long countByExample(SpecializationExample example);

    int deleteByExample(SpecializationExample example);

    int deleteByPrimaryKey(Long specializationId);

    int insert(Specialization row);

    int insertSelective(Specialization row);

    List<Specialization> selectByExample(SpecializationExample example);

    Specialization selectByPrimaryKey(Long specializationId);

    int updateByExampleSelective(@Param("row") Specialization row, @Param("example") SpecializationExample example);

    int updateByExample(@Param("row") Specialization row, @Param("example") SpecializationExample example);

    int updateByPrimaryKeySelective(Specialization row);

    int updateByPrimaryKey(Specialization row);

    List<Specialization> getAllSpecializations();
}