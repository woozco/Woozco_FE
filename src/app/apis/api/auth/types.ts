export interface PostRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface PostLoginData {
    email: string;
    password: string;
}

export interface PostChangePWData {
    email: string;
    password: string;
}

export interface PostVerifyEmail {
    email: string;
}

export interface PostConfirmVerify {
    verifyCode: number;
}
