import { Suspense, useState, useEffect } from 'react';
import ThreeBackground from '@/components/ThreeBackground';
import VideoHero from '@/components/VideoHero';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import TubesCursor from '@/components/TubesCursor';

const Index = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loader this session
    const hasSeenLoader = sessionStorage.getItem('velarix-loader-shown');
    
    if (!hasSeenLoader) {
      setShowLoader(true);
    } else {
      setIsReady(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('velarix-loader-shown', 'true');
    setShowLoader(false);
    setIsReady(true);
  };

  if (showLoader) {
    return <LoadingScreen onComplete={handleLoaderComplete} />;
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Tubes Cursor Effect */}
      <TubesCursor />

      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Content */}
      <main className="relative z-10">
        <VideoHero />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
