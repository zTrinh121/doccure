package com.doccure.BE.mapper;

import com.doccure.BE.model.Users;
import com.doccure.BE.model.UsersExample;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface UsersMapper {
    long countByExample(UsersExample example);

    int deleteByExample(UsersExample example);

    int deleteByUsername(String username);

    int insert(Users row);

    int insertSelective(Users row);

    List<Users> selectByExample(UsersExample example);

    Users selectByPrimaryKey(Long userId);

    int updateByExampleSelective(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByExample(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByPrimaryKeySelective(Users row);

    int updateByPrimaryKey(Users row);

    Users findUserByUserName(String username);

    List<Users> findUserDifferentByUserName(@Param("userId") Long userId, @Param("username") String username);

    Users findUserByEmail(String email);

    List<Users> findUserDifferentByEmail(@Param("userId") Long userId, @Param("email") String email);

    int updatePasswordUser(@Param("password") String password, @Param("username") String username);

    List<Users> findAll();
    int updatePasswordUserEmail(@Param("password") String password, @Param("email") String email);
}