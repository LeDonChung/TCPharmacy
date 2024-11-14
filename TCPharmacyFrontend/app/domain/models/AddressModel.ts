import { AddressType } from "./AddressType";

export class AddressModel {
    id: number;

    province: string;

    district: string;

    ward: string;

    street: string;

    addressType: AddressType;

    _default: boolean;

    fullName: string;

    phoneNumber: string;

    constructor(id?: number, province?: string, district?: string, ward?: string, street?: string, addressType?: AddressType, _default?: boolean, fullName?: string, phoneNumber?: string) {
        this.province = province || '';
        this.district = district || '';
        this.ward = ward || '';
        this.street = street || '';
        this.addressType = addressType || AddressType.Home;
        this._default = _default || false;
        this.id = id || 0;
        this.fullName = fullName || '';
        this.phoneNumber = phoneNumber || '';
    }

    public getFullAddress(): string {
        const parts = [this.street, this.ward, this.district, this.province].filter(Boolean);
        return parts.join(', ');
    }

}