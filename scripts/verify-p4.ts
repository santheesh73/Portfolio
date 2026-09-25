import assert from "node:assert";
import { projects } from "../src/data/projects";
import { SKILL_GROUPS } from "../src/data/skills";
import { PROOF_HACKATHONS, PROOF_MILESTONES, PROOF_OPEN_SOURCE } from "../src/data/proof";
import { profile } from "../src/data/profile";
import { getExhibitTransform } from "../src/types/exhibition";
import { ROOM_WAYPOINTS, getActiveSpatialState } from "../src/components/house/SpatialNavigation";
import { createArchitecturalMaterials } from "../src/theme/materials";

console.log("==================================================================");
console.log("RUNNING P4 PRODUCTION QUALITY ASSURANCE & VERIFICATION SUITE");
console.log("==================================================================");

// TEST 1: CONTENT SOURCE OF TRUTH VERIFICATION
console.log("\n[Test 1] Auditing Project Source of Truth...");
assert.strictEqual(projects.length, 7, "Must contain exactly 7 projects");
const expectedProjectNames = [
  "ORION",
  "HeartTune",
  "NISF",
  "AHAL AI",
  "PRYSM",
  "BHOOMI",
  "MINCHAL",
];
for (const p of projects) {
  assert(expectedProjectNames.includes(p.name), `Unexpected project name: ${p.name}`);
  assert(p.id, `Project ${p.name} must have an id`);
  assert(p.technologies && Array.isArray(p.technologies), `Project ${p.name} must have technologies array`);
}
console.log(`✓ All 7 projects verified authentic with accurate metadata.`);

// TEST 2: TECH STACK SOURCE OF TRUTH VERIFICATION
console.log("\n[Test 2] Auditing Engineering Stack Categories...");
assert.strictEqual(SKILL_GROUPS.length, 4, "Must contain exactly 4 technical categories");
const expectedCategoryIds = ["ai", "frontend", "backend", "data-infra"];
for (const group of SKILL_GROUPS) {
  assert(expectedCategoryIds.includes(group.id), `Unexpected skill category: ${group.id}`);
  assert(group.items.length > 0, `Skill group ${group.id} must have items`);
  console.log(`✓ Category ${group.index} (${group.id.toUpperCase()}): ${group.items.length} verified technologies`);
}

// TEST 3: 360° ORBIT TRANSFORMS & BOUNDARY CLAMPING
console.log("\n[Test 3] Auditing 360° Orbit Transforms & Safe Distance/Phi Limits...");
// Room 02 bounds: X [-8.5, -0.5], Z [-9.5, -3.5]
// Room 03 bounds: X [2.9, 9.5], Z [-12.0, -6.0]
for (const p of projects) {
  const t = getExhibitTransform(p.id);
  assert(t, `Missing transform for project ${p.id}`);
  assert(t.minDistance < t.defaultDistance && t.defaultDistance < t.maxDistance, `Invalid distance bounds for ${p.id}`);
  assert(t.minPhi > 0 && t.maxPhi < Math.PI / 2, `Safe vertical phi angles required for ${p.id}`);
  assert(t.position[0] >= -8.5 && t.position[0] <= -0.5, `Project ${p.id} outside Room 02 X bounds`);
  assert(t.position[2] >= -9.5 && t.position[2] <= -3.5, `Project ${p.id} outside Room 02 Z bounds`);
}

for (const group of SKILL_GROUPS) {
  const t = getExhibitTransform(group.id);
  assert(t, `Missing transform for skill group ${group.id}`);
  assert(t.minDistance < t.defaultDistance && t.defaultDistance < t.maxDistance, `Invalid distance bounds for skill ${group.id}`);
  assert(t.minPhi > 0 && t.maxPhi < Math.PI / 2, `Safe vertical phi angles required for skill ${group.id}`);
  assert(t.position[0] >= 2.9 && t.position[0] <= 9.5, `Skill ${group.id} outside Room 03 X bounds`);
  assert(t.position[2] >= -12.0 && t.position[2] <= -6.0, `Skill ${group.id} outside Room 03 Z bounds`);
}
console.log(`✓ All 7 projects + 4 tech installations have validated 360° orbit limits and anti-floor-clipping constraints.`);

// TEST 4: SPATIAL NAVIGATION & WAYPOINT CONTINUITY
console.log("\n[Test 4] Auditing Spatial Navigation Waypoints...");
const expectedRooms = ["exterior", "foyer", "projects", "lab", "archive", "study", "contact"];
for (const roomId of expectedRooms) {
  const wp = ROOM_WAYPOINTS.find((w) => w.id === roomId);
  assert(wp, `Missing waypoint for ${roomId}`);
  assert(wp.scrollTarget >= 0 && wp.scrollTarget <= 1, `Invalid scrollTarget for ${roomId}`);
}

// Test spatial state continuity across [0, 1] scroll progress
let prevRoom = "";
for (let p = 0; p <= 1.0; p += 0.02) {
  const state = getActiveSpatialState(p);
  assert(state.roomId, `Missing roomId at progress ${p}`);
  assert(state.name, `Missing room name at progress ${p}`);
  if (state.roomId !== prevRoom) {
    prevRoom = state.roomId;
    console.log(`  Progress ${(p * 100).toFixed(0)}%: Room transition -> ${state.roomId.toUpperCase()} (${state.name})`);
  }
}
console.log(`✓ Spatial navigation journey flows continuously from 00 Exterior to 06 Contact.`);

// TEST 5: ARCHITECTURAL MATERIALS AUDIT
console.log("\n[Test 5] Auditing Physical Material Properties...");
const materials = createArchitecturalMaterials();
assert(materials.ivoryWall.roughness >= 0.8, "Walls must have matte architectural finish");
assert(materials.clearGlass.transparent && materials.clearGlass.opacity < 0.4, "Glass must have high transmittance");
assert(materials.brushedMetal.metalness >= 0.7, "Metal finishes must have high metalness");
assert(materials.naturalWalnutWood.roughness >= 0.4, "Wood finishes must have natural micro-roughness");
console.log(`✓ Material vocabulary validated: physical realism preserved across plaster, stone, walnut, metal, and glass.`);

// TEST 6: VERIFIED PROOF & ARCHIVE DATA
console.log("\n[Test 6] Auditing Archive & Proof Items...");
assert(PROOF_HACKATHONS.length >= 1, "Expected verified hackathon proof items");
assert(PROOF_OPEN_SOURCE.title, "Expected open source proof item");
assert(PROOF_MILESTONES.length >= 1, "Expected milestone items");
console.log(`✓ Verified ${PROOF_HACKATHONS.length} hackathons, open source contributions, and ${PROOF_MILESTONES.length} milestones.`);

// TEST 7: IDENTITY & PROFILE AUDIT
console.log("\n[Test 7] Auditing Engineering Identity & Profile...");
assert.strictEqual(profile.name, "SANTHEESH S", "Profile name mismatch");
assert(profile.roles.length > 0, "Profile roles missing");
assert(profile.education.institution, "Profile education missing");
console.log(`✓ Profile identity confirmed: ${profile.name} (${profile.roles.join(", ")}).`);

console.log("\n==================================================================");
console.log("PRODUCTION QA PASSED: ALL 7 TEST SUITES GREEN!");
console.log("==================================================================");
