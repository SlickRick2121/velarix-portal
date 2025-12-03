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
    border: 'hover:border-neon-cyan/60',
    glow: 'hover:box-glow-cyan',
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
  },
  magenta: {
    border: 'hover:border-neon-magenta/60',
    glow: 'hover:box-glow-magenta',
    text: 'text-neon-magenta',
    bg: 'bg-neon-magenta/10',
  },
  purple: {
    border: 'hover:border-neon-purple/60',
    glow: 'hover:box-glow-purple',
    text: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
  },
};

export default function ProjectCard({ title, url, description, color, index }: ProjectCardProps) {
  const colors = colorClasses[color];
  const domain = url.replace('https://', '').replace('http://', '');

  return (
    <a
      href={`https://${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group project-card p-6 block ${colors.border} ${colors.glow}`}
      style={{ 
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Globe className={`w-6 h-6 ${colors.text}`} />
        </div>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <h3 className={`text-xl font-display font-semibold mb-2 ${colors.text}`}>
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2">
        {description}
      </p>

      {/* URL */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
        <span className={`w-2 h-2 rounded-full ${colors.bg} ${colors.text} animate-pulse`} />
        {domain}
      </div>

      {/* Decorative corner */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
        style={{ 
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }} 
      />
    </a>
  );
}
