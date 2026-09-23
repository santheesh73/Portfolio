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

    // If reduced motion is requested, lock to static resting frame
    if (reducedMotion) {
      const restingPos = isMobile
        ? new THREE.Vector3(9.5, 3.8, 16.5)
        : new THREE.Vector3(8.5, 3.2, 13.5);
      const restingLook = new THREE.Vector3(0.6, 2.0, 1.0);
      camera.position.copy(restingPos);
      camera.lookAt(restingLook);
      return;
    }

    // 1. Initial Establishing Glide (from far to resting shot over first 2.8s)
    const introProgress = Math.min(1, t / 2.8);
    // Smooth cubic ease out
    const easeIntro = 1 - Math.pow(1 - introProgress, 3);

    // Far establishing position
    const farPos = isMobile
      ? new THREE.Vector3(13.5, 6.2, 21.0)
      : new THREE.Vector3(12.0, 5.2, 18.0);

    // Resting establishing position (at scroll = 0)
    const baseRestingPos = isMobile
      ? new THREE.Vector3(9.5, 3.8, 16.5)
      : new THREE.Vector3(8.5, 3.2, 13.5);

    // Entrance close-up position (at scroll = 1)
    // Dollys down the pathway directly toward the warm front door
    const entranceClosePos = isMobile
      ? new THREE.Vector3(2.1, 1.8, 5.8)
      : new THREE.Vector3(2.2, 1.7, 5.0);

    // Compute base position before scroll
    const initialBlendedPos = new THREE.Vector3().lerpVectors(
      farPos,
      baseRestingPos,
      easeIntro
    );

    // 2. Scroll-driven camera trajectory: smoothly dollies from initialBlendedPos to entranceClosePos
    const clampedScroll = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    // Exponential ease for cinematic deceleration near the door
    const scrollEase =
      clampedScroll < 0.5
        ? 2 * clampedScroll * clampedScroll
        : 1 - Math.pow(-2 * clampedScroll + 2, 2) / 2;

    const currentTrajectoryPos = new THREE.Vector3().lerpVectors(
      initialBlendedPos,
      entranceClosePos,
      scrollEase
    );

    // 3. Subtle Pointer Parallax (inertial stabilized camera rig)
    // Reduce parallax amplitude as camera gets very close to the door
    const parallaxDampen = 1 - scrollEase * 0.65;
    const parallaxOffsetX = smoothedPointer.current.x * 0.45 * parallaxDampen;
    const parallaxOffsetY = -smoothedPointer.current.y * 0.25 * parallaxDampen;

    const targetPos = new THREE.Vector3(
      currentTrajectoryPos.x + parallaxOffsetX,
      currentTrajectoryPos.y + parallaxOffsetY,
      currentTrajectoryPos.z
    );

    // Smooth camera position damping
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPos.x,
      5.0,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPos.y,
      5.0,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPos.z,
      5.0,
      delta
    );

    // 4. Look-At Target calculation
    const baseLookAt = new THREE.Vector3(0.6, 2.0, 1.0);
    const doorLookAt = new THREE.Vector3(1.65, 1.55, 2.35);

    targetLookAt.current.lerpVectors(baseLookAt, doorLookAt, scrollEase);

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.current.x + smoothedPointer.current.x * 0.15 * parallaxDampen,
      5.0,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.current.y - smoothedPointer.current.y * 0.1 * parallaxDampen,
      5.0,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      5.0,
      delta
    );

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
