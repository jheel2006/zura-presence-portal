
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';

/**
 * Triggers fade/slide in every time an element enters the viewport (not just once).
 */
export const AnimatedWrapper = ({
  children,
  delay,
  threshold = 0.1
}: {
  children: ReactNode,
  delay?: number,
  threshold?: number
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  // Use a counter to force re-adding the animation class when isInView changes
  const animRef = useRef<HTMLDivElement | null>(null);

  // Note: 
  // The following class names use Tailwind's animation utilities 
  // and will re-trigger on isInView change

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView
          ? "opacity-100 translate-y-0 animate-fade-in"
          : "opacity-0 translate-y-10"
      )}
      style={{
        transitionDelay: `${delay || 0}ms`
      }}
    >
      {children}
    </div>
  );
};
