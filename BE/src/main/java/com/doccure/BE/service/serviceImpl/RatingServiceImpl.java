package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.AppointmentMapper;
import com.doccure.BE.mapper.RatingMapper;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.model.Appointment;
import com.doccure.BE.model.Rating;
import com.doccure.BE.request.RatingRequest;
import com.doccure.BE.response.RatingResponse;
import com.doccure.BE.service.RatingService;
import com.doccure.BE.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final TokenMapper tokenMapper;
    private final RatingMapper ratingMapper;
    private final AppointmentMapper appointmentMapper;
    @Override
    public RatingResponse insert(RatingRequest ratingRequest, HttpServletRequest request) throws Exception {
        Appointment appointment = appointmentMapper.selectByPrimaryKey(ratingRequest.getAppointmentId());
        //Check appointment null or not
        if(appointment == null) throw new DataNotFoundException("Not found appointment with ID = " +ratingRequest.getAppointmentId());

        //Check appointment has been rated or not
        if(ratingMapper.selectByAppointmentId(ratingRequest.getAppointmentId()) != null){
            throw new DataIntegrityViolationException("This appointment has been commented");
        }

        //Check appointment belong to user or not
        String token = TokenUtil.checkToken(request);
        if(!appointment.getUserId().equals(tokenMapper.findByAccessToken(token).getUserId())){
            throw new DataIntegrityViolationException("You are not allowed to comment on this doctor, because your appointment doesn't match");
        }

        //Check appointment status is booked or not
        if(!appointment.getStatus().equals("BOOKED")){
            throw new DataIntegrityViolationException("You need to book that appointment to rate this");
        }
        Rating rating = Rating.fromRatingRequest(ratingRequest);
        rating.setCreatedAt(LocalDateTime.now());
        ratingMapper.insert(rating);
        return RatingResponse.fromRating(rating);
    }


}
