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
  const studioSpotRef = useRef<THREE.SpotLight>(null);
  const studioAmbientRef = useRef<THREE.PointLight>(null);
  const labSpotRef = useRef<THREE.SpotLight>(null);
  const labCoreRef = useRef<THREE.PointLight>(null);

  // Interior intensity factor: 0.0 outside (p < 0.28), smoothly rises to 1.0 inside (p > 0.45)
  const targetInteriorFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.28) / 0.17)
  );

  // Studio lighting factor (peaks when in/near Project Studio, p: 0.40 to 0.75)
  const targetStudioFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.36) / 0.1)
  );

  // Lab lighting factor (peaks when in/near Engineering Lab, p: 0.68 to 1.0)
  const targetLabFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.62) / 0.12)
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

    if (studioSpotRef.current) {
      studioSpotRef.current.intensity = THREE.MathUtils.lerp(
        studioSpotRef.current.intensity,
        2.4 * targetStudioFactor,
        lerpSpeed
      );
    }

    if (studioAmbientRef.current) {
      studioAmbientRef.current.intensity = THREE.MathUtils.lerp(
        studioAmbientRef.current.intensity,
        1.8 * targetStudioFactor,
        lerpSpeed
      );
    }

    if (labSpotRef.current) {
      labSpotRef.current.intensity = THREE.MathUtils.lerp(
        labSpotRef.current.intensity,
        2.2 * targetLabFactor,
        lerpSpeed
      );
    }

    if (labCoreRef.current) {
      labCoreRef.current.intensity = THREE.MathUtils.lerp(
        labCoreRef.current.intensity,
        1.6 * targetLabFactor,
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

      {/* 6. PROJECT STUDIO LIGHTING (Room 02) */}
      {/* High-focus spotlight illuminating ORION centerpiece plinth */}
      <spotLight
        ref={studioSpotRef}
        position={[-4.5, 3.15, -6.5]}
        target-position={[-4.5, 0.5, -6.5]}
        color="#ffffff"
        intensity={0}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={7.0}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-bias={-0.0001}
      />

      {/* Warm ambient studio fill */}
      <pointLight
        ref={studioAmbientRef}
        position={[-4.5, 2.8, -6.5]}
        color="#fed7aa"
        intensity={0}
        distance={8.5}
        decay={2}
      />

      {/* 7. ENGINEERING LAB LIGHTING (Room 03) */}
      {/* Cool technical overhead illumination */}
      <spotLight
        ref={labSpotRef}
        position={[6.2, 3.15, -9.0]}
        target-position={[6.2, 0.3, -9.0]}
        color="#e0f2fe"
        intensity={0}
        angle={Math.PI / 3.5}
        penumbra={0.6}
        distance={7.5}
      />

      {/* Central telemetry cyan luminous core */}
      <pointLight
        ref={labCoreRef}
        position={[6.2, 1.0, -9.0]}
        color="#38bdf8"
        intensity={0}
        distance={6.0}
        decay={2}
      />
    </group>
  );
}
