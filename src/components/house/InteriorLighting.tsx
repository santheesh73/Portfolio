"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { LIGHTING_TOKENS } from "@/theme/lighting";

interface InteriorLightingProps {
  scrollProgress: number;
  isInspectingProject?: boolean;
  reducedMotion?: boolean;
}

export function InteriorLighting({
  scrollProgress,
  isInspectingProject = false,
  reducedMotion = false,
}: InteriorLightingProps) {
  const { interior, shadow } = LIGHTING_TOKENS;
  const foyerAmbientRef = useRef<THREE.AmbientLight>(null);
  const foyerCoveRef = useRef<THREE.PointLight>(null);
  const corridorSpot1Ref = useRef<THREE.SpotLight>(null);
  const corridorSpot2Ref = useRef<THREE.SpotLight>(null);
  const corridorSpot3Ref = useRef<THREE.SpotLight>(null);
  const studioSpotRef = useRef<THREE.SpotLight>(null);
  const studioAmbientRef = useRef<THREE.PointLight>(null);
  const labSpotRef = useRef<THREE.SpotLight>(null);
  const labCoreRef = useRef<THREE.PointLight>(null);
  const archiveAmbientRef = useRef<THREE.PointLight>(null);
  const studyLampRef = useRef<THREE.PointLight>(null);
  const contactAmbientRef = useRef<THREE.PointLight>(null);
  const terraceMoonRef = useRef<THREE.DirectionalLight>(null);

  // Interior intensity factor: 0.0 outside, smoothly rises to 1.0 inside (p > 0.18)
  const targetInteriorFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.16) / 0.1)
  );

  // Studio lighting factor (p: 0.28 to 0.48)
  const targetStudioFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.26) / 0.08)
  );

  // Lab lighting factor (p: 0.42 to 0.62)
  const targetLabFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.4) / 0.08)
  );

  // Archive lighting factor (p: 0.56 to 0.76)
  const targetArchiveFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.54) / 0.08)
  );

  // Study lighting factor (p: 0.70 to 0.88)
  const targetStudyFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.68) / 0.08)
  );

  // Contact lighting factor (p: 0.82 to 1.0)
  const targetContactFactor = Math.min(
    1,
    Math.max(0, (scrollProgress - 0.8) / 0.08)
  );

  useFrame((_, delta) => {
    const lerpSpeed = reducedMotion ? 1 : delta * 5;
    const quietFactor = isInspectingProject ? 0.35 : 1.0;

    if (foyerAmbientRef.current) {
      const target = 0.95 * targetInteriorFactor * quietFactor;
      foyerAmbientRef.current.intensity = THREE.MathUtils.lerp(
        foyerAmbientRef.current.intensity,
        target,
        lerpSpeed
      );
    }

    if (foyerCoveRef.current) {
      const target = 1.8 * targetInteriorFactor * quietFactor;
      foyerCoveRef.current.intensity = THREE.MathUtils.lerp(
        foyerCoveRef.current.intensity,
        target,
        lerpSpeed
      );
    }

    if (corridorSpot1Ref.current) {
      corridorSpot1Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot1Ref.current.intensity,
        1.6 * targetInteriorFactor * quietFactor,
        lerpSpeed
      );
    }

    if (corridorSpot2Ref.current) {
      corridorSpot2Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot2Ref.current.intensity,
        1.5 * targetInteriorFactor * quietFactor,
        lerpSpeed
      );
    }

    if (corridorSpot3Ref.current) {
      corridorSpot3Ref.current.intensity = THREE.MathUtils.lerp(
        corridorSpot3Ref.current.intensity,
        1.4 * targetInteriorFactor * quietFactor,
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
      // Soften studio ambient to let inspected exhibit's spotlight & emissives be the hero
      const studioTarget = isInspectingProject
        ? 0.7 * targetStudioFactor
        : 1.8 * targetStudioFactor;
      studioAmbientRef.current.intensity = THREE.MathUtils.lerp(
        studioAmbientRef.current.intensity,
        studioTarget,
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

    if (archiveAmbientRef.current) {
      archiveAmbientRef.current.intensity = THREE.MathUtils.lerp(
        archiveAmbientRef.current.intensity,
        1.6 * targetArchiveFactor,
        lerpSpeed
      );
    }

    if (studyLampRef.current) {
      studyLampRef.current.intensity = THREE.MathUtils.lerp(
        studyLampRef.current.intensity,
        1.9 * targetStudyFactor,
        lerpSpeed
      );
    }

    if (contactAmbientRef.current) {
      contactAmbientRef.current.intensity = THREE.MathUtils.lerp(
        contactAmbientRef.current.intensity,
        1.7 * targetContactFactor,
        lerpSpeed
      );
    }

    if (terraceMoonRef.current) {
      terraceMoonRef.current.intensity = THREE.MathUtils.lerp(
        terraceMoonRef.current.intensity,
        0.8 * targetContactFactor,
        lerpSpeed
      );
    }
  });

  return (
    <group name="interior-lighting">
      {/* 1. Foyer Ambient Warm Fill */}
      <ambientLight
        ref={foyerAmbientRef}
        color={interior.ambientColor}
        intensity={0}
      />

      {/* 2. Foyer Ceiling Cove & Chandelier Wash */}
      <pointLight
        ref={foyerCoveRef}
        position={[1.65, 3.1, -1.2]}
        color={interior.foyerCoveColor}
        intensity={0}
        distance={6.5}
        decay={2}
      />

      {/* 3. Foyer Feature Art Wash */}
      <pointLight
        position={[0.65, 2.4, -1.8]}
        color={interior.archiveAmbientColor}
        intensity={0.8 * targetInteriorFactor}
        distance={4.0}
        decay={2}
      />

      {/* 4. Corridor Downlights (Rhythmic warm spotlights along the gallery) */}
      <spotLight
        ref={corridorSpot1Ref}
        position={[1.7, 2.95, -6.0]}
        target-position={[1.7, 0.12, -6.0]}
        color={interior.corridorSpotColor}
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
        castShadow
        shadow-mapSize-width={shadow.mapSizeStandard}
        shadow-mapSize-height={shadow.mapSizeStandard}
        shadow-bias={shadow.biasSpot}
      />

      <spotLight
        ref={corridorSpot2Ref}
        position={[1.7, 2.95, -10.0]}
        target-position={[1.7, 0.12, -10.0]}
        color={interior.corridorSpotColor}
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
      />

      <spotLight
        ref={corridorSpot3Ref}
        position={[1.7, 2.95, -14.0]}
        target-position={[1.7, 0.12, -14.0]}
        color={interior.corridorSpotColor}
        intensity={0}
        angle={Math.PI / 3.8}
        penumbra={0.6}
        distance={6.0}
      />

      {/* 5. Room 02: PROJECT STUDIO LIGHTING */}
      <spotLight
        ref={studioSpotRef}
        position={[-4.5, 3.15, -6.5]}
        target-position={[-4.5, 0.5, -6.5]}
        color={interior.studioSpotColor}
        intensity={0}
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={7.0}
        castShadow
        shadow-mapSize-width={shadow.mapSizeStandard}
        shadow-mapSize-height={shadow.mapSizeStandard}
        shadow-bias={shadow.biasSpot}
      />

      <pointLight
        ref={studioAmbientRef}
        position={[-4.5, 2.8, -6.5]}
        color={interior.studioAmbientColor}
        intensity={0}
        distance={8.5}
        decay={2}
      />

      {/* 6. Room 03: ENGINEERING LAB LIGHTING */}
      <spotLight
        ref={labSpotRef}
        position={[6.2, 3.15, -9.0]}
        target-position={[6.2, 0.3, -9.0]}
        color={interior.labSpotColor}
        intensity={0}
        angle={Math.PI / 3.5}
        penumbra={0.6}
        distance={7.5}
      />

      <pointLight
        ref={labCoreRef}
        position={[6.2, 1.0, -9.0]}
        color={interior.labCoreColor}
        intensity={0}
        distance={6.0}
        decay={2}
      />

      {/* 7. Room 04: ARCHIVE LIGHTING (Warm parchment glow) */}
      <pointLight
        ref={archiveAmbientRef}
        position={[-4.0, 2.7, -12.0]}
        color={interior.archiveAmbientColor}
        intensity={0}
        distance={7.0}
        decay={2}
      />

      {/* 8. Room 05: PRIVATE STUDY LIGHTING (Warm oak & desk lamp) */}
      <pointLight
        ref={studyLampRef}
        position={[6.95, 1.25, -14.3]}
        color={interior.studyLampColor}
        intensity={0}
        distance={5.0}
        decay={2}
      />

      {/* 8b. Room 05: Principle Wall Soft Violet Accent Wash */}
      <pointLight
        position={[6.2, 2.6, -16.0]}
        color="#8b5cf6"
        intensity={0.5 * targetStudyFactor}
        distance={4.5}
        decay={2}
      />

      {/* 9. Room 06: CONTACT PAVILION & TERRACE LIGHTING */}
      <pointLight
        ref={contactAmbientRef}
        position={[1.7, 2.8, -19.0]}
        color={interior.contactAmbientColor}
        intensity={0}
        distance={7.5}
        decay={2}
      />

      {/* Daylight exterior sky light over observation terrace */}
      <directionalLight
        ref={terraceMoonRef}
        position={[1.7, 7.0, -25.0]}
        color={interior.terraceSkyColor}
        intensity={0}
      />
    </group>
  );
}
