import { useState } from "react";
import { API_URL } from "./config";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";

export const useDeleteAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const deleteAdmin = async (
    _id: string | undefined,
    token: string | undefined,
    setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/admin/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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

  return { deleteAdmin, isLoading, error, setError };
};
