package com.doccure.BE.controller;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.request.GoogleEventResquest;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.PayPalService;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("${apiPrefix}/google-calendar")
@RequiredArgsConstructor
public class GoogleCalendarController {
    private final PayPalService payPalService;

    @PostMapping("create-event")
    public ResponseEntity<Object> createEvent(@RequestBody GoogleEventResquest googleEventResquest,
                                              BindingResult result) throws GeneralSecurityException, IOException, DataNotFoundException {

        if(result.hasErrors()){
            List<String> errorMessages =  result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }

        return ResponseHandler.responseBuilder("Insert successfully",
                HttpStatus.OK,
                payPalService.createEvent(googleEventResquest));
    }

        @GetMapping("/check-auth")
    public ResponseEntity<Object> checkAuth(){
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            String authorizationUrl = payPalService.checkGoogleAuthorization(HTTP_TRANSPORT);
            if (authorizationUrl != null) {
                return ResponseEntity.ok(Collections.singletonMap("authUrl", authorizationUrl));
            }
            return ResponseEntity.ok(Collections.singletonMap("message", "Already authorized"));
        } catch (IOException | GeneralSecurityException e) {
            // Log the error for debugging
//                log.error("Error while checking Google Calendar authorization", e);
            System.out.println("Error while checking Google Calendar authorization: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/callback")
    public ResponseEntity<Object> handleGoogleCallback(@RequestParam("code") String code,
                                                       @RequestParam("scope") String scope) {
        try {
            // Process the authorization code
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Credential credential = payPalService.processAuthorizationCode(HTTP_TRANSPORT, code);

            if (credential != null) {
                return ResponseEntity.ok(Collections.singletonMap("message", "Authorization successful!"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to obtain access token. Please retry.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}
