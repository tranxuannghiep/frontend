export const capitalizeString = (str: string): string => {
    if (!str) return '';
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const getMarkColor = (mark: number): string => {
    if (mark >= 8) return "green"
    if (mark >= 5) return "goldenrod";
    return 'red'
}

export const validateNumberPositive = (number: string) => {
    if (number.length === 0) return true
    const regNumber = /^[0-9]+$/
    return regNumber.test(number)
}

export const validateNumber = (number: number) => {
    if (number.toString().length === 0) return true
    const regNumber = /^-?\d+(\.?\d+)?$/
    return regNumber.test(number.toString())
}

export const formatDate = (value: Date) => {
    return new Date(value).toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: '2-digit' })
}

export const STATIC_HOST = 'https://api.ezfrontend.com';
export const THUMBNAIL_PLACEHOLDER =
    'https://previews.123rf.com/images/mathier/mathier1905/mathier190500001/134557215-no-thumbnail-images-placeholder-for-forums-blogs-and-websites.jpg';

export function formatPrice(price: any) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}