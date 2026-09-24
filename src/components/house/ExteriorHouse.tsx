"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "@/theme/ThemeContext";
import { createArchitecturalMaterials } from "@/theme/materials";

export function ExteriorHouse() {
  const { activeAccent } = useTheme();

  // Reusable materials for optimal performance and memory efficiency
  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      darkConcrete: arch.paleStoneFloor,
      charcoalWall: arch.plasterWall,
      darkFascia: arch.darkMetalFrame,
      warmWoodSoffit: arch.naturalOak,
      warmWoodPanel: arch.warmWalnut,
      windowGlass: arch.tintedGlass,
      windowGlowInterior: new THREE.MeshBasicMaterial({
        color: "#fffbeb",
        transparent: true,
        opacity: 0.16,
      }),
      windowMullion: arch.darkMetalFrame,
      architecturalSteel: arch.brushedMetal,
      planterGreenery: arch.greenery,
      planterSoil: new THREE.MeshStandardMaterial({
        color: "#5c5044",
        roughness: 0.95,
        metalness: 0.02,
      }),
      architecturalAccentStrip: new THREE.MeshBasicMaterial({
        color: activeAccent.glow3D,
        transparent: true,
        opacity: 0.65,
      }),
    };
  }, [activeAccent.glow3D]);

  return (
    <group name="exterior-house" position={[0, 0, 0]}>
      {/* ========================================================
          1. FOUNDATION / PLINTH (Ground level anchoring)
          ======================================================== */}
      <mesh
        position={[0, 0.1, 0.2]}
        material={materials.darkConcrete}
        receiveShadow
      >
        <boxGeometry args={[11.2, 0.2, 8.4]} />
      </mesh>

      {/* ========================================================
          2. GROUND FLOOR VOLUMES (Interlocking geometry)
          ======================================================== */}
      {/* Main Ground Floor Left Living / Gallery Wing */}
      <mesh
        position={[-2.4, 1.6, -0.2]}
        material={materials.charcoalWall}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[5.2, 2.8, 6.2]} />
      </mesh>

      {/* Ground Floor Right Service / Stair Volume beside Entrance Hallway */}
      <mesh
        position={[4.1, 1.6, -1.0]}
        material={materials.darkConcrete}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.0, 2.8, 4.6]} />
      </mesh>

      {/* Ground Floor Left Wing Back Wall */}
      <mesh
        position={[-2.4, 1.6, -3.2]}
        material={materials.charcoalWall}
        castShadow
      >
        <boxGeometry args={[5.2, 2.8, 0.4]} />
      </mesh>

      {/* Ground Floor Right Wing Back Wall */}
      <mesh
        position={[4.1, 1.6, -3.2]}
        material={materials.charcoalWall}
        castShadow
      >
        <boxGeometry args={[2.0, 2.8, 0.4]} />
      </mesh>

      {/* ========================================================
          3. GROUND FLOOR WINDOWS (Floor-to-Ceiling Glazing)
          ======================================================== */}
      {/* Front Living Room Glass Aperture */}
      <group position={[-2.3, 1.5, 2.9]}>
        {/* Exterior Glass Pane */}
        <mesh material={materials.windowGlass} castShadow={false}>
          <boxGeometry args={[4.2, 2.2, 0.05]} />
        </mesh>
        {/* Interior Warm Illuminated Silhouette Plane */}
        <mesh position={[0, 0, -0.3]} material={materials.windowGlowInterior}>
          <planeGeometry args={[4.0, 2.0]} />
        </mesh>
        {/* Slim Architectural Dark Mullions */}
        <mesh position={[-1.4, 0, 0.02]} material={materials.windowMullion}>
          <boxGeometry args={[0.04, 2.22, 0.07]} />
        </mesh>
        <mesh position={[0, 0, 0.02]} material={materials.windowMullion}>
          <boxGeometry args={[0.04, 2.22, 0.07]} />
        </mesh>
        <mesh position={[1.4, 0, 0.02]} material={materials.windowMullion}>
          <boxGeometry args={[0.04, 2.22, 0.07]} />
        </mesh>
        {/* Horizontal transom bar */}
        <mesh position={[0, 0.5, 0.02]} material={materials.windowMullion}>
          <boxGeometry args={[4.22, 0.04, 0.07]} />
        </mesh>
      </group>

      {/* Corner Glazing (Side Left Window) */}
      <group position={[-5.02, 1.5, 1.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={materials.windowGlass}>
          <boxGeometry args={[2.8, 2.2, 0.05]} />
        </mesh>
        <mesh position={[0, 0, -0.3]} material={materials.windowGlowInterior}>
          <planeGeometry args={[2.6, 2.0]} />
        </mesh>
        <mesh position={[0, 0, 0.02]} material={materials.windowMullion}>
          <boxGeometry args={[0.04, 2.22, 0.07]} />
        </mesh>
      </group>

      {/* Slit Window next to Entrance Alcove */}
      <group position={[0.45, 1.6, 2.3]}>
        <mesh material={materials.windowGlass}>
          <boxGeometry args={[0.45, 2.3, 0.04]} />
        </mesh>
        <mesh position={[0, 0, -0.2]} material={materials.windowGlowInterior}>
          <planeGeometry args={[0.4, 2.1]} />
        </mesh>
      </group>

      {/* ========================================================
          4. SECOND FLOOR CANTILEVER (Dramatic modern projection)
          ======================================================== */}
      {/* Overhangs forward toward the camera (z: 1.2) and to the left */}
      <group position={[-1.2, 4.3, 0.6]}>
        {/* Main Upper Box */}
        <mesh material={materials.charcoalWall} castShadow receiveShadow>
          <boxGeometry args={[7.4, 2.6, 6.8]} />
        </mesh>

        {/* Warm Wood Slat Soffit (Underside of the cantilever visible from below) */}
        <mesh
          position={[0, -1.31, 0.6]}
          material={materials.warmWoodSoffit}
          receiveShadow
        >
          <boxGeometry args={[7.38, 0.04, 5.5]} />
        </mesh>

        {/* Subtle Architectural Accent LED Reveal Strip under Cantilever */}
        <mesh position={[0, -1.33, 3.32]} material={materials.architecturalAccentStrip}>
          <boxGeometry args={[7.2, 0.015, 0.02]} />
        </mesh>

        {/* Upper Level Ribbon Window (Master Suite / Studio) */}
        <group position={[-0.4, 0.1, 3.42]}>
          <mesh material={materials.windowGlass}>
            <boxGeometry args={[5.2, 1.4, 0.05]} />
          </mesh>
          <mesh position={[0, 0, -0.35]} material={materials.windowGlowInterior}>
            <planeGeometry args={[5.0, 1.2]} />
          </mesh>
          {/* Vertical Mullion divisions */}
          <mesh position={[-1.7, 0, 0.02]} material={materials.windowMullion}>
            <boxGeometry args={[0.03, 1.42, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={materials.windowMullion}>
            <boxGeometry args={[0.03, 1.42, 0.06]} />
          </mesh>
          <mesh position={[1.7, 0, 0.02]} material={materials.windowMullion}>
            <boxGeometry args={[0.03, 1.42, 0.06]} />
          </mesh>
        </group>

        {/* Roof Cap with crisp matte black fascia */}
        <mesh position={[0, 1.34, 0]} material={materials.darkFascia}>
          <boxGeometry args={[7.6, 0.12, 7.0]} />
        </mesh>
      </group>

      {/* Second Floor Right Wing (Offset Balcony / Studio volume) */}
      <group position={[3.2, 4.0, -0.6]}>
        <mesh material={materials.darkConcrete} castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.0, 4.4]} />
        </mesh>
        {/* Upper Right Window */}
        <mesh position={[0, 0, 2.22]} material={materials.windowGlass}>
          <boxGeometry args={[1.8, 1.1, 0.04]} />
        </mesh>
        <mesh position={[0, 0, 1.9]} material={materials.windowGlowInterior}>
          <planeGeometry args={[1.6, 0.9]} />
        </mesh>
        <mesh position={[0, 1.04, 0]} material={materials.darkFascia}>
          <boxGeometry args={[3.3, 0.08, 4.5]} />
        </mesh>
      </group>

      {/* ========================================================
          5. ARCHITECTURAL STRUCTURAL DETAILS
          ======================================================== */}
      {/* Minimalist Steel Structural Column under Cantilever */}
      <mesh
        position={[-4.5, 1.5, 3.4]}
        material={materials.architecturalSteel}
        castShadow
      >
        <cylinderGeometry args={[0.07, 0.07, 3.0, 16]} />
      </mesh>

      {/* Modern Horizontal Privacy Slats / Louvers (Warm wood feature element) */}
      <group position={[2.6, 1.6, 2.45]}>
        {[0, 0.28, 0.56, 0.84, 1.12, 1.4, 1.68, 1.96].map((yOffset) => (
          <mesh
            key={yOffset}
            position={[0, yOffset - 0.9, 0]}
            material={materials.warmWoodPanel}
            castShadow
          >
            <boxGeometry args={[0.95, 0.06, 0.14]} />
          </mesh>
        ))}
      </group>

      {/* Foundation Planter Wall / Low Retaining Edge with Structured Greenery */}
      <group position={[-2.4, 0.35, 3.35]}>
        <mesh material={materials.darkConcrete} receiveShadow castShadow>
          <boxGeometry args={[4.8, 0.45, 0.25]} />
        </mesh>
        {/* Rich soil bed inside planter */}
        <mesh position={[0, 0.15, -0.05]} material={materials.planterSoil} receiveShadow>
          <boxGeometry args={[4.7, 0.1, 0.18]} />
        </mesh>
        {/* Structured Low Architectural Boxwood Shrubs & Ornamental Grasses */}
        {[-1.8, -1.0, -0.2, 0.6, 1.4, 2.0].map((x, i) => (
          <group key={i} position={[x, 0.28, -0.05]}>
            <mesh material={materials.planterGreenery} castShadow>
              <sphereGeometry args={[0.16 + (i % 3) * 0.03, 8, 8]} />
            </mesh>
            {/* Low architectural vertical grass accents */}
            <mesh position={[0, 0.14, 0]} material={materials.planterGreenery} castShadow>
              <cylinderGeometry args={[0.02, 0.05, 0.22, 6]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
