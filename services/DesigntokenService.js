import crypto from "node:crypto";
import DesignTokens from "../db/model/Designtoken.js";
import { hexToHsl, hslToHex } from "../utils/color.js";

// ---------------------------------------------------------------
// Rules (all deterministic — tweak values here, never per-request)
// ---------------------------------------------------------------

// Absolute lightness ramp. Input color's hue + saturation are kept,
// lightness is normalized so every scale spans tints -> shades.
const SHADE_LIGHTNESS = { 50: 97, 100: 93, 200: 85, 300: 74, 400: 61, 500: 50, 600: 42, 700: 34, 800: 26, 900: 18 };

const FONT_PAIRINGS = {
  "modern-minimal": {
    heading: "Poppins",
    body: "Inter",
  },

  "warm-friendly": {
    heading: "Nunito",
    body: "Inter",
  },

  "bold-playful": {
    heading: "Quicksand",
    body: "Nunito",
  },

  "elegant-luxury": {
    heading: "Playfair Display",
    body: "Source Sans 3",
  },

  "corporate-professional": {
    heading: "IBM Plex Sans",
    body: "IBM Plex Sans",
  },
};
const DEFAULT_FONTS = { heading: "Inter", body: "Inter" };

// First matching tone keyword wins — order matters (friendliest first).
const RADIUS_RULES = [
  { keywords: ["playful", "friendly", "warm", "approachable", "inviting", "belonging", "sincere"], value: 16 },
  { keywords: ["minimal", "precise", "no-nonsense", "editorial", "bold"], value: 2 },
  { keywords: ["professional", "corporate", "authoritative", "credible", "trustworthy", "polished"], value: 6 },
];
const DEFAULT_RADIUS = 8;

const SOFT_SHADOW_TONES = ["playful", "friendly", "warm", "inviting", "hopeful", "belonging"];
const SHADOWS_SOFT   = { sm: "0 1px 2px rgba(0,0,0,0.06)",  md: "0 4px 12px rgba(0,0,0,0.08)",  lg: "0 12px 32px rgba(0,0,0,0.12)" };
const SHADOWS_SUBTLE = { sm: "0 1px 2px rgba(0,0,0,0.05)",  md: "0 2px 6px rgba(0,0,0,0.06)",   lg: "0 4px 16px rgba(0,0,0,0.08)" };

const SPACING = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96, 10: 128 };

function buildScale(hex) {
  const { h, s } = hexToHsl(hex);
  return Object.fromEntries(
    Object.entries(SHADE_LIGHTNESS).map(([shade, l]) => [shade, hslToHex(h, s, l)])
  );
}

function buildNeutralScale(primaryHex) {
  const { h } = hexToHsl(primaryHex);
  const L = { 50: 98, 100: 95, 200: 89, 300: 79, 400: 64, 500: 51, 600: 41, 700: 31, 800: 21, 900: 12 };
  return Object.fromEntries(Object.entries(L).map(([k, l]) => [k, hslToHex(h, 8, l)]));
}


function deriveAccent(primaryHex) {
  const { h, s } = hexToHsl(primaryHex);
  return hslToHex((h + 180) % 360, Math.min(85, Math.max(55, s)), 48);
}

function firstToneMatch(tones, rules) {
  const lower = (tones ?? []).map((t) => t.toLowerCase());
  for (const rule of rules) {
    if (lower.some((t) => rule.keywords.includes(t))) return rule.value;
  }
  return null;
}

function buildTypeScale(style) {
  // ⚠️ Align keys with STYLE_OPTIONS — tighter scale for restrained styles
  
  
  const RATIO_BY_STYLE = {
  "modern-minimal": 1.2,
  "warm-friendly": 1.25,
  "bold-playful": 1.333,
  "elegant-luxury": 1.333,
  "corporate-professional": 1.25,
};
  const ratio = RATIO_BY_STYLE[style] ?? 1.25;
  const base = 16;
  const r = (v) => Math.round(v * 2) / 2; // nearest 0.5px
  return {
    xs: r(base / ratio ** 2),
    sm: r(base / ratio),
    base,
    lg: r(base * ratio),
    xl: r(base * ratio ** 2),
    "2xl": r(base * ratio ** 3),
    "3xl": r(base * ratio ** 4),
    "4xl": r(base * ratio ** 5),
    "5xl": r(base * ratio ** 6),
  };
}

// ---------------------------------------------------------------
// Pure token builder — same brief in, identical tokens out
// ---------------------------------------------------------------

export function buildDesignTokens(brief) {
  const tones = brief.visualDirection?.tone ?? [];
  const style = brief.visualDirection?.style;
  const primary = brief.brand.primaryColor;
  const accent = brief.brand.accentColorHint || deriveAccent(primary);

  const neutral = buildNeutralScale(primary);

  return {
    color: {
      primary: buildScale(primary),
      accent: buildScale(accent),
      neutral,
      semantic: {
        success: hslToHex(142, 65, 38),
        warning: hslToHex(38, 92, 48),
        error: hslToHex(0, 70, 48),
        info: hslToHex(210, 80, 45),
      },
      text: { heading: neutral[900], body: neutral[700], muted: neutral[500], inverse: neutral[50] },
      surface: { page: "#FFFFFF", subtle: neutral[50], raised: "#FFFFFF" },
      border: { default: neutral[200], strong: neutral[300] },
    },
    typography: {
      fontFamily: FONT_PAIRINGS[style] ?? DEFAULT_FONTS,
      fontSize: buildTypeScale(style),
      lineHeight: { heading: 1.2, body: 1.6 },
      fontWeight: { heading: 700, body: 400 },
    },
    spacing: SPACING,
    radius: {
      sm: Math.round(firstToneMatch(tones, RADIUS_RULES) ?? DEFAULT_RADIUS) / 2,
      md: firstToneMatch(tones, RADIUS_RULES) ?? DEFAULT_RADIUS,
      lg: (firstToneMatch(tones, RADIUS_RULES) ?? DEFAULT_RADIUS) * 1.5,
      pill: 9999,
    },
    shadow: SOFT_SHADOW_TONES.some((t) => tones.map((x) => x.toLowerCase()).includes(t))
      ? SHADOWS_SOFT
      : SHADOWS_SUBTLE,
  };
}



export async function generateDesignTokens(briefDoc) {
  const tokens = buildDesignTokens(briefDoc);
  const tokensHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(tokens))
    .digest("hex")
    .slice(0, 16);

  // Determinism dedupe: if the latest version is identical, don't bump
  const latest = await DesignTokens.findOne({ project: briefDoc.project })
    .sort({ version: -1 })
    .lean();
  if (latest?.tokensHash === tokensHash) return latest;

  return DesignTokens.create({
    project: briefDoc.project,
    brief: briefDoc._id,
    version: (latest?.version ?? 0) + 1,
    tokens,
    tokensHash,
  });
}