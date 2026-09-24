"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ProjectId } from "@/types";
import { ExhibitionState } from "@/types/exhibition";
import { createArchitecturalMaterials } from "@/theme/materials";

interface InstallationProps {
  accentColor: string;
  glowColor: string;
  state: ExhibitionState;
  reducedMotion?: boolean;
}

/**
 * 1. ORION — On-Device AI / Privacy-First Architecture
 * Centerpiece: Concentric dual-axis floating neural rings revolving around
 * an illuminated octahedron micro-core with synaptic beacon nodes.
 */
export function OrionInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitalNodesRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      darkMetal: arch.darkMetalFrame,
      brushedMetal: arch.brushedMetal,
      accentEmissive: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.85,
      }),
      accentMuted: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.45,
      }),
      coreGlass: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.65,
      }),
    };
  }, [accentColor, glowColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speedMult = isHero
      ? 1.4
      : state === "FOCUSED"
      ? 1.2
      : state === "ATTENTION"
      ? 0.9
      : 0.6;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.45 * speedMult;
      outerRingRef.current.rotation.x += delta * 0.15 * speedMult;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.6 * speedMult;
      innerRingRef.current.rotation.z += delta * 0.35 * speedMult;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8 * speedMult;
      coreRef.current.rotation.z += delta * 0.25 * speedMult;
      const pulse = Math.sin(Date.now() * 0.003 * speedMult) * 0.04;
      coreRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    }
    if (orbitalNodesRef.current) {
      orbitalNodesRef.current.rotation.y -= delta * 0.3 * speedMult;
    }
  });

  return (
    <group position={[0, 1.45, 0]}>
      {/* Outer Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh material={materials.darkMetal}>
          <torusGeometry args={[0.34, 0.012, 16, 48]} />
        </mesh>
        {/* Outer Ring Accent Insets */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.34, Math.sin(angle) * 0.34, 0]}
            material={materials.accentEmissive}
          >
            <sphereGeometry args={[0.018, 12, 12]} />
          </mesh>
        ))}
      </group>

      {/* Inner Gimbal Ring */}
      <group ref={innerRingRef}>
        <mesh material={materials.brushedMetal}>
          <torusGeometry args={[0.24, 0.01, 16, 40]} />
        </mesh>
        <mesh material={materials.accentMuted}>
          <torusGeometry args={[0.22, 0.004, 12, 32]} />
        </mesh>
      </group>

      {/* Central Octahedral Micro-Die */}
      <mesh ref={coreRef} material={materials.coreGlass}>
        <octahedronGeometry args={[0.13, 0]} />
      </mesh>
      <mesh material={materials.accentEmissive} scale={[0.07, 0.07, 0.07]}>
        <octahedronGeometry args={[1, 0]} />
      </mesh>

      {/* Floating Synaptic Orbital Nodes */}
      <group ref={orbitalNodesRef}>
        {[-0.42, 0.42].map((x, idx) => (
          <mesh key={idx} position={[x, Math.sin(x * 3) * 0.08, 0]} material={materials.accentEmissive}>
            <sphereGeometry args={[0.012, 8, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * 2. HeartTune — Music & Media Streaming
 * Dynamic acoustic wave sculpture: curved array of rhythmic vertical fluted
 * audio-spectrum fins varying in harmonic resonance with a magnetic levitation core.
 */
export function HeartTuneInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const finsGroupRef = useRef<THREE.Group>(null);
  const coreDiscRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      darkMetal: arch.darkMetalFrame,
      finMaterial: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.15,
        metalness: 0.8,
        transparent: true,
        opacity: 0.8,
      }),
      accentEmissive: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.9,
      }),
      accentEdge: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.5,
      }),
    };
  }, [accentColor, glowColor]);

  // Generate 14 soundwave fins in an arc
  const finCount = 14;
  const finConfigs = useMemo(() => {
    return Array.from({ length: finCount }, (_, i) => {
      const u = i / (finCount - 1);
      const angle = (u - 0.5) * Math.PI * 0.75;
      const radius = 0.28;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius * 0.6 - 0.05;
      const baseHeight = 0.12 + Math.sin(u * Math.PI) * 0.22;
      return { x, z, angle, baseHeight, phase: i * 0.4 };
    });
  }, []);

  useFrame((stateObj, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 2.5
      : state === "FOCUSED"
      ? 2.0
      : state === "ATTENTION"
      ? 1.6
      : 1.1;
    const t = stateObj.clock.getElapsedTime() * speed;

    if (finsGroupRef.current) {
      finsGroupRef.current.children.forEach((child, i) => {
        const config = finConfigs[i];
        if (config) {
          const mod = Math.sin(t + config.phase) * 0.06;
          child.scale.y = Math.max(0.2, 1 + mod / config.baseHeight);
        }
      });
    }

    if (coreDiscRef.current) {
      coreDiscRef.current.rotation.y += delta * 0.5;
      coreDiscRef.current.position.y = 1.35 + Math.sin(t * 1.2) * 0.015;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Soundwave Fin Array */}
      <group position={[0, 1.26, 0]} ref={finsGroupRef}>
        {finConfigs.map((cfg, i) => (
          <group key={i} position={[cfg.x, 0, cfg.z]} rotation={[0, cfg.angle, 0]}>
            <mesh position={[0, cfg.baseHeight / 2, 0]} material={materials.finMaterial} castShadow>
              <boxGeometry args={[0.018, cfg.baseHeight, 0.018]} />
            </mesh>
            <mesh position={[0, cfg.baseHeight + 0.006, 0]} material={materials.accentEmissive}>
              <boxGeometry args={[0.02, 0.01, 0.02]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating Transducer Core Disc */}
      <group position={[0, 1.35, 0]} ref={coreDiscRef}>
        <mesh material={materials.darkMetal}>
          <cylinderGeometry args={[0.11, 0.11, 0.016, 32]} />
        </mesh>
        <mesh position={[0, 0.01, 0]} material={materials.accentEmissive}>
          <ringGeometry args={[0.06, 0.085, 32]} />
        </mesh>
        <mesh position={[0, 0.012, 0]} material={materials.accentEdge}>
          <circleGeometry args={[0.035, 16]} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 3. NISF — Creative AI / Multi-Modality Platform
 * Prismatic crystalline cluster: intersecting geometric tetrahedra and glass facets
 * refracting cyan and azure light planes, symbolizing cross-modal synthesis.
 */
export function NisfInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const clusterRef = useRef<THREE.Group>(null);
  const prismRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      frameMetal: arch.darkMetalFrame,
      cyanGlass: new THREE.MeshStandardMaterial({
        color: "#dbeafe",
        roughness: 0.08,
        metalness: 0.25,
        transparent: true,
        opacity: 0.55,
      }),
      cyanAccent: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.85,
      }),
      refractionEdge: new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
      }),
    };
  }, [accentColor, glowColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 0.7
      : state === "FOCUSED"
      ? 0.5
      : state === "ATTENTION"
      ? 0.38
      : 0.22;

    if (clusterRef.current) {
      clusterRef.current.rotation.y += delta * speed;
      clusterRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
    }
    if (prismRef.current) {
      prismRef.current.rotation.x += delta * speed * 0.7;
    }
  });

  return (
    <group position={[0, 1.4, 0]}>
      <group ref={clusterRef}>
        {/* Central Prismatic Diamond */}
        <mesh ref={prismRef} material={materials.cyanGlass} castShadow>
          <octahedronGeometry args={[0.22, 0]} />
        </mesh>
        <mesh material={materials.refractionEdge} scale={[1.02, 1.02, 1.02]}>
          <octahedronGeometry args={[0.22, 0]} />
        </mesh>

        {/* 4 Satellite Modal Nodes (Text, Image, Audio, Video) */}
        {[
          [0.26, 0.1, 0.15],
          [-0.26, 0.1, -0.15],
          [-0.15, -0.18, 0.22],
          [0.15, -0.18, -0.22],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh material={materials.cyanAccent}>
              <tetrahedronGeometry args={[0.045, 0]} />
            </mesh>
            {/* Connecting optic filigree ray */}
            <mesh position={[-pos[0] * 0.4, -pos[1] * 0.4, -pos[2] * 0.4]} material={materials.cyanAccent}>
              <boxGeometry args={[0.003, 0.003, 0.14]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/**
 * 4. AHAL AI — Software Intelligence / Repository & Document Analysis
 * Layered architectural monolith stack: segmented floating graphite slabs
 * with emerald illuminated circuit traces and document tree nodes.
 */
export function AhalInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const stackRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      graphiteSlab: arch.darkMetalFrame,
      emeraldLight: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.9,
      }),
      emeraldSubtle: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.4,
      }),
      glassSeparator: arch.clearGlass,
    };
  }, [accentColor, glowColor]);

  useFrame((stateObj) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 2.0
      : state === "FOCUSED"
      ? 1.5
      : state === "ATTENTION"
      ? 1.2
      : 0.8;
    const t = stateObj.clock.getElapsedTime() * speed;

    if (stackRef.current) {
      stackRef.current.children.forEach((slab, idx) => {
        const floatOffset = Math.sin(t + idx * 0.6) * 0.012;
        slab.position.y = (idx - 1.5) * 0.09 + floatOffset;
        slab.rotation.y = Math.sin(t * 0.5 + idx * 0.3) * 0.04;
      });
    }
  });

  return (
    <group position={[0, 1.4, 0]}>
      <group ref={stackRef}>
        {/* 4 Segmented Architectural AST Intelligence Slabs */}
        {[0, 1, 2, 3].map((idx) => {
          const width = 0.38 - idx * 0.04;
          const depth = 0.28 - idx * 0.03;
          return (
            <group key={idx} position={[0, (idx - 1.5) * 0.09, 0]}>
              {/* Monolithic dark slate slab */}
              <mesh material={materials.graphiteSlab} castShadow>
                <boxGeometry args={[width, 0.024, depth]} />
              </mesh>
              {/* Luminous emerald code horizon seam */}
              <mesh position={[0, 0.013, 0]} material={materials.emeraldLight}>
                <boxGeometry args={[width * 0.88, 0.003, depth * 0.88]} />
              </mesh>
              {/* Structural micro-studs */}
              <mesh position={[width / 2 - 0.02, 0.015, depth / 2 - 0.02]} material={materials.emeraldLight}>
                <boxGeometry args={[0.012, 0.01, 0.012]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/**
 * 5. PRYSM — Systems Architecture & Optical Precision
 * Precision equilateral dispersion prism suspended in a minimalist brass gimbal frame,
 * displaying subtle refracted light planes.
 */
export function PrysmInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const gimbalRef = useRef<THREE.Group>(null);
  const prismRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      brassFrame: arch.lampBrass,
      darkMetal: arch.darkMetalFrame,
      opticalPrism: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.05,
        metalness: 0.15,
        transparent: true,
        opacity: 0.65,
      }),
      amberRay: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.75,
      }),
      amberFaint: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.25,
      }),
    };
  }, [accentColor, glowColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 0.6
      : state === "FOCUSED"
      ? 0.45
      : state === "ATTENTION"
      ? 0.35
      : 0.22;

    if (gimbalRef.current) {
      gimbalRef.current.rotation.y += delta * speed;
    }
    if (prismRef.current) {
      prismRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group position={[0, 1.4, 0]}>
      <group ref={gimbalRef}>
        {/* Precision Gimbal Ring */}
        <mesh material={materials.brassFrame}>
          <torusGeometry args={[0.3, 0.008, 16, 40]} />
        </mesh>
        {/* Support Pivot Studs */}
        {[-0.3, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} material={materials.darkMetal}>
            <sphereGeometry args={[0.016, 12, 12]} />
          </mesh>
        ))}

        {/* Triangular Prism Geometry */}
        <mesh ref={prismRef} material={materials.opticalPrism} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.32, 3]} />
        </mesh>

        {/* Refracted Dispersion Light Planes */}
        <mesh position={[0.16, 0, 0]} rotation={[0, 0, Math.PI / 6]} material={materials.amberRay}>
          <planeGeometry args={[0.22, 0.28]} />
        </mesh>
        <mesh position={[-0.16, 0, 0]} rotation={[0, 0, -Math.PI / 6]} material={materials.amberFaint}>
          <planeGeometry args={[0.22, 0.28]} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 6. BHOOMI — Agricultural Intelligence & Geospatial Analytics
 * Topographic contour disc installation with pulsed geospatial telemetry beacons
 * and rotating agro-radar beam.
 */
