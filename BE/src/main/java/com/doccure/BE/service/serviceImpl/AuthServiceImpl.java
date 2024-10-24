package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.*;
import com.doccure.BE.mapper.ForgotPassMapper;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.ForgotPass;
import com.doccure.BE.model.Token;
import com.doccure.BE.model.TokenExample;
import com.doccure.BE.model.Users;
import com.doccure.BE.request.ChangePasswordResquest;
import com.doccure.BE.request.ForgotPasswordRequest;
import com.doccure.BE.request.MailBodyRequest;
import com.doccure.BE.response.AuthResponse;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.AuthService;
import com.doccure.BE.service.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Random;

import static java.lang.System.getenv;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UsersMapper usersMapper;
    private final TokenMapper tokenMapper;
    private final ForgotPassMapper forgotPassMapper;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender javaMailSender;

    private final JwtService jwtService;

    private TokenExample tokenExample;

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
    public AuthResponse authenticate(Users request, HttpServletResponse response) throws DataNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        Users user = usersMapper.findUserByUserName(request.getUsername());
        if (user == null)
            throw new DataNotFoundException("No user found with username = " + request.getUsername());
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        return new AuthResponse(accessToken, "User login was successful");
    }

    @Override
    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // String token = checkToken(request);

        String token = getRefreshTokenFromCookies(request);
        if (token == null) {
            throw new DataNotFoundException("Refresh token not found in cookies");
        }

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

            Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
            refreshTokenCookie.setHttpOnly(true); 
            refreshTokenCookie.setSecure(true); 
            refreshTokenCookie.setPath("/"); 
            refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);
            response.addCookie(refreshTokenCookie);

            return new AuthResponse(accessToken, "New token generated");
        }

        throw new UnauthorizedException("Unauthorized");
    }

    @Override
    public String changePassword(ChangePasswordResquest changePasswordResquest, HttpServletRequest request)
            throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        changePasswordResquest.getUserName(),
                        changePasswordResquest.getOldPassword()));
        String token = checkToken(request);
        // Check if the user exist in database
        Users user = usersMapper.findUserByUserName(changePasswordResquest.getUserName());
        if (user == null)
            throw new DataNotFoundException("No user found with username = " + changePasswordResquest.getUserName());

        // Check that the username from the token matches the one in the request
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        if (!Objects.equals(accessTokenUser.getUserId(), user.getUserId())) {
            throw new PasswordChangeNotAllowedException("You don't have authorization to change password");
        }
        if (!Objects.equals(changePasswordResquest.getNewPassword(), changePasswordResquest.getConfirmPassword())) {
            throw new PasswordChangeNotAllowedException("Please enter the password again!");
        }
        usersMapper.updatePasswordUser(passwordEncoder.encode(changePasswordResquest.getNewPassword()),
                changePasswordResquest.getUserName());
        revokeAllTokenByUser(user);
        return "Change password successfully. Please login again";
    }

    @Override
    public void sendSimpleMessage(MailBodyRequest mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.to());
        message.setFrom(getenv("MAIL_USER"));
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());

        javaMailSender.send(message);
    }

    @Override
    public String verifyEmail(String email) throws Exception {
        Users user = usersMapper.findUserByEmail(email);
        if (user == null)
            throw new DataNotFoundException("No user found with email = " + email);

        int otp = otpGenerator();
        MailBodyRequest mailBody = MailBodyRequest.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request : " + otp)
                .subject("OTP for Forgot Password request")
                .build();

        ForgotPass fp = ForgotPass.builder()
                .otp((long) otp)
                .expiredTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .userId(user.getUserId())
                .build();

        sendSimpleMessage(mailBody);
        forgotPassMapper.insert(fp);

        return "Email sent for verification!";
    }

    @Override
    public String verifyOtp(Long otp, String email) throws Exception {
        Users user = usersMapper.findUserByEmail(email);
        if (user == null)
            throw new DataNotFoundException("No user found with email = " + email);

        ForgotPass fp = forgotPassMapper.findByOtpAndUserId(otp, user.getUserId());
        if (fp == null)
            throw new DataNotFoundException("Invalid OTP for user with email = " + email);

        if (fp.getExpiredTime().before(Date.from(Instant.now()))) {
            forgotPassMapper.deleteByPrimaryKey(fp.getFpId());
            throw new OTPExpiredException("OTP expired");
        }
        return "OTP verified successfully!";
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest forgotPasswordRequest, String email)
            throws PasswordChangeNotAllowedException {
        if (!Objects.equals(forgotPasswordRequest.password(), forgotPasswordRequest.repeatPassword())) {
            throw new PasswordChangeNotAllowedException("Please enter the password again!");
        }
        String encodedPassword = passwordEncoder.encode(forgotPasswordRequest.password());
        usersMapper.updatePasswordUserEmail(encodedPassword, email);
        return "Password has been changed!";
    }

    private String getRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }

    private String checkToken(HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Unauthorized (Token is not existed or valid)");
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
