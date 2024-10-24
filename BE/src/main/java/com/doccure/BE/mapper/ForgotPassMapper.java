package com.doccure.BE.mapper;

import com.doccure.BE.model.ForgotPass;
import com.doccure.BE.model.ForgotPassExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ForgotPassMapper {
    long countByExample(ForgotPassExample example);

    int deleteByExample(ForgotPassExample example);

    int deleteByPrimaryKey(Long fpId);

    int insert(ForgotPass row);

    int insertSelective(ForgotPass row);

    List<ForgotPass> selectByExample(ForgotPassExample example);

    ForgotPass selectByPrimaryKey(Long fpId);

    int updateByExampleSelective(@Param("row") ForgotPass row, @Param("example") ForgotPassExample example);

    int updateByExample(@Param("row") ForgotPass row, @Param("example") ForgotPassExample example);

    int updateByPrimaryKeySelective(ForgotPass row);

    int updateByPrimaryKey(ForgotPass row);

    ForgotPass findByOtpAndUserId(@Param("otp") Long otp, @Param("userId") Long userId);
}