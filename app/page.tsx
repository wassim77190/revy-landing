"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Probleme from "@/components/Probleme";
import Solution from "@/components/Solution";
import Avantages from "@/components/Avantages";
import Notifications from "@/components/Notifications";
import Wallet from "@/components/Wallet";
import Dashboard from "@/components/Dashboard";
import PourQui from "@/components/PourQui";
import PourquoiCaMarche from "@/components/PourquoiCaMarche";
import FAQ from "@/components/FAQ";
import ROICalculator from "@/components/ROICalculator";
import CTAFinale from "@/components/CTAFinale";
import Footer from "@/components/Footer";

const CALENDLY_URL = "https://calendly.com/contact-revycards/30min";

function openCalendly() {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
}

export default function Home() {
  return (
    <>
      <Navbar onDemo={openCalendly} />
      <main>
        <Hero onDemo={openCalendly} />
        <Probleme />
        <Solution />
        <Avantages />
        <Notifications />
        <Wallet />
        <Dashboard />
        <PourQui />
        <PourquoiCaMarche />
        <ROICalculator />
        <FAQ />
        <CTAFinale onDemo={openCalendly} />
      </main>
      <Footer onDemo={openCalendly} />
    </>
  );
}
