package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.exception.PasswordChangeNotAllowedException;
import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.request.ForgotPasswordRequest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.AuthService;

import io.jsonwebtoken.lang.Objects;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${apiPrefix}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody Users request) throws Exception {
        return ResponseHandler.responseBuilder("Register successfully",
                HttpStatus.OK,
                authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @RequestBody Users request, HttpServletResponse response) throws DataNotFoundException {
        return ResponseHandler.responseBuilder("Login successfully",
                HttpStatus.OK,
                authService.authenticate(request, response));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<Object> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return ResponseHandler.responseBuilder("New token generated",
                HttpStatus.OK,
                authService.refreshToken(request, response));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordResquest changePassword,
                                                 BindingResult result,
                                                 HttpServletRequest request) throws Exception {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }
        return ResponseHandler.responseBuilder("Changed password successfully",
                HttpStatus.OK,
                authService.changePassword(changePassword, request));
    }

    @PostMapping("/verify-mail/{email}")
    public ResponseEntity<Object> verifyEmail(@PathVariable String email) throws Exception {
        return ResponseHandler.responseBuilder("Sent OTP to email successfully",
                HttpStatus.OK,
                authService.verifyEmail(email));

    }

    @PostMapping("/verify-otp/{otp}/{email}")
    public ResponseEntity<Object> verifyOtp(@PathVariable Long otp, 
    @PathVariable String email) throws Exception{
        return ResponseHandler.responseBuilder("Verified OTP successfully",
                HttpStatus.OK,
                authService.verifyOtp(otp, email));
    }

    @PostMapping("/forgot-password/{email}")
    public ResponseEntity<Object> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest,
    @PathVariable String email) throws PasswordChangeNotAllowedException {
        
        return ResponseHandler.responseBuilder("Please login again",
                HttpStatus.OK,
                authService.forgotPassword(forgotPasswordRequest, email));

    }


    
}
