package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UsersService {
    UserResponse getUserByUsername(String username) throws Exception;
    UserResponse updateUser(Users user, Long userId, MultipartFile file) throws Exception;


    
}
