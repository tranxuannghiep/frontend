import { Product } from "models/product";
import { ActionType, createCustomAction, getType } from "typesafe-actions";


export interface MangeProductState {
  productList: Product[];
}

export const getProductList = createCustomAction(
  "manageProduct/getProductList",
  (data: Product[]) => ({
    data,
  })
);

export const changeFilterProduct = createCustomAction(
  "manageProduct/changeFilterProduct",
  (data: object) => ({
    data,
  })
);



export const changeDeleteAllProduct = createCustomAction(
  "manageProduct/changeDeleteAllProduct"
);
export const clearDeleteAllProduct = createCustomAction(
  "manageProduct/clearDeleteAllProduct"
);

const actions = {
  getProductList,
  changeFilterProduct,
  changeDeleteAllProduct,
  clearDeleteAllProduct,
};
type Action = ActionType<typeof actions>;

export default function mangeProductReducer(
  state: MangeProductState = {
    productList: [],

  },
  action: Action
) {
  switch (action.type) {
    case getType(getProductList):
      return { ...state, productList: action.data };
    default:
      return state;
  }
}
