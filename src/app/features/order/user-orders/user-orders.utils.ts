import { OrderPlacedDetails } from "../../../models/order.model";

export function formatPaymentMethodUtiliy(method: string): string {
    switch (method) {
        case 'credit-card':
            return 'Credit Card';
        case 'debit-card':
            return 'Debit Card';
        case 'paypal':
            return 'PayPal';
        case 'cod':
            return 'Cash on Delivery';
        default:
            return method;
    }
}

export function formatDateUtility(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}



export function calculateOrderTotalUtility(order: OrderPlacedDetails): number {
    return order.products.reduce((total, item) =>
        total + (Number(item.product.price) * item.quantity), 0);
}