import React from "react";
import HeroSection from "../components/xenon/HeroSection";
import InfoCards from "../components/xenon/InfoCards";
import UseCases from "../components/xenon/UseCases";
import Features from "../components/xenon/Features";
import ModulesList from "../components/xenon/ModulesList";
import Pricing from "../components/xenon/Pricing";
import Footer from "../components/xenon/Footer";
import Navbar from "../components/xenon/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InfoCards />
      <UseCases />
      <div id="features"><Features /></div>
      <div id="modules"><ModulesList /></div>
      <div id="pricing"><Pricing /></div>
      <Footer />
    </div>
  );
}