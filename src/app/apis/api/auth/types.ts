export interface PostRegisterData {
    name: string;
    age: number;
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
