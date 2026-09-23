"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphereProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

// Deterministic particle generation outside component for React 19 purity
const PARTICLE_COUNT = 36;
const STATIC_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const STATIC_PHASES = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Deterministic hash based on index
  const seed1 = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
  const seed2 = Math.abs(Math.sin((i + 1) * 78.233) * 43758.5453) % 1;
  const seed3 = Math.abs(Math.sin((i + 1) * 45.164) * 43758.5453) % 1;
  const seed4 = Math.abs(Math.sin((i + 1) * 91.345) * 43758.5453) % 1;

  STATIC_POSITIONS[i * 3] = (seed1 - 0.4) * 14;
  STATIC_POSITIONS[i * 3 + 1] = 0.4 + seed2 * 3.8;
  STATIC_POSITIONS[i * 3 + 2] = 2.0 + seed3 * 12;
  STATIC_PHASES[i] = seed4 * Math.PI * 2;
}

export function Atmosphere({
  scrollProgress = 0,
  reducedMotion = false,
}: AtmosphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => new Float32Array(STATIC_POSITIONS), []);
  const initialPhases = STATIC_PHASES;

  useFrame((state, delta) => {
    // 1. Modulate fog distance when entering interior (keeps foyer and corridor clear)
    if (state.scene.fog && state.scene.fog instanceof THREE.Fog) {
      const interiorFactor = Math.min(1, Math.max(0, (scrollProgress - 0.28) / 0.2));
      const targetNear = THREE.MathUtils.lerp(12, 24, interiorFactor);
      const targetFar = THREE.MathUtils.lerp(44, 65, interiorFactor);
      state.scene.fog.near = THREE.MathUtils.damp(state.scene.fog.near, targetNear, 4.0, delta);
      state.scene.fog.far = THREE.MathUtils.damp(state.scene.fog.far, targetFar, 4.0, delta);
    }

    if (reducedMotion || !pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < 36; i++) {
      const phase = initialPhases[i];
      // Gentle floating sine wave drift
      array[i * 3 + 1] += Math.sin(time * 0.8 + phase) * 0.0015;
      array[i * 3] += Math.cos(time * 0.5 + phase) * 0.001;

      // Wrap vertically within comfortable atmospheric band
      if (array[i * 3 + 1] > 4.5) array[i * 3 + 1] = 0.5;
      if (array[i * 3 + 1] < 0.3) array[i * 3 + 1] = 4.2;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <>
      {/* Blue-Hour Atmospheric Fog */}
      <fog attach="fog" args={["#080a12", 12, 44]} />

      {/* Atmospheric Motes / Fireflies */}
      {!reducedMotion && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            color="#fbbf24"
            transparent
            opacity={Math.max(0.04, 0.38 * (1 - scrollProgress * 1.6))}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
}
