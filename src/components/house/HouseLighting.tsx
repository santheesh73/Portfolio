"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HouseLightingProps {
  isEntranceHovered?: boolean;
  reducedMotion?: boolean;
}

export function HouseLighting({
  isEntranceHovered = false,
  reducedMotion = false,
}: HouseLightingProps) {
  const entranceLightRef = useRef<THREE.PointLight>(null);
  const porchSpotRef = useRef<THREE.SpotLight>(null);

  useFrame((_, delta) => {
    // Smooth transition of entrance light intensity when hovered
    const targetIntensity = isEntranceHovered ? 2.6 : 1.7;
    const lerpSpeed = reducedMotion ? 1 : delta * 4;

    if (entranceLightRef.current) {
      entranceLightRef.current.intensity = THREE.MathUtils.lerp(
        entranceLightRef.current.intensity,
        targetIntensity,
        lerpSpeed
      );
    }
    if (porchSpotRef.current) {
      porchSpotRef.current.intensity = THREE.MathUtils.lerp(
        porchSpotRef.current.intensity,
        isEntranceHovered ? 2.8 : 1.9,
        lerpSpeed
      );
    }
  });

  return (
    <group name="house-lighting">
      {/* 1. Deep Dusk Ambient Fill: Prevents shadow crushing while keeping darkness */}
      <ambientLight color="#0d1527" intensity={0.42} />

      {/* 2. Hemisphere Light: Cool sky reflection above, subtle warm earth bounce below */}
      <hemisphereLight
        args={["#1e293b", "#09090b", 0.45]}
      />

      {/* 3. Directional Moonlight (Main Exterior Key Light) */}
      <directionalLight
        position={[14, 18, 12]}
        color="#93c5fd"
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
      />

      {/* 4. Subtle Cool Rim Light (defines house silhouette against the dark background) */}
      <directionalLight
        position={[-16, 10, -10]}
        color="#38bdf8"
        intensity={0.35}
      />

      {/* 5. Warm Window Interior Lights: Gives life and curiosity to the residence */}
      {/* Upper Floor Living/Gallery Window Glow */}
      <pointLight
        position={[-1.8, 3.8, 1.0]}
        color="#fbbf24"
        intensity={2.2}
        distance={7.5}
        decay={2}
      />

      {/* Ground Floor Corner Window Glow */}
      <pointLight
        position={[-2.4, 1.4, 2.2]}
        color="#f59e0b"
        intensity={1.9}
        distance={6.5}
        decay={2}
      />

      {/* Upper Right Studio Window (Soft Warm Ambient) */}
      <pointLight
        position={[2.8, 3.6, 0.2]}
        color="#fbbf24"
        intensity={1.4}
        distance={5.0}
        decay={2}
      />

      {/* 6. Entrance / Porch Focal Light: Inviting, warm, brighter than the rest of the exterior */}
      <pointLight
        ref={entranceLightRef}
        position={[1.65, 2.4, 2.6]}
        color="#fed7aa"
        intensity={1.7}
        distance={5.5}
        decay={2}
      />

      {/* Focused downlight beam onto the front door */}
      <spotLight
        ref={porchSpotRef}
        position={[1.65, 2.65, 2.4]}
        target-position={[1.65, 0.4, 2.4]}
        color="#ffedd5"
        intensity={1.9}
        angle={Math.PI / 4.2}
        penumbra={0.7}
        distance={5.0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.0001}
      />

      {/* 7. Low-profile Pathway Marker Lights (Leading lines to entrance) */}
      <pointLight
        position={[1.3, 0.15, 5.0]}
        color="#fde047"
        intensity={0.4}
        distance={2.4}
        decay={2}
      />
      <pointLight
        position={[2.0, 0.15, 8.2]}
        color="#fde047"
        intensity={0.35}
        distance={2.4}
        decay={2}
      />
      <pointLight
        position={[2.8, 0.15, 11.5]}
        color="#fde047"
        intensity={0.3}
        distance={2.4}
        decay={2}
      />
    </group>
  );
}
