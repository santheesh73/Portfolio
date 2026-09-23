"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { CinematicHUD } from "./CinematicHUD";
import { LoadingScene } from "./LoadingScene";
import { HouseFallback } from "./HouseFallback";
import { profile } from "@/data/profile";

// Dynamically import HouseScene to ensure strict client-side evaluation
const HouseScene = dynamic(
  () => import("./HouseScene").then((mod) => mod.HouseScene),
  { ssr: false }
);

// React 19 compliant browser capability store
function subscribeNoop() {
  return () => {};
}

let cachedWebGL: boolean | null = null;
function getWebGLSnapshot(): boolean {
  if (cachedWebGL === null) {
    try {
      const canvas = document.createElement("canvas");
      cachedWebGL = Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
      );
    } catch {
      cachedWebGL = false;
    }
  }
  return cachedWebGL;
}

function getWebGLServerSnapshot(): boolean {
  return true;
}

export function HouseExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const webglSupported = useSyncExternalStore(
    subscribeNoop,
    getWebGLSnapshot,
    getWebGLServerSnapshot
  );
  const [sceneReady, setSceneReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEntranceHovered, setIsEntranceHovered] = useState(false);

  // Scroll tracking to calculate progress from 0 (establishing) to 1 (front door)
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }

      const scrolledDistance = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrolledDistance / totalScrollableDistance)
      );

      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleEnterClick = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTarget =
      window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.95;

    window.scrollTo({
      top: scrollTarget,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  // If WebGL is verified as unsupported, render graceful fallback
  if (webglSupported === false) {
    return <HouseFallback />;
  }

  return (
    <section
      ref={containerRef}
      id="house-experience"
      aria-label="Santheesh's Digital House — Exterior 3D Opening Scene"
      className="relative h-[220vh] w-full bg-[#080a12]"
    >
      {/* Accessible semantic content for screen readers & SEO */}
      <div className="sr-only">
        <h1>{profile.name} — AI Software Engineer</h1>
        <p>{profile.tagline}</p>
        <p>
          Welcome to my digital residence. Phase 1 establishes the 3D cinematic
          exterior house. Scroll down to enter the residence and explore
          selected engineering projects, philosophy, and background.
        </p>
        <nav aria-label="Quick page jumps">
          <ul>
            <li>
              <a href="#identity-heading">Go to Perspective & Identity</a>
            </li>
            <li>
              <a href="#projects">Go to Projects</a>
            </li>
            <li>
              <a href="#about">Go to About</a>
            </li>
            <li>
              <a href="#contact">Go to Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sticky 100vh 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading Screen Overlay */}
        <LoadingScene isLoading={!sceneReady} />

        {/* 3D Scene Viewport */}
        {webglSupported && (
          <HouseScene
            scrollProgress={scrollProgress}
            isEntranceHovered={isEntranceHovered}
            onEntranceHoverChange={setIsEntranceHovered}
            onSceneReady={() => setSceneReady(true)}
            reducedMotion={Boolean(reduce)}
          />
        )}

        {/* Cinematic Minimal HUD */}
        <CinematicHUD
          scrollProgress={scrollProgress}
          onEnterClick={handleEnterClick}
        />
      </div>
    </section>
  );
}
