
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ProblemStatement } from "@/components/landing/ProblemStatement";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
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
        <ProblemStatement />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
