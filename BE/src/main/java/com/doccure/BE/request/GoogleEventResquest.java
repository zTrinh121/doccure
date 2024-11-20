package com.doccure.BE.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleEventResquest {
    @JsonProperty("event_name")
    @NotEmpty(message = "Event name is required")
    private String eventName;

    @JsonProperty("event_description")
    private String eventDescription;

    @JsonProperty("start_date_time")
    private LocalDateTime startDateTime;

    @JsonProperty("end_date_time")
    private LocalDateTime endDateTime;

}
