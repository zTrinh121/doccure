package com.doccure.BE.request;

public record ForgotPasswordRequest(String password, String repeatPassword) {
}
