import { Suspense } from 'react';
import ThreeBackground from '@/components/ThreeBackground';
import VideoHero from '@/components/VideoHero';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
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
