import { OrderPlacedDetails } from "./order.model";

export interface User{
    id: string,
    name: string;
    email: string;
    password: string;
    address: Array<Address> | null;
    orderPlaced: Array<OrderPlacedDetails> | null;
    isLoggedIn?: boolean
}

export interface Address{
    houseNo: string;
    locality?: string;
    city: string;
    state: string;
    country: string
}