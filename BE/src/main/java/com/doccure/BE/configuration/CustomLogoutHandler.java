package com.doccure.BE.configuration;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.model.Token;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    private final TokenMapper tokenMapper;

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            try {
                throw new DataNotFoundException("Access token is required");
            } catch (DataNotFoundException e) {
                throw new RuntimeException(e);
            }
        }

        String token = authHeader.substring(7);
        Token storedToken = tokenMapper.findByAccessToken(token);

        if(storedToken != null) {
            storedToken.setIsLoggedOut((short) 1);
            tokenMapper.insert(storedToken);
        }
    }
}
