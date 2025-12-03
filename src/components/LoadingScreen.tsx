import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [loadingText, setLoadingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Loading...';

  useEffect(() => {
    // Type out the loading text
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setLoadingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        // Wait a bit then complete
        setTimeout(onComplete, 800);
      }
    }, 150);

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="terminal-loader">
        <div className="terminal-header">
          <span className="terminal-title">Status</span>
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
        </div>
        <div className="terminal-body">
          <span className="terminal-text text-neon-cyan">
            {loadingText}
            <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
          </span>
        </div>
      </div>
    </div>
  );
}
