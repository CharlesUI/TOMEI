import { useState } from "react";
import { API_URL } from "./config";
//Hooks
import { useAdminContext } from "./useAdminContext";
//Types
import { REDUCER_ACTION_TYPE, FormDataType } from "../Types/AdminContextTypes";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAdminContext();

  const login = async (formData: FormDataType) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

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
