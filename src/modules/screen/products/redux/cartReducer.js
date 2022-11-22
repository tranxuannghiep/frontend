import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    UPDATE_TO_CART,
    REMOVE_MANY_TO_CART,
    SET_ARRAY_ID,
    CLEAR_CART
} from './types';

const initState = {
    carts: [],
    arrayId: [],
};
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const idx = state.carts.findIndex((val) => val._id === action.payload._id);
            if (idx === -1) {
                return {
                    ...state,
                    carts: [...state.carts, action.payload],
                };
            } else {
                return {
                    ...state,
                    carts: [
                        ...state.carts.slice(0, idx),
                        { ...state.carts[idx], quantity: state.carts[idx].quantity + action.payload.quantity },
                        ...state.carts.slice(idx + 1),
                    ],
                };
            }
        }
        case UPDATE_TO_CART: {
            const idx = state.carts.findIndex((val) => val._id === action.payload._id);
            if (idx === -1 || action.payload.quantity < 1) return { ...state };

            return {
                ...state,
                carts: [
                    ...state.carts.slice(0, idx),
                    { ...state.carts[idx], quantity: action.payload.quantity },
                    ...state.carts.slice(idx + 1),
                ],
            };
        }
        case REMOVE_TO_CART: {
            const idx = state.carts.findIndex((val) => val._id === action.payload);
            if (idx === -1) return;
            return {
                ...state,
                carts: [...state.carts.slice(0, idx), ...state.carts.slice(idx + 1)],
            };
        }
        case REMOVE_MANY_TO_CART: {
            const newCarts = state.carts.filter((val) => !action.payload.includes(val._id));
            return {
                ...state,
                carts: newCarts,
            };
        }
        case SET_ARRAY_ID: {
            return {
                ...state,
                arrayId: action.payload,
            };
        }
        case CLEAR_CART: {
            return {
                ...state,
                carts: [],
            };
        }
        default:
            return state;
    }
};
export default cartReducer;
