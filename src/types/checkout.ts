
export interface CustomerForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    description: string;
}

export interface CartItem {
    priceAt?: number;
    quantity?: number;
    product?:
    | {
        _id?: string;
        name?: string;
        images?: string[];
        pricing?: {
            salePrice?: number;
            basePrice?: number;
        };
    }
    | string;
}


export interface FieldProps {
    label: string;
    id: keyof CustomerForm;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    error?: string;
    colSpan?: boolean;
}

export type PaymentMethod = "ssl" | "cod";
export type ShippingMethod = "free" | "express";

export interface ShippingCardProps {
    method: ShippingMethod;
    selected: boolean;
    label: string;
    sub: string;
    price: string;
    onClick: () => void;
}

export interface PaymentCardProps {
    method: PaymentMethod;
    selected: boolean;
    icon: React.ReactNode;
    label: string;
    sub: string;
    onClick: () => void;
}