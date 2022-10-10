import { combineReducers } from "redux";
import mangeUserReducer from "../modules/users/redux/mangeUserReducer";
import mangeProductReducer from "modules/products/redux/mangeProductReducer";

const rootReducer = combineReducers({
    mangeUserReducer,
    mangeProductReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
