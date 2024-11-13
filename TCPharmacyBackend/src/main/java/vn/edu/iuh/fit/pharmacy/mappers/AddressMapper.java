package vn.edu.iuh.fit.pharmacy.mappers;

import org.mapstruct.*;
import vn.edu.iuh.fit.pharmacy.POJOs.Address;
import vn.edu.iuh.fit.pharmacy.utils.response.AddressResponse;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface AddressMapper {

    AddressResponse toDto(Address address);

    Address toEntity(AddressResponse addressResponse);
}