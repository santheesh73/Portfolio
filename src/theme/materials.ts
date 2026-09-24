import * as THREE from "three";

/**
 * ARCHITECTURAL 3D MATERIAL VOCABULARY
 * Single Source of Truth for Three.js Materials across all rooms
 */
export function createArchitecturalMaterials() {
  return {
    // 1. Core Architectural Surfaces
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
      roughness: 0.85,
      metalness: 0.04,
    }),
    parchmentWall: new THREE.MeshStandardMaterial({
      color: "#f6f4ee",
      roughness: 0.88,
      metalness: 0.02,
    }),
    ceiling: new THREE.MeshStandardMaterial({
      color: "#faf9f6",
      roughness: 0.92,
      metalness: 0.02,
    }),

    // 2. Stone & Floor Surfaces
    lightStone: new THREE.MeshStandardMaterial({
      color: "#e6e2d8",
      roughness: 0.58,
      metalness: 0.04,
    }),
    paleStoneFloor: new THREE.MeshStandardMaterial({
      color: "#e8dfd3",
      roughness: 0.55,
      metalness: 0.03,
    }),
    technicalTerrazzo: new THREE.MeshStandardMaterial({
      color: "#e4e6eb",
      roughness: 0.45,
      metalness: 0.18,
    }),
    parchmentFloor: new THREE.MeshStandardMaterial({
      color: "#dfd6c8",
      roughness: 0.60,
      metalness: 0.04,
    }),

    // 3. Timber & Joinery
    naturalOak: new THREE.MeshStandardMaterial({
      color: "#c89a65",
      roughness: 0.52,
      metalness: 0.02,
    }),
    honeyOak: new THREE.MeshStandardMaterial({
      color: "#a06d3b",
      roughness: 0.48,
      metalness: 0.02,
    }),
    warmWalnut: new THREE.MeshStandardMaterial({
      color: "#be8e56",
      roughness: 0.48,
      metalness: 0.03,
    }),
    darkWalnut: new THREE.MeshStandardMaterial({
      color: "#784b24",
      roughness: 0.50,
      metalness: 0.02,
    }),

    // 4. Metals & Architectural Hardware
    brushedMetal: new THREE.MeshStandardMaterial({
      color: "#cbd5e1",
      roughness: 0.30,
      metalness: 0.80,
    }),
    darkMetalFrame: new THREE.MeshStandardMaterial({
      color: "#33373c",
      roughness: 0.40,
      metalness: 0.65,
    }),
    lampBrass: new THREE.MeshStandardMaterial({
      color: "#d97706",
      roughness: 0.25,
      metalness: 0.90,
    }),

    // 5. Glass & Transparency
    clearGlass: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.08,
      metalness: 0.20,
      transparent: true,
      opacity: 0.40,
    }),
    tintedGlass: new THREE.MeshStandardMaterial({
      color: "#e0f2fe",
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.30,
    }),

    // 6. Fabric & Landscape
    softFabric: new THREE.MeshStandardMaterial({
      color: "#ede9e0",
      roughness: 0.95,
      metalness: 0.01,
    }),
    greenery: new THREE.MeshStandardMaterial({
      color: "#426b48",
      roughness: 0.78,
      metalness: 0.04,
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

    // 8. Plinth & Exhibition Display
    plinthBase: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.50,
      metalness: 0.05,
    }),
    plinthDarkTop: new THREE.MeshStandardMaterial({
      color: "#33373c",
      roughness: 0.35,
      metalness: 0.60,
    }),
  };
}

export type ArchitecturalMaterials = ReturnType<typeof createArchitecturalMaterials>;
