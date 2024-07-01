import { useState } from "react";
import { API_URL } from "./config";
//Types
import { CustomerItemContext, REDUCER_ACTION_TYPE } from "../Types/CustomerTypes";
//Context
import { useCustomerContext } from "./useCustomerContext";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {dispatch} = useCustomerContext()

  const registerCustomer = async (
    formData: CustomerItemContext,
  ) => {
    setError(null);
    setIsLoading(true);
    console.log("FORM DATA", formData)
    const response = await fetch(`${API_URL}/client/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();
    console.log("register json", json)
    if (!response.ok) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setError(json.message);
    }

    if (response.ok) {
      dispatch({
        type: REDUCER_ACTION_TYPE.LOGIN,
        payload: {
          user: json,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { registerCustomer, isLoading, error };
};
