export function formatPaymentMethod(method: string): string {
    switch (method) {
        case 'credit-card':
            return 'Credit Card ending in **89';
        case 'debit-card':
            return 'Debit Card ending in **35';
        case 'paypal':
            return 'PayPal';
        case 'cash-on-delivery':
            return 'Cash on Delivery';
        default:
            return method || 'Credit Card ending in **89';
    }
}

export function getUserName(): string {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        return userData.name || 'User XYZ';
    }
    return 'User XYZ';
}

export function getEstimatedDelivery(): string {
    const deliveryDate = new Date();
    const daysToAdd = Math.floor(Math.random() * 4) + 2;
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

    if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
    }

    return deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}

export function generateOrderNumber(): string {
    const prefix = 'ORD';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}