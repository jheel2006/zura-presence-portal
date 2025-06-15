import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { GlobalCursorGlow } from "@/components/GlobalCursorGlow";
import { ScrollOrb } from "@/components/ScrollOrb";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global cursor glow overlay */}
      <GlobalCursorGlow />

      {/* Scroll-following orb effect */}
      <ScrollOrb />

      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
