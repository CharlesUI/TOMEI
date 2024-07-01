import { useState } from "react";
import { API_URL } from "./config";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";

export const useAddEmployee = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addEmployee = async (
    formData: AdminType,
    setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/admin/register`, {
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
      }, 2000);
      setError(json.message);
    }

    if (response.ok) {
      setAdmins(json)
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { addEmployee, isLoading, error };
};
