
import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProblemStatement } from "@/components/landing/ProblemStatement";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { HeartbeatSync } from "@/components/landing/HeartbeatSync";
import { ClosingMessage } from "@/components/landing/ClosingMessage";
import { Footer } from "@/components/landing/Footer";
import { GlobalCursorGlow } from "@/components/GlobalCursorGlow";

const Index = () => {
  useEffect(() => {
    // Scroll to top when the component mounts (page loads/refreshes)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global cursor glow overlay */}
      <GlobalCursorGlow />

      <Header />
      <main className="flex-grow">
        <Hero />
        <ProblemStatement />
        <Features />
        <HowItWorks />
        <HeartbeatSync />
        <ClosingMessage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
