package vn.edu.iuh.fit.pharmacy.api;

import lombok.Builder;

@Builder
public class MessageRequestOpenAI {
    String content;
    String role;
}
