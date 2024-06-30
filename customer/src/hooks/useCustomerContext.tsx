import { useContext } from "react";
//Context
import { CustomerContext } from "../context/CustomerContext";

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("No Context");
  }

  return context;
};