import {
  CLOSE_LOGIN_REGISTER,
  CLOSE_TOOLTIP_CART,
  OPEN_LOGIN_REGISTER,
  OPEN_TOOLTIP_CART,
} from './types';

const initState = {
  showFormLogin: false,
  showToolTipCart: false,
};
const visibleReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_REGISTER: {
      return {
        ...state,
        showFormLogin: true,
      };
    }
    case CLOSE_LOGIN_REGISTER: {
      return {
        ...state,
        showFormLogin: false,
      };
    }
    case OPEN_TOOLTIP_CART: {
      return {
        ...state,
        showToolTipCart: true,
      };
    }
    case CLOSE_TOOLTIP_CART: {
      return {
        ...state,
        showToolTipCart: false,
      };
    }
    default:
      return state;
  }
};
export default visibleReducer;
