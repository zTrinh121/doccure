package com.doccure.BE.service;

import com.doccure.BE.model.Users;
import com.doccure.BE.response.UserResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UsersService {
    UserResponse getUserByUsername(String username) throws Exception;
    UserResponse updateUser(Users user, Long userId) throws Exception;

    UserResponse updateAvatar(Long userId, MultipartFile file) throws Exception;


    
}
