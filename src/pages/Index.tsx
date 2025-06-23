
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
    // Ensure scroll to top happens after page load
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    // Immediate scroll
    scrollToTop();
    
    // Also scroll after a brief delay to ensure it works
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
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
