import { ReactNode, Dispatch } from "react";

export type CustomerTypeBody = { 
  _id?: string; 
  token?: string 
  password?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  birthDate?: string,
  contact?: string
};

export type CustomerType = {
  user?: CustomerTypeBody
};



export type CustomerItemContext = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type FormCustomerType = {
  email?: string;
  password?: string;
};

export const enum REDUCER_ACTION_TYPE {
  LOGIN,
  LOGOUT,
}

export type ReducerActions = {
  type: REDUCER_ACTION_TYPE;
  payload?: CustomerType;
};

export type CustomerContextType = {
  state: CustomerType;
  dispatch: Dispatch<ReducerActions>;
};

export type ChildrenType = {
  children: ReactNode;
};
