package com.doccure.BE.response;

import com.doccure.BE.model.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("username")
    private String userName;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("email")
    private String email;

    @JsonProperty("avatar")
    private String avatar;

    @JsonProperty("city")
    private String city;

    @JsonProperty("weight")
    private BigDecimal weight;

    @JsonProperty("height")
    private BigDecimal height;

    @JsonProperty("age")
    private Long age;

    public static UserResponse fromUsers(Users users){
        return UserResponse
                .builder()
                .userId(users.getUserId())
                .userName(users.getUsername())
                .firstName(users.getFirstName())
                .lastName(users.getLastName())
                .gender(users.getGender())
                .email(users.getEmail())
                .avatar(users.getAvatar())
                .city(users.getCity())
                .weight(users.getWeight())
                .height(users.getHeight())
                .age(users.getAge())
                .build();
    }
}
