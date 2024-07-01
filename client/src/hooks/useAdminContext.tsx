import { useContext } from "react";
//Context
import { AdminContext } from "../context/AdminContext";

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("No Context");
  }

  return context;
};