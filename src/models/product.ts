export interface Product {
    _id: string;
    title: string;
    author: any;
    category: any;
    description: string;
    price: number;
    createdAt: Date;
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