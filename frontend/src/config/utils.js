import { createContext, useReducer } from "react";

export const getError = (error) => {
    return error.response && error.response.data.message
        ? error.message.data.message
        : error.message;
}

export const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingDetails: localStorage.getItem('shippingDetails')
            ? JSON.parse(localStorage.getItem('shippingDetails'))
            : { location: {} },
    },
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
};

function reducer(state, action) {
    switch (action.type) {
        // ADD TO CART
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item.productId === newItem.productId
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.productId === existItem.productId ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };

        // REMOVE FROM CART
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item.productId !== action.payload.productId
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        // CLEAR CART
        case 'CART_CLEAR':
            localStorage.removeItem("cartItems");
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        // USER SIGN IN
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };

        // USER SIGN OUT
        case 'USER_SIGNOUT':
            localStorage.removeItem("userInfo");
            localStorage.removeItem("cartItems");
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartItems: [],
                    shippingDetails: {},
                },
            };
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}