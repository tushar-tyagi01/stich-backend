import Groq from "groq-sdk";
import archetypesconfig from "../config/archetypes.js";
import DesignBrief, {
  STYLE_OPTIONS,
  IMAGERY_OPTIONS,
} from "../db/model/Designbrief.js";

const groq = new Groq(); 

function buildSystemPrompt() {
  return `You are a web design brief generator. Given a business's minimal
input and reference conventions for its industry, produce a single JSON
object — nothing else, no markdown fences, no commentary — matching exactly
this shape:

{
  "businessSummary": string (10-500 chars, 1-2 sentences expanding on what the business does),

  "audience": string (10-500 chars, who visits this site and why),

  "goal": string (5-200 chars, the primary outcome this site should drive),

  "informationArchitecture": {
    "title": string (max 60 chars, e.g. "Single Page Website"),

    "purpose": string (max 150 chars, describing the overall purpose of the website),

    "sections": string[] (5-15 items, ordered exactly as they should appear on the page)
  },

  "visualDirection": {
    "tone": string[] (1-5 words, e.g. "warm", "confident"),
    "mood": string (max 200 chars, a sentence describing the desired feeling),
    "style": one of ${JSON.stringify(STYLE_OPTIONS)}
  },

  "imageryDirection": one of ${JSON.stringify(IMAGERY_OPTIONS)},

  "primaryCTA": string (max 40 chars, the main action the website should drive),

  "brand": {
    "primaryColor": string (hex, e.g. "#2C5F8A" — use the user's color if given, otherwise pick one that fits the tone),
    "accentColorHint": string (hex, optional),
    "voiceDescription": string (max 300 chars, how the copy should sound)
  },

  "contentReadiness": {
    "hasLogo": boolean (true only if a logo URL was provided),
    "hasRealPhotos": boolean (true only if the input clearly indicates real photos are available; default false)
  },

  "constraints": string[] (optional, max 10 items — anything to explicitly avoid)
}

IMPORTANT INFORMATION ARCHITECTURE RULES:

- This is ALWAYS a SINGLE-PAGE WEBSITE.
- Never create multiple pages.
- Never return an array for informationArchitecture.
- informationArchitecture must be exactly ONE object.
- All website content must exist on this one page as sections.
- Sections should be ordered according to the user's business goals and natural user flow.
- Use clear section names such as "Hero", "About", "Services", "Testimonials", "Pricing", "FAQ", "Booking", "Contact", etc. when appropriate.
- Adapt the sections to the specific business. Do not blindly copy generic sections.
- Do not create separate sections that represent separate pages.
- Navigation will use these section names as anchors and scroll to the corresponding section.

Use the provided industry conventions and typical pages as a starting reference,
but adapt the informationArchitecture, tone, and voice to the specific business
description given. The industry's typicalPages are only reference material;
convert relevant page ideas into sections of the single-page website.

Return only the JSON object described above.`;
}

function buildUserMessage(userInput, archetype) {
  return `BUSINESS INPUT:
 ${JSON.stringify(
  {
    businessName: userInput.businessName,
    description: userInput.description ?? null,
    vibe: userInput.vibe,
    primaryColor: userInput.primaryColor ?? null,
    hasLogo: Boolean(userInput.logoUrl),
  },
  null,
  2
)}

INDUSTRY REFERENCE (archetype: ${archetype.id}):
 ${JSON.stringify(
  {
    audienceNote: archetype.audienceNote,
    toneDefaults: archetype.toneDefaults,
    conventions: archetype.conventions,
    typicalPages: archetype.typicalPages,
  },
  null,
  2
)}

IMPORTANT:
The final website must be a SINGLE-PAGE WEBSITE.

Use the industry reference only to determine which sections are useful.
If the archetype contains typical pages such as Home, Services, About,
Pricing, Booking, or Contact, convert those concepts into sections of
ONE SINGLE PAGE.

Do not generate multiple pages.

Return only the JSON object described in the system prompt.`;


}


function stripCodeFence(text) {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "");
}

/**
 * @param {object} userInput - a UserInput document (or plain object with the same fields)
 * @param {string} projectId - the Project this brief belongs to
 * @returns {Promise<{ brief: object, rawAiResponse: string }>}
 */
export async function generateDesignBrief(userInput, projectId) {
  const archetype = archetypesconfig.archetypes[userInput.industryId];
  if (!archetype) {
    throw new Error(`Unknown industryId: ${userInput.industryId}`);
  }

 const completion = await groq.chat.completions.create({
  model: process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
  temperature: 0.7,
  max_tokens: 4000,
  response_format: { type: "json_object" },
  messages: [
    { role: "system", content: buildSystemPrompt() },
    { role: "user", content: buildUserMessage(userInput, archetype) },
  ],
});

  const rawText = completion.choices[0]?.message?.content ?? "";

  const cleaned = stripCodeFence(rawText);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`AI response was not valid JSON: ${err.message}\nRaw: ${rawText}`);
  }

  const briefDoc = new DesignBrief({
    project: projectId,
    archetypeId: userInput.industryId,
    ...parsed,
    rawAiResponse: rawText,
  });

  // Validates against every rule in DesignBrief.schema.js (required fields,
  // enums, maxlength, hex regex, etc.) WITHOUT saving to the DB yet.
  const validationError = briefDoc.validateSync();
  if (validationError) {
    throw new Error(`AI response failed schema validation: ${validationError.message}`);
  }

  return briefDoc;
}