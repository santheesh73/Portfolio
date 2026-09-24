"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createArchitecturalMaterials } from "@/theme/materials";

export function Environment() {
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      ground: new THREE.MeshStandardMaterial({
        color: "#dcd7cc",
        roughness: 0.94,
        metalness: 0.02,
      }),
      pathPaver: arch.plasterWall,
      gravelBed: new THREE.MeshStandardMaterial({
        color: "#e8e4dc",
        roughness: 0.95,
        metalness: 0.04,
      }),
      darkFoliage: arch.greenery,
      treeTrunk: new THREE.MeshStandardMaterial({
        color: "#78695d",
        roughness: 0.88,
        metalness: 0.02,
      }),
      bollardMetal: arch.brushedMetal,
    };
  }, []);

  // Pathway pavers data (staggered modern stepping stones leading to entrance [1.65, 0, 2.35])
  const pathwaySteps = useMemo(() => {
    return [
      { pos: [1.65, 0.04, 3.8], size: [1.8, 0.08, 1.0] },
      { pos: [1.75, 0.035, 5.2], size: [1.7, 0.07, 1.1] },
      { pos: [2.0, 0.03, 6.7], size: [1.6, 0.06, 1.1] },
      { pos: [2.3, 0.025, 8.2], size: [1.7, 0.05, 1.2] },
      { pos: [2.65, 0.02, 9.8], size: [1.6, 0.04, 1.2] },
      { pos: [3.1, 0.015, 11.5], size: [1.8, 0.03, 1.3] },
      { pos: [3.6, 0.01, 13.3], size: [1.9, 0.02, 1.3] },
    ] as const;
  }, []);

  return (
    <group name="cinematic-environment">
      {/* 1. Main Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        material={materials.ground}
      >
        <planeGeometry args={[100, 100]} />
      </mesh>

      {/* 2. Foundation Gravel / River Rock Terrace Bed */}
      <mesh
        position={[0, 0.02, 1.2]}
        material={materials.gravelBed}
        receiveShadow
      >
        <boxGeometry args={[13.5, 0.04, 10.5]} />
      </mesh>

      {/* 3. Modern Staggered Pathway Pavers */}
      {pathwaySteps.map((step, idx) => (
        <mesh
          key={idx}
          position={step.pos as [number, number, number]}
          material={materials.pathPaver}
          receiveShadow
        >
          <boxGeometry args={step.size as [number, number, number]} />
        </mesh>
      ))}

      {/* 4. Minimalist Low Pathway Bollard Lights */}
      {[
        { pos: [0.75, 0.2, 5.0] },
        { pos: [1.1, 0.2, 8.2] },
        { pos: [1.7, 0.2, 11.5] },
      ].map((b, i) => (
        <group key={i} position={b.pos as [number, number, number]}>
          <mesh material={materials.bollardMetal} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
          </mesh>
          {/* Luminous slit emitter */}
          <mesh position={[0, 0.12, 0.035]}>
            <boxGeometry args={[0.03, 0.05, 0.02]} />
            <meshBasicMaterial color="#fed7aa" />
          </mesh>
        </group>
      ))}

      {/* 5. Minimal Architectural Planter Foliage (Front Foundation) */}
      <group position={[-2.4, 0.6, 3.2]}>
        {[-1.6, -0.8, 0, 0.8, 1.6].map((xOffset) => (
          <mesh
            key={xOffset}
            position={[xOffset, 0, 0]}
            material={materials.darkFoliage}
            castShadow
          >
            <sphereGeometry args={[0.32, 8, 8]} />
          </mesh>
        ))}
      </group>

      {/* 5b. Structured Walkway Framing Greenery (Restrained low shrubs flanking path) */}
      <group name="walkway-landscaping">
        {[
          { pos: [0.6, 0.12, 6.0], scale: 0.28 },
          { pos: [3.4, 0.12, 4.8], scale: 0.25 },
          { pos: [0.9, 0.12, 9.2], scale: 0.22 },
          { pos: [3.9, 0.12, 8.4], scale: 0.26 },
          { pos: [1.3, 0.12, 12.2], scale: 0.24 },
          { pos: [4.4, 0.12, 11.8], scale: 0.28 },
        ].map((shrub, idx) => (
          <mesh
            key={idx}
            position={shrub.pos as [number, number, number]}
            material={materials.darkFoliage}
            castShadow
          >
            <sphereGeometry args={[shrub.scale, 8, 8]} />
          </mesh>
        ))}
      </group>

      {/* 6. Sculptural Framing Silhouette Trees (Margins of the scene) */}
      {/* Left Framing Tree (Slender, architectural silhouette) */}
      <group position={[-8.5, 0, 4.0]}>
        <mesh position={[0, 3.2, 0]} material={materials.treeTrunk} castShadow>
          <cylinderGeometry args={[0.1, 0.18, 6.4, 10]} />
        </mesh>
        {/* Tiered sparse dark canopy */}
        <mesh position={[0.4, 5.2, 0]} material={materials.darkFoliage} castShadow>
          <sphereGeometry args={[1.4, 8, 8]} />
        </mesh>
        <mesh position={[-0.3, 6.5, 0.2]} material={materials.darkFoliage} castShadow>
          <sphereGeometry args={[1.1, 8, 8]} />
        </mesh>
      </group>

      {/* Right Framing Tree (Far edge framing) */}
      <group position={[9.2, 0, 2.5]}>
        <mesh position={[0, 3.0, 0]} material={materials.treeTrunk} castShadow>
          <cylinderGeometry args={[0.09, 0.16, 6.0, 10]} />
        </mesh>
        <mesh position={[-0.2, 4.8, 0]} material={materials.darkFoliage} castShadow>
          <sphereGeometry args={[1.3, 8, 8]} />
        </mesh>
        <mesh position={[0.2, 6.1, 0]} material={materials.darkFoliage} castShadow>
          <sphereGeometry args={[0.95, 8, 8]} />
        </mesh>
      </group>

      {/* 7. Distant Daylight Horizon Backdrop */}
      <mesh position={[0, 4.5, -28]}>
        <planeGeometry args={[80, 18]} />
        <meshBasicMaterial
          color="#edebe5"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
