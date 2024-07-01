//Hooks
import { useAdminContext } from "./useAdminContext";
//Types
import { REDUCER_ACTION_TYPE } from "../Types/AdminContextTypes";

export const useLogout = () => {
  const { dispatch } = useAdminContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };

  return { logout };
};
