package vn.edu.iuh.fit.pharmacy.api;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MessageResponse {
    private String role;
    private String content;
}
