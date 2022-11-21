import { combineReducers } from "redux";
import mangeUserReducer from "../modules/users/redux/mangeUserReducer";
import mangeProductReducer from "modules/products/redux/mangeProductReducer";
import categoryReducer from './../modules/redux/categoryReducer';
import cartReducer from './../modules/screen/products/redux/cartReducer';
import visibleReducer from './../modules/screen/products/redux/visibleReducer';

const rootReducer = combineReducers({
    mangeUserReducer,
    mangeProductReducer,
    categoryReducer,
    cartReducer,
    visibleReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
