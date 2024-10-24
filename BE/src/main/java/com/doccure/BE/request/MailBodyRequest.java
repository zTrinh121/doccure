package com.doccure.BE.request;

import lombok.Builder;

@Builder
public record MailBodyRequest(String to, String subject, String text) {
}
