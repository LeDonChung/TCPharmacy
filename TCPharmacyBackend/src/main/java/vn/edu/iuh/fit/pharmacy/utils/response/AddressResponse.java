package vn.edu.iuh.fit.pharmacy.utils.response;

import lombok.*;
import vn.edu.iuh.fit.pharmacy.POJOs.AddressType;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AddressResponse {
    private Long id;

    private String province;

    private String district;

    private String ward;

    private String street;

    private AddressType addressType;

    private boolean isDefault;
}
