package com.doccure.BE.service;

import com.doccure.BE.model.Users;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    UserResponse register(Users request);
    AuthResponse authenticate(Users request);

    ResponseEntity refreshToken(HttpServletRequest request,
                                HttpServletResponse response);
}
