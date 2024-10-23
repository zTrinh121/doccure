package com.doccure.BE.service;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.UserResponse;

import java.util.List;

public interface UsersService {
    UserResponse getUserByUsername(String username) throws Exception;
    List<UserResponse> getUsers();
    UserResponse updateUser(Users user);
    String deleteUser(String username);
}
