// "use client";

// import { getToken } from "next-auth/jwt";
// import { useEffect, useState } from "react";

// export const useAuth = () => {
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = getToken();

//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }

//     setLoading(false);
//   }, []);

//   return { isLoggedIn, loading };
// };

"use client";

import { useEffect, useState } from "react";
// ক্লায়েন্ট সাইডে ব্যবহারের জন্য session ব্যবহার করা ভালো
import { getSession } from "next-auth/react";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // getToken এর বদলে getSession ব্যবহার করলে আর্গুমেন্ট এরর আসবে না
      const session = await getSession();

      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isLoggedIn, loading };
};
