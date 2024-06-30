import { ReactNode, Dispatch } from "react";

//FORM
export type FormDataType = {
  username?: string;
  password?: string;
};

//CONTEXT
export type StateType = {
  user?: {
    _id?: string
    token?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    contactNumber?: string;
    role?: string;
    scheduleDate?: string;
    availableTime?: string;
  };
};

export const enum REDUCER_ACTION_TYPE {
  LOGIN,
  LOGOUT,
}

export type ReducerActions = {
  type: REDUCER_ACTION_TYPE;
  payload?: StateType;
};

export type ChildrenType = {
  children: ReactNode;
};

export type AdminContextType = {
  state: StateType;
  dispatch: Dispatch<ReducerActions>;
};
