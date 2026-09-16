import type { ProjectId } from "@/types";
import { cn } from "@/lib/utils";

const INK = "var(--border)";
const FAINT = "var(--border-subtle)";
const ACCENT = "var(--accent)";

function OrionArt() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <rect x={70} y={30} width={260} height={180} rx={10} fill="none" stroke={FAINT} />
      {/* device */}
      <rect x={172} y={62} width={56} height={112} rx={12} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      <circle cx={200} cy={118} r={10} fill={ACCENT} opacity={0.9} />
      <rect x={188} y={140} width={24} height={4} rx={2} fill={FAINT} />
      <rect x={192} y={148} width={16} height={4} rx={2} fill={FAINT} />
      {/* orbit rings */}
      <ellipse cx={200} cy={118} rx={52} ry={30} fill="none" stroke={INK} strokeDasharray="3 5" />
      <ellipse cx={200} cy={118} rx={84} ry={52} fill="none" stroke={FAINT} />
      <circle cx={148} cy={118} r={4} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      <circle cx={284} cy={118} r={4} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      {/* signal ticks */}
      <path d="M120 66 l10 -10 M280 66 l-10 -10" stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
      <text x={200} y={208} textAnchor="middle" fontSize={10} fontFamily="monospace" letterSpacing="0.12em" fill="var(--text-muted)">
        ON-DEVICE · OFFLINE
      </text>
    </svg>
  );
}

function HeartTuneArt() {
  const bars = [34, 58, 44, 78, 62, 92, 54, 70, 40, 60, 48, 36];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      {/* waveform */}
      <path
        d="M20 150 C 60 150, 70 110, 110 118 S 160 170, 200 150 S 250 96, 290 122 S 350 168, 380 140"
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />
      {/* equalizer */}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 22}
          y={200 - h}
          width={10}
          height={h}
          rx={3}
          fill={i === 5 || i === 8 ? ACCENT : "var(--surface)"}
          stroke={i === 5 || i === 8 ? ACCENT : INK}
          strokeWidth={1.2}
          opacity={i === 5 || i === 8 ? 0.9 : 1}
        />
      ))}
      <circle cx={330} cy={52} r={14} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      <path d="M326 52 l11 0 M337 52 l0 0 M330 44 v16" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function NisfArt() {
  const modes = [
    { label: "TEXT", x: 70, y: 60 },
    { label: "IMAGE", x: 330, y: 60 },
    { label: "AUDIO", x: 70, y: 180 },
    { label: "VIDEO", x: 330, y: 180 },
  ];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      {modes.map((m) => (
        <g key={m.label}>
          <line x1={200} y1={120} x2={m.x} y2={m.y} stroke={INK} strokeDasharray="2 4" />
          <rect x={m.x - 34} y={m.y - 13} width={68} height={26} rx={13} fill="var(--surface)" stroke={INK} strokeWidth={1.2} />
          <text x={m.x} y={m.y + 3.5} textAnchor="middle" fontSize={9.5} fontFamily="monospace" letterSpacing="0.1em" fill="var(--text-secondary)">
            {m.label}
          </text>
        </g>
      ))}
      {/* spark core */}
      <path d="M200 92 C 203 108, 206 114, 222 117 C 206 120, 203 126, 200 142 C 197 126, 194 120, 178 117 C 194 114, 197 108, 200 92 Z" fill={ACCENT} opacity={0.9} />
      <circle cx={200} cy={117} r={30} fill="none" stroke={FAINT} />
    </svg>
  );
}

function AhalArt() {
  const rows = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <rect x={60} y={36} width={200} height={168} rx={10} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      {rows.map((r) => (
        <g key={r}>
          <rect x={80} y={60 + r * 26} width={r === 2 ? 120 : 84} height={9} rx={4.5} fill={r === 2 ? ACCENT : FAINT} opacity={r === 2 ? 0.75 : 1} />
          <rect x={80} y={73 + r * 26} width={r === 1 ? 150 : 110} height={6} rx={3} fill={FAINT} />
        </g>
      ))}
      {/* insight node */}
      <line x1={260} y1={112} x2={310} y2={112} stroke={INK} />
      <circle cx={322} cy={112} r={16} fill="var(--surface)" stroke={ACCENT} strokeWidth={1.8} />
      <circle cx={322} cy={112} r={5} fill={ACCENT} />
      <text x={322} y={152} textAnchor="middle" fontSize={10} fontFamily="monospace" letterSpacing="0.1em" fill="var(--text-muted)">
        INSIGHT
      </text>
    </svg>
  );
}

