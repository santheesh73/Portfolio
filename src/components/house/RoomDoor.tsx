"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createArchitecturalMaterials } from "@/theme/materials";

interface RoomDoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  index: string;
  title: string;
  subtitle: string;
  isUnlocked?: boolean;
  isOpen?: boolean;
  accentColor?: string;
  onSelect?: () => void;
  reducedMotion?: boolean;
}

export function RoomDoor({
  position,
  rotation = [0, 0, 0],
  index,
  title,
  subtitle,
  isUnlocked = false,
  isOpen = false,
  accentColor = "#0f766e",
  onSelect,
  reducedMotion = false,
}: RoomDoorProps) {
  const [hovered, setHovered] = useState(false);
  const glowPlaneRef = useRef<THREE.Mesh>(null);
  const doorPanelRef = useRef<THREE.Mesh>(null);
  const hingeRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      frame: arch.darkMetalFrame,
      doorPanel: arch.honeyOak,
      doorTrim: arch.brushedMetal,
      handle: arch.brushedMetal,
      lightSpill: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      signPlaque: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.35,
        metalness: 0.08,
      }),
      textAccent: new THREE.MeshBasicMaterial({
        color: accentColor,
      }),
    };
  }, [accentColor]);

  useFrame((_, delta) => {
    if (reducedMotion) {
      if (hingeRef.current) {
        hingeRef.current.rotation.y = isOpen ? -Math.PI * 0.48 : 0;
      }
      return;
    }

    if (glowPlaneRef.current) {
      const mat = glowPlaneRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.35 : (isOpen ? 0.06 : 0.12);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);
    }

    if (doorPanelRef.current) {
      const mat = doorPanelRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = hovered ? new THREE.Color("#b57c45") : new THREE.Color("#a06d3b");
      mat.color.lerp(targetColor, delta * 6);
    }

    if (hingeRef.current) {
      // Physical hinge motion: swings wide when open (-86 deg), subtly unlatches on hover (-9 deg)
      const targetAngle = isOpen ? -Math.PI * 0.48 : (hovered ? -0.16 : 0);
      hingeRef.current.rotation.y = THREE.MathUtils.damp(
        hingeRef.current.rotation.y,
        targetAngle,
        4.0,
        delta
      );
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`room-door-${index}-${title.toLowerCase()}`}
      userData={{ title, subtitle }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect();
      }}
    >
      {/* 1. Recessed Architectural Door Frame with Jambs and Lintel */}
      <group position={[0, 1.3, 0]}>
        {/* Left jamb */}
        <mesh position={[-0.64, 0, 0]} material={materials.frame} receiveShadow>
          <boxGeometry args={[0.08, 2.52, 0.12]} />
        </mesh>
        {/* Right jamb */}
        <mesh position={[0.64, 0, 0]} material={materials.frame} receiveShadow>
          <boxGeometry args={[0.08, 2.52, 0.12]} />
        </mesh>
        {/* Lintel header */}
        <mesh position={[0, 1.22, 0]} material={materials.frame} receiveShadow>
          <boxGeometry args={[1.36, 0.08, 0.12]} />
        </mesh>
      </group>

      {/* 2. Pivoting Hinge & Door Leaf */}
      <group ref={hingeRef} position={[-0.6, 0, 0]}>
        <mesh
          ref={doorPanelRef}
          material={materials.doorPanel}
          position={[0.6, 1.28, 0.02]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1.2, 2.38, 0.06]} />
        </mesh>

        {/* Minimalist Brushed Metal Lever Handle */}
        <group position={[1.06, 1.15, 0.07]}>
          <mesh material={materials.doorTrim}>
            <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
          </mesh>
          <mesh
            position={[-0.06, 0, 0.02]}
            rotation={[0, 0, Math.PI / 2]}
            material={materials.handle}
            castShadow
          >
            <cylinderGeometry args={[0.012, 0.012, 0.14, 12]} />
          </mesh>
        </group>
      </group>

      {/* 3. Floor Gap Warm Light Leakage */}
      <mesh
        position={[0, 0.04, 0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.lightSpill}
      >
        <planeGeometry args={[1.25, 0.45]} />
      </mesh>

      {/* 4. Hover Highlight Glow Plane (only when door is closed) */}
      {!isOpen && (
        <mesh
          ref={glowPlaneRef}
          position={[0, 1.28, 0.06]}
          material={materials.lightSpill}
        >
          <planeGeometry args={[1.28, 2.42]} />
        </mesh>
      )}

      {/* 5. Architectural Signage Plaque beside door */}
      <group position={[-0.82, 1.6, 0.04]}>
        <mesh material={materials.signPlaque} receiveShadow>
          <boxGeometry args={[0.26, 0.38, 0.02]} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.24, 0.36, 0.002]} />
          <meshBasicMaterial color={hovered ? accentColor : "#e2e8f0"} />
        </mesh>
        <mesh position={[0, 0.08, 0.016]}>
          <boxGeometry args={[0.16, 0.08, 0.002]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
        <mesh position={[0, -0.09, 0.016]}>
          <circleGeometry args={[0.02, 12]} />
          <meshBasicMaterial color={isUnlocked ? accentColor : "#cbd5e1"} />
        </mesh>
      </group>
    </group>
  );
}
