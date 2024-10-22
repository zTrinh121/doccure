package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp implements UserDetailsService {
    private final UsersMapper usersMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user =  usersMapper.findUserByUserName(username);
        if(user == null) throw new UsernameNotFoundException("User not found");
        return user;
    }
}
