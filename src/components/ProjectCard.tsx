import { useState, useRef } from 'react';
import { ExternalLink, Globe } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  url: string;
  description: string;
  color: 'cyan' | 'magenta' | 'purple';
  index: number;
}

const colorClasses = {
  cyan: {
    primary: '#00ffff',
    secondary: '#00cccc',
    text: 'text-neon-cyan',
  },
  magenta: {
    primary: '#ff00ff',
    secondary: '#cc00cc',
    text: 'text-neon-magenta',
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    text: 'text-neon-purple',
  },
};

export default function ProjectCard({ title, url, description, color, index }: ProjectCardProps) {
  const colors = colorClasses[color];
  const domain = url.replace('https://', '').replace('http://', '');
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <a
      ref={cardRef}
      href={`https://${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="glass-card-inner"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="glass-card-content relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-background/20 backdrop-blur-sm border border-white/10">
              <Globe className={`w-6 h-6 ${colors.text}`} />
            </div>
            <ExternalLink className={`w-5 h-5 ${colors.text} opacity-70 hover:opacity-100 transition-opacity`} />
          </div>

          <h3 className={`text-xl font-display font-semibold mb-2 ${colors.text}`}>
            {title}
          </h3>

          <p className="text-white/70 text-sm font-body mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
            <span
              className={`w-2 h-2 rounded-full ${colors.text} animate-pulse`}
              style={{ boxShadow: `0 0 8px ${colors.primary}` }}
            />
            {domain}
          </div>
        </div>

        <div
          className="glass-card-glow"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.primary}33, transparent 70%)`,
          }}
        />

        <div
          className="glass-card-shine"
          style={{
            background: `linear-gradient(135deg, transparent 40%, ${colors.primary}22 50%, transparent 60%)`,
          }}
        />
      </div>
    </a>
  );
}
