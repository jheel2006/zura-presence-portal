
import { AnimatedWrapper } from './AnimatedWrapper';

export const ThreeDHuman = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="features-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Advanced Digital Human
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Witness the next evolution in human-digital interface technology with our photorealistic holographic avatar
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <div className="w-full h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 shadow-2xl relative">
              {/* Main holographic human figure */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-96 flex items-center justify-center">
                  {/* Realistic human silhouette with holographic effects */}
                  <div 
                    className="relative w-64 h-80 bg-gradient-to-b from-cyan-400/90 via-blue-500/80 to-cyan-600/90 rounded-full"
                    style={{
                      clipPath: `polygon(
                        45% 5%, 55% 5%, 58% 8%, 60% 12%, 60% 18%, 58% 22%, 55% 25%, 45% 25%, 42% 22%, 40% 18%, 40% 12%, 42% 8%,
                        38% 30%, 62% 30%, 65% 35%, 65% 55%, 68% 58%, 72% 60%, 72% 75%, 68% 78%, 65% 80%, 62% 82%, 58% 84%, 55% 92%, 52% 95%, 48% 95%, 45% 92%, 42% 84%, 38% 82%, 35% 80%, 32% 78%, 28% 75%, 28% 60%, 32% 58%, 35% 55%, 35% 35%,
                        25% 35%, 20% 40%, 18% 45%, 15% 50%, 12% 60%, 10% 70%, 8% 80%, 6% 90%, 8% 95%, 12% 98%, 18% 98%, 22% 95%, 25% 90%, 28% 85%,
                        72% 85%, 75% 90%, 78% 95%, 82% 98%, 88% 98%, 92% 95%, 94% 90%, 92% 80%, 90% 70%, 88% 60%, 85% 50%, 82% 45%, 80% 40%, 75% 35%
                      )`,
                      filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 200, 255, 0.6))',
                    }}
                  >
                    {/* Inner glow layers */}
                    <div className="absolute inset-2 bg-gradient-to-b from-cyan-300/60 via-blue-400/50 to-cyan-500/60 rounded-full blur-sm"></div>
                    <div className="absolute inset-4 bg-gradient-to-b from-cyan-200/40 via-blue-300/30 to-cyan-400/40 rounded-full blur-md"></div>
                    
                    {/* Anatomical details overlay */}
                    <div className="absolute inset-0 opacity-70">
                      {/* Head outline */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-20 border border-cyan-300/80 rounded-full"></div>
                      
                      {/* Torso lines */}
                      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-20 h-32">
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-cyan-300/60"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-cyan-300/60"></div>
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-cyan-300/60"></div>
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-cyan-300/60"></div>
                      </div>
                      
                      {/* Limb outlines */}
                      <div className="absolute top-28 left-4 w-1 h-24 bg-cyan-300/50 transform rotate-12"></div>
                      <div className="absolute top-28 right-4 w-1 h-24 bg-cyan-300/50 transform -rotate-12"></div>
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-4 w-1 h-16 bg-cyan-300/50"></div>
                      <div className="absolute bottom-20 left-1/2 transform translate-x-3 w-1 h-16 bg-cyan-300/50"></div>
                    </div>
                    
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 via-blue-500/20 to-cyan-600/30 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Holographic scan lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                        style={{
                          top: `${10 + i * 7}%`,
                          animation: `scan-line 3s ease-in-out infinite ${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating data particles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{
                      left: `${10 + (i * 7) % 80}%`,
                      top: `${15 + (i * 11) % 70}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${2 + (i % 3)}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Holographic grid background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              {/* Energy rings */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-cyan-400/30 rounded-full"
                  style={{
                    width: `${200 + i * 80}px`,
                    height: `${200 + i * 80}px`,
                    animation: `rotate 10s linear infinite ${i * -2.5}s`,
                  }}
                />
              ))}
            </div>
            
            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Holographic projection active • Photorealistic avatar
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-xs text-cyan-400 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
              Neural interface active
            </div>
          </div>
        </AnimatedWrapper>
      </div>
      
      <style jsx>{`
        @keyframes scan-line {
          0%, 100% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        
        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
