export class UserRegisterRequest {
    phoneNumber: string;
    password: string = 'default';
    otp: string[] = ['', '', '', '', '', ''];

    constructor(phoneNumber: string, password: string, otp: string[]) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.otp = otp;
    }
}