
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="hero-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Presence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Redefined.</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Zura is a morphable companion that brings your loved ones to you, in person. Experience touch-based presence that transcends the screen.
        </p>
        <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity glow-shadow px-8 py-6">
            Pre-Order Now
          </Button>
        </div>
      </div>
    </section>
  );
};
