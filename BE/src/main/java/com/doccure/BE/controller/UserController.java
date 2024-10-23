package com.doccure.BE.controller;

import com.doccure.BE.model.Users;
import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.UsersService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${apiPrefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final UsersService usersService;
    
    @GetMapping("")
    public ResponseEntity<Object> getUserByUsername(@RequestParam("username") String username) throws Exception {
        return ResponseHandler.responseBuilder("Requested user with user name = " + username,
                HttpStatus.OK,
                usersService.getUserByUsername(username));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> updateUser(@RequestBody Users updateUser,
        @PathVariable("userId") Long userId,
        @RequestPart final MultipartFile file,
        BindingResult result) throws Exception {
         if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseHandler.responseBuilder("There some errors while inputting data",
                    HttpStatus.BAD_REQUEST,
                    errorMessages);
        }
        
        return ResponseHandler.responseBuilder("Update user successfully with user id = " + userId + "  ",
                HttpStatus.OK,
                usersService.updateUser(updateUser, userId, file));
    }
}
