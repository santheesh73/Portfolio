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
      {/* 1. Soft Daylight Ambient Fill */}
      <ambientLight color="#fbf9f4" intensity={0.65} />

      {/* 2. Hemisphere Light: Pale morning sky above, warm limestone ground bounce below */}
      <hemisphereLight
        args={["#e0f2fe", "#f5ede4", 0.85]}
      />

      {/* 3. Directional Sun Key Light (Main Architectural Daylight Source) */}
      <directionalLight
        position={[14, 22, 12]}
        color="#fffcf4"
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={42}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
      />

      {/* 4. Soft Sky Fill Light (Softens contrast on western facades) */}
      <directionalLight
        position={[-12, 16, 8]}
        color="#f0f9ff"
        intensity={0.5}
      />

      {/* 5. Window Interior Daylight Ambient Wash */}
      {/* Upper Floor Living/Gallery Window */}
      <pointLight
        position={[-1.8, 3.8, 1.0]}
        color="#fef3c7"
        intensity={0.8}
        distance={6.5}
        decay={2}
      />

      {/* Ground Floor Corner Window */}
      <pointLight
        position={[-2.4, 1.4, 2.2]}
        color="#fef3c7"
        intensity={0.7}
        distance={5.5}
        decay={2}
      />

      {/* Upper Right Studio Window */}
      <pointLight
        position={[2.8, 3.6, 0.2]}
        color="#fef3c7"
        intensity={0.6}
        distance={4.5}
        decay={2}
      />

      {/* 6. Entrance / Porch Focal Light: Warm welcoming entrance downlight */}
      <pointLight
        ref={entranceLightRef}
        position={[1.65, 2.4, 2.6]}
        color="#fffbeb"
        intensity={1.5}
        distance={5.5}
        decay={2}
      />

      {/* Focused downlight beam onto the front door */}
      <spotLight
        ref={porchSpotRef}
        position={[1.65, 2.65, 2.4]}
        target-position={[1.65, 0.4, 2.4]}
        color="#fffdf5"
        intensity={1.6}
        angle={Math.PI / 4.2}
        penumbra={0.7}
        distance={5.0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.0001}
      />

      {/* 7. Low-profile Pathway Marker Lights */}
      <pointLight
        position={[1.3, 0.15, 5.0]}
        color="#fbbf24"
        intensity={0.3}
        distance={2.4}
        decay={2}
      />
      <pointLight
        position={[2.0, 0.15, 8.2]}
        color="#fbbf24"
        intensity={0.25}
        distance={2.4}
        decay={2}
      />
      <pointLight
        position={[2.8, 0.15, 11.5]}
        color="#fbbf24"
        intensity={0.2}
        distance={2.4}
        decay={2}
      />
    </group>
  );
}
