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

      if (scrollProgress >= 0.72) {
        // Engineering Lab view
        restingPos = new THREE.Vector3(5.2, 1.45, -8.2);
        restingLook = new THREE.Vector3(6.6, 1.25, -9.4);
      } else if (scrollProgress >= 0.44) {
        // Project Studio view
        restingPos = new THREE.Vector3(-3.2, 1.45, -5.2);
        restingLook = new THREE.Vector3(-4.5, 1.25, -6.5);
      } else if (scrollProgress >= 0.28) {
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

    // Keyframe 0: Exterior resting position (p = 0.00)
    const kf0_pos = isMobile
      ? new THREE.Vector3(9.5, 3.8, 16.5)
      : new THREE.Vector3(8.5, 3.2, 13.5);
    const kf0_look = new THREE.Vector3(0.6, 2.0, 1.0);

    const initialBlendedPos = new THREE.Vector3().lerpVectors(
      farPos,
      kf0_pos,
      easeIntro
    );

    // Keyframe 1: Front Steps Approach (p = 0.16)
    const kf1_pos = new THREE.Vector3(2.2, 1.75, 4.8);
    const kf1_look = new THREE.Vector3(1.65, 1.6, 2.2);

    // Keyframe 2: Pre-Doorway Threshold (p = 0.28)
    const kf2_pos = new THREE.Vector3(1.65, 1.55, 2.8);
    const kf2_look = new THREE.Vector3(1.65, 1.55, 1.0);

    // Keyframe 3: Foyer Center (p = 0.44)
    const kf3_pos = new THREE.Vector3(1.65, 1.5, -1.2);
    const kf3_look = new THREE.Vector3(1.5, 1.5, -4.5);

    // Keyframe 4: Project Studio Doorway Approach (p = 0.52)
    const kf4_pos = new THREE.Vector3(0.2, 1.5, -6.2);
    const kf4_look = new THREE.Vector3(-4.5, 1.4, -6.5);

    // Keyframe 5: Project Studio - ORION Centerpiece Plinth (p = 0.62)
    const kf5_pos = new THREE.Vector3(-3.2, 1.45, -5.2);
    const kf5_look = new THREE.Vector3(-4.5, 1.25, -6.5);

    // Keyframe 6: Project Studio - Wide Gallery View (p = 0.72)
    const kf6_pos = new THREE.Vector3(-4.8, 1.5, -7.5);
    const kf6_look = new THREE.Vector3(-2.5, 1.4, -6.0);

    // Keyframe 7: Engineering Lab Doorway Approach (p = 0.80)
    const kf7_pos = new THREE.Vector3(2.5, 1.5, -8.6);
    const kf7_look = new THREE.Vector3(6.2, 1.4, -9.0);

    // Keyframe 8: Engineering Lab - Skill Telemetry Center (p = 0.90)
    const kf8_pos = new THREE.Vector3(5.2, 1.45, -8.2);
    const kf8_look = new THREE.Vector3(6.6, 1.25, -9.4);

    // Keyframe 9: Engineering Lab - Inspection Vantage Point (p = 1.00)
    const kf9_pos = new THREE.Vector3(7.0, 1.5, -10.2);
    const kf9_look = new THREE.Vector3(5.5, 1.3, -8.5);

    // 2. Piecewise Smooth Trajectory along scrollProgress (0 to 1)
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const trajectoryPos = new THREE.Vector3();
    const trajectoryLook = new THREE.Vector3();
    let parallaxScale = 1.0;

    const smooth = (v: number) => v * v * (3 - 2 * v);

    if (p <= 0.16) {
      // Exterior Approach
      const seg = p / 0.16;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(initialBlendedPos, kf1_pos, ease);
      trajectoryLook.lerpVectors(kf0_look, kf1_look, ease);
      parallaxScale = 1.0 - seg * 0.35;
    } else if (p <= 0.28) {
      // Porch to Doorway (front door swings open)
      const seg = (p - 0.16) / 0.12;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf1_pos, kf2_pos, ease);
      trajectoryLook.lerpVectors(kf1_look, kf2_look, ease);
      parallaxScale = 0.65 - seg * 0.35;
    } else if (p <= 0.44) {
      // Threshold Crossing into Foyer
      const seg = (p - 0.28) / 0.16;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf2_pos, kf3_pos, ease);
      trajectoryLook.lerpVectors(kf2_look, kf3_look, ease);
      parallaxScale = 0.3 + seg * 0.15;
    } else if (p <= 0.52) {
      // Foyer to Project Studio Doorway
      const seg = (p - 0.44) / 0.08;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf3_pos, kf4_pos, ease);
      trajectoryLook.lerpVectors(kf3_look, kf4_look, ease);
      parallaxScale = 0.45 - seg * 0.15;
    } else if (p <= 0.62) {
      // Enter Project Studio & Glide to ORION Centerpiece
      const seg = (p - 0.52) / 0.1;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf4_pos, kf5_pos, ease);
      trajectoryLook.lerpVectors(kf4_look, kf5_look, ease);
      parallaxScale = 0.3;
    } else if (p <= 0.72) {
      // Studio Orbit & Overview of Secondary Displays
      const seg = (p - 0.62) / 0.1;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf5_pos, kf6_pos, ease);
      trajectoryLook.lerpVectors(kf5_look, kf6_look, ease);
      parallaxScale = 0.3;
    } else if (p <= 0.80) {
      // Transition from Studio across Corridor to Engineering Lab Doorway
      const seg = (p - 0.72) / 0.08;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf6_pos, kf7_pos, ease);
      trajectoryLook.lerpVectors(kf6_look, kf7_look, ease);
      parallaxScale = 0.35;
    } else if (p <= 0.90) {
      // Enter Engineering Lab & Frame Skill Telemetry Nodes
      const seg = (p - 0.80) / 0.1;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf7_pos, kf8_pos, ease);
      trajectoryLook.lerpVectors(kf7_look, kf8_look, ease);
      parallaxScale = 0.3;
    } else {
      // Lab Exploration & Full Architectural Survey
      const seg = (p - 0.90) / 0.1;
      const ease = smooth(seg);
      trajectoryPos.lerpVectors(kf8_pos, kf9_pos, ease);
      trajectoryLook.lerpVectors(kf8_look, kf9_look, ease);
      parallaxScale = 0.3;
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
