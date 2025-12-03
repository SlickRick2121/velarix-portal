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
    gradient: 'from-neon-cyan/20 to-neon-cyan/5',
    border: 'border-neon-cyan/30',
    text: 'text-neon-cyan',
    glow: '0 0 30px hsl(180 100% 50% / 0.3)',
  },
  magenta: {
    gradient: 'from-neon-magenta/20 to-neon-magenta/5',
    border: 'border-neon-magenta/30',
    text: 'text-neon-magenta',
    glow: '0 0 30px hsl(300 100% 60% / 0.3)',
  },
  purple: {
    gradient: 'from-neon-purple/20 to-neon-purple/5',
    border: 'border-neon-purple/30',
    text: 'text-neon-purple',
    glow: '0 0 30px hsl(270 100% 65% / 0.3)',
  },
};

export default function ProjectCard({ title, url, description, color, index }: ProjectCardProps) {
  const colors = colorClasses[color];
  const domain = url.replace('https://', '').replace('http://', '');
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <a
      ref={cardRef}
      href={`https://${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card-3d-wrapper block"
      style={{ 
        perspective: '1000px',
        animationDelay: `${index * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`card-3d relative p-6 rounded-xl border ${colors.border} bg-gradient-to-br ${colors.gradient} backdrop-blur-md overflow-hidden transition-all duration-200`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'translateZ(20px)' : ''}`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? colors.glow : 'none',
        }}
      >
        {/* Glowing orb effect */}
        <div 
          className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-20'}`}
          style={{
            background: `radial-gradient(circle, ${color === 'cyan' ? 'hsl(180, 100%, 50%)' : color === 'magenta' ? 'hsl(300, 100%, 60%)' : 'hsl(270, 100%, 65%)'} 0%, transparent 70%)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className={`p-3 rounded-lg bg-card/50 border ${colors.border}`}>
            <Globe className={`w-6 h-6 ${colors.text}`} />
          </div>
          <ExternalLink className={`w-5 h-5 transition-all duration-300 ${isHovered ? colors.text + ' opacity-100 translate-x-1 -translate-y-1' : 'text-muted-foreground opacity-0'}`} />
        </div>

        {/* Content */}
        <h3 className={`text-xl font-display font-semibold mb-2 ${colors.text} relative z-10`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2 relative z-10">
          {description}
        </p>

        {/* URL */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono relative z-10">
          <span className={`w-2 h-2 rounded-full ${colors.text} animate-pulse`} 
            style={{ boxShadow: `0 0 8px ${color === 'cyan' ? 'hsl(180, 100%, 50%)' : color === 'magenta' ? 'hsl(300, 100%, 60%)' : 'hsl(270, 100%, 65%)'}` }}
          />
          {domain}
        </div>

        {/* 3D inner card effect */}
        <div 
          className={`absolute inset-0 rounded-xl border ${colors.border} pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: 'translateZ(40px)',
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)',
          }}
        />
      </div>
    </a>
  );
}
