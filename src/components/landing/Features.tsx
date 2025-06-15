import { ShieldCheck, Cpu, Droplets, Zap } from 'lucide-react';
import { ReactNode } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';
import { Rocket } from 'lucide-react';

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
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper threshold={0.2}>
            <div className="relative h-full min-h-[400px] md:min-h-full rounded-xl overflow-hidden p-8 flex items-center justify-center border border-gray-800">
              <div className="features-background"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="relative z-10 text-center">
                <Rocket className="h-24 w-24 text-white/50 mx-auto" />
                <p className="text-white/60 mt-4 font-orbitron">Engineered for Emotion</p>
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
