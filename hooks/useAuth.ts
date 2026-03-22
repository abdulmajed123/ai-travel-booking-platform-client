"use client";

import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  return { isLoggedIn, loading };
};
