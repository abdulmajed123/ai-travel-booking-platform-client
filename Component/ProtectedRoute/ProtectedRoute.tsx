"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user"); // আপনার লোকালাস্টোরেজ কী (key) অনুযায়ী চেক করুন
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user) {
      toast.error("Please login first!");
      router.push("/login");
    } else if (!allowedRoles.includes(user.role)) {
      toast.error("You are not authorized to access this page!");
      router.push("/dashboard"); // ইউজার হলে তাকে নরমাল ড্যাশবোর্ডে পাঠিয়ে দিন
    } else {
      setIsAuthorized(true);
    }
  }, [router, allowedRoles]);

  if (!isAuthorized) return null; // অথরাইজড না হওয়া পর্যন্ত কিছু দেখাবে না

  return <>{children}</>;
}
