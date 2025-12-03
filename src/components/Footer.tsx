import { Code2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">VELARIX</span>
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Crafting digital experiences</span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground/60 text-sm font-mono">
            © {new Date().getFullYear()} Velarix Solutions
          </p>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
}
