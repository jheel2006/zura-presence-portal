
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
  color: string;
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

    // Create realistic human body silhouette
    const createRealisticHuman = () => {
      const particles: Particle[] = [];
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      const scale = Math.min(canvas.clientWidth, canvas.clientHeight) / 700;

      const colors = ['#00ffff', '#0088ff', '#44ccff', '#88ddff', '#aaeeff'];

      // Head (detailed oval)
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const radiusX = 45 * scale;
        const radiusY = 55 * scale;
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY - 200 * scale + Math.sin(angle) * radiusY;
        
        // Add multiple layers for depth
        for (let layer = 0; layer < 3; layer++) {
          const offsetX = (Math.random() - 0.5) * 15;
          const offsetY = (Math.random() - 0.5) * 15;
          particles.push({
            x: centerX + (Math.random() - 0.5) * 600,
            y: centerY + (Math.random() - 0.5) * 600,
            targetX: x + offsetX,
            targetY: y + offsetY,
            vx: 0,
            vy: 0,
            size: 1.5 + Math.random() * 2,
            opacity: 0.6 + Math.random() * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      // Neck
      for (let y = -145; y <= -100; y += 4) {
        const width = 20 - Math.abs(y + 122.5) * 0.2;
        for (let x = -width; x <= width; x += 4) {
          particles.push({
            x: centerX + (Math.random() - 0.5) * 600,
            y: centerY + (Math.random() - 0.5) * 600,
            targetX: centerX + x * scale,
            targetY: centerY + y * scale,
            vx: 0,
            vy: 0,
            size: 1 + Math.random() * 2,
            opacity: 0.5 + Math.random() * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      // Torso (realistic chest and waist)
      for (let y = -100; y <= 100; y += 3) {
        let width;
        if (y < -50) {
          // Chest area - broader
          width = 70 - Math.abs(y + 75) * 0.3;
        } else if (y < 0) {
          // Upper torso
          width = 65 - Math.abs(y) * 0.2;
        } else {
          // Lower torso - narrower
          width = 50 - y * 0.1;
        }
        
        for (let x = -width; x <= width; x += 4) {
          // Create body outline and some internal structure
          if (Math.abs(x) > width - 20 || Math.random() > 0.6) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 2.5,
              opacity: 0.4 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }

      // Arms (more realistic proportions)
      for (let side of [-1, 1]) {
        // Upper arm
        for (let y = -80; y <= 20; y += 4) {
          const armX = side * (75 + (y + 80) * 0.2);
          const armWidth = 20 - Math.abs(y + 30) * 0.1;
          
          for (let x = armX - armWidth; x <= armX + armWidth; x += 4) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 1 + Math.random() * 2,
              opacity: 0.4 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
        
        // Forearm
        for (let y = 20; y <= 80; y += 4) {
          const armX = side * (95 + (y - 20) * 0.1);
          const armWidth = 15;
          
          for (let x = armX - armWidth; x <= armX + armWidth; x += 4) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 1 + Math.random() * 2,
              opacity: 0.4 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }

      // Legs (realistic thigh and calf)
      for (let side of [-1, 1]) {
        // Thigh
        for (let y = 100; y <= 180; y += 4) {
          const legX = side * (25 + (y - 100) * 0.1);
          const legWidth = 25 - (y - 100) * 0.1;
          
          for (let x = legX - legWidth; x <= legX + legWidth; x += 4) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 2.5,
              opacity: 0.4 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
        
        // Calf
        for (let y = 180; y <= 260; y += 4) {
          const legX = side * (35 - (y - 180) * 0.05);
          const legWidth = 18 - (y - 180) * 0.05;
          
          for (let x = legX - legWidth; x <= legX + legWidth; x += 4) {
            particles.push({
              x: centerX + (Math.random() - 0.5) * 600,
              y: centerY + (Math.random() - 0.5) * 600,
              targetX: centerX + x * scale,
              targetY: centerY + y * scale,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 2,
              opacity: 0.4 + Math.random() * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }

      return particles;
    };

    particlesRef.current = createRealisticHuman();
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
        const targetForceX = (particle.targetX - particle.x) * 0.03;
        const targetForceY = (particle.targetY - particle.y) * 0.03;

        // Calculate mouse repulsion
        let repulsionX = 0;
        let repulsionY = 0;
        
        if (mouseRef.current.isHovering) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 120;
          
          if (distance < repulsionRadius && distance > 0) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            repulsionX = (dx / distance) * force * 4;
            repulsionY = (dy / distance) * force * 4;
          }
        }

        // Apply forces
        particle.vx += targetForceX + repulsionX;
        particle.vy += targetForceY + repulsionY;
        
        // Apply damping
        particle.vx *= 0.88;
        particle.vy *= 0.88;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle with enhanced glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Large outer glow
        const outerGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 6
        );
        outerGradient.addColorStop(0, particle.color + '80');
        outerGradient.addColorStop(0.3, particle.color + '40');
        outerGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Medium glow
        const mediumGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        mediumGradient.addColorStop(0, particle.color);
        mediumGradient.addColorStop(0.5, particle.color + 'aa');
        mediumGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = mediumGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
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
              Experience the future of human-digital interaction through realistic particle-based avatar technology
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
                Realistic Digital Human • Hover to interact
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
