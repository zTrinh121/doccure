package com.doccure.BE.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAppointment {
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

    @JsonProperty("password")
    private String password;

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

    @JsonProperty("appointments")
    List<AppointmentDetail> appointments;
}
