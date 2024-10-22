package com.doccure.BE.mapper;

import com.doccure.BE.model.Users;
import com.doccure.BE.model.UsersExample;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface UsersMapper {
    long countByExample(UsersExample example);

    int deleteByExample(UsersExample example);

    int deleteByPrimaryKey(Long userId);

    int insert(Users row);

    int insertSelective(Users row);

    List<Users> selectByExample(UsersExample example);

    Users selectByPrimaryKey(Long userId);

    int updateByExampleSelective(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByExample(@Param("row") Users row, @Param("example") UsersExample example);

    int updateByPrimaryKeySelective(Users row);

    int updateByPrimaryKey(Users row);

    Users findUserByUserName(String username);

    Users findUserByEmail(String email);

    int updatePasswordUser(@Param("password") String password, @Param("userName") String username);
}