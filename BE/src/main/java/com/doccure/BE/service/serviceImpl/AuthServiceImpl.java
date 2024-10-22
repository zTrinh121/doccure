package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.Token;
import com.doccure.BE.model.TokenExample;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.AuthService;
import com.doccure.BE.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UsersMapper usersMapper;
    private final TokenMapper tokenMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private TokenExample tokenExample;
    @Override
    public UserResponse register(Users request) {
        //Check if username has been existed
        if(usersMapper.findUserByUserName(request.getUsername()) != null) {
            throw new RuntimeException("Username is existed");
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        usersMapper.insert(request);

        return UserResponse.fromUsers(request);
    }

    private void saveUserToken(String accessToken, String refreshToken, Users user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setIsLoggedOut((short)0);
        token.setUserId(user.getUserId());
        tokenMapper.insert(token);
    }

    @Override
    public AuthResponse authenticate(Users request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Users user = usersMapper.findUserByUserName(request.getUsername());
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        return new AuthResponse(accessToken, refreshToken, "User login was successful");
    }

    @Override
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);

        String username = jwtService.extractUsername(token);

        // check if the user exist in database
        Users user = usersMapper.findUserByUserName(username);
        if(user == null) throw new RuntimeException("No user found");

        // check if the token is valid
        if(jwtService.isValidRefreshToken(token, user)) {
            // generate access token
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllTokenByUser(user);
            saveUserToken(accessToken, refreshToken, user);

            return new ResponseEntity(new AuthResponse(accessToken, refreshToken, "New token generated"), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    private void revokeAllTokenByUser(Users user) {
        tokenMapper.selectByExample(tokenExample);
        List<Token> validTokens = tokenMapper.findAllAccessTokensByUser(user.getUserId());
        if(validTokens.isEmpty()) {
            return;
        }

        for(Token t : validTokens){
            t.setIsLoggedOut((short) 1);
            tokenMapper.updateByPrimaryKey(t);
        }
    }
}
