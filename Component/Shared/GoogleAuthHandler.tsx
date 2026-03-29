"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userStore"; // আপনার স্টোর পাথ দিন
import { toast } from "react-hot-toast";

const GoogleAuthHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      const syncGoogleUser = async () => {
        try {
          // ১. টোকেন লোকাল স্টোরেজে রাখা
          localStorage.setItem("accessToken", token);

          // ২. ব্যাকএন্ড থেকে ইউজারের পুরো ডাটা নিয়ে আসা
          const response = await fetch(
            "https://ai-travel-booking-platform-server.onrender.com/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();

          if (data.success) {
            // ৩. Zustand Store আপডেট করা (এটিই মিসিং ছিল)
            setUser(data.data);

            toast.success("Login successful!");

            // ৪. URL থেকে টোকেন ক্লিন করে হোম পেজে পাঠানো
            // replaceState ব্যবহার করলে রিলোড ছাড়াই URL ক্লিন হয়
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);

            // ৫. চাইলে ড্যাশবোর্ডে রিডাইরেক্ট করতে পারেন
            router.push("/");
          }
        } catch (error) {
          console.error("Auth sync error:", error);
          toast.error("Authentication failed!");
        }
      };

      syncGoogleUser();
    }
  }, [searchParams, setUser, router]);

  return null;
};

export default GoogleAuthHandler;
