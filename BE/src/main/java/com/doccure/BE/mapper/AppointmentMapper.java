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

    List<AppointmentDetail> getAppointmentDetailWithStatus(@Param("params") Map<String, Object> params, RowBounds bounds);
    List<AppointmentDetail> getUpcomingAppointmentDetails(@Param("userId") Long userId, RowBounds bounds);
    List<AppointmentDetail> getAppointmentDetailWithStatusByDate(@Param("params") Map<String, Object> params, RowBounds bounds);
    List<AppointmentDetail> getUpcomingAppointmentDetailWithStatusByDate(@Param("userId") Long userId, RowBounds bounds);
    List<AppointmentDetail> getAppointmentDetailWithStatusByKeyword(@Param("params") Map<String, Object> params, RowBounds bounds);
    List<AppointmentDetail> getUpcomingAppointmentDetailWithStatusByKeyword(@Param("params") Map<String, Object> params, RowBounds bounds);
    AppointmentDetail getAppointmentDetailById(@Param("params") Map<String, Object> params);
}