import {
  ADD_TO_CART,
  REMOVE_MANY_TO_CART,
  REMOVE_TO_CART,
  SET_ARRAY_ID,
  UPDATE_TO_CART,
  CLEAR_CART,
  ADD_ID_SHOP
} from './types';

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeToCart = (id) => {
  return {
    type: REMOVE_TO_CART,
    payload: id,
  };
};

export const removeManyToCart = (arr) => {
  return {
    type: REMOVE_MANY_TO_CART,
    payload: arr,
  };
};

export const updateToCart = (payload) => {
  return {
    type: UPDATE_TO_CART,
    payload: payload,
  };
};

export const setArrayId = (arr) => {
  return {
    type: SET_ARRAY_ID,
    payload: arr,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
}

export const addIdShop = (id) => {
  return {
    type: ADD_ID_SHOP,
    payload: id
  };
}