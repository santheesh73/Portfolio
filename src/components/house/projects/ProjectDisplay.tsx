"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/types";
import { ExhibitionState } from "@/types/exhibition";
import { getProjectIdentity } from "@/theme/colors";
import { createArchitecturalMaterials } from "@/theme/materials";
import { ProjectInstallation } from "./ExhibitInstallations";

interface ProjectDisplayProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
  isFeatured?: boolean;
  isFocused?: boolean;
  exhibitionState?: ExhibitionState;
  isInspected?: boolean;
  isAnyInspected?: boolean;
  onFocusChange?: (focused: boolean) => void;
  onSelect: (project: Project) => void;
  reducedMotion?: boolean;
}

function createExhibitPlaqueTexture(
  projectName: string,
  category: string,
  accentColor: string,
  isFeatured: boolean
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background: deep architectural slate with subtle frosted finish
  ctx.fillStyle = "#1e2227";
  ctx.fillRect(0, 0, 512, 256);

  // Subtle glass highlight gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 256);
  grad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
  grad.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.25)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Left accent indicator bar
  ctx.fillStyle = accentColor;
  ctx.fillRect(24, 28, 6, 200);

  // Exhibit category
  ctx.fillStyle = accentColor;
  ctx.font = "600 20px monospace";
  ctx.fillText((category || "SYSTEMS ARCHITECTURE").toUpperCase(), 44, 62);

  // Exhibit Name
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 44px sans-serif";
  ctx.fillText(projectName, 44, 122);

  // Status / Metadata row
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "500 18px monospace";
  ctx.fillText(
    isFeatured ? "CENTRAL PLINTH · 360° PHYSICAL EXHIBIT" : "GALLERY EXHIBIT · 360° INSPECTION",
    44,
    170
  );

  // Bottom hairline rule
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.fillRect(44, 195, 430, 2);

  // Status dot
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(460, 56, 6, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ProjectDisplay({
  project,
  position,
  rotation = [0, 0, 0],
  isFeatured = false,
  isFocused = false,
  exhibitionState: externalState,
  isInspected = false,
  isAnyInspected = false,
  onFocusChange,
  onSelect,
  reducedMotion = false,
}: ProjectDisplayProps) {
  const [hovered, setHovered] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);
  const isApproachingRef = useRef(false);
  const glowPlaneRef = useRef<THREE.Mesh>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const baseGlowRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const projectIdentity = useMemo(() => getProjectIdentity(project.id), [project.id]);

  // Unified Exhibition State computation (Section 5)
  const currentState: ExhibitionState = useMemo(() => {
    if (isInspected) {
      return externalState || "EXHIBITION_360";
    }
    if (isFocused || hovered) {
      return "FOCUSED";
    }
    if (isApproaching) {
      return "ATTENTION";
    }
    return "IDLE";
  }, [isInspected, externalState, isFocused, hovered, isApproaching]);

  const plaqueTexture = useMemo(() => {
    return createExhibitPlaqueTexture(
      project.name,
      project.category || "",
      projectIdentity.accent,
      isFeatured
    );
  }, [project.name, project.category, projectIdentity.accent, isFeatured]);

  const materials = useMemo(() => {
    const arch = createArchitecturalMaterials();
    return {
      pedestalBase: isFeatured ? arch.plinthBase : arch.ivoryWall,
      pedestalTop: arch.plinthDarkTop,
      metalTrim: new THREE.MeshStandardMaterial({
        color: isFeatured ? projectIdentity.accent : "#cbd5e1",
        roughness: 0.25,
        metalness: 0.85,
      }),
      glassPlaque: arch.clearGlass,
      glassBackPlate: arch.darkMetalFrame,
      screenFace: plaqueTexture
        ? new THREE.MeshStandardMaterial({
            map: plaqueTexture,
            roughness: 0.2,
            metalness: 0.1,
            transparent: true,
            opacity: 0.95,
          })
        : arch.darkMetalFrame,
      plaqueGlow: new THREE.MeshBasicMaterial({
        color: projectIdentity.glow,
        transparent: true,
        opacity: isFeatured ? 0.35 : 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      baseGlow: new THREE.MeshBasicMaterial({
        color: projectIdentity.glow,
        transparent: true,
        opacity: isFeatured ? 0.22 : 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      edgeGlow: new THREE.MeshBasicMaterial({
        color: projectIdentity.glow,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      accentHairline: new THREE.MeshBasicMaterial({
        color: projectIdentity.accent,
      }),
      statusDot: new THREE.MeshBasicMaterial({
        color: projectIdentity.glow,
      }),
      groundingShadow: arch.groundingShadow,
      illuminatedReveal: arch.plinthIlluminated,
    };
  }, [isFeatured, projectIdentity, plaqueTexture]);

  // Dynamic approach, hover, and inspection lighting modulation
  useFrame((_, delta) => {
    if (reducedMotion) return;

    // Check distance between camera and this exhibit for subtle approach behaviour
    const camPos = camera.position;
    const dx = camPos.x - position[0];
    const dy = camPos.y - (position[1] + 1.0);
    const dz = camPos.z - position[2];
    const distSq = dx * dx + dy * dy + dz * dz;
    const isNear = distSq < 18.0; // within ~4.2m

    if (isNear !== isApproachingRef.current) {
      isApproachingRef.current = isNear;
      setIsApproaching(isNear);
    }

    const isHero =
      currentState === "SELECTED" ||
      currentState === "EXHIBITION_360" ||
      currentState === "DETAIL";
    const isActive = isHero || currentState === "FOCUSED" || hovered;

    // Modulate presentation spotlight
    if (spotLightRef.current) {
      let targetIntensity = 0.45;
      if (isHero) {
        targetIntensity = 2.4;
      } else if (isActive) {
        targetIntensity = 1.6;
      } else if (isNear) {
        targetIntensity = 0.85;
      } else if (isAnyInspected) {
        targetIntensity = 0.08; // quiet surrounding exhibits
      }
      spotLightRef.current.intensity = THREE.MathUtils.damp(
        spotLightRef.current.intensity,
        targetIntensity,
        4.0,
        delta
      );
    }

    // Modulate rim backlight
    if (rimLightRef.current) {
      let targetIntensity = 0.2;
      if (isHero) {
        targetIntensity = 1.2;
      } else if (isActive) {
        targetIntensity = 0.7;
      } else if (isAnyInspected) {
        targetIntensity = 0.02;
      }
      rimLightRef.current.intensity = THREE.MathUtils.damp(
        rimLightRef.current.intensity,
        targetIntensity,
        4.0,
        delta
      );
    }

    // Modulate plaque glow (uses distinct materials.plaqueGlow)
    if (glowPlaneRef.current) {
      const mat = glowPlaneRef.current.material as THREE.MeshBasicMaterial;
      let targetOpacity = isFeatured ? 0.28 : 0.16;
      if (isHero) {
        targetOpacity = 0.75;
      } else if (isActive) {
        targetOpacity = 0.52;
      } else if (isNear) {
        targetOpacity = isFeatured ? 0.38 : 0.25;
      } else if (isAnyInspected) {
        targetOpacity = 0.05;
      }
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 5.0, delta);
    }

    // Modulate under-pedestal floor spill (uses distinct materials.baseGlow)
    if (baseGlowRef.current) {
      const mat = baseGlowRef.current.material as THREE.MeshBasicMaterial;
      let targetOpacity = isFeatured ? 0.22 : 0.12;
      if (isHero) {
        targetOpacity = 0.65;
      } else if (isActive) {
        targetOpacity = 0.42;
      } else if (isAnyInspected) {
        targetOpacity = 0.03;
      }
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 4.0, delta);
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      name={`exhibit-${project.id}`}
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
        onSelect(project);
      }}
    >
      {/* ========================================================
          1. EXHIBITION PRESENTATION LIGHTING (Section 14)
          Overhead directional spot + rear rim light + floor wash
          ======================================================== */}
      <spotLight
        ref={spotLightRef}
        position={[0, 2.8, 0.4]}
        target-position={[0, 1.1, 0]}
        color={projectIdentity.glow}
        intensity={0.45}
        angle={Math.PI / 3.2}
        penumbra={0.65}
        distance={4.5}
        decay={2}
      />
      <pointLight
        ref={rimLightRef}
        position={[0, 1.6, -0.6]}
        color={projectIdentity.accent}
        intensity={0.2}
        distance={2.5}
        decay={2}
      />

      {/* ========================================================
          2. GROUNDING CONTACT SHADOW & FLOOR LIGHT SPILL
          ======================================================== */}
      <mesh
        position={[0, 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.groundingShadow}
      >
        <planeGeometry args={isFeatured ? [1.8, 1.4] : [1.15, 1.15]} />
      </mesh>
      <mesh
        ref={baseGlowRef}
        position={[0, 0.006, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.baseGlow}
      >
        <planeGeometry args={isFeatured ? [2.1, 1.7] : [1.35, 1.35]} />
      </mesh>

      {/* ========================================================
          3. ARCHITECTURAL PEDESTAL DESIGN (Section 3)
          Plinth base with illuminated reveal and metal collar
          ======================================================== */}
      {isFeatured ? (
        // Featured Rectangular Master Plinth (ORION)
        <group position={[0, 0, 0]}>
          {/* Under-plinth illuminated reveal band */}
          <mesh position={[0, 0.03, 0]} material={materials.illuminatedReveal}>
            <boxGeometry args={[1.44, 0.04, 0.84]} />
          </mesh>
          {/* Main Stone Plinth Body */}
          <mesh
            material={materials.pedestalBase}
            position={[0, 0.45, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1.4, 0.82, 0.8]} />
          </mesh>
          {/* Recessed Dark Top Inset */}
          <mesh
            material={materials.pedestalTop}
            position={[0, 0.87, 0]}
            receiveShadow
          >
            <boxGeometry args={[1.36, 0.02, 0.76]} />
          </mesh>
          {/* Plinth Perimeter Brushed Accent Rim */}
          <mesh material={materials.metalTrim} position={[0, 0.88, 0]}>
            <boxGeometry args={[1.42, 0.015, 0.82]} />
          </mesh>
        </group>
      ) : (
        // Fluted / Cylindrical Architectural Plinth (Secondary Exhibits)
        <group position={[0, 0, 0]}>
          {/* Under-plinth illuminated reveal disk */}
          <mesh position={[0, 0.025, 0]} material={materials.illuminatedReveal}>
            <cylinderGeometry args={[0.47, 0.47, 0.03, 32]} />
          </mesh>
          {/* Main Fluted Architectural Stone Column */}
          <mesh
            material={materials.pedestalBase}
            position={[0, 0.42, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.44, 0.46, 0.78, 32]} />
          </mesh>
          {/* Recessed Dark Slate Top Inset */}
          <mesh
            material={materials.pedestalTop}
            position={[0, 0.82, 0]}
            receiveShadow
          >
            <cylinderGeometry args={[0.41, 0.41, 0.02, 32]} />
          </mesh>
          {/* Anodized Metal Perimeter Trim Collar */}
          <mesh material={materials.metalTrim} position={[0, 0.83, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.012, 32]} />
          </mesh>
        </group>
      )}

      {/* ========================================================
          4. UNIQUE GEOMETRIC INSTALLATION (true 360° physical exhibit)
          ======================================================== */}
      <ProjectInstallation
        projectId={project.id}
        accentColor={projectIdentity.accent}
        glowColor={projectIdentity.glow}
        state={currentState}
        reducedMotion={reducedMotion}
      />

      {/* ========================================================
          5. ANGLED ARCHITECTURAL DISPLAY STRUCTURE (Section 3 & 15)
          Front: Translucent glass with holographic title & indicator
          Rear: Anodized metal backplate with cooling vents & hex fasteners
          ======================================================== */}
      <group
        position={[0, isFeatured ? 1.02 : 0.94, isFeatured ? 0.38 : 0.32]}
        rotation={[-0.24, 0, 0]}
      >
        {/* Rear Metal Structural Backplate (Visible during 360° rear inspection) */}
        <mesh position={[0, 0, -0.012]} material={materials.glassBackPlate} castShadow>
          <boxGeometry
            args={isFeatured ? [0.92, 0.28, 0.012] : [0.66, 0.22, 0.01]}
          />
        </mesh>
        {/* Rear Architectural Ventilation Grille Details */}
        {[-0.25, 0, 0.25].map((xOffset) => (
          <mesh
            key={xOffset}
            position={[xOffset, 0, -0.019]}
            material={materials.pedestalTop}
          >
            <boxGeometry args={[0.12, 0.08, 0.004]} />
          </mesh>
        ))}

        {/* Front Museum Signage Display Panel (Canvas Placard Texture) */}
        <mesh position={[0, 0, 0.002]} material={materials.screenFace} castShadow>
          <planeGeometry
            args={isFeatured ? [0.90, 0.26] : [0.64, 0.20]}
          />
        </mesh>

        {/* Front Protective Museum Glass Pane */}
        <mesh position={[0, 0, 0.008]} material={materials.glassPlaque} castShadow>
          <boxGeometry
            args={isFeatured ? [0.94, 0.3, 0.01] : [0.68, 0.24, 0.008]}
          />
        </mesh>

        {/* Screen Edge Emissive Frame */}
        <mesh position={[0, 0, 0.012]} material={materials.edgeGlow}>
          <planeGeometry
            args={isFeatured ? [0.92, 0.28] : [0.66, 0.22]}
          />
        </mesh>

        {/* Dynamic Focus / Hover Highlight Plane */}
        <mesh
          ref={glowPlaneRef}
          position={[0, 0, 0.014]}
          material={materials.plaqueGlow}
        >
          <planeGeometry
            args={isFeatured ? [0.94, 0.3] : [0.68, 0.24]}
          />
        </mesh>

        {/* Status Telemetry Indicator Dot */}
        <mesh
          position={[
            isFeatured ? -0.4 : -0.28,
            isFeatured ? 0.08 : 0.06,
            0.016,
          ]}
          material={materials.statusDot}
        >
          <circleGeometry args={[isFeatured ? 0.018 : 0.014, 16]} />
        </mesh>

        {/* Exhibition Accent Hairline Indicator */}
        <mesh
          position={[0, isFeatured ? -0.08 : -0.06, 0.016]}
          material={materials.accentHairline}
        >
          <boxGeometry
            args={isFeatured ? [0.75, 0.008, 0.002] : [0.52, 0.006, 0.002]}
          />
        </mesh>
      </group>
    </group>
  );
}
