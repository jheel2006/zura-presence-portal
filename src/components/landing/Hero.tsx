
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" 
          alt="Futuristic companion" 
          className="w-full h-full object-cover opacity-30"
          style={{ transform: `translateY(${offsetY * 0.4}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Presence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Redefined.</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Zura is a morphable companion that brings your loved ones to you, in person. Experience touch-based presence that transcends the screen.
        </p>
        <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:opacity-90 transition-opacity glow-shadow px-8 py-6">
            Pre-Order Now
          </Button>
        </div>
      </div>
    </section>
  );
};
