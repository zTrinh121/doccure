package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.model.Token;
import com.doccure.BE.model.Users;
import com.doccure.BE.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpire;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpire;

    private final TokenMapper tokenMapper;

    @Override
    public String generateAccessToken(Users user) {
        return generateToken(user, accessTokenExpire);
    }

    @Override
    public String generateRefreshToken(Users user) {
        return generateToken(user, refreshTokenExpire);
    }

    @Override
    public String generateToken(Users user, long expireTime) {
        long expireTimeInMillis = expireTime * 1000L;
        return Jwts
                .builder()
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTimeInMillis))
                .signWith(getSigninKey())
                .compact();
    }

    @Override
    public boolean isValidRefreshToken(String token, Users user) {
        String username = extractUsername(token);
        Token refreshToken = tokenMapper.findByRefreshToken(token);
        boolean validRefreshToken = refreshToken.getIsLoggedOut() == 0;

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validRefreshToken;
    }

    @Override
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);
        Token accessToken = tokenMapper.findByAccessToken(token);
        boolean validToken = accessToken.getIsLoggedOut() == 0;

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validToken;
    }

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }



}
