export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    name: string;
    password: string;
    repeatPassword: string;
    gender: "male" | "female";
    avatar?: string;
    age: number | string;
}

export interface ResetPasswordPayload {
    userId: string;
    token: string;
    password: string;
    repeatPassword: string;
}