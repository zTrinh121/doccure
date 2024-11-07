package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.enums.StatusAppointmentType;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.AppointmentMapper;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.model.AppointmentDetail;
import com.doccure.BE.model.Token;
import com.doccure.BE.response.AppointmentDetailResponse;
import com.doccure.BE.service.AppointmentService;
import com.doccure.BE.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl  implements AppointmentService {
    private final AppointmentMapper appointmentMapper;
    private final TokenMapper tokenMapper;

    @Override
    public List<AppointmentDetailResponse> getAppointmentDetailWithStatus(String status, int offset, int limit,
                                                                          HttpServletRequest request,
                                                                          HttpServletResponse response) throws Exception {
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        List<AppointmentDetail> appointmentDetails;
        List<AppointmentDetail> appointmentDetailsAll;

        if (status == null) {
            appointmentDetails = appointmentMapper.getAllAppointmentDetail(accessTokenUser.getUserId(), new RowBounds(offset, limit));
            appointmentDetailsAll = appointmentMapper.getAllAppointmentDetail(accessTokenUser.getUserId());
        } else {
            StatusAppointmentType statusAppointmentType = getStatusAppointmentFromString(status);
            if (statusAppointmentType.name().equals("Upcoming")) {
                appointmentDetails = appointmentMapper.getUpcomingAppointmentDetails(accessTokenUser.getUserId(), new RowBounds(offset, limit));
                appointmentDetailsAll = appointmentMapper.getUpcomingAppointmentDetails(accessTokenUser.getUserId());
            } else {
                Map<String, Object> params = new HashMap<>();
                params.put("userId", accessTokenUser.getUserId());
                params.put("status", statusAppointmentType.name());
                appointmentDetails = appointmentMapper.getAppointmentDetailWithStatus(params, new RowBounds(offset, limit));
                appointmentDetailsAll = appointmentMapper.getAppointmentDetailWithStatus(params);
            }
        }

        if (appointmentDetails.isEmpty()) throw new DataNotFoundException("No appointment detail found for user ID = " + accessTokenUser.getUserId());
        response.setHeader("X-Total-Count", String.valueOf(appointmentDetailsAll.size()));

        return appointmentDetails
                .stream()
                .map(AppointmentDetailResponse::fromAppointmentDetail)
                .toList();
    }

    @Override
    public List<AppointmentDetailResponse> getAppointmentDetailWithStatusByDate(String status,
                                                                                LocalDate startDate,
                                                                                LocalDate endDate,
                                                                                int offset, int limit,
                                                                                HttpServletRequest request,
                                                                                HttpServletResponse response) throws Exception {
        StatusAppointmentType statusAppointmentType = getStatusAppointmentFromString(status);
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        List<AppointmentDetail> appointmentDetails;
        List<AppointmentDetail> appointmentDetailsAll;
        if(statusAppointmentType.name().equals("Upcoming")){
            appointmentDetails = appointmentMapper.getUpcomingAppointmentDetailWithStatusByDate(accessTokenUser.getUserId(), new RowBounds(offset, limit));
            appointmentDetailsAll = appointmentMapper.getUpcomingAppointmentDetailWithStatusByDate(accessTokenUser.getUserId());
        }else{
            Map<String, Object> params = new HashMap<>();
            params.put("userId", accessTokenUser.getUserId());
            params.put("status", statusAppointmentType.name());
            params.put("startDate", startDate);
            params.put("endDate", endDate);
            appointmentDetails = appointmentMapper.getAppointmentDetailWithStatusByDate(params, new RowBounds(offset, limit));
            appointmentDetailsAll = appointmentMapper.getAppointmentDetailWithStatusByDate(params);
        }

        if(appointmentDetails.isEmpty()) throw new DataNotFoundException(
                String.format("No appointment found for user ID = %d in range from %s to %s",
                accessTokenUser.getUserId(),
                startDate,
                endDate)
        );
        response.setHeader("X-Total-Count", String.valueOf(appointmentDetailsAll.size()));
        return appointmentDetails
                .stream()
                .map(AppointmentDetailResponse::fromAppointmentDetail)
                .toList();

    }

    @Override
    public List<AppointmentDetailResponse> getAppointmentDetailWithStatusByKeyword(String status, String keyword, int offset, int limit,
                                                                                   HttpServletRequest request,
                                                                                   HttpServletResponse response) throws Exception {
        StatusAppointmentType statusAppointmentType = getStatusAppointmentFromString(status);
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        List<AppointmentDetail> appointmentDetails;
        List<AppointmentDetail> appointmentDetailsAll;
        Map<String, Object> params = new HashMap<>();
        params.put("userId", accessTokenUser.getUserId());
        params.put("status", statusAppointmentType.name());
        params.put("keyword", keyword);
        if(statusAppointmentType.name().equals("Upcoming")){
            appointmentDetails = appointmentMapper.getUpcomingAppointmentDetailWithStatusByKeyword(params, new RowBounds(offset, limit));
            appointmentDetailsAll = appointmentMapper.getUpcomingAppointmentDetailWithStatusByKeyword(params);
        }else{
            appointmentDetails = appointmentMapper.getAppointmentDetailWithStatusByKeyword(params, new RowBounds(offset, limit));
            appointmentDetailsAll = appointmentMapper.getAppointmentDetailWithStatusByKeyword(params);
        }

        if(appointmentDetails.isEmpty()) throw new DataNotFoundException(
                String.format("No appointment found for user ID = %d with keyword = %s",
                        accessTokenUser.getUserId(),
                        keyword)
        );
        response.setHeader("X-Total-Count", String.valueOf(appointmentDetailsAll.size()));
        return appointmentDetails
                .stream()
                .map(AppointmentDetailResponse::fromAppointmentDetail)
                .toList();
    }

    @Override
    public AppointmentDetailResponse getAppointmentDetailById(Long appointmentId, HttpServletRequest request) throws Exception {
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);

        Map<String, Object> params = new HashMap<>();
        params.put("userId", accessTokenUser.getUserId());
        params.put("appointmentId", appointmentId);
        AppointmentDetail appointmentDetail = appointmentMapper.getAppointmentDetailById(params);
        if(appointmentDetail == null) throw new DataNotFoundException("No appointment detail found with ID = " + appointmentId);
        return AppointmentDetailResponse.fromAppointmentDetail(appointmentDetail);
    }

    public StatusAppointmentType getStatusAppointmentFromString(String status) throws Exception {
        try {
            return StatusAppointmentType.fromString(status);
        } catch (IllegalArgumentException e) {
            throw new DataNotFoundException("Invalid status parameter.Type value (booked, canceled, pending_payment, upcoming).");
        }

    }
}
