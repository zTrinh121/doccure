package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.*;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.Token;
import com.doccure.BE.model.TokenExample;
import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.AuthService;
import com.doccure.BE.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UsersMapper usersMapper;
    private final TokenMapper tokenMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private  TokenExample tokenExample;

    @Override
    public UserResponse register(Users request) throws Exception {
        // Check if username has been existed
        if (usersMapper.findUserByUserName(request.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Username is existed");
        }

        // Check if email has been existed
        if (usersMapper.findUserByEmail(request.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Email is existed");
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        usersMapper.insert(request);

        return UserResponse.fromUsers(request);
    }

    private void saveUserToken(String accessToken, String refreshToken, Users user) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setIsLoggedOut((short) 0);
        token.setUserId(user.getUserId());
        tokenMapper.insert(token);
    }

    @Override
    public AuthResponse authenticate(Users request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        Users user = usersMapper.findUserByUserName(request.getUsername());
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        return new AuthResponse(accessToken, refreshToken, "User login was successful");
    }

    @Override
    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String token = checkToken(request);
        String username = jwtService.extractUsername(token);

        // check if the user exist in database
        Users user = usersMapper.findUserByUserName(username);
        if (user == null)
            throw new DataNotFoundException("No user found");

        // check if the token is valid
        if (jwtService.isValidRefreshToken(token, user)) {
            // generate access token
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllTokenByUser(user);
            saveUserToken(accessToken, refreshToken, user);

            return new AuthResponse(accessToken, refreshToken, "New token generated");
        }

        throw new UnauthorizedException("Unauthorized");
    }

    @Override
    public String changePassword(ChangePasswordResquest changePasswordResquest, HttpServletRequest request) throws Exception {
        String token = checkToken(request);
        // check if the user exist in database
        Users user = usersMapper.findUserByUserName(changePasswordResquest.getUserName());
        if (user == null) throw new DataNotFoundException("No user found");

        //Ensure that the username from the token matches the one in the request
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        if(!Objects.equals(accessTokenUser.getUserId(), user.getUserId())){
            throw new PasswordChangeNotAllowedException("You cannot change password");
        }
        usersMapper.updatePasswordUser(passwordEncoder.encode(changePasswordResquest.getNewPassword()), changePasswordResquest.getUserName());
        revokeAllTokenByUser(user);
        return "Change password successfully. Please login again";
    }

    public Users getUserByName(String userName) {
        return  usersMapper.findUserByUserName(userName);
    }

    private String checkToken(HttpServletRequest request) throws Exception{
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Unauthorized");
        }

        return authHeader.substring(7);
    }



    private void revokeAllTokenByUser(Users user) {
        tokenMapper.selectByExample(tokenExample);
        List<Token> validTokens = tokenMapper.findAllAccessTokensByUser(user.getUserId());
        if (validTokens.isEmpty()) {
            return;
        }

        for (Token t : validTokens) {
            t.setIsLoggedOut((short) 1);
            tokenMapper.updateByPrimaryKey(t);
        }
    }
}
