import { useState } from "react";
import { API_URL } from "./config";
//Context
import { useCustomerContext } from "./useCustomerContext";
//Types
import { REDUCER_ACTION_TYPE } from "../Types/CustomerTypes";
import { FormCustomerType } from "../Types/CustomerTypes";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useCustomerContext();

  const login = async (formData: FormCustomerType) => {
    console.log("FORM IN LOGIN", formData)
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/client/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();
    console.log("JSON IN LOGIN", json)
    if (!response.ok) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
      setError(json.message);
    }

    if (response.ok) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: json,
        })
      );
      console.log("Local Storage", json);

      dispatch({
        type: REDUCER_ACTION_TYPE.LOGIN,
        payload: {
          user: json,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
    }
  };

  return { login, isLoading, error };
};
