"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EntranceProps {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  doorOpenProgress?: number;
  onDoorClick?: () => void;
  reducedMotion?: boolean;
}

export function Entrance({
  isHovered,
  onHoverChange,
  doorOpenProgress = 0,
  onDoorClick,
  reducedMotion = false,
}: EntranceProps) {
  const doorMeshRef = useRef<THREE.Group>(null);
  const handleMeshRef = useRef<THREE.Mesh>(null);
  const doorGlowPlaneRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    // Subtle door glow pulsation / highlight on hover (fades out as door opens)
    if (doorGlowPlaneRef.current) {
      const mat = doorGlowPlaneRef.current.material as THREE.MeshBasicMaterial;
      const baseOpacity = isHovered ? 0.32 : 0.08;
      const targetOpacity = baseOpacity * Math.max(0, 1 - doorOpenProgress * 2);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 5);
    }

    // Physical door rotation on its hinge:
    // Swings open inwards up to -85 deg (-1.48 rad) as doorOpenProgress reaches 1
    if (doorMeshRef.current) {
      let targetRotY = 0;
      if (doorOpenProgress > 0) {
        // Physical swing inward
        targetRotY = -(Math.PI / 2.1) * doorOpenProgress;
      } else if (isHovered) {
        // Subtle micro-unlatch on hover outside
        targetRotY = -0.06;
      }

      doorMeshRef.current.rotation.y = THREE.MathUtils.damp(
        doorMeshRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      );
    }
  });

  return (
    <group
      position={[1.65, 0, 2.35]}
      name="entrance-focal-point"
      onClick={(e) => {
        e.stopPropagation();
        if (onDoorClick) onDoorClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(true);
      }}
      onPointerOut={() => {
        onHoverChange(false);
      }}
    >
      {/* 1. Floating Concrete Entrance Steps (3-tier stepped ascent) */}
      {/* Step 1 (Lowest) */}
      <mesh position={[0, 0.06, 0.65]} receiveShadow>
        <boxGeometry args={[2.4, 0.12, 0.8]} />
        <meshStandardMaterial color="#ece8e0" roughness={0.78} metalness={0.04} />
      </mesh>
      {/* Step 1 Under-edge Warm LED Glow Strip */}
      <mesh position={[0, 0.02, 1.04]}>
        <boxGeometry args={[2.3, 0.02, 0.04]} />
        <meshBasicMaterial color="#fde68a" />
      </mesh>

      {/* Step 2 (Middle) */}
      <mesh position={[0, 0.18, 0.35]} receiveShadow>
        <boxGeometry args={[2.2, 0.12, 0.7]} />
        <meshStandardMaterial color="#e4dfd6" roughness={0.78} metalness={0.04} />
      </mesh>
      {/* Step 2 Under-edge Warm LED Glow Strip */}
      <mesh position={[0, 0.14, 0.69]}>
        <boxGeometry args={[2.1, 0.02, 0.04]} />
        <meshBasicMaterial color="#fde68a" />
      </mesh>

      {/* Step 3 (Top Porch Landing) */}
      <mesh position={[0, 0.3, 0.0]} receiveShadow>
        <boxGeometry args={[2.0, 0.12, 0.75]} />
        <meshStandardMaterial color="#ddd8cf" roughness={0.8} metalness={0.04} />
      </mesh>

      {/* 2. Recessed Porch Alcove Surround (Warm Architectural Honey Oak Paneling) */}
      {/* Left alcove wooden wall */}
      <mesh position={[-0.92, 1.6, -0.05]} receiveShadow>
        <boxGeometry args={[0.08, 2.5, 0.7]} />
        <meshStandardMaterial color="#b58350" roughness={0.58} metalness={0.02} />
      </mesh>
      {/* Right alcove wooden wall */}
      <mesh position={[0.92, 1.6, -0.05]} receiveShadow>
        <boxGeometry args={[0.08, 2.5, 0.7]} />
        <meshStandardMaterial color="#b58350" roughness={0.58} metalness={0.02} />
      </mesh>
      {/* Porch ceiling soffit (Natural oak slats with recessed light aperture) */}
      <mesh position={[0, 2.76, -0.05]} receiveShadow>
        <boxGeometry args={[1.88, 0.08, 0.7]} />
        <meshStandardMaterial color="#a87848" roughness={0.55} metalness={0.02} />
      </mesh>
      {/* Recessed Porch Downlight Fixture Ring */}
      <mesh position={[0, 2.71, 0.05]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        <meshStandardMaterial color="#33373c" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Glowing Recessed Lens */}
      <mesh position={[0, 2.7, 0.05]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#fffbeb" />
      </mesh>

      {/* 3. Modern Pivot Door & Frame */}
      {/* Slate metal door jamb/frame */}
      <mesh position={[0, 1.55, -0.22]} receiveShadow>
        <boxGeometry args={[1.56, 2.44, 0.06]} />
        <meshStandardMaterial color="#2d3136" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Modern Pivot Door Panel (Subtle horizontal architectural wood slats) */}
      <group position={[-0.65, 0.35, -0.2]} ref={doorMeshRef}>
        {/* Door rotates around its pivot axis */}
        <mesh position={[0.65, 1.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 2.3, 0.06]} />
          <meshStandardMaterial
            color="#a06d3b"
            roughness={0.48}
            metalness={0.04}
          />
        </mesh>

        {/* Vertical Architectural Brushed Metal Pull Handle */}
        <mesh
          position={[1.2, 1.1, 0.06]}
          ref={handleMeshRef}
          castShadow
        >
          <cylinderGeometry args={[0.016, 0.016, 1.1, 12]} />
          <meshStandardMaterial
            color="#f1f5f9"
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>
        {/* Handle mounts */}
        <mesh position={[1.2, 1.55, 0.035]}>
          <boxGeometry args={[0.03, 0.03, 0.05]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[1.2, 0.65, 0.035]}>
          <boxGeometry args={[0.03, 0.03, 0.05]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* 4. Soft Door Rim Glow Plane (Interactive visual feedback) */}
      <mesh
        ref={doorGlowPlaneRef}
        position={[0, 1.5, -0.17]}
      >
        <planeGeometry args={[1.45, 2.35]} />
        <meshBasicMaterial
          color="#14b8a6"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Minimalist Architectural Wall Sconce beside door */}
      <group position={[0.82, 1.6, 0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.04, 0.22, 0.05]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Up glow */}
        <mesh position={[0, 0.12, 0.01]}>
          <boxGeometry args={[0.03, 0.015, 0.04]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
        {/* Down glow */}
        <mesh position={[0, -0.12, 0.01]}>
          <boxGeometry args={[0.03, 0.015, 0.04]} />
          <meshBasicMaterial color="#fde68a" />
        </mesh>
      </group>
    </group>
  );
}
