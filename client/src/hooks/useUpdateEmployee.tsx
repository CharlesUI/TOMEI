import { useState } from "react";
import { API_URL } from "./config";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";

export const useUpdateEmployee = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const updateEmployee = async (
    _id: string | undefined,
    token: string | undefined,
    setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>,
    formData: AdminType
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/admin/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    }

    if (response.ok) {
      setAdmins(json)
      setIsLoading(false);
    }
  };

  return { updateEmployee, isLoading, error, setError };
};
