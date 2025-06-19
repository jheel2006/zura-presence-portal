
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { ThreeDHuman } from "@/components/landing/ThreeDHuman";
import { Footer } from "@/components/landing/Footer";
import { GlobalCursorGlow } from "@/components/GlobalCursorGlow";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global cursor glow overlay */}
      <GlobalCursorGlow />

      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ThreeDHuman />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
