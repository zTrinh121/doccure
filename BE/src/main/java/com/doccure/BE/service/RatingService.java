package com.doccure.BE.service;

import com.doccure.BE.request.RatingRequest;
import com.doccure.BE.response.RatingResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface RatingService {
    RatingResponse insert(RatingRequest ratingRequest, HttpServletRequest request) throws Exception;
}
