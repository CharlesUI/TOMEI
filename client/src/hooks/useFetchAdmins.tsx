import { useState } from "react";
import { API_URL } from "./config";
//Context
import { AdminType } from "../Types/AdminContextTypes copy";

export const useFetchAdmins = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAdmins = async (
    token: string,
    setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      //setting the loading to 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    if (response.ok) {
      setAdmins(json);
      //setting the loading to 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { fetchAdmins, isLoading, error, setError };
};
