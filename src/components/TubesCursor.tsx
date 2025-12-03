import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          hue: Math.random() * 60 + 170,
        });
      }

      if (particlesRef.current.length > 500) {
        particlesRef.current = particlesRef.current.slice(-500);
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.life > particle.maxLife) return false;

        const progress = particle.life / particle.maxLife;
        const alpha = 1 - progress;
        const size = (1 - progress) * 4 + 2;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        return true;
      });

      if (particlesRef.current.length > 1) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = 2;

        for (let i = 0; i < particlesRef.current.length - 1; i++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[i + 1];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            const alpha = (1 - p1.life / p1.maxLife) * (1 - distance / 50) * 0.5;

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.hue}, 100%, 60%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, 100%, 60%, ${alpha})`);

            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
