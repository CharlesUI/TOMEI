import { useState } from "react";
import { API_URL } from "./config";
import { NotificationType } from "../Types/NotificationTypes";

export const useFetchNotifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchNotifications = async (
    clientId: string | undefined,
    token: string | undefined, 
    setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>
  ) => {
    setError(null);
    setIsLoading(true);

    console.log("clientID", clientId)
    const response = await fetch(`${API_URL}/notifications/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setNotifications([])
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    if (response.ok) {
      setNotifications(Array.isArray(json.notification) ? json.notification : []);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return { fetchNotifications, isLoading };
};
