"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SkillGroupData } from "@/types";
import { createArchitecturalMaterials } from "@/theme/materials";

interface TechExhibitInstallationProps {
  group: SkillGroupData;
  position: [number, number, number];
  rotation?: [number, number, number];
  accentColor: string;
  categoryId: 'ai' | 'frontend' | 'backend' | 'data-infra';
  isFocused: boolean;
  isAnyFocused: boolean;
  onFocusChange: (focused: boolean) => void;
  onSelect: (group: SkillGroupData) => void;
  reducedMotion: boolean;
}

export function TechExhibitInstallation({
  group,
  position,
  rotation = [0, 0, 0],
  accentColor,
  categoryId,
  isFocused,
  isAnyFocused,
  onFocusChange,
  onSelect,
  reducedMotion,
}: TechExhibitInstallationProps) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Group>(null);
  const customAnimRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      pedestal: arch.naturalWalnutWood, // Walnut pedestal
      trim: arch.brushedMetal,
      telemetryPanel: arch.clearGlass,
      glassNode: arch.galleryGlass,
      darkMetal: arch.darkMetalFrame,
      accentGlow: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      accentBright: new THREE.MeshBasicMaterial({
        color: accentColor,
      }),
      groundingShadow: arch.groundingShadow,
    };
  }, [accentColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const active = hovered || isFocused;

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * (active ? 0.85 : 0.22);
    }

    if (customAnimRef.current) {
      if (categoryId === 'ai') {
        customAnimRef.current.rotation.y += delta * (active ? 0.5 : 0.1);
        customAnimRef.current.rotation.x += delta * 0.2;
      } else if (categoryId === 'data-infra') {
        customAnimRef.current.rotation.y += delta * (active ? 1.0 : 0.2);
      } else if (categoryId === 'frontend') {
        customAnimRef.current.position.y = 1.35 + Math.sin(Date.now() / 1000) * 0.05 * (active ? 1 : 0.2);
      } else if (categoryId === 'backend') {
        // Blink lights
      }
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      let targetOpacity = 0.20;
      if (active) {
        targetOpacity = 0.58;
      } else if (isAnyFocused) {
        targetOpacity = 0.08; // Quieter surrounding systems
      }
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }
  });

  const renderCategoryGeometry = () => {
    switch (categoryId) {
      case 'ai':
        return (
          <group position={[0, 1.4, 0]} ref={customAnimRef}>
            {/* Interconnected glass nodes */}
            <mesh material={materials.glassNode} position={[0, 0, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            <mesh material={materials.glassNode} position={[-0.2, 0.2, 0.1]}>
              <sphereGeometry args={[0.08, 16, 16]} />
            </mesh>
            <mesh material={materials.glassNode} position={[0.2, 0.1, -0.1]}>
              <sphereGeometry args={[0.1, 16, 16]} />
            </mesh>
            <mesh material={materials.glassNode} position={[0, -0.2, 0.15]}>
              <sphereGeometry args={[0.09, 16, 16]} />
            </mesh>
            {/* Connections */}
            <mesh material={materials.accentBright} position={[-0.1, 0.1, 0.05]} rotation={[0, 0, -Math.PI/4]}>
              <cylinderGeometry args={[0.005, 0.005, 0.28, 8]} />
            </mesh>
            <mesh material={materials.accentBright} position={[0.1, 0.05, -0.05]} rotation={[0, 0, Math.PI/4]}>
              <cylinderGeometry args={[0.005, 0.005, 0.22, 8]} />
            </mesh>
          </group>
        );
      case 'frontend':
        return (
          <group position={[0, 1.35, 0]} ref={customAnimRef}>
            {/* Layered glass display panels */}
            <mesh material={materials.telemetryPanel} position={[0, 0, 0.15]} castShadow>
              <boxGeometry args={[0.8, 0.5, 0.02]} />
            </mesh>
            <mesh material={materials.telemetryPanel} position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.9, 0.6, 0.02]} />
            </mesh>
            <mesh material={materials.telemetryPanel} position={[0, 0, -0.15]} castShadow>
              <boxGeometry args={[1.0, 0.7, 0.02]} />
            </mesh>
            {/* Metal frame */}
            <mesh material={materials.darkMetal} position={[0, -0.36, 0]}>
              <boxGeometry args={[0.6, 0.04, 0.4]} />
            </mesh>
            <mesh material={materials.accentBright} position={[-0.3, 0.2, 0.15]}>
              <boxGeometry args={[0.15, 0.01, 0.025]} />
            </mesh>
            <mesh material={materials.accentBright} position={[-0.3, 0.1, 0.15]}>
              <boxGeometry args={[0.25, 0.01, 0.025]} />
            </mesh>
          </group>
        );
      case 'backend':
        return (
          <group position={[0, 1.4, 0]} ref={customAnimRef}>
            {/* Server rack / processing unit sculpture */}
            <mesh material={materials.darkMetal} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.8, 0.4]} />
            </mesh>
            <mesh material={materials.trim} position={[0, 0, 0.21]}>
              <boxGeometry args={[0.45, 0.75, 0.02]} />
            </mesh>
            {/* Amber indicator lights */}
            {[0.2, 0.1, 0, -0.1, -0.2].map((y, i) => (
              <mesh key={i} material={materials.accentBright} position={[-0.15, y, 0.225]}>
                <circleGeometry args={[0.015, 8]} />
              </mesh>
            ))}
            {[0.2, 0.1, 0, -0.1, -0.2].map((y, i) => (
              <mesh key={i} material={materials.accentBright} position={[0.15, y, 0.225]}>
                <circleGeometry args={[0.015, 8]} />
              </mesh>
            ))}
            {/* Conduit details */}
            <mesh material={materials.trim} position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
            </mesh>
          </group>
        );
      case 'data-infra':
        return (
          <group position={[0, 1.35, 0]}>
            {/* Database cylinder / container architecture */}
            <mesh material={materials.darkMetal} position={[0, -0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
            </mesh>
            <mesh material={materials.darkMetal} position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
            </mesh>
            <mesh material={materials.darkMetal} position={[0, 0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
            </mesh>
            {/* Stacked torus rings */}
            <group ref={customAnimRef}>
              <mesh position={[0, -0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.26, 0.015, 16, 32]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
              </mesh>
              <mesh position={[0, 0.175, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.26, 0.015, 16, 32]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
              </mesh>
            </group>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <group
      position={position}
      rotation={rotation}
      name={`tech-exhibit-${group.id}`}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onFocusChange?.(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        onFocusChange?.(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(group);
      }}
    >
      {/* 0. Pedestal Grounding Contact Shadow */}
      <mesh
        position={[0, 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.groundingShadow}
      >
        <planeGeometry args={[1.3, 0.8]} />
      </mesh>

      {/* 1. Walnut Pedestal */}
      <mesh
        material={materials.pedestal}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.2, 0.9, 0.7]} />
      </mesh>

      {/* 2. Beveled Metallic Trim Edge */}
      <mesh material={materials.trim} position={[0, 0.91, 0]}>
        <boxGeometry args={[1.22, 0.02, 0.72]} />
      </mesh>

      {/* 3. Category Specific Architecture */}
      {renderCategoryGeometry()}

      {/* 4. Floating Telemetry Screen Plaque */}
      <group position={[0, 0.45, 0.38]} rotation={[0, 0, 0]}>
        {/* Main Panel */}
        <mesh material={materials.telemetryPanel} castShadow>
          <boxGeometry args={[0.8, 0.4, 0.03]} />
        </mesh>

        {/* Emissive Frame Outline */}
        <mesh position={[0, 0, 0.02]} material={materials.accentGlow} ref={glowRef}>
          <planeGeometry args={[0.78, 0.38]} />
        </mesh>

        {/* Index & Status Indicator */}
        <mesh position={[-0.3, 0.1, 0.025]} material={materials.accentBright}>
          <circleGeometry args={[0.02, 12]} />
        </mesh>

        {/* System Category Hairline */}
        <mesh position={[0, -0.1, 0.025]}>
          <boxGeometry args={[0.6, 0.015, 0.002]} />
          <meshBasicMaterial color={hovered || isFocused ? accentColor : "#64748b"} />
        </mesh>
      </group>

      {/* 5. Top Revolving Telemetry Rings */}
      <group position={[0, 2.0, 0]} ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.008, 12, 28]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.15, 0.006, 12, 24]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.45} />
        </mesh>
      </group>

      {/* 6. Floor Light Spill */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.accentGlow}
      >
        <planeGeometry args={[1.5, 1.0]} />
      </mesh>
    </group>
  );
}
