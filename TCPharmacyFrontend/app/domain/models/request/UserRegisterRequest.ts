export class UserRegisterRequest {
    phoneNumber: string;
    password: string;
    otp: number;

    constructor(phoneNumber: string, password: string, otp: number) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.otp = otp;
    }
}