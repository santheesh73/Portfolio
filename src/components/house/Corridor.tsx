"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { RoomDoor } from "./RoomDoor";
import { createArchitecturalMaterials } from "@/theme/materials";

interface CorridorProps {
  scrollProgress?: number;
  onSelectRoom?: (roomId: string) => void;
  reducedMotion?: boolean;
}

export function Corridor({
  scrollProgress = 0,
  onSelectRoom,
  reducedMotion = false,
}: CorridorProps) {
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      floor: arch.lightStone,
      wall: arch.ivoryWall,
      ceiling: arch.ceiling,
      downlightBezel: arch.trackLightBezel,
      downlightLens: arch.trackLens,
      endPortalGlow: new THREE.MeshBasicMaterial({
        color: "#0f766e",
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      }),
    };
  }, []);

  // Downlights placed along the corridor ceiling (y: 2.98, x: 1.7)
  const downlightZPositions = [-5.2, -7.6, -10.0, -12.4, -14.8];

  return (
    <group name="interior-corridor" position={[0, 0, 0]}>
      {/* 1. CORRIDOR FLOOR */}
      {/* Spans x: 0.5 to 2.9 (width 2.4), z: -4.0 to -16.0 (depth 12.0), y: 0.12 */}
      <mesh
        position={[1.7, 0.12, -10.0]}
        material={materials.floor}
        receiveShadow
      >
        <boxGeometry args={[2.4, 0.04, 12.0]} />
      </mesh>

      {/* 2. CORRIDOR CEILING */}
      <mesh
        position={[1.7, 3.02, -10.0]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[2.4, 0.04, 12.0]} />
      </mesh>

      {/* Recessed Downlight Fixtures in Ceiling */}
      {downlightZPositions.map((zPos, idx) => (
        <group key={idx} position={[1.7, 2.99, zPos]}>
          <mesh material={materials.downlightBezel}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
          </mesh>
          <mesh position={[0, -0.012, 0]} material={materials.downlightLens}>
            <circleGeometry args={[0.05, 16]} />
          </mesh>
        </group>
      ))}

      {/* 3. CORRIDOR WALLS WITH ARCHITECTURAL REVEALS & DOORWAY OPENINGS */}
      {/* Left Corridor Wall (x: 0.48) with openings at Door 02 (z: -6.2) and Door 04 (z: -11.0) */}
      {/* South section of left wall (z: -4.0 to -5.5) */}
      <mesh
        position={[0.48, 1.57, -4.75]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 1.5]} />
      </mesh>
      {/* Lintel header above Door 02 (z: -5.5 to -6.9) */}
      <mesh
        position={[0.48, 2.85, -6.2]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[0.04, 0.34, 1.4]} />
      </mesh>
      {/* Middle section of left wall (z: -6.9 to -10.4) */}
      <mesh
        position={[0.48, 1.57, -8.65]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 3.5]} />
      </mesh>
      {/* Lintel header above Door 04 (z: -10.4 to -11.6) */}
      <mesh
        position={[0.48, 2.85, -11.0]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[0.04, 0.34, 1.2]} />
      </mesh>
      {/* North section of left wall (z: -11.6 to -16.0) */}
      <mesh
        position={[0.48, 1.57, -13.8]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 4.4]} />
      </mesh>

      {/* Right Corridor Wall (x: 2.92) with openings at Door 03 (z: -8.6) and Door 05 (z: -13.4) */}
      {/* South section of right wall (z: -4.0 to -8.0) */}
      <mesh
        position={[2.92, 1.57, -6.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 4.0]} />
      </mesh>
      {/* Lintel header above Door 03 (z: -8.0 to -9.2) */}
      <mesh
        position={[2.92, 2.85, -8.6]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[0.04, 0.34, 1.2]} />
      </mesh>
      {/* Middle section of right wall (z: -9.2 to -12.8) */}
      <mesh
        position={[2.92, 1.57, -11.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 3.6]} />
      </mesh>
      {/* Lintel header above Door 05 (z: -12.8 to -14.0) */}
      <mesh
        position={[2.92, 2.85, -13.4]}
        material={materials.wall}
        receiveShadow
      >
        <boxGeometry args={[0.04, 0.34, 1.2]} />
      </mesh>
      {/* North section of right wall (z: -14.0 to -16.0) */}
      <mesh
        position={[2.92, 1.57, -15.0]}
        material={materials.wall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.04, 2.9, 2.0]} />
      </mesh>

      {/* Open Portal Frame to Contact Room (z: -16.0) */}
      {/* Left jamb */}
      <mesh position={[0.52, 1.57, -16.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[0.08, 2.9, 0.06]} />
      </mesh>
      {/* Right jamb */}
      <mesh position={[2.88, 1.57, -16.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[0.08, 2.9, 0.06]} />
      </mesh>
      {/* Lintel */}
      <mesh position={[1.7, 2.85, -16.0]} material={materials.wall} receiveShadow>
        <boxGeometry args={[2.44, 0.34, 0.06]} />
      </mesh>

      {/* 4. ROOM DOORS IN CORRIDOR */}
      {/* Door 02 — WORK (Left wall at z: -6.2, leading into Project Studio) */}
      <RoomDoor
        position={[0.54, 0, -6.2]}
        rotation={[0, Math.PI / 2, 0]}
        index="02"
        title="WORK"
        subtitle="PROJECT STUDIO"
        accentColor="#1d4ed8"
        isUnlocked={true}
        isOpen={scrollProgress >= 0.24 && scrollProgress <= 0.46}
        onSelect={() => onSelectRoom?.("projects")}
        reducedMotion={reducedMotion}
      />

      {/* Door 03 — LAB (Right wall at z: -8.6, leading into Engineering Lab) */}
      <RoomDoor
        position={[2.86, 0, -8.6]}
        rotation={[0, -Math.PI / 2, 0]}
        index="03"
        title="LAB"
        subtitle="ENGINEERING LAB"
        accentColor="#0d9488"
        isUnlocked={true}
        isOpen={scrollProgress >= 0.38 && scrollProgress <= 0.60}
        onSelect={() => onSelectRoom?.("lab")}
        reducedMotion={reducedMotion}
      />

      {/* Door 04 — ARCHIVE (Left wall at z: -11.0, leading into Archive) */}
      <RoomDoor
        position={[0.54, 0, -11.0]}
        rotation={[0, Math.PI / 2, 0]}
        index="04"
        title="ARCHIVE"
        subtitle="PROOF & MILESTONES"
        accentColor="#b45309"
        isUnlocked={true}
        isOpen={scrollProgress >= 0.52 && scrollProgress <= 0.74}
        onSelect={() => onSelectRoom?.("archive")}
        reducedMotion={reducedMotion}
      />

      {/* Door 05 — STUDY (Right wall at z: -13.4, leading into Private Study) */}
      <RoomDoor
        position={[2.86, 0, -13.4]}
        rotation={[0, -Math.PI / 2, 0]}
        index="05"
        title="STUDY"
        subtitle="ABOUT & PHILOSOPHY"
        accentColor="#6d28d9"
        isUnlocked={true}
        isOpen={scrollProgress >= 0.66 && scrollProgress <= 0.88}
        onSelect={() => onSelectRoom?.("study")}
        reducedMotion={reducedMotion}
      />

      {/* Door 06 — CONTACT (Corridor Terminus Portal at z: -15.94) */}
      <RoomDoor
        position={[1.7, 0, -15.94]}
        rotation={[0, 0, 0]}
        index="06"
        title="CONTACT"
        subtitle="COMMUNICATION"
        accentColor="#0f766e"
        isUnlocked={true}
        isOpen={scrollProgress >= 0.80}
        onSelect={() => onSelectRoom?.("contact")}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
