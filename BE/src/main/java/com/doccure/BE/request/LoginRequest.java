package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @JsonProperty("user_name")
    @NotNull(message = "User name cannot be empty")
    private String userName;

    @JsonProperty("password")
    @NotNull(message = "Password cannot be empty")
    private String password;
}
