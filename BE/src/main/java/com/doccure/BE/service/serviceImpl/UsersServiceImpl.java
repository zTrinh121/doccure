package com.doccure.BE.service.serviceImpl;

import com.cloudinary.Cloudinary;
import com.doccure.BE.exception.DataIntegrityViolationException;
import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.exception.EmailAlreadyExistsException;
import com.doccure.BE.exception.UsernameAlreadyExistsException;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.UserResponse;
import com.doccure.BE.service.UsersService;

import com.doccure.BE.util.CloudinaryUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {
    private final UsersMapper usersMapper;
    private final Cloudinary cloudinary;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserResponse getUserByUsername(String username) throws Exception {
        Users user = usersMapper.findUserByUserName(username);
        if(user == null) throw new DataNotFoundException("No user found with username = " + username);
        return UserResponse.fromUsers(user);
    }

    @Override
    public UserResponse updateUser(Users user, Long userId) throws Exception{
        if(usersMapper.selectByPrimaryKey(userId) == null){
            throw new DataNotFoundException("No user found with id = " + userId);
        }
        if(!usersMapper.findUserDifferentByUserName(userId, user.getUsername()).isEmpty()){
            throw new UsernameAlreadyExistsException("Username already exists. Please choose a different username");
        }
        if(!usersMapper.findUserDifferentByEmail(userId, user.getEmail()).isEmpty()){
            throw new EmailAlreadyExistsException("Email already exists. Please choose a different email");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserId(userId);
        usersMapper.updateByPrimaryKeySelective(user);
        return UserResponse.fromUsers(user);
    }

    @Override
    public UserResponse updateAvatar(Long userId, MultipartFile file) throws Exception {
        Users user = usersMapper.selectByPrimaryKey(userId);
        if(user == null){
            throw new DataNotFoundException("No user found with id = " + userId);
        }
        //Handle avatar
        if(!file.isEmpty()){
            CloudinaryUtil.assertAllowed(file, CloudinaryUtil.IMAGE_PATTERN);
            final String fileName = CloudinaryUtil.getFileName(file.getOriginalFilename());
            Map<String, String> responseFileMap = uploadFile(file, fileName);
            user.setAvatar(responseFileMap.get("url"));
        }

        user.setUserId(userId);
        usersMapper.updateByPrimaryKeySelective(user);
        return UserResponse.fromUsers(user);
    }

    @Transactional
    public Map<String, String> uploadFile(final MultipartFile file, final String fileName) throws Exception {
        try {
            final Map result   = this.cloudinary.uploader()
                    .upload(file.getBytes(),
                            Map.of("public_id",
                                    "user/ava/"
                                            + fileName));
            final String url = (String) result.get("url");
            Map<String, String> fileMap = new HashMap<>();
            fileMap.put("url", url);
            return fileMap;

        } catch (final Exception e) {
            throw new DataIntegrityViolationException("Failed to upload file");
        }
    }
    
}
