import { combineReducers } from "redux";
import mangeUserReducer from "../modules/users/redux/mangeUserReducer";

const rootReducer = combineReducers({
    mangeUserReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
