export interface Product {
    _id?: string;
    title: string;
    author?: any;
    category: any;
    avatar?: string;
    description: string;
    price: number | string;
    createdAt?: Date;
}

export interface ProductFilter {
    title?: string;
    author?: string;
    category?: string;
    sortBy?: string;
    orderBy?: string;
    page?: number;
    limit?: number;
}