import FAQ from "@/Component/Home/FAQ";
import Feature from "@/Component/Home/Feature";
import Hero from "@/Component/Home/Hero";
import Review from "@/Component/Home/Review";
import TravelService from "@/Component/Home/TravelService";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <TravelService></TravelService>
      <Feature></Feature>
      <Review></Review>
      <FAQ></FAQ>
    </div>
  );
};

export default HomePage;
