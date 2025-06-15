import { ShieldCheck, Cpu, Droplets, Zap } from 'lucide-react';
import { ReactNode } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';
import React, { useRef, useState } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
    <div className="flex items-start">
      <div className="mr-4 text-pink-400">{icon}</div>
      <div>
        <h3 className="text-xl font-orbitron font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

export const Features = () => {
  // For the glowing mouse-follow effect
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  // Mouse movement handler
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = imgContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }
  function handleMouseLeave() {
    setGlowPos(null);
  }

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper threshold={0.2}>
            <div
              ref={imgContainerRef}
              className="relative h-full min-h-[400px] md:min-h-full flex items-center justify-center group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{}}
            >
              {/* Glowing effect that follows the mouse */}
              {glowPos && (
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: glowPos.x - 100,
                    top: glowPos.y - 100,
                    width: 200,
                    height: 200,
                    borderRadius: '9999px',
                    background:
                      'radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(30,0,50,0.02) 80%, transparent 100%)',
                    filter: 'blur(12px)',
                    zIndex: 3,
                    transition: 'left 100ms, top 100ms',
                  }}
                />
              )}

              {/* Vertical robot/android image with premium borders (different robot) */}
              <div className="relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80"
                  alt="Tall futuristic robot statue"
                  className="w-auto h-[520px] max-w-[340px] object-cover rounded-2xl border-2 border-pink-400/50 bg-black"
                  style={{
                    zIndex: 2,
                    boxShadow: `
                      0 0 100px 12px rgba(236, 72, 153, 0.32),
                      0 4px 44px 0px rgba(197, 82, 255, 0.14)
                    `,
                    background: "linear-gradient(150deg, rgba(236,72,153,0.09) 0%, rgba(124,58,237,0.18) 100%)"
                  }}
                />
                {/* Soft glow outer border, like legacy style */}
                <div
                  className="absolute inset-0 rounded-2xl ring-4 ring-pink-500/30 pointer-events-none"
                  style={{
                    filter: "blur(4px)",
                    zIndex: 1,
                  }}
                />
              </div>
            </div>
          </AnimatedWrapper>
          <div className="space-y-8">
            <AnimatedWrapper threshold={0.5}>
              <h2 className="font-orbitron text-4xl font-bold text-white">Engineered for Emotion</h2>
            </AnimatedWrapper>
            <AnimatedWrapper threshold={0.5} delay={100}>
              <p className="text-lg text-gray-400">
                Zura is more than technology; it's a vessel for human connection, designed with precision, security, and warmth at its core.
              </p>
            </AnimatedWrapper>
            <div className="space-y-6">
              <AnimatedWrapper delay={200}>
                <FeatureCard 
                  icon={<Cpu size={28} />}
                  title="Hyper-Realistic Biometrics"
                  description="Our proprietary AI captures over 50,000 data points to create a likeness that's indistinguishable from life."
                />
              </AnimatedWrapper>
              <AnimatedWrapper delay={350}>
                <FeatureCard 
                  icon={<Zap size={28} />}
                  title="Seamless Transformation"
                  description="The soft-bodied chassis morphs silently and smoothly in under 10 seconds, powered by advanced nano-muscles."
                />
              </AnimatedWrapper>
              <AnimatedWrapper delay={500}>
                <FeatureCard 
                  icon={<Droplets size={28} />}
                  title="True Haptic Feedback"
                  description="Integrated thermal regulators and micro-vibrators replicate body warmth and the subtle sensation of breathing."
                />
              </AnimatedWrapper>
              <AnimatedWrapper delay={650}>
                <FeatureCard 
                  icon={<ShieldCheck size={28} />}
                  title="Ironclad Security"
                  description="End-to-end encryption with biometric authentication ensures your personal presence data is safe and private."
                />
              </AnimatedWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
