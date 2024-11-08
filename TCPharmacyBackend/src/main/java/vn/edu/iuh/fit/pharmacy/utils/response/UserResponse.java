package vn.edu.iuh.fit.pharmacy.utils.response;

import lombok.*;
import vn.edu.iuh.fit.pharmacy.POJOs.Gender;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link vn.edu.iuh.fit.pharmacy.POJOs.User}
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserResponse implements Serializable {
    Long id;
    String phoneNumber;
    String password;
    String fullName;
    Date dob;
    Gender gender;
    String image;
}