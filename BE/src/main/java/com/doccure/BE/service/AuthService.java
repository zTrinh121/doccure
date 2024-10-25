package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.exception.PasswordChangeNotAllowedException;
import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.request.ForgotPasswordRequest;
import com.doccure.BE.request.MailBodyRequest;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    UserResponse register(Users request) throws Exception;
    AuthResponse authenticate(Users request, HttpServletResponse response) throws DataNotFoundException;
    AuthResponse refreshToken(HttpServletRequest request,
                                HttpServletResponse response) throws Exception;
    String changePassword(ChangePasswordResquest changePasswordResquest, HttpServletRequest request) throws Exception;

    void sendSimpleMessage(MailBodyRequest mailBody);

    String verifyEmail(String email) throws Exception;

    String verifyOtp(Long otp, String email) throws Exception;

    String forgotPassword(ForgotPasswordRequest forgotPasswordRequest, String email) throws PasswordChangeNotAllowedException;
}
