import { Gender } from "./Gender";

export class UserModel {
    id: number;
    phoneNumber: string;
    password: string;
    fullName: string;
    dob: Date;
    gender: Gender;
    image: string;

    constructor(id: number, phoneNumber: string, password: string, fullName: string, dob: Date, gender: Gender, image: string) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.image = image;
    }
}