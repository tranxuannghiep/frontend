import { createSelector } from 'reselect';

export const cartSelector = (state) => state.cartReducer.carts;
export const arrayIdSelector = (state) => state.cartReducer.arrayId;

export const getTotalPrice = createSelector(cartSelector, (carts) =>
  carts.reduce((acc, val) => acc + val.price * val.quantity, 0)
);

export const getTotalProduct = createSelector(cartSelector, (carts) => carts.length);

