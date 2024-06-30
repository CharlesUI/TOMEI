import {
  ReactElement,
  createContext,
  useEffect,
  useReducer,
} from "react";

import { StateType, ReducerActions, REDUCER_ACTION_TYPE, AdminContextType, ChildrenType } from "../Types/AdminContextTypes";

export const initState: StateType = {
  user: {},
};

const actionReducer = (state: StateType, action: ReducerActions): StateType => {
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

const initContextState: AdminContextType = {
  state: initState,
  dispatch: () => {},
};

export const AdminContext = createContext<AdminContextType>(initContextState);

// const contextValue = useAuthContext(initState)
export const AdminContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(actionReducer, initState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User in Local", parsedUser)
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
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
