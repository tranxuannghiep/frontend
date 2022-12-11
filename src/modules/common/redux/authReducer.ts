import { ActionType, createCustomAction, getType } from "typesafe-actions";

interface User {
  role?: string;
  idUser?: string;
}

export interface AuthState {
  user: User
}

export const getUser = createCustomAction(
  "authUser/getUser",
  (data: User) => ({
    data,
  })
);


export const removeUser = createCustomAction(
  "authUser/removeUser"
);


const actions = {
  getUser,
  removeUser
};
type Action = ActionType<typeof actions>;

export default function authReducer(
  state: AuthState = {
    user: {},

  },
  action: Action
) {
  switch (action.type) {
    case getType(getUser):
      return { ...state, user: action.data };
    case getType(removeUser):
      return { ...state, user: {} }
    default:
      return state;
  }
}
