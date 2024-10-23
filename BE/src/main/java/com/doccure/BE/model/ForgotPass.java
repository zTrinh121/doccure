package com.doccure.BE.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPass {
    @JsonProperty("fp_id")
    private Long fpId;

    @JsonProperty("otp")
    private Long otp;

    @JsonProperty("expired_time")
    private Date expiredTime;

    @JsonProperty("user_id")
    private Long userId;

}