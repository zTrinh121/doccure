package com.doccure.BE.service;

import com.doccure.BE.exception.UsernameAlreadyExistsException;
import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    UserResponse register(Users request) throws Exception;
    AuthResponse authenticate(Users request);

    AuthResponse refreshToken(HttpServletRequest request,
                                HttpServletResponse response) throws Exception;

    String changePassword(ChangePasswordResquest changePasswordResquest, HttpServletRequest request) throws Exception;
}
