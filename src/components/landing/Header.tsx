
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <span className="font-orbitron text-2xl font-bold tracking-wider text-white">ZURA</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
        </nav>
        <Button className="font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity glow-shadow">
          Pre-Order Now
        </Button>
      </div>
    </header>
  );
};
