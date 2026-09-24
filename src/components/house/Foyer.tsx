"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/theme/ThemeContext";
import { createArchitecturalMaterials } from "@/theme/materials";

export function Foyer() {
  const { activeAccent } = useTheme();

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      foyerFloor: arch.paleStoneFloor,
      foyerWall: arch.ivoryWall,
      featureWoodWall: arch.naturalOak,
      ceiling: arch.ceiling,
      coveLight: arch.warmCoveGlow,
      pedestal: arch.lightStone,
      sculptureMetal: new THREE.MeshStandardMaterial({
        color: "#64748b",
        roughness: 0.25,
        metalness: 0.85,
      }),
      plantFoliage: new THREE.MeshStandardMaterial({
        color: "#476a4f",
        roughness: 0.78,
        metalness: 0.05,
      }),
      ceramicPot: new THREE.MeshStandardMaterial({
        color: "#f1ede6",
        roughness: 0.6,
        metalness: 0.05,
      }),
      accentLight: new THREE.MeshBasicMaterial({
        color: activeAccent.glow3D,
      }),
    };
  }, [activeAccent.glow3D]);

  return (
    <group name="interior-foyer" position={[0, 0, 0]}>
      {/* 1. FOYER FLOOR (Warm architectural oak / dark terrazzo) */}
      {/* Spans x: 0.2 to 3.1 (width 2.9), z: -4.0 to 2.15 (depth 6.15), y: 0.12 */}
      <mesh
        position={[1.65, 0.12, -0.925]}
        material={materials.foyerFloor}
        receiveShadow
      >
        <boxGeometry args={[2.9, 0.04, 6.15]} />
      </mesh>

      {/* Floor Threshold Transition Strip at Front Door */}
      <mesh
        position={[1.65, 0.14, 2.12]}
        material={materials.sculptureMetal}
      >
        <boxGeometry args={[1.5, 0.015, 0.08]} />
      </mesh>

      {/* 2. FOYER WALLS */}
      {/* Left Wall (x: 0.2, separating foyer from ground-floor living wing) */}
      <mesh
        position={[0.2, 1.7, -0.925]}
        material={materials.foyerWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.08, 3.16, 6.15]} />
      </mesh>

      {/* Right Feature Wall (x: 3.1, warm vertical wood-slat accent wall) */}
      <mesh
        position={[3.1, 1.7, -0.925]}
        material={materials.featureWoodWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.08, 3.16, 6.15]} />
      </mesh>

      {/* Front Entrance Wall Frame (Interior side of front wall around the door) */}
      {/* Left panel of front entrance wall */}
      <mesh
        position={[0.55, 1.7, 2.15]}
        material={materials.foyerWall}
        receiveShadow
      >
        <boxGeometry args={[0.62, 3.16, 0.08]} />
      </mesh>
      {/* Right panel of front entrance wall */}
      <mesh
        position={[2.75, 1.7, 2.15]}
        material={materials.foyerWall}
        receiveShadow
      >
        <boxGeometry args={[0.62, 3.16, 0.08]} />
      </mesh>
      {/* Transom header above front door */}
      <mesh
        position={[1.65, 2.9, 2.15]}
        material={materials.foyerWall}
        receiveShadow
      >
        <boxGeometry args={[1.6, 0.76, 0.08]} />
      </mesh>

      {/* 3. FOYER CEILING WITH RECESSED COVE LIGHTING */}
      {/* Main Ceiling Plane */}
      <mesh
        position={[1.65, 3.28, -0.925]}
        material={materials.ceiling}
        receiveShadow
      >
        <boxGeometry args={[2.9, 0.06, 6.15]} />
      </mesh>

      {/* Recessed Linear Architectural Cove Light Strip (Left side of ceiling) */}
      <mesh position={[0.35, 3.24, -0.925]} material={materials.coveLight}>
        <boxGeometry args={[0.06, 0.02, 5.8]} />
      </mesh>
      {/* Recessed Linear Architectural Cove Light Strip (Right side of ceiling) */}
      <mesh position={[2.95, 3.24, -0.925]} material={materials.coveLight}>
        <boxGeometry args={[0.06, 0.02, 5.8]} />
      </mesh>

      {/* 4. MINIMALIST ART PLINTH / CONSOLE (Left side of foyer at z: -1.8) */}
      <group position={[0.65, 0.14, -1.8]}>
        {/* Dark stone pedestal */}
        <mesh position={[0, 0.45, 0]} material={materials.pedestal} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.9, 0.55]} />
        </mesh>
        {/* Recessed pedestal base */}
        <mesh position={[0, 0.03, 0]} material={materials.ceiling}>
          <boxGeometry args={[0.5, 0.06, 0.5]} />
        </mesh>

        {/* Minimalist Architectural Sculpture (Geometric stacked bronze/steel form) */}
        <group position={[0, 1.05, 0]}>
          <mesh material={materials.sculptureMetal} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 0.28, 16]} />
          </mesh>
          <mesh position={[0, 0.22, 0]} rotation={[0.4, 0.3, 0.2]} material={materials.sculptureMetal} castShadow>
            <boxGeometry args={[0.18, 0.18, 0.18]} />
          </mesh>
        </group>

        {/* Focused Pin-spot downlight on the sculpture */}
        <pointLight
          position={[0, 2.9, 0]}
          color="#ffedd5"
          intensity={1.2}
          distance={3.5}
          decay={2}
        />
      </group>

      {/* 4b. Minimalist Ceramic Planter with Architectural Branch */}
      <group position={[2.7, 0.14, 1.4]}>
        {/* Fluted Ceramic Pot */}
        <mesh position={[0, 0.25, 0]} material={materials.ceramicPot} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.16, 0.5, 16]} />
        </mesh>
        {/* Architectural Foliage */}
        <mesh position={[0, 0.6, 0]} material={materials.plantFoliage} castShadow>
          <sphereGeometry args={[0.22, 8, 8]} />
        </mesh>
        <mesh position={[0.08, 0.78, -0.05]} material={materials.plantFoliage} castShadow>
          <sphereGeometry args={[0.16, 8, 8]} />
        </mesh>
      </group>

      {/* 5. ARCHITECTURAL SLAT PARTITION (Framing entry into corridor at z: -3.9) */}
      {/* Guides the gaze into the depth of the corridor */}
      <group position={[0.6, 0.14, -3.9]}>
        {[0, 0.15, 0.3, 0.45].map((xOffset) => (
          <mesh
            key={xOffset}
            position={[xOffset, 1.55, 0]}
            material={materials.featureWoodWall}
            castShadow
          >
            <boxGeometry args={[0.04, 3.05, 0.12]} />
          </mesh>
        ))}
      </group>

      {/* 6. MINIMALIST ARCHITECTURAL SCONCES ON WALLS */}
      {/* Left Wall Sconce at z: 0.2 */}
      <group position={[0.26, 1.8, 0.2]}>
        <mesh material={materials.pedestal} castShadow>
          <boxGeometry args={[0.03, 0.25, 0.06]} />
        </mesh>
        <mesh position={[0.02, 0.14, 0]} material={materials.accentLight}>
          <boxGeometry args={[0.02, 0.015, 0.04]} />
        </mesh>
        <mesh position={[0.02, -0.14, 0]} material={materials.accentLight}>
          <boxGeometry args={[0.02, 0.015, 0.04]} />
        </mesh>
      </group>

      {/* Right Wall Sconce at z: -1.2 */}
      <group position={[3.04, 1.8, -1.2]}>
        <mesh material={materials.pedestal} castShadow>
          <boxGeometry args={[0.03, 0.25, 0.06]} />
        </mesh>
        <mesh position={[-0.02, 0.14, 0]} material={materials.accentLight}>
          <boxGeometry args={[0.02, 0.015, 0.04]} />
        </mesh>
        <mesh position={[-0.02, -0.14, 0]} material={materials.accentLight}>
          <boxGeometry args={[0.02, 0.015, 0.04]} />
        </mesh>
      </group>
    </group>
  );
}
