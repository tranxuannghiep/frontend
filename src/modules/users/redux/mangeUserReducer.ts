import { User } from "models/user";
import { ActionType, createCustomAction, getType } from "typesafe-actions";


export interface MangeUserState {
  userList: User[];
}

export const getUserList = createCustomAction(
  "manageUser/getUserList",
  (data: User[]) => ({
    data,
  })
);

export const changeFilterUser = createCustomAction(
  "manageUser/changeFilterUser",
  (data: object) => ({
    data,
  })
);



export const changeDeleteAllUser = createCustomAction(
  "manageUser/changeDeleteAllUser"
);
export const clearDeleteAllUser = createCustomAction(
  "manageUser/clearDeleteAllUser"
);

const actions = {
  getUserList,
  changeFilterUser,
  changeDeleteAllUser,
  clearDeleteAllUser,
};
type Action = ActionType<typeof actions>;

export default function mangeUserReducer(
  state: MangeUserState = {
    userList: [],

  },
  action: Action
) {
  switch (action.type) {
    case getType(getUserList):
      return { ...state, userList: action.data };
    default:
      return state;
  }
}
