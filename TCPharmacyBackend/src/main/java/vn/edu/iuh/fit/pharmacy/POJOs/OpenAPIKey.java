package vn.edu.iuh.fit.pharmacy.POJOs;

import lombok.*;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OpenAPIKey {
    private String key;
}
