package com.doccure.BE.mapper;

import com.doccure.BE.model.Appointment;
import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.model.AppointmentExample;
import com.doccure.BE.response.AppointmentDetailResponse;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface AppointmentMapper {
    long countByExample(AppointmentExample example);

    int deleteByExample(AppointmentExample example);

    int deleteByPrimaryKey(Long appointmentId);

    int insert(Appointment row);

    int insertSelective(Appointment row);

    List<Appointment> selectByExample(AppointmentExample example);

    Appointment selectByPrimaryKey(Long appointmentId);

    int updateByExampleSelective(@Param("row") Appointment row, @Param("example") AppointmentExample example);

    int updateByExample(@Param("row") Appointment row, @Param("example") AppointmentExample example);

    int updateByPrimaryKeySelective(Appointment row);

    int updateByPrimaryKey(Appointment row);

    List<AppointmentDetail> getSlotDetailWithStatus(@Param("params") Map<String, Object> params, RowBounds bounds);
    List<AppointmentDetail> getSlotDetailWithStatusByDate(@Param("params") Map<String, Object> params, RowBounds bounds);
}