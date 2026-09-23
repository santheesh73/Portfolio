"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export function CameraRig({
  scrollProgress,
  reducedMotion = false,
}: CameraRigProps) {
  // Pointer normalized coordinates (-1 to 1) with dampening
  const pointerRef = useRef({ x: 0, y: 0 });
  const smoothedPointer = useRef({ x: 0, y: 0 });

  // Look-at target vectors
  const currentLookAt = useRef(new THREE.Vector3(0.6, 2.0, 1.0));
  const targetLookAt = useRef(new THREE.Vector3(0.6, 2.0, 1.0));

  // Sequence timer for initial establishing glide
  const elapsedTimeRef = useRef(0);

  // Track pointer movement with window listener
  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      pointerRef.current.x = (e.clientX - halfW) / halfW;
      pointerRef.current.y = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((state, delta) => {
    const { camera, size } = state;
    const isMobile = size.width < 768;
    elapsedTimeRef.current += delta;
    const t = elapsedTimeRef.current;

    // Smooth pointer interpolation with inertia
    smoothedPointer.current.x = THREE.MathUtils.damp(
      smoothedPointer.current.x,
      pointerRef.current.x,
      3.0,
      delta
    );
    smoothedPointer.current.y = THREE.MathUtils.damp(
      smoothedPointer.current.y,
      pointerRef.current.y,
      3.0,
      delta
    );

    // If reduced motion is requested, snap smoothly to discrete stationary frames
    if (reducedMotion) {
      let restingPos = isMobile
        ? new THREE.Vector3(9.5, 3.8, 16.5)
        : new THREE.Vector3(8.5, 3.2, 13.5);
      let restingLook = new THREE.Vector3(0.6, 2.0, 1.0);

      if (scrollProgress >= 0.7) {
        // Corridor Gallery view
        restingPos = new THREE.Vector3(1.7, 1.5, -7.5);
        restingLook = new THREE.Vector3(1.7, 1.45, -15.5);
      } else if (scrollProgress >= 0.35) {
        // Foyer Residence view
        restingPos = new THREE.Vector3(1.65, 1.5, -1.2);
        restingLook = new THREE.Vector3(1.5, 1.5, -4.0);
      }

      camera.position.copy(restingPos);
      camera.lookAt(restingLook);
      return;
    }

    // 1. Initial Establishing Glide (from far to resting shot over first 2.8s)
    const introProgress = Math.min(1, t / 2.8);
    const easeIntro = 1 - Math.pow(1 - introProgress, 3);

    // Far establishing position
    const farPos = isMobile
      ? new THREE.Vector3(13.5, 6.2, 21.0)
      : new THREE.Vector3(12.0, 5.2, 18.0);

    // Keyframe 0: Exterior resting position
    const kf0_pos = isMobile
      ? new THREE.Vector3(9.5, 3.8, 16.5)
      : new THREE.Vector3(8.5, 3.2, 13.5);
    const kf0_look = new THREE.Vector3(0.6, 2.0, 1.0);

    const initialBlendedPos = new THREE.Vector3().lerpVectors(
      farPos,
      kf0_pos,
      easeIntro
    );

    // Keyframe 1: Front Steps Approach (p = 0.28)
    const kf1_pos = new THREE.Vector3(2.2, 1.75, 4.8);
    const kf1_look = new THREE.Vector3(1.65, 1.6, 2.2);

    // Keyframe 2: Pre-Doorway Threshold (p = 0.45)
    const kf2_pos = new THREE.Vector3(1.65, 1.55, 3.0);
    const kf2_look = new THREE.Vector3(1.65, 1.55, 1.2);

    // Keyframe 3: Foyer Center (p = 0.65)
    const kf3_pos = new THREE.Vector3(1.65, 1.5, -1.2);
    const kf3_look = new THREE.Vector3(1.5, 1.5, -4.0);

    // Keyframe 4: Corridor Gallery (p = 1.00)
    const kf4_pos = new THREE.Vector3(1.7, 1.5, -7.5);
    const kf4_look = new THREE.Vector3(1.7, 1.45, -15.5);

    // 2. Piecewise Smooth Trajectory along scrollProgress (0 to 1)
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const trajectoryPos = new THREE.Vector3();
    const trajectoryLook = new THREE.Vector3();
    let parallaxScale = 1.0;

    if (p <= 0.28) {
      // Exterior Approach
      const seg = p / 0.28;
      const ease = seg * seg * (3 - 2 * seg); // smoothstep
      trajectoryPos.lerpVectors(initialBlendedPos, kf1_pos, ease);
      trajectoryLook.lerpVectors(kf0_look, kf1_look, ease);
      parallaxScale = 1.0 - seg * 0.4;
    } else if (p <= 0.45) {
      // Porch to Pre-Doorway (door opens)
      const seg = (p - 0.28) / 0.17;
      const ease = seg * seg * (3 - 2 * seg);
      trajectoryPos.lerpVectors(kf1_pos, kf2_pos, ease);
      trajectoryLook.lerpVectors(kf1_look, kf2_look, ease);
      parallaxScale = 0.6 - seg * 0.35; // tighter parallax in doorway
    } else if (p <= 0.65) {
      // Threshold Crossing into Foyer
      const seg = (p - 0.45) / 0.2;
      const ease = seg * seg * (3 - 2 * seg);
      trajectoryPos.lerpVectors(kf2_pos, kf3_pos, ease);
      trajectoryLook.lerpVectors(kf2_look, kf3_look, ease);
      parallaxScale = 0.25 + seg * 0.25;
    } else {
      // Foyer down Corridor Gallery
      const seg = (p - 0.65) / 0.35;
      const ease = seg * seg * (3 - 2 * seg);
      trajectoryPos.lerpVectors(kf3_pos, kf4_pos, ease);
      trajectoryLook.lerpVectors(kf3_look, kf4_look, ease);
      parallaxScale = 0.35 - seg * 0.15;
    }

    // 3. Pointer Parallax with Inertia
    const parallaxOffsetX = smoothedPointer.current.x * 0.4 * parallaxScale;
    const parallaxOffsetY = -smoothedPointer.current.y * 0.22 * parallaxScale;

    const targetPos = new THREE.Vector3(
      trajectoryPos.x + parallaxOffsetX,
      trajectoryPos.y + parallaxOffsetY,
      trajectoryPos.z
    );

    // Smooth camera damping
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPos.x,
      4.5,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPos.y,
      4.5,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPos.z,
      4.5,
      delta
    );

    // 4. Look-At Target calculation
    targetLookAt.current.copy(trajectoryLook);

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.current.x + smoothedPointer.current.x * 0.12 * parallaxScale,
      4.5,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.current.y - smoothedPointer.current.y * 0.08 * parallaxScale,
      4.5,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      4.5,
      delta
    );

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
