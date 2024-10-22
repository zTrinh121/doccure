package com.doccure.BE.service;

import com.doccure.BE.model.Users;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateToken(Users user, long expireTime);
    String generateAccessToken(Users user);
    String generateRefreshToken(Users user);

    String extractUsername(String token);

    boolean isValidRefreshToken(String token, Users user);

    public boolean isValid(String token, UserDetails user);
}
