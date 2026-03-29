"use client";

import { getToken } from "next-auth/jwt";
import { useEffect, useState } from "react";

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
