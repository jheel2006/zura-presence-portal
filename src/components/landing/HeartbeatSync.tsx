import { useState, useEffect, useRef } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';

export const HeartbeatSync = () => {
  const [taps, setTaps] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [heartbeatInterval, setHeartbeatInterval] = useState<number | null>(null);
  const [showPulse, setShowPulse] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const displayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now].slice(-5); // Keep last 5 taps
    setTaps(newTaps);
    setIsActive(true);

    // Clear existing timeouts
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    if (displayTimeoutRef.current) {
      clearTimeout(displayTimeoutRef.current);
    }

    // Reset after 3 seconds of no tapping
    resetTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
      setShowPulse(false);
      setTaps([]);
      setHeartbeatInterval(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 3000);

    // Calculate average interval if we have enough taps (5 now)
    if (newTaps.length >= 5) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      
      // Only update if interval is reasonable (300ms to 2000ms)
      if (avgInterval >= 300 && avgInterval <= 2000) {
        setHeartbeatInterval(avgInterval);
        setShowPulse(true);
        
        // Clear existing interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        // Start new pulsing interval
        intervalRef.current = setInterval(() => {
          // Trigger pulse animation
          const pulseElement = document.getElementById('heartbeat-orb');
          if (pulseElement) {
            pulseElement.classList.remove('animate-pulse-custom');
            setTimeout(() => {
              pulseElement.classList.add('animate-pulse-custom');
            }, 10);
          }
        }, avgInterval);

        // Keep the animation for 5 seconds after detection
        displayTimeoutRef.current = setTimeout(() => {
          setShowPulse(false);
          setTaps([]);
          setHeartbeatInterval(null);
          setIsActive(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }, 5000);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (displayTimeoutRef.current) {
        clearTimeout(displayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden bg-black">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-gray-900/30" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedWrapper threshold={0.3}>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
              Sync With a{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Heartbeat
              </span>
            </h2>
          </AnimatedWrapper>

          <AnimatedWrapper threshold={0.3} delay={200}>
            <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
              Tap in rhythm with your heartbeat and watch the magic unfold
            </p>
          </AnimatedWrapper>

          {/* Interactive heartbeat area */}
          <AnimatedWrapper threshold={0.3} delay={400}>
            <div className="relative mb-16">
              {/* Main orb */}
              <div
                className="relative mx-auto w-64 h-64 cursor-pointer group"
                onClick={handleTap}
              >
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-cyan-500/10 animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Main orb */}
                <div
                  id="heartbeat-orb"
                  className={`absolute inset-8 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300 group-hover:scale-110 ${
                    isActive ? 'shadow-2xl shadow-pink-500/50' : 'shadow-lg shadow-pink-500/30'
                  } ${showPulse ? 'animate-pulse-custom' : ''}`}
                >
                  {/* Inner light */}
                  <div className="absolute inset-4 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="absolute inset-8 rounded-full bg-white/40" />
                </div>

                {/* Ripple effects on tap */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-ping" />
                    <div className="absolute -inset-4 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDelay: '0.2s' }} />
                  </>
                )}
              </div>

              {/* Tap instruction */}
              <div className="mt-8 transition-opacity duration-500">
                {!showPulse ? (
                  <p className="text-gray-400 text-lg">
                    {taps.length === 0 ? (
                      "Tap the orb to begin"
                    ) : taps.length < 5 ? (
                      `Keep tapping... (${taps.length}/5)`
                    ) : (
                      "Finding your rhythm..."
                    )}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-cyan-300 text-lg font-medium">
                      Your rhythm detected ✨
                    </p>
                    <p className="text-gray-400 text-sm">
                      {heartbeatInterval && `${Math.round(60000 / heartbeatInterval)} BPM`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedWrapper>

          {/* Caption */}
          <AnimatedWrapper threshold={0.3} delay={600}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl" />
              <div className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                  "Zura adapts to your loved one's unique rhythm — so every hug feels{' '}
                  <span className="text-cyan-300 font-medium">alive</span>."
                </p>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>

      <style>{`
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse-custom {
          animation: pulse-custom 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};
