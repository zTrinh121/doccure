package com.doccure.BE.controller;

import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.AuthService;
import com.doccure.BE.service.serviceImpl.AuthServiceImpl;

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
    private final AuthServiceImpl authServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody Users request) throws Exception {
        return ResponseHandler.responseBuilder("Register successfully",
                HttpStatus.OK,
                authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(
            @RequestBody Users request) {
        return ResponseHandler.responseBuilder("Login successfully",
                HttpStatus.OK,
                authService.authenticate(request));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<Object> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        return ResponseHandler.responseBuilder("New token generated",
                HttpStatus.OK,
                authService.refreshToken(request, response));
    }

    @GetMapping("/access")
    public String testAuth() {
        return "Hello, access successfully";
    }

    @GetMapping("/{username}")
    public Users testUsserID(@PathVariable("username") String username) {
        return authServiceImpl.getUserByName(username);

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

}
