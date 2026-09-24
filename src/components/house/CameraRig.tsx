"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/types";
import { ExhibitionState, getExhibitTransform } from "@/types/exhibition";

interface CameraRigProps {
  scrollProgress: number;
  inspectedProject?: Project | null;
  exhibitionState?: ExhibitionState;
  onExhibitionStateChange?: (state: ExhibitionState) => void;
  reducedMotion?: boolean;
}

export function CameraRig({
  scrollProgress,
  inspectedProject = null,
  exhibitionState = "IDLE",
  onExhibitionStateChange,
  reducedMotion = false,
}: CameraRigProps) {
  const { gl } = useThree();

  // Pointer normalized coordinates (-1 to 1) with dampening for room parallax
  const pointerRef = useRef({ x: 0, y: 0 });
  const smoothedPointer = useRef({ x: 0, y: 0 });

  // Look-at target vectors
  const currentLookAt = useRef(new THREE.Vector3(0.6, 2.0, 1.0));
  const targetLookAt = useRef(new THREE.Vector3(0.6, 2.0, 1.0));

  // Sequence timer for initial establishing glide
  const elapsedTimeRef = useRef(0);

  // =========================================================================
  // 360° ORBIT INTERACTION STATE
  // =========================================================================
  const isOrbitActive =
    inspectedProject !== null &&
    (exhibitionState === "SELECTED" ||
      exhibitionState === "EXHIBITION_360" ||
      exhibitionState === "DETAIL");

  // Orbit spherical coordinates (theta = azimuth, phi = polar elevation, radius = distance)
  const currentTheta = useRef(0);
  const targetTheta = useRef(0);
  const currentPhi = useRef(Math.PI / 2.7);
  const targetPhi = useRef(Math.PI / 2.7);
  const currentRadius = useRef(2.1);
  const targetRadius = useRef(2.1);

  // Transition interpolation (0 to 1)
  const transitionT = useRef(1); // 1 = fully settled
  const transitionMode = useRef<"NONE" | "ENTERING" | "EXITING">("NONE");
  const transitionStartPos = useRef(new THREE.Vector3());
  const transitionStartLook = useRef(new THREE.Vector3());

  // Drag & touch tracking
  const isDragging = useRef(false);
  const activePointerId = useRef<number | null>(null);
  const touchCount = useRef<number>(0);
  const lastPointer = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const initialPinchRadius = useRef<number>(2.1);

  // Keep track of previously inspected project to detect changes
  const prevProjectRef = useRef<Project | null>(null);

  // 1. Detect project selection & initiate smooth entry/exit transition (Sections 12 & 13)
  useEffect(() => {
    if (inspectedProject && inspectedProject.id !== prevProjectRef.current?.id) {
      prevProjectRef.current = inspectedProject;
      const transform = getExhibitTransform(inspectedProject.id);

      targetRadius.current = transform.defaultDistance;
      targetPhi.current = transform.defaultPhi;
      targetTheta.current = transform.initialTheta ?? 0;

      transitionT.current = 0;
      transitionMode.current = "ENTERING";
    } else if (
      (!inspectedProject && prevProjectRef.current !== null) ||
      (exhibitionState === "EXITING" && transitionMode.current !== "EXITING")
    ) {
      transitionT.current = 0;
      transitionMode.current = "EXITING";
    }
  }, [inspectedProject, exhibitionState]);

  // Handle Escape key to cleanly exit 360° mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && inspectedProject) {
        e.preventDefault();
        onExhibitionStateChange?.("EXITING");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectedProject, onExhibitionStateChange]);

  // 2. Track pointer movement for room parallax (when not in 360° orbit)
  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      if (isOrbitActive) return;
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      pointerRef.current.x = (e.clientX - halfW) / halfW;
      pointerRef.current.y = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [reducedMotion, isOrbitActive]);

  // 3. Desktop & Mobile 360° Orbit Interaction Listeners (Sections 8, 9, 10)
  useEffect(() => {
    const dom = gl.domElement;
    if (!dom || !isOrbitActive) return;

    const onPointerDown = (e: PointerEvent) => {
      // Only handle left mouse or primary touch
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.pointerType === "touch" && touchCount.current > 1) {
        isDragging.current = false;
        return;
      }
      activePointerId.current = e.pointerId;
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      if (activePointerId.current !== null && e.pointerId !== activePointerId.current) return;
      if (touchCount.current > 1) return;

      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      if (!inspectedProject) return;
      const transform = getExhibitTransform(inspectedProject.id);

      // Horizontal orbit (azimuth theta): unlimited 360° full rotation
      targetTheta.current -= dx * 0.0075;

      // Vertical orbit (polar phi): clamped between limits to prevent floor clipping
      targetPhi.current -= dy * 0.0055;
      targetPhi.current = THREE.MathUtils.clamp(
        targetPhi.current,
        transform.minPhi,
        transform.maxPhi
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      if (activePointerId.current === e.pointerId || activePointerId.current === null) {
        isDragging.current = false;
        activePointerId.current = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!inspectedProject) return;
      const transform = getExhibitTransform(inspectedProject.id);

      // Controlled zoom: clamped within safe exhibit distance bounds
      targetRadius.current += e.deltaY * 0.0018;
      targetRadius.current = THREE.MathUtils.clamp(
        targetRadius.current,
        transform.minDistance,
        transform.maxDistance
      );
      e.preventDefault();
    };

    // Mobile touch management: cleanly separate 1-finger orbit from 2-finger pinch
    const onTouchStart = (e: TouchEvent) => {
      touchCount.current = e.touches.length;
      if (e.touches.length === 2 && inspectedProject) {
        isDragging.current = false;
        activePointerId.current = null;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialPinchDist.current = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        initialPinchRadius.current = targetRadius.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      touchCount.current = e.touches.length;
      if (e.touches.length === 2 && inspectedProject && initialPinchDist.current !== null) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        const factor = initialPinchDist.current / Math.max(1, dist);
        const transform = getExhibitTransform(inspectedProject.id);
        targetRadius.current = THREE.MathUtils.clamp(
          initialPinchRadius.current * factor,
          transform.minDistance,
          transform.maxDistance
        );
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      touchCount.current = e.touches.length;
      if (e.touches.length < 2) {
        initialPinchDist.current = null;
      }
      if (e.touches.length === 0) {
        isDragging.current = false;
        activePointerId.current = null;
      }
    };

    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    dom.addEventListener("touchmove", onTouchMove, { passive: false });
    dom.addEventListener("touchend", onTouchEnd);
    dom.addEventListener("touchcancel", onTouchEnd);

    return () => {
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      dom.removeEventListener("touchstart", onTouchStart);
      dom.removeEventListener("touchmove", onTouchMove);
      dom.removeEventListener("touchend", onTouchEnd);
      dom.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isOrbitActive, inspectedProject, gl]);

  // =========================================================================
  // MAIN FRAME TICK: COMPOSITE TRAJECTORY & ORBIT ANIMATION
  // =========================================================================
  useFrame((state, delta) => {
    const { camera, size } = state;
    const isMobile = size.width < 768;
    const aspect = size.width / Math.max(1, size.height);
    const isPortrait = aspect < 1.0;
    const isUltrawide = aspect >= 2.0;

    // Dynamically adapt FOV
    let targetFov = 42;
    if (isUltrawide) {
      targetFov = 39;
    } else if (aspect >= 1.33) {
      targetFov = 42;
    } else if (aspect >= 0.85) {
      targetFov = 46;
    } else {
      targetFov = Math.min(54, Math.round(42 / Math.sqrt(Math.max(0.6, aspect))));
    }

    // Slightly tighter FOV when in 360° inspection for museum macro presentation
    if (isOrbitActive) {
      targetFov = Math.max(34, targetFov - 6);
    }

    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = THREE.MathUtils.damp(camera.fov, targetFov, 4.0, delta);
      if (Math.abs(camera.fov - nextFov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    elapsedTimeRef.current += delta;
    const t = elapsedTimeRef.current;

    // -----------------------------------------------------------------------
    // A. CALCULATE BASE ROOM TRAJECTORY & LOOKAT (from scrollProgress)
    // -----------------------------------------------------------------------
    const introProgress = Math.min(1, t / 2.8);
    const easeIntro = 1 - Math.pow(1 - introProgress, 3);

    const farPos = isPortrait
      ? new THREE.Vector3(14.5, 6.8, 23.5)
      : isMobile
      ? new THREE.Vector3(13.5, 6.2, 21.0)
      : new THREE.Vector3(12.0, 5.2, 18.0);

    const kf0_pos = isPortrait
      ? new THREE.Vector3(10.2, 4.0, 18.0)
      : isMobile
      ? new THREE.Vector3(9.5, 3.8, 16.5)
      : new THREE.Vector3(8.5, 3.2, 13.5);
    const kf0_look = new THREE.Vector3(0.6, 2.0, 1.0);

    const initialBlendedPos = new THREE.Vector3().lerpVectors(
      farPos,
      kf0_pos,
      easeIntro
    );

    const kf1_pos = new THREE.Vector3(2.2, 1.75, 4.8);
    const kf1_look = new THREE.Vector3(1.65, 1.6, 2.2);

    const kf2_pos = new THREE.Vector3(1.65, 1.55, 2.8);
    const kf2_look = new THREE.Vector3(1.65, 1.55, 1.0);

    const kf3_pos = isPortrait
      ? new THREE.Vector3(1.65, 1.5, -0.6)
      : new THREE.Vector3(1.65, 1.5, -1.2);
    const kf3_look = new THREE.Vector3(1.5, 1.5, -4.5);

    const kf4_pos = isPortrait
      ? new THREE.Vector3(-2.8, 1.48, -4.6)
      : new THREE.Vector3(-3.2, 1.45, -5.2);
    const kf4_look = new THREE.Vector3(-4.5, 1.25, -6.5);

    const kf5_pos = isPortrait
      ? new THREE.Vector3(4.8, 1.48, -7.6)
      : new THREE.Vector3(5.2, 1.45, -8.2);
    const kf5_look = new THREE.Vector3(6.6, 1.25, -9.4);

    const kf6_pos = isPortrait
      ? new THREE.Vector3(-3.4, 1.48, -10.8)
      : new THREE.Vector3(-3.8, 1.45, -11.5);
    const kf6_look = new THREE.Vector3(-4.2, 1.4, -14.3);

    const kf7_pos = isPortrait
      ? new THREE.Vector3(4.8, 1.48, -12.9)
      : new THREE.Vector3(5.2, 1.45, -13.6);
    const kf7_look = new THREE.Vector3(6.8, 1.35, -15.5);

    const kf8_pos = isPortrait
      ? new THREE.Vector3(1.7, 1.5, -16.5)
      : new THREE.Vector3(1.7, 1.5, -17.2);
    const kf8_look = new THREE.Vector3(1.7, 1.25, -18.8);

    const kf9_pos = new THREE.Vector3(1.7, 1.5, -21.8);
    const kf9_look = new THREE.Vector3(1.7, 1.5, -25.5);

    const kf10_pos = isPortrait
      ? new THREE.Vector3(1.7, 1.6, -23.8)
      : new THREE.Vector3(1.7, 1.55, -24.5);
    const kf10_look = new THREE.Vector3(1.7, 1.6, -30.0);

    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const roomTrajPos = new THREE.Vector3();
    const roomTrajLook = new THREE.Vector3();
    let parallaxScale = 1.0;

    const smooth = (v: number) => v * v * (3 - 2 * v);

    if (p <= 0.1) {
      const seg = p / 0.1;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(initialBlendedPos, kf1_pos, ease);
      roomTrajLook.lerpVectors(kf0_look, kf1_look, ease);
      parallaxScale = 1.0 - seg * 0.35;
    } else if (p <= 0.2) {
      const seg = (p - 0.1) / 0.1;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf1_pos, kf2_pos, ease);
      roomTrajLook.lerpVectors(kf1_look, kf2_look, ease);
      parallaxScale = 0.65 - seg * 0.35;
    } else if (p <= 0.28) {
      const seg = (p - 0.2) / 0.08;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf2_pos, kf3_pos, ease);
      roomTrajLook.lerpVectors(kf2_look, kf3_look, ease);
      parallaxScale = 0.35;
    } else if (p <= 0.38) {
      const seg = (p - 0.28) / 0.1;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf3_pos, kf4_pos, ease);
      roomTrajLook.lerpVectors(kf3_look, kf4_look, ease);
      parallaxScale = 0.3;
    } else if (p <= 0.5) {
      const seg = (p - 0.38) / 0.12;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf4_pos, kf5_pos, ease);
      roomTrajLook.lerpVectors(kf4_look, kf5_look, ease);
      parallaxScale = 0.3;
    } else if (p <= 0.64) {
      const seg = (p - 0.5) / 0.14;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf5_pos, kf6_pos, ease);
      roomTrajLook.lerpVectors(kf5_look, kf6_look, ease);
      parallaxScale = 0.28;
    } else if (p <= 0.78) {
      const seg = (p - 0.64) / 0.14;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf6_pos, kf7_pos, ease);
      roomTrajLook.lerpVectors(kf6_look, kf7_look, ease);
      parallaxScale = 0.28;
    } else if (p <= 0.9) {
      const seg = (p - 0.78) / 0.12;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf7_pos, kf8_pos, ease);
      roomTrajLook.lerpVectors(kf7_look, kf8_look, ease);
      parallaxScale = 0.3;
    } else if (p <= 0.96) {
      const seg = (p - 0.9) / 0.06;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf8_pos, kf9_pos, ease);
      roomTrajLook.lerpVectors(kf8_look, kf9_look, ease);
      parallaxScale = 0.35;
    } else {
      const seg = (p - 0.96) / 0.04;
      const ease = smooth(seg);
      roomTrajPos.lerpVectors(kf9_pos, kf10_pos, ease);
      roomTrajLook.lerpVectors(kf9_look, kf10_look, ease);
      parallaxScale = 0.4;
    }

    // Parallax offset
    const deviceScale = isMobile ? 0.25 : 1.0;
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

    const parallaxOffsetX = smoothedPointer.current.x * 0.4 * parallaxScale * deviceScale;
    const parallaxOffsetY = -smoothedPointer.current.y * 0.22 * parallaxScale * deviceScale;

    const baseTargetPos = new THREE.Vector3(
      roomTrajPos.x + (isOrbitActive ? 0 : parallaxOffsetX),
      roomTrajPos.y + (isOrbitActive ? 0 : parallaxOffsetY),
      roomTrajPos.z
    );
    const baseTargetLook = new THREE.Vector3(
      roomTrajLook.x + (isOrbitActive ? 0 : smoothedPointer.current.x * 0.12 * parallaxScale * deviceScale),
      roomTrajLook.y + (isOrbitActive ? 0 : -smoothedPointer.current.y * 0.08 * parallaxScale * deviceScale),
      roomTrajLook.z
    );

    // -----------------------------------------------------------------------
    // B. CALCULATE TRUE 360° ORBIT CAMERA POSITION
    // -----------------------------------------------------------------------
    let orbitCamPos = baseTargetPos;
    let orbitLookAt = baseTargetLook;

    if (inspectedProject) {
      const transform = getExhibitTransform(inspectedProject.id);
      const center = new THREE.Vector3(
        transform.position[0] + transform.centerOffset[0],
        transform.position[1] + transform.centerOffset[1],
        transform.position[2] + transform.centerOffset[2]
      );

      // Damp spherical coordinates with smooth inertia (Section 8)
      const dampSpeed = reducedMotion ? 25.0 : 7.0;
      currentTheta.current = THREE.MathUtils.damp(
        currentTheta.current,
        targetTheta.current,
        dampSpeed,
        delta
      );
      currentPhi.current = THREE.MathUtils.damp(
        currentPhi.current,
        targetPhi.current,
        dampSpeed,
        delta
      );
      currentRadius.current = THREE.MathUtils.damp(
        currentRadius.current,
        targetRadius.current,
        dampSpeed,
        delta
      );

      // Compute Cartesian camera coordinate from spherical orbit
      const sinPhi = Math.sin(currentPhi.current);
      const cosPhi = Math.cos(currentPhi.current);
      const sinTheta = Math.sin(currentTheta.current);
      const cosTheta = Math.cos(currentTheta.current);

      const orbitX = center.x + currentRadius.current * sinPhi * sinTheta;
      const orbitY = center.y + currentRadius.current * cosPhi;
      const orbitZ = center.z + currentRadius.current * sinPhi * cosTheta;

      // Room 02 boundary clamping (X: -8.2 to -0.7, Y: 0.42 to 3.0, Z: -9.2 to -3.7)
      // Clamps camera strictly inside the room with margin for near-plane clipping
      const clampedX = THREE.MathUtils.clamp(orbitX, -8.2, -0.7);
      const clampedY = THREE.MathUtils.clamp(orbitY, 0.42, 3.0);
      const clampedZ = THREE.MathUtils.clamp(orbitZ, -9.2, -3.7);

      orbitCamPos = new THREE.Vector3(clampedX, clampedY, clampedZ);
      orbitLookAt = center;
    }

    // -----------------------------------------------------------------------
    // C. SMOOTH TRANSITION MANAGEMENT (Sections 12 & 13)
    // -----------------------------------------------------------------------
    if (transitionMode.current === "ENTERING") {
      // First frame capture
      if (transitionT.current === 0) {
        transitionStartPos.current.copy(camera.position);
        transitionStartLook.current.copy(currentLookAt.current);

        if (inspectedProject) {
          const transform = getExhibitTransform(inspectedProject.id);
          const center = new THREE.Vector3(
            transform.position[0] + transform.centerOffset[0],
            transform.position[1] + transform.centerOffset[1],
            transform.position[2] + transform.centerOffset[2]
          );
          const dx = camera.position.x - center.x;
          const dz = camera.position.z - center.z;
          const sightlineTheta = Math.atan2(dx, dz);

          currentTheta.current = sightlineTheta;
          currentPhi.current = transform.defaultPhi;
          currentRadius.current = Math.max(transform.defaultDistance, Math.hypot(dx, dz));
        }
      }

      const duration = reducedMotion ? 0.05 : 0.85;
      transitionT.current = Math.min(1, transitionT.current + delta / duration);
      const ease = smooth(transitionT.current);

      const blendedPos = new THREE.Vector3().lerpVectors(
        transitionStartPos.current,
        orbitCamPos,
        ease
      );
      const blendedLook = new THREE.Vector3().lerpVectors(
        transitionStartLook.current,
        orbitLookAt,
        ease
      );

      camera.position.copy(blendedPos);
      currentLookAt.current.copy(blendedLook);
      camera.lookAt(currentLookAt.current);

      if (transitionT.current >= 1.0) {
        transitionMode.current = "NONE";
        onExhibitionStateChange?.("EXHIBITION_360");
      }
      return;
    }

    if (transitionMode.current === "EXITING") {
      if (transitionT.current === 0) {
        transitionStartPos.current.copy(camera.position);
        transitionStartLook.current.copy(currentLookAt.current);
      }

      const duration = reducedMotion ? 0.05 : 0.75;
      transitionT.current = Math.min(1, transitionT.current + delta / duration);
      const ease = smooth(transitionT.current);

      const blendedPos = new THREE.Vector3().lerpVectors(
        transitionStartPos.current,
        baseTargetPos,
        ease
      );
      const blendedLook = new THREE.Vector3().lerpVectors(
        transitionStartLook.current,
        baseTargetLook,
        ease
      );

      camera.position.copy(blendedPos);
      currentLookAt.current.copy(blendedLook);
      camera.lookAt(currentLookAt.current);

      if (transitionT.current >= 1.0) {
        transitionMode.current = "NONE";
        prevProjectRef.current = null;
        onExhibitionStateChange?.("IDLE");
      }
      return;
    }

    // -----------------------------------------------------------------------
    // D. STEADY STATE UPDATE (In Orbit or Room Navigation)
    // -----------------------------------------------------------------------
    if (isOrbitActive) {
      camera.position.copy(orbitCamPos);
      currentLookAt.current.copy(orbitLookAt);
      camera.lookAt(currentLookAt.current);
    } else {
      // Normal room navigation with smooth camera damping
      const dampFactor = reducedMotion ? 25.0 : 4.5;
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        baseTargetPos.x,
        dampFactor,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        baseTargetPos.y,
        dampFactor,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        baseTargetPos.z,
        dampFactor,
        delta
      );

      targetLookAt.current.copy(baseTargetLook);
      currentLookAt.current.x = THREE.MathUtils.damp(
        currentLookAt.current.x,
        targetLookAt.current.x,
        dampFactor,
        delta
      );
      currentLookAt.current.y = THREE.MathUtils.damp(
        currentLookAt.current.y,
        targetLookAt.current.y,
        dampFactor,
        delta
      );
      currentLookAt.current.z = THREE.MathUtils.damp(
        currentLookAt.current.z,
        targetLookAt.current.z,
        dampFactor,
        delta
      );

      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
