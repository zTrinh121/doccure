package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordResquest {
    @JsonProperty("username")
    @NotNull(message = "User name cannot be empty")
    private String userName;

    @JsonProperty("old_password")
    @NotNull(message = "Old password cannot be empty")
    private String oldPassword;

    @JsonProperty("new_password")
    @NotNull(message = "New password cannot be empty")
    private String newPassword;

        @JsonProperty("confirm_password")
    @NotNull(message = "Confirm password cannot be empty")
    private String confirmPassword;
}
