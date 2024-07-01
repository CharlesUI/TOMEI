//Context
import { useCustomerContext } from "./useCustomerContext";
//Types
import { REDUCER_ACTION_TYPE } from "../Types/CustomerTypes";

export const useLogout = () => {
  const { dispatch } = useCustomerContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };

  return { logout };
};
