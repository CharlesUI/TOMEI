import { useState } from "react";
import { API_URL } from "./config";
import { Car } from "../Types/CarTypes";

export const useFetchCar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchCar = async (
    token: string | undefined, 
    setCars: React.Dispatch<React.SetStateAction<Car[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/car`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();

    console.log("json",json)
    if (!response.ok) {
      setError(json.message);
      setCars([])
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    if (response.ok) {
      setCars(json);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { fetchCar, isLoading };
};
