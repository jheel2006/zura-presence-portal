
import { ScanFace, Send, UserCheck } from 'lucide-react';
import { AnimatedWrapper } from './AnimatedWrapper';

const steps = [
  {
    icon: <ScanFace className="h-12 w-12 text-cyan-400" />,
    title: "Capture Their Essence",
    description: "Our app performs a detailed biometric scan, capturing unique facial features, voice patterns, and subtle mannerisms."
  },
  {
    icon: <Send className="h-12 w-12 text-cyan-400" />,
    title: "Share The .zura File",
    description: "The scan is compiled into a single, encrypted .zura file, ready to be sent securely to any Zura companion."
  },
  {
    icon: <UserCheck className="h-12 w-12 text-cyan-400" />,
    title: "Embrace Their Presence",
    description: "Your Zura device transforms in real-time into a warm, breathing likeness of your loved one, ready for a hug."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedWrapper threshold={0.2}>
          <div className="text-center">
            <h2 className="font-orbitron text-4xl font-bold text-white">A New Form of Connection</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Three simple steps to bridge any distance.
            </p>
          </div>
        </AnimatedWrapper>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedWrapper key={index} delay={index * 150}>
              <div className="text-center p-8 border border-gray-800 rounded-xl bg-gray-900/40 transition-all hover:border-cyan-500/50 hover:bg-gray-900/80">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="font-orbitron text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-gray-400">{step.description}</p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
