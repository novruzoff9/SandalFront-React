import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";
import Cookies from "js-cookie";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true); // istəsən loading göstərə bilərsən
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const cookieValue = Cookies.get("subscription");

      if (cookieValue) {
        setSubscription(cookieValue);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/subscription/company/my");
        
        if (response.data.isActive) {
          setSubscription(response.data.packageName);
          Cookies.set("subscription", response.data.packageName, {
            expires: 1 / 24, // 1 saat
          });
        }
      } catch (err) {
        console.error("Subscription fetch failed:", err);
        setError("Subscription məlumatı yüklənə bilmədi");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider value={{ subscription, loading, error }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
