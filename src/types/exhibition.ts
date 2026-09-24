import { ProjectId } from "./index";

export type ExhibitionState =
  | "IDLE"
  | "ATTENTION"
  | "FOCUSED"
  | "SELECTED"
  | "EXHIBITION_360"
  | "DETAIL"
  | "EXITING";

export interface ExhibitTransform {
  id: ProjectId;
  position: [number, number, number];
  rotation: [number, number, number];
  centerOffset: [number, number, number];
  defaultDistance: number;
  minDistance: number;
  maxDistance: number;
  defaultPhi: number;
  minPhi: number;
  maxPhi: number;
  initialTheta?: number;
}

export const EXHIBIT_TRANSFORMS: Record<ProjectId, ExhibitTransform> = {
  orion: {
    id: "orion",
    position: [-4.5, 0.14, -6.5],
    rotation: [0, 0, 0],
    centerOffset: [0, 1.25, 0],
    defaultDistance: 2.1,
    minDistance: 1.1,
    maxDistance: 2.5,
    defaultPhi: Math.PI / 2.8,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: 0,
  },
  hearttune: {
    id: "hearttune",
    position: [-2.4, 0.14, -4.8],
    rotation: [0, Math.PI / 4, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: Math.PI / 4,
  },
  nisf: {
    id: "nisf",
    position: [-2.4, 0.14, -8.0],
    rotation: [0, (3 * Math.PI) / 4, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: (3 * Math.PI) / 4,
  },
  ahal: {
    id: "ahal",
    position: [-6.6, 0.14, -4.8],
    rotation: [0, -Math.PI / 4, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: -Math.PI / 4,
  },
  prysm: {
    id: "prysm",
    position: [-6.6, 0.14, -8.0],
    rotation: [0, -(3 * Math.PI) / 4, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: -(3 * Math.PI) / 4,
  },
  bhoomi: {
    id: "bhoomi",
    position: [-4.5, 0.14, -4.6],
    rotation: [0, 0, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: 0,
  },
  minchal: {
    id: "minchal",
    position: [-4.5, 0.14, -8.4],
    rotation: [0, Math.PI, 0],
    centerOffset: [0, 1.12, 0],
    defaultDistance: 1.65,
    minDistance: 1.0,
    maxDistance: 2.0,
    defaultPhi: Math.PI / 2.7,
    minPhi: Math.PI / 8,
    maxPhi: Math.PI / 2.3,
    initialTheta: Math.PI,
  },
};

export function getExhibitTransform(id: ProjectId): ExhibitTransform {
  return EXHIBIT_TRANSFORMS[id] || EXHIBIT_TRANSFORMS.orion;
}
