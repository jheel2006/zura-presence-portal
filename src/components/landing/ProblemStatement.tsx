
import { useState, useEffect } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';
import { Phone, MessageSquare, Video, Users } from 'lucide-react';

const StatCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const ProblemStatement = () => {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      <div className="features-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper threshold={0.2}>
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative w-80 h-[600px] mx-auto bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-8 border-gray-800 shadow-2xl">
                {/* Screen */}
                <div className="absolute inset-4 bg-black rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-8 bg-gray-900 flex items-center justify-between px-4 text-xs text-gray-400">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-gray-600 rounded-sm"></div>
                      <div className="w-6 h-2 bg-gray-600 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Chat interface */}
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <h3 className="text-white font-semibold mb-2">Mom</h3>
                      <p className="text-xs text-gray-400">Last seen 2 hours ago</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
                        <p className="text-sm">Hey mom, how are you feeling today?</p>
                      </div>
                      
                      <div className="bg-gray-700 text-white p-3 rounded-2xl rounded-bl-md max-w-[80%]">
                        <p className="text-sm">I'm okay, just missing you so much 💔</p>
                      </div>
                      
                      <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-md max-w-[80%] ml-auto">
                        <p className="text-sm">I wish I could give you a hug right now</p>
                      </div>
                      
                      <div className="bg-gray-700 text-white p-3 rounded-2xl rounded-bl-md max-w-[80%]">
                        <p className="text-sm">Me too, sweetie. Video calls just aren't the same 😢</p>
                      </div>
                    </div>
                    
                    {/* Typing indicator */}
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs">Mom is typing...</span>
                    </div>
                  </div>
                </div>
                
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Floating icons around phone */}
              <div className="absolute -top-4 -left-4 text-red-400 animate-pulse">
                <MessageSquare size={24} />
              </div>
              <div className="absolute top-20 -right-8 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Video size={28} />
              </div>
              <div className="absolute -bottom-8 left-8 text-green-400 animate-pulse" style={{ animationDelay: '1s' }}>
                <Phone size={26} />
              </div>
            </div>
          </AnimatedWrapper>
          
          <div className="space-y-8">
            <AnimatedWrapper threshold={0.5}>
              <h2 className="font-orbitron text-4xl font-bold text-white">
                The Distance Problem
              </h2>
            </AnimatedWrapper>
            
            <AnimatedWrapper threshold={0.5} delay={100}>
              <p className="text-lg text-gray-400">
                In our hyper-connected world, we're more isolated than ever. Digital communication lacks the warmth, presence, and physical comfort that human connection requires.
              </p>
            </AnimatedWrapper>
            
            <div className="grid grid-cols-2 gap-6">
              <AnimatedWrapper delay={200}>
                <div className="text-center p-6 bg-gray-900/40 rounded-xl border border-gray-800">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    <StatCounter end={74} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-400">of people feel lonelier than ever despite social media</p>
                </div>
              </AnimatedWrapper>
              
              <AnimatedWrapper delay={350}>
                <div className="text-center p-6 bg-gray-900/40 rounded-xl border border-gray-800">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    <StatCounter end={3.2} suffix="B" />
                  </div>
                  <p className="text-sm text-gray-400">video calls made daily, yet physical touch remains impossible</p>
                </div>
              </AnimatedWrapper>
              
              <AnimatedWrapper delay={500}>
                <div className="text-center p-6 bg-gray-900/40 rounded-xl border border-gray-800">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    <StatCounter end={89} suffix="%" />
                  </div>
                  <p className="text-sm text-gray-400">miss physical presence in long-distance relationships</p>
                </div>
              </AnimatedWrapper>
              
              <AnimatedWrapper delay={650}>
                <div className="text-center p-6 bg-gray-900/40 rounded-xl border border-gray-800">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    <StatCounter end={12} suffix="hrs" />
                  </div>
                  <p className="text-sm text-gray-400">average daily screen time, searching for connection</p>
                </div>
              </AnimatedWrapper>
            </div>
            
            <AnimatedWrapper delay={800}>
              <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-6 rounded-xl border border-pink-500/20">
                <p className="text-cyan-300 font-semibold mb-2">The Solution?</p>
                <p className="text-gray-300">
                  What if technology could bridge not just our voices and faces, but our physical presence itself? 
                  What if a hug could travel across continents in seconds?
                </p>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};
