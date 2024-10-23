package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {
    private final UsersMapper usersMapper;
    @Override
    public UserResponse getUserByUsername(String username) throws Exception {
        Users user = usersMapper.findUserByUserName(username);
        if(user == null) throw new DataNotFoundException("No user found with username = " + username);
        return UserResponse.fromUsers(user);
    }

    @Override
    public List<UserResponse> getUsers() {
        return null;
    }

    @Override
    public UserResponse updateUser(Users user) {
        return null;
    }

    @Override
    public String deleteUser(String username) {
        return null;
    }
}
