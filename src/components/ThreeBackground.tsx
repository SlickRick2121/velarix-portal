import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * 1500;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
        this.radius = Math.random() * 2 + 1;

        const colors = ['#00ffff', '#ff00ff', '#8b5cf6', '#00ff88'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;

        if (this.z < 1) {
          this.z = 1500;
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
        }

        if (Math.abs(this.x) > width / 2) this.vx *= -1;
        if (Math.abs(this.y) > height / 2) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + width / 2;
        const y2d = this.y * scale + height / 2;
        const radius2d = this.radius * scale;

        if (x2d < 0 || x2d > width || y2d < 0 || y2d > height) return;

        const alpha = (1 - this.z / 1500) * 0.8;

        ctx.beginPath();
        ctx.arc(x2d, y2d, Math.max(radius2d, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, radius2d * 3);
        gradient.addColorStop(0, this.color + '44');
        gradient.addColorStop(1, this.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius2d * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, canvas.width, canvas.height);

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dz = particle.z - other.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 150) {
            const scale1 = 1000 / (1000 + particle.z);
            const scale2 = 1000 / (1000 + other.z);
            const x1 = particle.x * scale1 + canvas.width / 2;
            const y1 = particle.y * scale1 + canvas.height / 2;
            const x2 = other.x * scale2 + canvas.width / 2;
            const y2 = other.y * scale2 + canvas.height / 2;

            const alpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, #0a0a14 0%, #141420 100%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70 pointer-events-none" />
    </div>
  );
}
