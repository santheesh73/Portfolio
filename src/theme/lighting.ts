/**
 * ARCHITECTURAL LIGHTING SYSTEM TOKENS
 * Single Source of Truth for Three.js Lights across exterior and interior
 */

export const LIGHTING_TOKENS = {
  // 1. Daylight Exterior Parameters
  daylight: {
    sunColor: "#fffcf4",
    sunIntensity: 1.8,
    sunPosition: [14, 22, 12] as [number, number, number],
    skyFillColor: "#f0f9ff",
    skyFillIntensity: 0.5,
    skyFillPosition: [-12, 16, 8] as [number, number, number],
    hemisphereSky: "#e0f2fe",
    hemisphereGround: "#f5ede4",
    hemisphereIntensity: 0.85,
    ambientColor: "#fbf9f4",
    ambientIntensity: 0.65,
    entranceFocalColor: "#fffbeb",
    entranceFocalIntensity: 1.5,
    porchSpotColor: "#fffdf5",
    porchSpotIntensity: 1.6,
  },

  // 2. Interior Lighting Parameters
  interior: {
    ambientColor: "#fdfbf7",
    ambientIntensity: 0.95,
    foyerCoveColor: "#fffbeb",
    foyerCoveIntensity: 1.8,
    corridorSpotColor: "#fffdf5",
    corridorSpotIntensity: 1.6,
    studioSpotColor: "#ffffff",
    studioSpotIntensity: 2.4,
    studioAmbientColor: "#f8fafc",
    studioAmbientIntensity: 1.8,
    labSpotColor: "#f0fdfa",
    labSpotIntensity: 2.2,
    labCoreColor: "#0d9488",
    labCoreIntensity: 1.6,
    archiveAmbientColor: "#fef3c7",
    archiveAmbientIntensity: 1.6,
    studyLampColor: "#ffedd5",
    studyLampIntensity: 1.9,
    contactAmbientColor: "#f8fafc",
    contactAmbientIntensity: 1.7,
    terraceSkyColor: "#e0f2fe",
    terraceSkyIntensity: 0.8,
  },

  // 3. Environmental Atmosphere & Distance Fog
  atmosphere: {
    fogColor: "#f5f4ef",
    fogNearExterior: 16,
    fogFarExterior: 55,
    fogNearInterior: 26,
    fogFarInterior: 75,
  },

  // 4. Shadow Quality & Biases
  shadow: {
    mapSizeLarge: 1024,
    mapSizeStandard: 512,
    biasDirectional: -0.0002,
    biasSpot: -0.0001,
  },
} as const;
