"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { profile } from "@/data/profile";

interface ContactRoomProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

export function ContactRoom({
  scrollProgress,
  reducedMotion = false,
}: ContactRoomProps) {
  const [hoveredStation, setHoveredStation] = useState<"email" | "github" | null>(null);
  const slidingDoorRef = useRef<THREE.Group>(null);
  const emailGlowRef = useRef<THREE.Mesh>(null);
  const githubGlowRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      floor: new THREE.MeshStandardMaterial({
        color: "#ece8e0",
        roughness: 0.55,
        metalness: 0.05,
      }),
      terraceFloor: new THREE.MeshStandardMaterial({
        color: "#e4dfd6",
        roughness: 0.75,
        metalness: 0.04,
      }),
      wall: new THREE.MeshStandardMaterial({
        color: "#f5f4ef",
        roughness: 0.88,
        metalness: 0.02,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: "#faf9f6",
        roughness: 0.95,
        metalness: 0.02,
      }),
      glass: new THREE.MeshStandardMaterial({
        color: "#e0f2fe",
        roughness: 0.08,
        metalness: 0.3,
        transparent: true,
        opacity: 0.32,
      }),
      frameDark: new THREE.MeshStandardMaterial({
        color: "#cbd5e1",
        roughness: 0.35,
        metalness: 0.8,
      }),
      consolePedestal: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.4,
        metalness: 0.1,
      }),
      terminalEmail: new THREE.MeshBasicMaterial({
        color: "#2dd4bf",
      }),
      terminalGithub: new THREE.MeshBasicMaterial({
        color: "#38bdf8",
      }),
      glowEmail: new THREE.MeshBasicMaterial({
        color: "#2dd4bf",
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      }),
      glowGithub: new THREE.MeshBasicMaterial({
        color: "#38bdf8",
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      }),
      terraceRailing: new THREE.MeshStandardMaterial({
        color: "#334155",
        roughness: 0.2,
        metalness: 0.85,
      }),
      outdoorBeacon: new THREE.MeshBasicMaterial({
        color: "#93c5fd",
      }),
    };
  }, []);

  // Sliding door opens as visitor approaches the exit (scrollProgress > 0.93)
  useFrame((_, delta) => {
    if (slidingDoorRef.current) {
      const exitProgress = Math.min(1, Math.max(0, (scrollProgress - 0.92) / 0.05));
      const targetDoorX = 1.7 + exitProgress * 1.6; // slide right
      if (reducedMotion) {
        slidingDoorRef.current.position.x = targetDoorX;
      } else {
        slidingDoorRef.current.position.x = THREE.MathUtils.lerp(
          slidingDoorRef.current.position.x,
          targetDoorX,
          delta * 5
        );
      }
    }

    if (emailGlowRef.current) {
      const target = hoveredStation === "email" ? 0.6 : 0.2;
      (emailGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(
          (emailGlowRef.current.material as THREE.MeshBasicMaterial).opacity,
          target,
          delta * 8
        );
    }

    if (githubGlowRef.current) {
      const target = hoveredStation === "github" ? 0.6 : 0.2;
      (githubGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(
          (githubGlowRef.current.material as THREE.MeshBasicMaterial).opacity,
          target,
          delta * 8
        );
    }
  });

  return (
    <group name="room-06-contact" position={[0, 0, 0]}>
      {/* 1. ROOM INTERIOR FLOOR */}
      {/* Width x: -1.5 to 4.9 (width 6.4, center 1.7), Depth z: -16.0 to -22.0 (depth 6.0, center -19.0) */}
      <mesh
        position={[1.7, 0.12, -19.0]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[6.4, 0.04, 6.0]} />
      </mesh>

      {/* 2. ROOM CEILING */}
      <mesh
        position={[1.7, 3.22, -19.0]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[6.4, 0.04, 6.0]} />
      </mesh>

      {/* 3. EXTERIOR OBSERVATION TERRACE (Beyond z = -22.0) */}
      {/* Cantilevered stone terrace patio: z: -22.0 to -27.0 (depth 5.0, center -24.5) */}
      <mesh
        position={[1.7, 0.11, -24.5]}
        material={materials.terraceFloor}
        receiveShadow
      >
        <boxGeometry args={[6.8, 0.04, 5.0]} />
      </mesh>

      {/* Terrace Edge Glass Railing */}
      {/* North railing (z: -26.98) */}
      <mesh position={[1.7, 0.65, -26.98]} material={materials.glass}>
        <boxGeometry args={[6.8, 1.05, 0.03]} />
      </mesh>
      <mesh position={[1.7, 1.18, -26.98]} material={materials.terraceRailing}>
        <boxGeometry args={[6.82, 0.03, 0.05]} />
      </mesh>
      {/* East railing (x: 5.08) */}
      <mesh position={[5.08, 0.65, -24.5]} material={materials.glass}>
        <boxGeometry args={[0.03, 1.05, 5.0]} />
      </mesh>
      {/* West railing (x: -1.68) */}
      <mesh position={[-1.68, 0.65, -24.5]} material={materials.glass}>
        <boxGeometry args={[0.03, 1.05, 5.0]} />
      </mesh>

      {/* Terrace Floor Beacons */}
      {[-0.8, 4.2].map((xPos) => (
        <group key={xPos} position={[xPos, 0.13, -25.5]}>
          <mesh material={materials.frameDark}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          </mesh>
          <mesh position={[0, 0.015, 0]} material={materials.outdoorBeacon}>
            <circleGeometry args={[0.05, 16]} />
          </mesh>
        </group>
      ))}

      {/* 4. ROOM WALLS */}
      {/* West Wall (x: -1.52) */}
      <mesh
        position={[-1.52, 1.67, -19.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 6.0]} />
      </mesh>

      {/* East Wall (x: 4.92) */}
      <mesh
        position={[4.92, 1.67, -19.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.06, 3.1, 6.0]} />
      </mesh>

      {/* South Wall (z: -15.98) with Corridor Entrance Portal */}
      {/* West section: x: -1.5 to 0.5 (width 2.0, center -0.5) */}
      <mesh
        position={[-0.5, 1.67, -15.98]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[2.0, 3.1, 0.06]} />
      </mesh>
      {/* East section: x: 2.9 to 4.9 (width 2.0, center 3.9) */}
      <mesh
        position={[3.9, 1.67, -15.98]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[2.0, 3.1, 0.06]} />
      </mesh>
      {/* Portal Lintel header (x: 0.5 to 2.9, width 2.4, center 1.7) */}
      <mesh
        position={[1.7, 2.85, -15.98]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[2.4, 0.74, 0.06]} />
      </mesh>

      {/* North Wall: Panoramic Glass Wall with Sliding Exit Door (z: -21.98) */}
      {/* Left fixed glass panel: x: -1.5 to 0.7 (width 2.2, center -0.4) */}
      <mesh position={[-0.4, 1.67, -21.98]} material={materials.glass}>
        <boxGeometry args={[2.2, 3.1, 0.04]} />
      </mesh>
      {/* Right fixed glass panel: x: 2.7 to 4.9 (width 2.2, center 3.8) */}
      <mesh position={[3.8, 1.67, -21.98]} material={materials.glass}>
        <boxGeometry args={[2.2, 3.1, 0.04]} />
      </mesh>
      {/* Door Frame Lintel */}
      <mesh position={[1.7, 2.95, -21.98]} material={materials.frameDark}>
        <boxGeometry args={[6.4, 0.54, 0.08]} />
      </mesh>

      {/* Sliding Glass Door (Center x: 1.7 to slide open toward x: 3.3) */}
      <group ref={slidingDoorRef} position={[1.7, 1.5, -21.94]}>
        <mesh material={materials.glass}>
          <boxGeometry args={[1.96, 2.75, 0.03]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.frameDark}>
          <boxGeometry args={[2.0, 2.8, 0.05]} />
        </mesh>
        {/* Door handle */}
        <mesh position={[-0.85, 0, 0.04]} material={materials.terraceRailing}>
          <boxGeometry args={[0.03, 0.6, 0.03]} />
        </mesh>
      </group>

      {/* 5. CENTRAL ARCHITECTURAL CONTACT CONSOLE */}
      <group position={[1.7, 0.12, -18.5]}>
        {/* Monolith Console Base */}
        <mesh position={[0, 0.5, 0]} material={materials.consolePedestal} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.95, 0.75]} />
        </mesh>
        {/* Top Trim Plate */}
        <mesh position={[0, 0.98, 0]} material={materials.frameDark}>
          <boxGeometry args={[2.44, 0.02, 0.79]} />
        </mesh>

        {/* --- Left Terminal: EMAIL --- */}
        <group
          position={[-0.65, 1.02, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredStation("email");
          }}
          onPointerOut={() => setHoveredStation(null)}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `mailto:${profile.email}`;
          }}
        >
          {/* Touch interface surface */}
          <mesh material={materials.frameDark}>
            <boxGeometry args={[0.85, 0.03, 0.55]} />
          </mesh>
          {/* Glowing indicator line */}
          <mesh position={[0, 0.02, -0.18]} material={materials.terminalEmail}>
            <boxGeometry args={[0.65, 0.005, 0.02]} />
          </mesh>
          {/* Beacon dot */}
          <mesh position={[-0.3, 0.02, 0.15]} material={materials.terminalEmail}>
            <circleGeometry args={[0.025, 12]} />
          </mesh>
          {/* Glow plane */}
          <mesh
            ref={emailGlowRef}
            position={[0, 0.025, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={materials.glowEmail}
          >
            <planeGeometry args={[0.8, 0.5]} />
          </mesh>
        </group>

        {/* --- Right Terminal: GITHUB --- */}
        <group
          position={[0.65, 1.02, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredStation("github");
          }}
          onPointerOut={() => setHoveredStation(null)}
          onClick={(e) => {
            e.stopPropagation();
            window.open(profile.github, "_blank", "noopener,noreferrer");
          }}
        >
          {/* Touch interface surface */}
          <mesh material={materials.frameDark}>
            <boxGeometry args={[0.85, 0.03, 0.55]} />
          </mesh>
          {/* Glowing indicator line */}
          <mesh position={[0, 0.02, -0.18]} material={materials.terminalGithub}>
            <boxGeometry args={[0.65, 0.005, 0.02]} />
          </mesh>
          {/* Beacon dot */}
          <mesh position={[-0.3, 0.02, 0.15]} material={materials.terminalGithub}>
            <circleGeometry args={[0.025, 12]} />
          </mesh>
          {/* Glow plane */}
          <mesh
            ref={githubGlowRef}
            position={[0, 0.025, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={materials.glowGithub}
          >
            <planeGeometry args={[0.8, 0.5]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
