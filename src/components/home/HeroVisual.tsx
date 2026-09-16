"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
  kind: "core" | "satellite";
}

const NODES: GraphNode[] = [
  { id: "core", x: 200, y: 152, label: "system", kind: "core" },
  { id: "model", x: 82, y: 76, label: "model", kind: "satellite" },
  { id: "api", x: 318, y: 76, label: "api", kind: "satellite" },
  { id: "ui", x: 82, y: 228, label: "interface", kind: "satellite" },
  { id: "data", x: 318, y: 228, label: "data", kind: "satellite" },
];

const EDGES: Array<{ from: string; to: string }> = [
  { from: "core", to: "model" },
  { from: "core", to: "api" },
  { from: "core", to: "ui" },
  { from: "core", to: "data" },
];

function nodeById(id: string): GraphNode {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown hero graph node: ${id}`);
  return node;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const edgeVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Abstract AI/software system visualization.
 * Lightweight SVG + Motion only — no canvas, no loops.
 * Pointer parallax is desktop-only and disabled with reduced motion.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches
  );

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });
  const cardX = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const glowY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const parallaxEnabled = finePointer && !reduce;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!parallaxEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      onPointerMove={parallaxEnabled ? handlePointerMove : undefined}
      onPointerLeave={parallaxEnabled ? handlePointerLeave : undefined}
    >
      {/* Soft accent depth behind the card */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6 rounded-xl bg-[radial-gradient(closest-side,rgba(20,184,166,0.12),transparent)]"
        style={parallaxEnabled ? { x: glowX, y: glowY } : undefined}
      />

      <motion.div
        aria-hidden="true"
        className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface/50 shadow-card backdrop-blur-md"
        style={parallaxEnabled ? { x: cardX, y: cardY } : undefined}
      >
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-border-subtle bg-surface-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-accent/50" />
          </div>
          <p className="font-mono text-[0.68rem] tracking-[0.08em] text-text-muted">
            ai-system — overview
          </p>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success" />
            <span className="font-mono text-[0.68rem] text-text-muted">
              system
            </span>
          </span>
        </div>

        {/* System graph */}
        <motion.svg
          viewBox="0 0 400 304"
          role="img"
          aria-label="Abstract diagram of an AI software system connecting model, API, interface, and data nodes"
          className="h-auto w-full"
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          {/* Faint grid */}
          <defs>
            <pattern
              id="hero-grid"
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 26 0 L 0 0 0 26"
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="400" height="304" fill="url(#hero-grid)" />

          {/* Connections */}
          {EDGES.map((edge) => {
            const from = nodeById(edge.from);
            const to = nodeById(edge.to);
            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--border)"
                strokeWidth="1.5"
                variants={edgeVariants}
              />
            );
          })}

          {/* Travelling data points (static position, fade in with nodes) */}
          <motion.g variants={nodeVariants}>
            <circle cx={141} cy={114} r={2.5} fill="var(--accent)" opacity={0.7} />
            <circle cx={259} cy={190} r={2.5} fill="var(--accent)" opacity={0.7} />
          </motion.g>

          {/* Nodes */}
          {NODES.map((node) =>
            node.kind === "core" ? (
              <motion.g key={node.id} variants={nodeVariants}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={26}
                  fill="var(--accent)"
                  opacity={0.1}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={13}
                  fill="var(--accent)"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={4.5}
                  fill="var(--accent-foreground)"
                />
                <text
                  x={node.x}
                  y={node.y + 34}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="var(--font-geist-mono), monospace"
                  letterSpacing="0.08em"
                  fill="var(--text-secondary)"
                >
                  {node.label}
                </text>
              </motion.g>
            ) : (
              <motion.g key={node.id} variants={nodeVariants}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={11}
                  fill="var(--surface)"
                  stroke="var(--border)"
                  strokeWidth={1.5}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={4}
                  fill="var(--accent)"
                />
                <text
                  x={node.x}
                  y={node.y + 26}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="var(--font-geist-mono), monospace"
                  letterSpacing="0.08em"
                  fill="var(--text-secondary)"
                >
                  {node.label}
                </text>
              </motion.g>
            )
          )}
        </motion.svg>

        {/* Pipeline footer */}
        <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2.5">
          <p className="font-mono text-[0.68rem] tracking-[0.04em] text-text-muted">
            request <span aria-hidden="true">→</span> inference{" "}
            <span aria-hidden="true">→</span> interface
          </p>
          <p className="font-mono text-[0.68rem] text-text-muted">
            <span className="text-accent" aria-hidden="true">
              ◉
            </span>{" "}
            connected
          </p>
        </div>
      </motion.div>
    </div>
  );
}
