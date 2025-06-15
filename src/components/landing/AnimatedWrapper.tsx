
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const AnimatedWrapper = ({ children, delay, threshold = 0.1 }: { children: ReactNode, delay?: number, threshold?: number }) => {
    const { ref, isInView } = useScrollAnimation({ threshold });

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-out",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${delay || 0}ms` }}
        >
            {children}
        </div>
    );
};
