import { ReactElement, createContext, useEffect, useReducer } from "react";

import {
  CustomerType,
  REDUCER_ACTION_TYPE,
  ReducerActions,
  CustomerContextType,
  ChildrenType,
} from "../Types/CustomerTypes";

export const initState: CustomerType = {
  user: {},
};

const actionReducer = (
  state: CustomerType,
  action: ReducerActions
): CustomerType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN:
      return { ...action.payload };
    case REDUCER_ACTION_TYPE.LOGOUT:
      return {};
    default:
      return state;
  }
};

//CONTEXT

// const useAuthContext = (initState: StateType) => {
//   const [state, dispatch] = useReducer(actionReducer, initState);

//   return { state, dispatch };
// };

const initContextState: CustomerContextType = {
  state: initState,
  dispatch: () => { },
};

export const CustomerContext =
  createContext<CustomerContextType>(initContextState);

// const contextValue = useAuthContext(initState)
export const CustomerContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(actionReducer, initState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("getting the user")
    console.log(storedUser)
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User in Local", parsedUser);
        dispatch({ type: REDUCER_ACTION_TYPE.LOGIN, payload: parsedUser });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Handle parsing error (optional: clear localStorage or set default state)
      }
    } else {
      dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
    }
  }, []); // Empty dependency array to run only once on component mount

  return (
    <CustomerContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};
