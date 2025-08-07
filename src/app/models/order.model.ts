import { Address } from "./auth.model";
import { cartItem } from "./cart.model";

export interface OrderPlacedDetails{
    paymentMethod: string;
    orderDate: string;
    products: Array<cartItem>
    address: Address
}