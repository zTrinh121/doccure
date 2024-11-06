package com.doccure.BE.mapper;

import java.util.List;
import java.util.Map;

import com.doccure.BE.model.Slot;
import com.doccure.BE.model.SlotExample;
import com.doccure.BE.model.SlotPrice;

import org.apache.ibatis.annotations.Param;

public interface SlotMapper {
    long countByExample(SlotExample example);

    int deleteByExample(SlotExample example);

    int deleteByPrimaryKey(Long slotId);

    int insert(Slot row);

    int insertSelective(Slot row);

    List<Slot> selectByExample(SlotExample example);

    Slot selectByStartEndDateAndDoctorId(@Param("params") Map<String, Object> params);

    Slot selectByPrimaryKey(Long slotId);

    int updateByExampleSelective(@Param("row") Slot row, @Param("example") SlotExample example);

    int updateByExample(@Param("row") Slot row, @Param("example") SlotExample example);

    int updateByPrimaryKeySelective(Slot row);

    int updateByPrimaryKey(Slot row);

    SlotPrice getMaxMinPriceByDoctorId(Long doctorId);


}