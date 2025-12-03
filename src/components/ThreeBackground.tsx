import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Octahedron, Torus } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, speed, distort }: { 
  position: [number, number, number]; 
  color: string; 
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Icosahedron>
    </Float>
  );
}

function TorusShape({ position, color, speed }: { 
  position: [number, number, number]; 
  color: string; 
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[0.8, 0.3, 16, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
}

function OctahedronShape({ position, color, speed }: { 
  position: [number, number, number]; 
  color: string; 
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Octahedron ref={meshRef} args={[0.7]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.25}
          wireframe
        />
      </Octahedron>
    </Float>
  );
}

function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#8b5cf6" angle={0.5} />
      
      <FloatingShape position={[-4, 2, -3]} color="#00ffff" speed={1.5} distort={0.4} />
      <FloatingShape position={[4, -1, -4]} color="#ff00ff" speed={1.2} distort={0.3} />
      <FloatingShape position={[0, 3, -5]} color="#8b5cf6" speed={1} distort={0.5} />
      
      <TorusShape position={[-3, -2, -2]} color="#00ffff" speed={0.8} />
      <TorusShape position={[5, 1, -3]} color="#ff00ff" speed={1.1} />
      
      <OctahedronShape position={[2, -3, -4]} color="#8b5cf6" speed={0.9} />
      <OctahedronShape position={[-5, 0, -5]} color="#00ffff" speed={0.7} />
      
      <Particles />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 pointer-events-none" />
    </div>
  );
}
