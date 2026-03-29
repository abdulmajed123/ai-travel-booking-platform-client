"use client";

import { useSearchParams } from "next/navigation";
import Hero from "@/Component/Home/Hero";
import TravelService from "@/Component/Home/TravelService";
import WhyChooseUs from "@/Component/Home/WhyChooseUs";
import Review from "@/Component/Home/Review";
import FAQ from "@/Component/Home/FAQ";
import { Suspense, useEffect } from "react";
import AIPlannerPreview from "@/Component/Home/AIPlannerPreview";
import Newsletter from "@/Component/Home/NewsLetter";

function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);

      window.location.href = "/";
    }
  }, [searchParams]);

  return (
    <div>
      <Hero />
      <TravelService />
      <AIPlannerPreview></AIPlannerPreview>
      <WhyChooseUs></WhyChooseUs>
      <Review />
      <FAQ />
      <Newsletter></Newsletter>
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
