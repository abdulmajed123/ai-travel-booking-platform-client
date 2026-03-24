"use client";

import { useSearchParams } from "next/navigation";
import Hero from "@/Component/Home/Hero";
import TravelService from "@/Component/Home/TravelService";
import WhyChooseUs from "@/Component/Home/WhyChooseUs";
import Review from "@/Component/Home/Review";
import FAQ from "@/Component/Home/FAQ";
import { Suspense, useEffect } from "react";

// মূল লজিকটি একটি আলাদা কম্পোনেন্টে রাখা ভালো যাতে Next.js এর searchParams এরর না দেয়
function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      // ১. টোকেন সেভ করা
      localStorage.setItem("accessToken", token);

      // ২. সরাসরি window.location ব্যবহার করে হার্ড রিফ্রেশ দেওয়া
      // এতে সব কম্পোনেন্ট (Navbar সহ) নতুন টোকেনটি পাবে
      window.location.href = "/";
    }
  }, [searchParams]);

  return (
    <div>
      <Hero />
      <TravelService />
      <WhyChooseUs></WhyChooseUs>
      <Review />
      <FAQ />
    </div>
  );
}

// এটিই আপনার মেইন পেজ যা default export হিসেবে থাকবে
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
