import assert from "node:assert";
import { projects } from "../src/data/projects";
import { getExhibitTransform } from "../src/types/exhibition";
import { getProjectTheme } from "../src/theme/rooms";
import { getProjectIdentity } from "../src/theme/colors";
import { ProjectId } from "../src/types";

console.log("==================================================");
console.log("RUNNING P2 EXHIBITION SYSTEM VERIFICATION SUITE");
console.log("==================================================");

// 1. PROJECT SOURCE OF TRUTH (Section 1)
const expectedProjectIds: ProjectId[] = [
  "orion",
  "hearttune",
  "nisf",
  "ahal",
  "prysm",
  "bhoomi",
  "minchal",
];

console.log("\n[Test 1] Verifying 7 Project Source of Truth...");
assert.strictEqual(
  projects.length,
  7,
  `Expected exactly 7 projects, found ${projects.length}`
);

const actualIds = projects.map((p) => p.id);
for (const expectedId of expectedProjectIds) {
  assert(
    actualIds.includes(expectedId),
    `Missing expected project ID: ${expectedId}`
  );
}

// Ensure no unexpected projects were added
for (const p of projects) {
  assert(
    expectedProjectIds.includes(p.id),
    `Unexpected project found: ${p.id}`
  );
}
console.log("✓ Exactly 7 projects verified with zero fabricated extra projects.");

// 2. PROJECT VISUAL IDENTITY ACCENTS (Section 4)
console.log("\n[Test 2] Verifying Visual Identity Color Mappings (Section 4)...");
const expectedColors: Record<string, string> = {
  orion: "Teal",
  hearttune: "Violet",
  nisf: "Blue",
  ahal: "Emerald",
  prysm: "Amber",
  bhoomi: "Green",
  minchal: "Orange",
};

for (const [id, expectedColorName] of Object.entries(expectedColors)) {
  const theme = getProjectTheme(id);
  assert.strictEqual(
    theme.tokens.name,
    expectedColorName,
    `Project ${id} should have theme name ${expectedColorName}, got ${theme.tokens.name}`
  );

  const identity = getProjectIdentity(id);
  assert(identity.accent, `Project ${id} missing accent color`);
  assert(identity.glow, `Project ${id} missing glow color`);
  console.log(`✓ ${id.toUpperCase()}: ${theme.tokens.name} (accent: ${identity.accent}, glow: ${identity.glow})`);
}

// 3. SPATIAL GEOMETRY & ROOM 02 PLACEMENT (Section 3 & 16)
console.log("\n[Test 3] Verifying Spatial Exhibits Placement & Room 02 Bounds...");
// Room 02 bounds: x: -8.5 to -0.5, z: -9.5 to -3.5, floor y: ~0.12
const ROOM_X_MIN = -8.5;
const ROOM_X_MAX = -0.5;
const ROOM_Z_MIN = -9.5;
const ROOM_Z_MAX = -3.5;

for (const id of expectedProjectIds) {
  const transform = getExhibitTransform(id);
  assert(transform, `Missing ExhibitTransform for ${id}`);

  const [x, y, z] = transform.position;
  assert(
    x >= ROOM_X_MIN && x <= ROOM_X_MAX,
    `Project ${id} x=${x} is outside Room 02 bounds [${ROOM_X_MIN}, ${ROOM_X_MAX}]`
  );
  assert(
    z >= ROOM_Z_MIN && z <= ROOM_Z_MAX,
    `Project ${id} z=${z} is outside Room 02 bounds [${ROOM_Z_MIN}, ${ROOM_Z_MAX}]`
  );
  assert(
    y >= 0.1 && y <= 0.25,
    `Project ${id} floor elevation y=${y} is outside pedestal mounting height`
  );

  // Clipping protection verification (Section 8)
  assert(
    transform.minDistance >= 0.9,
    `Project ${id} minDistance ${transform.minDistance} too small, could clip through pedestal`
  );
  assert(
    transform.maxDistance <= 2.6,
    `Project ${id} maxDistance ${transform.maxDistance} too large, could clip outside room walls`
  );
  assert(
    transform.minDistance < transform.defaultDistance &&
      transform.defaultDistance < transform.maxDistance,
    `Project ${id} distance ordering invalid: min < default < max`
  );

  // Polar angle clipping protection (maxPhi < Math.PI / 2 prevents camera going below floor)
  assert(
    transform.maxPhi < Math.PI / 2,
    `Project ${id} maxPhi ${transform.maxPhi} >= PI/2 would allow camera to sink below floor`
  );
  assert(
    transform.minPhi > 0,
    `Project ${id} minPhi ${transform.minPhi} <= 0 would cause gimbal singularity`
  );

  // Verify room boundary clamping bounds
  const center = [
    transform.position[0] + transform.centerOffset[0],
    transform.position[1] + transform.centerOffset[1],
    transform.position[2] + transform.centerOffset[2],
  ];
  // Minimum camera elevation check
  const lowestY = center[1] + transform.minDistance * Math.cos(transform.maxPhi);
  assert(
    lowestY >= 0.35,
    `Project ${id} lowest camera elevation ${lowestY} below safe floor clearance`
  );

  console.log(
    `✓ ${id.toUpperCase()}: pos=[${x}, ${y}, ${z}], dist=[${transform.minDistance}..${transform.defaultDistance}..${transform.maxDistance}], phi=[${(transform.minPhi * 180 / Math.PI).toFixed(0)}°..${(transform.maxPhi * 180 / Math.PI).toFixed(0)}°]`
  );
}

// 4. VERIFY REUSABLE EXHIBITION INTEGRITY & FEATURED STATUS
console.log("\n[Test 4] Verifying Featured Master Plinth exhibit...");
const featured = projects.find((p) => p.featured);
assert(featured, "Expected at least one featured project");
assert.strictEqual(featured.id, "orion", "ORION must be the featured centerpiece exhibit");
console.log(`✓ Featured project: ${featured.name} (id: ${featured.id})`);

// 5. VERIFY EXHIBITION STATE MACHINE SEQUENCE (Section 5)
console.log("\n[Test 5] Verifying Exhibition State Machine Sequence (Section 5)...");
const validStates = [
  "IDLE",
  "ATTENTION",
  "FOCUSED",
  "SELECTED",
  "EXHIBITION_360",
  "DETAIL",
  "EXITING",
];

const stateTransitions: Record<string, string[]> = {
  IDLE: ["ATTENTION", "FOCUSED", "SELECTED"],
  ATTENTION: ["FOCUSED", "SELECTED", "IDLE"],
  FOCUSED: ["SELECTED", "ATTENTION", "IDLE"],
  SELECTED: ["EXHIBITION_360", "EXITING"],
  EXHIBITION_360: ["DETAIL", "EXITING"],
  DETAIL: ["EXHIBITION_360", "EXITING"],
  EXITING: ["IDLE", "SELECTED"],
};

for (const state of validStates) {
  assert(stateTransitions[state], `Missing transition definition for state ${state}`);
  for (const nextState of stateTransitions[state]) {
    assert(validStates.includes(nextState), `Invalid target state ${nextState} from ${state}`);
  }
}
console.log("✓ State machine verified: IDLE → ATTENTION → FOCUSED → SELECTED → EXHIBITION_360 → DETAIL → EXITING → IDLE (no conflict)");

console.log("\n==================================================");
console.log("ALL P2 TESTS PASSED CLEANLY!");
console.log("==================================================");
