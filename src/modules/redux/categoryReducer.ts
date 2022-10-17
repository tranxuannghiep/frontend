import { Category } from "models/category";
import { ActionType, createCustomAction, getType } from "typesafe-actions";


export interface MangeCategoryState {
    categoryList: Category[];
}

export const getCategoryList = createCustomAction(
    "manageCategory/getCategoryList",
    (data: Category[]) => ({
        data,
    })
);






const actions = {
    getCategoryList,
};
type Action = ActionType<typeof actions>;

export default function categoryReducer(
    state: MangeCategoryState = {
        categoryList: [],

    },
    action: Action
) {
    switch (action.type) {
        case getType(getCategoryList):
            return { ...state, categoryList: action.data };
        default:
            return state;
    }
}