export function BhoomiInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const radarGroupRef = useRef<THREE.Group>(null);
  const beaconGroupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      terracePlate: arch.paleStoneFloor,
      darkBase: arch.darkMetalFrame,
      greenAccent: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.9,
      }),
      radarLine: new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.6,
      }),
      geoGrid: new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    };
  }, [accentColor, glowColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 1.2
      : state === "FOCUSED"
      ? 0.9
      : state === "ATTENTION"
      ? 0.75
      : 0.45;

    if (radarGroupRef.current) {
      radarGroupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group position={[0, 1.3, 0]}>
      {/* Tiered Topographic Contour Rings */}
      <mesh position={[0, 0, 0]} material={materials.terracePlate} receiveShadow>
        <cylinderGeometry args={[0.34, 0.36, 0.02, 32]} />
      </mesh>
      <mesh position={[0, 0.025, 0]} material={materials.terracePlate} receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.025, 28]} />
      </mesh>
      <mesh position={[0, 0.055, 0]} material={materials.terracePlate} receiveShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.03, 24]} />
      </mesh>

      {/* Rotating Geospatial Radar Beam */}
      <group position={[0, 0.075, 0]} ref={radarGroupRef}>
        <mesh position={[0.12, 0, 0]} material={materials.radarLine}>
          <boxGeometry args={[0.24, 0.004, 0.01]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.greenAccent}>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 16]} />
        </mesh>
      </group>

      {/* Geospatial Outbreak Telemetry Beacons */}
      <group position={[0, 0.08, 0]} ref={beaconGroupRef}>
        {[
          [0.16, 0, 0.08],
          [-0.14, 0, -0.12],
          [0.08, 0.02, -0.16],
          [-0.2, -0.02, 0.14],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh material={materials.greenAccent}>
              <sphereGeometry args={[0.015, 12, 12]} />
            </mesh>
            <mesh position={[0, 0.02, 0]} material={materials.radarLine}>
              <cylinderGeometry args={[0.002, 0.002, 0.04, 8]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/**
 * 7. MINCHAL — Energy Intelligence & Appliance Analytics
 * Toroidal electromagnetic flux armature with rotating ambient charge nodes
 * along an axial energy conduit core.
 */
export function MinchalInstallation({
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: InstallationProps) {
  const torusRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      darkStator: arch.darkMetalFrame,
      copperBrass: arch.lampBrass,
      amberGlow: new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: 0.9,
      }),
      energyCore: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.1,
        metalness: 0.9,
      }),
      accentWire: new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
      }),
    };
  }, [accentColor, glowColor]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const isHero = state === "SELECTED" || state === "EXHIBITION_360" || state === "DETAIL";
    const speed = isHero
      ? 1.6
      : state === "FOCUSED"
      ? 1.2
      : state === "ATTENTION"
      ? 1.0
      : 0.6;

    if (torusRef.current) {
      torusRef.current.rotation.y += delta * speed;
    }
    if (coilRef.current) {
      coilRef.current.rotation.x += delta * speed * 0.7;
    }
  });

  return (
    <group position={[0, 1.4, 0]}>
      {/* Outer Toroidal Stator Ring */}
      <mesh material={materials.darkStator}>
        <torusGeometry args={[0.28, 0.018, 16, 40]} />
      </mesh>
      <mesh material={materials.accentWire}>
        <torusGeometry args={[0.282, 0.019, 12, 32]} />
      </mesh>

      {/* Internal Rotating Magnetic Armature */}
      <group ref={torusRef}>
        <mesh material={materials.copperBrass}>
          <torusGeometry args={[0.2, 0.012, 14, 32]} />
        </mesh>
        {/* 6 Peripheral Charge Electrodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0]}
              material={materials.amberGlow}
            >
              <sphereGeometry args={[0.018, 12, 12]} />
            </mesh>
          );
        })}
      </group>

      {/* Central High-Conductivity Axial Core */}
      <group ref={coilRef}>
        <mesh material={materials.energyCore} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.26, 24]} />
        </mesh>
        <mesh material={materials.amberGlow} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.02, 24]} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Universal Dispatcher: renders the unique architectural installation for any project
 */
export function ProjectInstallation({
  projectId,
  accentColor,
  glowColor,
  state,
  reducedMotion = false,
}: {
  projectId: ProjectId;
  accentColor: string;
  glowColor: string;
  state: ExhibitionState;
  reducedMotion?: boolean;
}) {
  switch (projectId) {
    case "orion":
      return (
        <OrionInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "hearttune":
      return (
        <HeartTuneInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "nisf":
      return (
        <NisfInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "ahal":
      return (
        <AhalInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "prysm":
      return (
        <PrysmInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "bhoomi":
      return (
        <BhoomiInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    case "minchal":
      return (
        <MinchalInstallation
          accentColor={accentColor}
          glowColor={glowColor}
          state={state}
          reducedMotion={reducedMotion}
        />
      );
    default:
      return null;
  }
}
