package com.doccure.BE.controller;

import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
