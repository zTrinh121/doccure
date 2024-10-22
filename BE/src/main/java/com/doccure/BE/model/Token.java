package com.doccure.BE.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {
    @JsonProperty("token_id")
    private Long tokenId;

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("is_logged_out")
    private Short isLoggedOut;

    @JsonProperty("user_id")
    private Long userId;
}