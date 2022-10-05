export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    age: number;
    gender: string;
    createdAt: Date;
}

export interface UserFilter {
    name: string;
    email: string;
    role: string;
    sortBy?: string;
    orderBy?: string;
    page?: number;
    limit?: number;
}