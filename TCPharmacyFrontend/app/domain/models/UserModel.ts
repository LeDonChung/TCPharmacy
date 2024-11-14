import { AddressModel } from "./AddressModel";
import { Gender } from "./Gender";

export class UserModel {
    id: number;
    phoneNumber: string;
    password: string;
    fullName: string;
    dob: Date;
    gender: Gender;
    image: string;
    currentPoint: number;
    addresses: AddressModel[];

    constructor(id?: number, phoneNumber?: string, password?: string, fullName?: string, dob?: Date, gender?: Gender, image?: string, currentPoint?: number, addresses?: AddressModel[]) {
        this.id = id || 0;
        this.phoneNumber = phoneNumber || '';
        this.password = password || '';
        this.fullName = fullName || '';
        this.dob = dob || new Date();
        this.gender = gender || Gender.Male;
        this.image = image || '';
        this.currentPoint = currentPoint || 0;
        this.addresses = addresses || [];
    }
}