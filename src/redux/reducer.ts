import { combineReducers } from "redux";
import mangeUserReducer from "../modules/users/redux/mangeUserReducer";
import mangeProductReducer from "modules/products/redux/mangeProductReducer";
import categoryReducer from './../modules/redux/categoryReducer';

const rootReducer = combineReducers({
    mangeUserReducer,
    mangeProductReducer,
    categoryReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
