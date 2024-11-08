package vn.edu.iuh.fit.pharmacy.utils.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRegisterRequest {
    public String phoneNumber;
    public String password;
    public int otp;
}
