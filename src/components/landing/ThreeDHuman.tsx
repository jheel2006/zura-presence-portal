
import { useEffect, useRef, useState } from 'react';
import { AnimatedWrapper } from './AnimatedWrapper';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const ThreeDHuman = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create human silhouette points
    const createHumanSilhouette = () => {
      const particles: Particle[] = [];
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      const scale = Math.min(canvas.clientWidth, canvas.clientHeight) / 600;

      // Head (circle)
      for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
        const radius = 60 * scale;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY - 180 * scale + Math.sin(angle) * radius;
        particles.push({
          x: centerX + (Math.random() - 0.5) * 400,
          y: centerY + (Math.random() - 0.5) * 400,
          targetX: x,
          targetY: y,
          vx: 0,
          vy: 0,
          size: 2 + Math.random() * 3,
          opacity: 0.6 + Math.random() * 0.4
        });
      }

      // Neck
      for (let y = -120; y <= -80; y += 8) {
        for (let x = -10; x <= 10; x += 8) {
          particles.push({
            x: centerX + (Math.random() - 0.5) * 400,
            y: centerY + (Math.random() - 0.5) * 400,
            targetX: centerX + x * scale,
            targetY: centerY + y * scale,
            vx: 0,
            vy: 0,
            size: 2 + Math.random() * 2,
            opacity: 0.6 + Math.random() * 0.4
          });
        }
      }

      // Torso
      for (let y = -80; y <= 80; y += 6) {
        const width = 80 - Math.abs(y) * 0.3;
        for (let x = -width; x <= width; x += 8) {
          if (Math.abs(x) > width - 15 || Math.random() > 0.7) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 400,
              y: centerY + (Math.random() - 0.5) * 400,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 2 + Math.random() * 3,
              opacity: 0.5 + Math.random() * 0.5
            });
          }
        }
      }

      // Arms
      for (let side of [-1, 1]) {
        for (let y = -60; y <= 40; y += 8) {
          const armX = side * (60 + (y + 60) * 0.3);
          for (let x = armX - 15; x <= armX + 15; x += 8) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 400,
              y: centerY + (Math.random() - 0.5) * 400,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 2 + Math.random() * 2,
              opacity: 0.5 + Math.random() * 0.5
            });
          }
        }
      }

      // Legs
      for (let side of [-1, 1]) {
        for (let y = 80; y <= 220; y += 8) {
          const legX = side * 30;
          for (let x = legX - 20; x <= legX + 20; x += 8) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 400,
              y: centerY + (Math.random() - 0.5) * 400,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 2 + Math.random() * 3,
              opacity: 0.5 + Math.random() * 0.5
            });
          }
        }
      }

      return particles;
    };

    particlesRef.current = createHumanSilhouette();
    setIsLoaded(true);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      
      particlesRef.current.forEach(particle => {
        // Calculate attraction to target position
        const targetForceX = (particle.targetX - particle.x) * 0.02;
        const targetForceY = (particle.targetY - particle.y) * 0.02;

        // Calculate mouse repulsion
        let repulsionX = 0;
        let repulsionY = 0;
        
        if (mouseRef.current.isHovering) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 100;
          
          if (distance < repulsionRadius && distance > 0) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            repulsionX = (dx / distance) * force * 3;
            repulsionY = (dy / distance) * force * 3;
          }
        }

        // Apply forces
        particle.vx += targetForceX + repulsionX;
        particle.vy += targetForceY + repulsionY;
        
        // Apply damping
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(0.5, '#0088ff');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
              Experience the future of human-digital interaction through particle-based avatar technology
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-[700px] rounded-2xl bg-gradient-to-br from-blue-900/10 to-cyan-900/10 backdrop-blur-sm border border-cyan-500/20 shadow-2xl cursor-crosshair"
            />
            
            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Particle System Active • Hover to interact
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-xs text-cyan-400 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/20">
              {isLoaded ? `${particlesRef.current.length} particles` : 'Loading...'}
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};