function PrysmArt() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <line x1={40} y1={120} x2={168} y2={120} stroke={INK} strokeWidth={1.5} />
      <path d="M200 60 L262 168 L138 168 Z" fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      <line x1={214} y1={132} x2={360} y2={96} stroke={ACCENT} strokeWidth={1.5} />
      <line x1={214} y1={142} x2={360} y2={140} stroke={INK} strokeWidth={1.5} />
      <line x1={208} y1={152} x2={360} y2={184} stroke={FAINT} strokeWidth={1.5} />
      <circle cx={40} cy={120} r={4} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
    </svg>
  );
}

function BhoomiArt() {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      {/* dotted field grid */}
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: 15 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={52 + c * 22} cy={40 + r * 20} r={1.4} fill={FAINT} />
        ))
      )}
      {/* region outline */}
      <path
        d="M110 70 L190 52 L268 74 L282 140 L232 188 L142 182 L96 132 Z"
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      {/* hotspots */}
      <circle cx={170} cy={110} r={7} fill={ACCENT} opacity={0.85} />
      <circle cx={170} cy={110} r={13} fill="none" stroke={ACCENT} opacity={0.35} />
      <circle cx={228} cy={140} r={5} fill="var(--warning)" opacity={0.9} />
      <circle cx={140} cy={152} r={4} fill="var(--surface)" stroke={INK} strokeWidth={1.5} />
      <text x={200} y={216} textAnchor="middle" fontSize={10} fontFamily="monospace" letterSpacing="0.12em" fill="var(--text-muted)">
        HOTSPOT · REGION · CROP
      </text>
    </svg>
  );
}

function MinchalArt() {
  const bars = [
    { h: 44, accent: false },
    { h: 62, accent: false },
    { h: 52, accent: false },
    { h: 96, accent: true },
    { h: 70, accent: false },
  ];
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden="true">
      <line x1={48} y1={200} x2={352} y2={200} stroke={INK} strokeWidth={1.5} />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={76 + i * 52}
          y={200 - b.h}
          width={30}
          height={b.h}
          rx={4}
          fill={b.accent ? ACCENT : "var(--surface)"}
          stroke={b.accent ? ACCENT : INK}
          strokeWidth={1.4}
          opacity={b.accent ? 0.9 : 1}
        />
      ))}
      {/* bolt over the spike */}
      <path d="M238 52 l-14 26 h12 l-6 20 20 -30 h-12 l8 -16 Z" fill="none" stroke={ACCENT} strokeWidth={1.8} strokeLinejoin="round" />
      <text x={232} y={200 - 96 - 12} textAnchor="middle" fontSize={10} fontFamily="monospace" letterSpacing="0.08em" fill="var(--text-muted)">
        +SPIKE
      </text>
    </svg>
  );
}

const ART: Record<ProjectId, () => React.JSX.Element> = {
  orion: OrionArt,
  hearttune: HeartTuneArt,
  nisf: NisfArt,
  ahal: AhalArt,
  prysm: PrysmArt,
  bhoomi: BhoomiArt,
  minchal: MinchalArt,
};

interface ProjectVisualProps {
  id: ProjectId;
  className?: string;
}

/**
 * Abstract, project-specific visual treatment.
 * Decorative only (aria-hidden) — never a fake screenshot.
 * Fills its parent; the parent controls aspect ratio.
 */
export function ProjectVisual({ id, className }: ProjectVisualProps) {
  const Art = ART[id];
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-[radial-gradient(28rem_16rem_at_50%_0%,rgba(20,184,166,0.08),transparent_70%)]",
        className
      )}
    >
      <div className="absolute inset-0 p-3 transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:p-4">
        <Art />
      </div>
    </div>
  );
}
