import {
  CLOSE_LOGIN_REGISTER,
  CLOSE_TOOLTIP_CART,
  OPEN_LOGIN_REGISTER,
  OPEN_TOOLTIP_CART,
} from './types';

export const openFormLogin = () => {
  return {
    type: OPEN_LOGIN_REGISTER,
  };
};

export const closeFormLogin = () => {
  return {
    type: CLOSE_LOGIN_REGISTER,
  };
};

export const openToolTipCart = () => {
  return {
    type: OPEN_TOOLTIP_CART,
  };
};

export const closeToolTipCart = () => {
  return {
    type: CLOSE_TOOLTIP_CART,
  };
};
