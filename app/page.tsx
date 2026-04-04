"use client";
import { useState } from "react";
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
import CTAFinale from "@/components/CTAFinale";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Navbar onDemo={() => setModal(true)} />
      <main>
        <Hero onDemo={() => setModal(true)} />
        <Probleme />
        <Solution />
        <Avantages />
        <Notifications />
        <Wallet />
        <Dashboard />
        <PourQui />
        <PourquoiCaMarche />
        <FAQ />
        <CTAFinale onDemo={() => setModal(true)} />
      </main>
      <Footer onDemo={() => setModal(true)} />
      <DemoModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
