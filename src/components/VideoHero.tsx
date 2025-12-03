import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function VideoHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Video Container */}
      <div 
        className={`relative w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden border-2 border-primary/30 box-glow-cyan transition-all duration-1000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <iframe
          src="https://www.youtube.com/embed/15TzQSNZJc0?autoplay=1&mute=1&loop=1&playlist=15TzQSNZJc0&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Portfolio Introduction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none scanline opacity-30" />
      </div>

      {/* Title */}
      <div 
        className={`mt-8 text-center transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gradient-text glitch"
          data-text="VELARIX"
        >
          VELARIX
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground font-body tracking-wide">
          Digital Solutions & Creative Development
        </p>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToProjects}
        className={`absolute bottom-8 flex flex-col items-center gap-2 text-primary hover:text-secondary transition-all duration-500 group ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <span className="text-sm font-body uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          Explore Projects
        </span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
