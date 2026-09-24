import * as THREE from "three";

/**
 * ARCHITECTURAL 3D MATERIAL VOCABULARY
 * Single Source of Truth for Physically Coherent Three.js Materials across all rooms
 */
export function createArchitecturalMaterials() {
  return {
    // 1. Core Architectural Surfaces (Micro-roughness & daylight response)
    ivoryWall: new THREE.MeshStandardMaterial({
      color: "#f5f4ef",
      roughness: 0.88,
      metalness: 0.02,
    }),
    plasterWall: new THREE.MeshStandardMaterial({
      color: "#f6f5f0",
      roughness: 0.86,
      metalness: 0.02,
    }),
    coolWall: new THREE.MeshStandardMaterial({
      color: "#f1f3f7",
      roughness: 0.84,
      metalness: 0.03,
    }),
    parchmentWall: new THREE.MeshStandardMaterial({
      color: "#f6f4ee",
      roughness: 0.88,
      metalness: 0.02,
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: "#faf9f6",
      roughness: 0.94,
      metalness: 0.01,
    }),

    // 2. Zone-Specific Architectural Flooring Languages
    lightStone: new THREE.MeshStandardMaterial({
      color: "#e6e2d8",
      roughness: 0.54,
      metalness: 0.03,
    }),
    paleStoneFloor: new THREE.MeshStandardMaterial({
      color: "#e8dfd3",
      roughness: 0.48, // Subtle specular sheen for polished limestone foyer
      metalness: 0.04,
    }),
    studioFloor: new THREE.MeshStandardMaterial({
      color: "#eae5dc",
      roughness: 0.55,
      metalness: 0.02,
    }),
    technicalTerrazzo: new THREE.MeshStandardMaterial({
      color: "#e4e6eb",
      roughness: 0.42, // Refined technical aggregate reflection
      metalness: 0.16,
    }),
    parchmentFloor: new THREE.MeshStandardMaterial({
      color: "#dfd6c8",
      roughness: 0.58,
      metalness: 0.03,
    }),
    studyFloor: new THREE.MeshStandardMaterial({
      color: "#e2d9cd",
      roughness: 0.50,
      metalness: 0.03,
    }),
    contactFloor: new THREE.MeshStandardMaterial({
      color: "#ece8e0",
      roughness: 0.52,
      metalness: 0.03,
    }),

    // 3. Tactile Natural Woods (Non-oversaturated, warm, architectural)
    naturalOak: new THREE.MeshStandardMaterial({
      color: "#c89a65",
      roughness: 0.52,
      metalness: 0.02,
    }),
    honeyOak: new THREE.MeshStandardMaterial({
      color: "#a06d3b",
      roughness: 0.46,
      metalness: 0.02,
    }),
    warmWalnut: new THREE.MeshStandardMaterial({
      color: "#be8e56",
      roughness: 0.48,
      metalness: 0.02,
    }),
    darkWalnut: new THREE.MeshStandardMaterial({
      color: "#784b24",
      roughness: 0.50,
      metalness: 0.02,
    }),

    // 4. Muted Satin & Brushed Metals
    brushedMetal: new THREE.MeshStandardMaterial({
      color: "#cbd5e1",
      roughness: 0.28,
      metalness: 0.82,
    }),
    darkMetalFrame: new THREE.MeshStandardMaterial({
      color: "#33373c",
      roughness: 0.38,
      metalness: 0.70,
    }),
    lampBrass: new THREE.MeshStandardMaterial({
      color: "#d97706",
      roughness: 0.24,
      metalness: 0.88,
    }),

    // 5. Lightweight Architectural Glass (High transmission, non-tinted, subtle daylight sheen)
    clearGlass: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.06,
      metalness: 0.12,
      transparent: true,
      opacity: 0.32,
    }),
    tintedGlass: new THREE.MeshStandardMaterial({
      color: "#f0f9ff",
      roughness: 0.06,
      metalness: 0.15,
      transparent: true,
      opacity: 0.28,
    }),
    glassEdge: new THREE.MeshStandardMaterial({
      color: "#cbd5e1",
      roughness: 0.15,
      metalness: 0.60,
      transparent: true,
      opacity: 0.50,
    }),

    // 6. Landscape Greenery & Soft Fabric
    greenery: new THREE.MeshStandardMaterial({
      color: "#426b48",
      roughness: 0.75,
      metalness: 0.03,
    }),
    softFabric: new THREE.MeshStandardMaterial({
      color: "#ede9e0",
      roughness: 0.94,
      metalness: 0.01,
    }),

    // 7. Utility Emitters & Light Housings
    trackLightBezel: new THREE.MeshStandardMaterial({
      color: "#cbd5e1",
      roughness: 0.30,
      metalness: 0.80,
    }),
    trackLens: new THREE.MeshBasicMaterial({
      color: "#fffdf5",
    }),
    warmCoveGlow: new THREE.MeshBasicMaterial({
      color: "#fffbeb",
    }),

    // 8. Exhibition Plinths & Grounding Shadow Reveals
    plinthBase: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.50,
      metalness: 0.04,
    }),
    plinthDarkTop: new THREE.MeshStandardMaterial({
      color: "#33373c",
      roughness: 0.36,
      metalness: 0.60,
    }),
    groundingShadow: new THREE.MeshBasicMaterial({
      color: "#171918",
      transparent: true,
      opacity: 0.18,
    }),

    // 9. Architectural Visualization Benchmark Materials
    poolWater: new THREE.MeshStandardMaterial({
      color: "#5eb3c8",
      roughness: 0.12,
      metalness: 0.18,
      transparent: true,
      opacity: 0.72,
    }),
    galleryGlass: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.04,
      metalness: 0.10,
      transparent: true,
      opacity: 0.22,
    }),
    naturalWalnutWood: new THREE.MeshStandardMaterial({
      color: "#936338",
      roughness: 0.46,
      metalness: 0.02,
    }),
    plinthIlluminated: new THREE.MeshBasicMaterial({
      color: "#fffbeb",
      transparent: true,
      opacity: 0.85,
    }),
  };
}

export type ArchitecturalMaterials = ReturnType<typeof createArchitecturalMaterials>;
