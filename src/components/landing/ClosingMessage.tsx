
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const AnimatedLine = ({ 
  children, 
  delay = 0, 
  threshold = 0.3 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  threshold?: number; 
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export const ClosingMessage = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark background with gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      {/* Ambient particles background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400/20 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-pink-300/20 rounded-full animate-pulse" 
             style={{ animationDelay: '3s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-300/15 rounded-full animate-pulse" 
             style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
        <div className="absolute top-3/4 right-1/6 w-1 h-1 bg-cyan-300/30 rounded-full animate-pulse" 
             style={{ animationDelay: '2.5s', animationDuration: '6s' }} />
      </div>

      {/* Soft gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-radial from-cyan-500/8 via-blue-500/4 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-12">
        <AnimatedLine threshold={0.4}>
          <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight">
            What if a hug could travel across continents?
          </h2>
        </AnimatedLine>
        
        <AnimatedLine delay={800} threshold={0.3}>
          <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-tight">
            What if distance didn't mean disconnection?
          </h2>
        </AnimatedLine>
        
        <AnimatedLine delay={1600} threshold={0.3}>
          <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 leading-tight">
            What if presence could be felt — again?
          </h2>
        </AnimatedLine>
        
        <AnimatedLine delay={2400} threshold={0.2}>
          <div className="pt-12">
            <h1 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Zura is our answer.
            </h1>
          </div>
        </AnimatedLine>
      </div>
    </section>
  );
};
