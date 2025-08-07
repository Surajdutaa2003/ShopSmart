export const ROUTES = {
    default: '',
    home: 'home',
    auth: {
        parent: 'auth',
        login: 'login',
        register: 'register'
    },
    product: {
        parent: 'products',
        default: '',
        detail: ':id',
    },
    order: {
        parent:"orders",
        orderPlaced: 'order-placed',
        orderCheckout: 'order-checkout',
        userOrder: 'my-orders'
    },
    cart: {
        parent:"cart",
        default: ''
    },
    wildcard: '**'
}