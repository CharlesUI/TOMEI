import { useState } from "react";
import { API_URL } from "./config";
import { Rental } from "../Types/CarTypes";

export const useFetchRentHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchRentHistory = async (
    clientId: string | undefined,
    token: string | undefined, 
    setRentalHistory: React.Dispatch<React.SetStateAction<Rental[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    console.log("clientID", clientId)
    const response = await fetch(`${API_URL}/rental/history/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setRentalHistory([])
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    if (response.ok) {
      setRentalHistory(json);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { fetchRentHistory, isLoading };
};
