"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface InteriorLightingProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export function InteriorLighting({
  scrollProgress,
  reducedMotion = false,
}: InteriorLightingProps) {
  const foyerAmbientRef = useRef<THREE.AmbientLight>(null);
  const foyerCoveRef = useRef<THREE.PointLight>(null);
  const corridorSpot1Ref = useRef<THREE.SpotLight>(null);
  const corridorSpot2Ref = useRef<THREE.SpotLight>(null);
  const corridorSpot3Ref = useRef<THREE.SpotLight>(null);

  // Interior intensity factor: 0.0 outside (p < 0.28), smoothly rises to 1.0 inside (p > 0.45)
  const targetInteriorFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.28) / 0.17)
  );

  useFrame((_, delta) => {
    const lerpSpeed = reducedMotion ? 1 : delta * 5;

    if (foyerAmbientRef.current) {
      const target = 0.5 * targetInteriorFactor;
      foyerAmbientRef.current.intensity = THREE.MathUtils.lerp(
        foyerAmbientRef.current.intensity,
        target,
        lerpSpeed
      );
    }

    if (foyerCoveRef.current) {
      const target = 1.8 * targetInteriorFactor;
      foyerCoveRef.current.intensity = THREE.MathUtils.lerp(
        foyerCoveRef.current.intensity,
        target,
        lerpSpeed
      );
    }

    if (corridorSpot1Ref.current) {
      corridorSpot1Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot1Ref.current.intensity,
        1.6 * targetInteriorFactor,
        lerpSpeed
      );
    }

    if (corridorSpot2Ref.current) {
      corridorSpot2Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot2Ref.current.intensity,
        1.5 * targetInteriorFactor,
        lerpSpeed
      );
    }

    if (corridorSpot3Ref.current) {
      corridorSpot3Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot3Ref.current.intensity,
        1.4 * targetInteriorFactor,
        lerpSpeed
      );
    }
  });

  return (
    <group name="interior-lighting">
      {/* 1. Foyer Ambient Warm Fill */}
      <ambientLight
        ref={foyerAmbientRef}
        color="#382618"
        intensity={0}
      />

      {/* 2. Foyer Ceiling Cove & Chandelier Wash */}
      <pointLight
        ref={foyerCoveRef}
        position={[1.65, 3.1, -1.2]}
        color="#ffedd5"
        intensity={0}
        distance={6.5}
        decay={2}
      />

      {/* 3. Foyer Feature Art Wash */}
      <pointLight
        position={[0.65, 2.4, -1.8]}
        color="#fed7aa"
        intensity={0.8 * targetInteriorFactor}
        distance={4.0}
        decay={2}
      />

      {/* 4. Corridor Downlights (Rhythmic warm spotlights along the gallery) */}
      {/* Downlight 1 at z: -6.0 (Near Work Door) */}
      <spotLight
        ref={corridorSpot1Ref}
        position={[1.7, 2.95, -6.0]}
        target-position={[1.7, 0.12, -6.0]}
        color="#ffedd5"
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.0001}
      />

      {/* Downlight 2 at z: -10.0 (Near Archive Door) */}
      <spotLight
        ref={corridorSpot2Ref}
        position={[1.7, 2.95, -10.0]}
        target-position={[1.7, 0.12, -10.0]}
        color="#ffedd5"
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
      />

      {/* Downlight 3 at z: -14.0 (Near Study Door) */}
      <spotLight
        ref={corridorSpot3Ref}
        position={[1.7, 2.95, -14.0]}
        target-position={[1.7, 0.12, -14.0]}
        color="#ffedd5"
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
      />

      {/* 5. Terminal Ambient Warm Glow (At End of Corridor) */}
      <pointLight
        position={[1.7, 1.8, -15.2]}
        color="#f59e0b"
        intensity={1.2 * targetInteriorFactor}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}
