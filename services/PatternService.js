import { PATTERN_LIBRARY } from "../config/Patternlibrary.js";

export function resolvePatternForSection(section) {
  const normalizedSection = (section ?? "").toLowerCase().trim();

  // Exact match
  for (const [id, pattern] of Object.entries(PATTERN_LIBRARY)) {
    if (pattern.match?.exact?.includes(normalizedSection)) {
      return {
        id,
        pattern,
        matchedBy: "exact-section",
      };
    }
  }

  // Keyword match
  let bestId = null;
  let bestScore = 0;

  for (const [id, pattern] of Object.entries(PATTERN_LIBRARY)) {
    let score = 0;

    for (const keyword of pattern.match?.keywords ?? []) {
      if (normalizedSection.includes(keyword.toLowerCase())) {
        score++;
      }
    }

    if (score > bestScore) {
      bestId = id;
      bestScore = score;
    }
  }

  if (bestId) {
    return {
      id: bestId,
      pattern: PATTERN_LIBRARY[bestId],
      matchedBy: "keyword-section",
      score: bestScore,
    };
  }

  // Guaranteed fallback
  return {
    id: "generic-section",
    pattern: PATTERN_LIBRARY["generic-section"],
    matchedBy: "fallback",
    score: 0,
  };
}

export function resolvePatternsForBrief(brief) {
  const sections =
    brief.informationArchitecture?.sections ?? [];

  return sections.map((section, index) => {
    const resolved = resolvePatternForSection(section);

    return {
      index,
      section,
      ...resolved,
    };
  });
}