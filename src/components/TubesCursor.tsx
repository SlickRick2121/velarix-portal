import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const tubeColors = ['#00ffff', '#ff00ff', '#8b5cf6', '#00ff88'];
const lightColors = ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'];

interface TubePoint {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

function TubesEffect() {
  const { viewport, pointer } = useThree();
  const tubesRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<TubePoint[][]>([]);
  const mouseRef = useRef(new THREE.Vector3());
  const targetRef = useRef(new THREE.Vector3());

  // Initialize tube points
  useEffect(() => {
    pointsRef.current = tubeColors.map(() => {
      const points: TubePoint[] = [];
      for (let i = 0; i < 20; i++) {
        points.push({
          position: new THREE.Vector3(0, 0, 0),
          velocity: new THREE.Vector3(0, 0, 0),
        });
      }
      return points;
    });
  }, []);

  useFrame(() => {
    // Update target position based on mouse
    targetRef.current.x = (pointer.x * viewport.width) / 2;
    targetRef.current.y = (pointer.y * viewport.height) / 2;
    
    // Smooth follow
    mouseRef.current.lerp(targetRef.current, 0.15);

    // Update each tube
    pointsRef.current.forEach((tube, tubeIndex) => {
      tube.forEach((point, pointIndex) => {
        if (pointIndex === 0) {
          // First point follows mouse with offset
          const offset = new THREE.Vector3(
            Math.sin(Date.now() * 0.002 + tubeIndex * 1.5) * 0.3,
            Math.cos(Date.now() * 0.002 + tubeIndex * 1.5) * 0.3,
            0
          );
          point.position.lerp(mouseRef.current.clone().add(offset), 0.3);
        } else {
          // Following points follow the previous point
          const prev = tube[pointIndex - 1];
          const dist = point.position.distanceTo(prev.position);
          if (dist > 0.1) {
            point.velocity.copy(prev.position).sub(point.position).multiplyScalar(0.2);
            point.position.add(point.velocity);
          }
        }
      });
    });

    // Update tube geometries
    if (tubesRef.current) {
      tubesRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Line && pointsRef.current[index]) {
          const positions = new Float32Array(pointsRef.current[index].length * 3);
          pointsRef.current[index].forEach((point, i) => {
            positions[i * 3] = point.position.x;
            positions[i * 3 + 1] = point.position.y;
            positions[i * 3 + 2] = point.position.z;
          });
          child.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          child.geometry.attributes.position.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group ref={tubesRef}>
      {tubeColors.map((color, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={20}
              array={new Float32Array(60)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            linewidth={3}
            transparent
            opacity={0.7}
          />
        </line>
      ))}
      {/* Light points at the head of each tube */}
      {lightColors.map((color, index) => (
        <pointLight
          key={`light-${index}`}
          color={color}
          intensity={0.5}
          distance={3}
          position={[0, 0, 0]}
        />
      ))}
    </group>
  );
}

export default function TubesCursor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <TubesEffect />
      </Canvas>
    </div>
  );
}
