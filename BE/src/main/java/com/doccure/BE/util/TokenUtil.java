package com.doccure.BE.util;

import com.doccure.BE.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.experimental.UtilityClass;
import org.springframework.http.HttpHeaders;
@UtilityClass
public class TokenUtil {
    public static String checkToken(HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Unauthorized (Token is not existed or valid)");
        }

        return authHeader.substring(7);
    }
}
