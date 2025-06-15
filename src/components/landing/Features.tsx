
import { ShieldCheck, Cpu, Droplets, Zap } from 'lucide-react';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
    <div className="flex items-start">
      <div className="mr-4 text-cyan-400">{icon}</div>
      <div>
        <h3 className="text-xl font-orbitron font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

export const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
             <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
              alt="Futuristic technology" 
              className="rounded-xl w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
          <div className="space-y-8">
            <h2 className="font-orbitron text-4xl font-bold text-white">Engineered for Emotion</h2>
            <p className="text-lg text-gray-400">
              Zura is more than technology; it's a vessel for human connection, designed with precision, security, and warmth at its core.
            </p>
            <div className="space-y-6">
              <FeatureCard 
                icon={<Cpu size={28} />}
                title="Hyper-Realistic Biometrics"
                description="Our proprietary AI captures over 50,000 data points to create a likeness that's indistinguishable from life."
              />
              <FeatureCard 
                icon={<Zap size={28} />}
                title="Seamless Transformation"
                description="The soft-bodied chassis morphs silently and smoothly in under 10 seconds, powered by advanced nano-muscles."
              />
              <FeatureCard 
                icon={<Droplets size={28} />}
                title="True Haptic Feedback"
                description="Integrated thermal regulators and micro-vibrators replicate body warmth and the subtle sensation of breathing."
              />
              <FeatureCard 
                icon={<ShieldCheck size={28} />}
                title="Ironclad Security"
                description="End-to-end encryption with biometric authentication ensures your personal presence data is safe and private."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
