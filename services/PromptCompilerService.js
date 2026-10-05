import crypto from "node:crypto";
import CompiledPrompt from "../db/model/Compilerprompt.js";
import { resolvePatternsForBrief } from "./PatternService.js";

const sha = (s) =>
  crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);

// ---------- formatting helpers ----------

const fmtScale = (scale) =>
  Object.entries(scale).map(([stop, v]) => `${stop} ${v}`).join(" · ");

const fmtPx = (scale) =>
  Object.entries(scale).map(([k, v]) => `${k} ${v}px`).join(" · ");

// ---------- slot filling (step 7 contract) ----------
const SLOTS = {
  businessName: (c) => c.businessName,

  pageTitle: (c) =>
    c.brief.informationArchitecture?.title ??
    "Single Page Website",

  pagePurpose: (c) =>
    c.brief.informationArchitecture?.purpose ?? "",

  primaryCTA: (c) =>
    c.brief.primaryCTA ?? "Get Started",

  voiceDescription: (c) =>
    c.brief.brand?.voiceDescription ?? "",

  sectionName: (c) =>
    c.section ?? "",

  sectionPurpose: (c) => {
    const section = c.section ?? "";

    return `Design and present the ${section} section in a way that supports the website's primary goal.`;
  },
};

function fillSlots(template, ctx) {
  const missing = new Set();
  const out = template.replace(/\{\{\s*([a-zA-Z]+)\s*\}\}/g, (_, name) => {
    const resolver = SLOTS[name];
    if (!resolver) {
      missing.add(name);
      return `{{${name}}}`;
    }
    return resolver(ctx) ?? "";
  });
  // Fail fast in dev: a template with an unfilled slot would leak {{...}} to Stitch
  if (missing.size) {
    throw new Error(`Pattern template has unknown slots: ${[...missing].join(", ")}`);
  }
  return out;
}

// ---------- the shared preamble (identical for every page) ----------

export function buildGlobalPreamble(brief, tokensDoc, businessName) {
  const t = tokensDoc.tokens;
 const sections =
  brief.informationArchitecture?.sections ?? [];

const navItems = sections
  .filter(
    (section) =>
      !["header", "footer"].includes(section.toLowerCase())
  )
  .slice(0, 8)
  .join(" · ");

  const logoSpec = brief.logoUrl
  ? `Use the client's actual logo image from this URL: ${brief.logoUrl}`
  : `No client logo was supplied. Create a simple, brand-appropriate logo/wordmark for "${businessName}" that matches the site's visual direction.`;

const imageryRule = brief.contentReadiness?.hasRealPhotos
  ? `- The client HAS real photography. Use the supplied client photos where appropriate. Never fake or invent client-specific imagery.`
  : `- The client has NO real photos yet. Use suitable generic/generated visual imagery that matches the business, industry, and section.
- Prefer relevant, visually appealing imagery over empty placeholder blocks.
- For food businesses, use appetizing food-related visuals such as pani puri, chaat, ingredients, or street-food scenes.
- Do not present generic imagery as photos of the actual business.
- Keep imagery consistent with the site's visual direction and design tokens.`;

  const constraintLines = (brief.constraints ?? [])
    .map((c) => `- ${c}`)
    .join("\n");

  return `SITE OVERVIEW
You are designing a SINGLE-PAGE WEBSITE for ${businessName}.

The entire website must exist on ONE continuous page.

There are NO separate pages.

All sections must be part of this same page and connected through
anchor navigation / smooth scrolling.
What they do: ${brief.businessSummary}
Primary goal of the site: ${brief.goal}
Audience: ${brief.audience}
Brand voice: ${brief.brand.voiceDescription}
Site navigation (in order): ${navItems}

DESIGN TOKENS — the ONLY visual values allowed on this site.
Do not invent additional colors, fonts, or sizes. Derive states from these scales
(e.g. hover = the next-darker stop). When a page instruction references a name
like "primary-600", "radius.md", or "spacing.8", it means the corresponding value here.

COLOR
Primary:  ${fmtScale(t.color.primary)}
Accent:   ${fmtScale(t.color.accent)}
Neutral:  ${fmtScale(t.color.neutral)}
Semantic: success ${t.color.semantic.success} · warning ${t.color.semantic.warning} · error ${t.color.semantic.error} · info ${t.color.semantic.info}
Text:     heading ${t.color.text.heading} · body ${t.color.text.body} · muted ${t.color.text.muted} · inverse ${t.color.text.inverse}
Surfaces: page ${t.color.surface.page} · subtle ${t.color.surface.subtle} · raised ${t.color.surface.raised}
Borders:  default ${t.color.border.default} · strong ${t.color.border.strong}

TYPOGRAPHY
Heading font: ${t.typography.fontFamily.heading}
Body font:    ${t.typography.fontFamily.body}
Type scale:   ${fmtPx(t.typography.fontSize)}
Line height:  headings ${t.typography.lineHeight.heading} · body ${t.typography.lineHeight.body}
Weights:      headings ${t.typography.fontWeight.heading} · body ${t.typography.fontWeight.body}

SPACING (px): ${fmtPx(t.spacing)}
RADII:   sm ${t.radius.sm}px · md ${t.radius.md}px · lg ${t.radius.lg}px · pill ${t.radius.pill}px
SHADOWS: sm ${t.shadow.sm} · md ${t.shadow.md} · lg ${t.shadow.lg}

SHARED COMPONENTS — must be identical on every page of this site.
HEADER: sticky top bar, surface page, 1px bottom border default, 64-72px tall.

Left: ${logoSpec}. Right: section navigation (${navItems}) in body font, neutral-700,
with each navigation item scrolling to its corresponding section on
the same page.

The primary CTA "${brief.primaryCTA}" may be displayed as a
button-style visual element, but it must NOT submit a form or trigger
any backend functionality. It may link to a real external destination
only when that destination was explicitly supplied by the user.
Never invent a destination.
FOOTER: surface neutral-900, 4 columns — (1) business name + one-line blurb,
(2) nav links, (3) supplied contact information (phone/email/address as real text; never invent missing values),
(4) hours if relevant; bottom bar with copyright, text neutral-400.

IMAGERY DIRECTION: ${brief.imageryDirection}
 ${imageryRule}

GLOBAL RULES
- Every color on the page must trace to a token above. No new hues.
- Primary buttons: filled primary-600, white text, radius.md, hover primary-700. One primary button per view.
- Links: primary-600, underline on hover. Body text neutral-700 on the page surface; headings neutral-900.
- Section vertical padding: spacing.8 desktop, spacing.6 mobile.
- Main content container: width: 100%; max-width: 1120px; centered with responsive horizontal padding.
- Never constrain the main page content to a fixed 420px width.

RESPONSIVE DESIGN REQUIREMENTS

- Design for three viewport ranges:
  1. Desktop: 1024px and above
  2. Tablet: 768px–1023px
  3. Mobile: below 768px

- DESKTOP:
  - Use the full available content width within the 1120px maximum container.
  - Use multi-column layouts where appropriate.
  - Use 2-4 columns for cards when content supports it.
  - Use two-column hero layouts when appropriate.
  - Use split layouts for About and Contact sections when appropriate.
  - Use multi-column footer layout.

- TABLET:
  - Reduce column counts when necessary.
  - Reduce horizontal spacing while preserving visual hierarchy.
  - Keep content readable and balanced.

- MOBILE:
  - Stack major content sections vertically.
  - Stack desktop two-column layouts into one column.
  - Convert card grids into a single column when necessary.
  - Make images full width within their containers.
  - Reduce heading sizes and spacing appropriately.
  - Ensure buttons fit the viewport.
  - Navigation must be mobile-friendly.
  - Prevent horizontal overflow.
  - Ensure all text wraps naturally.

- IMPORTANT:
  - Do NOT design the entire page as a fixed narrow mobile-width layout.
  - Do NOT use a fixed max-width such as 420px for the main desktop content.
  - Desktop must actually use the available viewport width.
  - Responsive behavior must change the layout between desktop, tablet, and mobile.
 ${constraintLines ? `\nHARD CONSTRAINTS (must be respected)\n${constraintLines}\n` : ""}

 - This is a STATIC visual website only.
- Do NOT create functional forms or form submission.
- Do NOT create booking or appointment functionality.
- Do NOT create reservation functionality.
- Do NOT create checkout or payment functionality.
- Do NOT create login, signup, authentication, or user accounts.
- Do NOT create live chat or messaging functionality.
- Do NOT create backend-powered search or filtering.
- Do NOT create newsletter signup functionality.
- Do NOT create dashboards or admin functionality.
- Do NOT create database-driven functionality.
- Do NOT imply that any UI element saves, submits, processes,
  reserves, purchases, registers, or stores data.
- Forms, booking controls, search fields, calendars, checkout UI,
  and similar controls must not be presented as functional.
- Only real external destinations supplied by the user may be used
  for links or CTA actions.
- Never invent URLs, phone numbers, email addresses, booking links,
  social links, or other destinations.
 
 `;

 
}

// ---------- per-page assembly ----------

export function compileSinglePagePrompt({
  pattern,
  preamble,
  brief,
  businessName,
}) {
 const filledTemplate = fillSlots(pattern.promptTemplate, {
  brief,
  businessName,
  section: pattern.section ?? "",
});

  const sections =
    brief.informationArchitecture?.sections ?? [];

  return `${preamble}

================ SINGLE PAGE WEBSITE ================

Website: ${brief.informationArchitecture.title}

Purpose: ${brief.informationArchitecture.purpose}

SECTIONS — these must appear on ONE continuous page in this exact order:

${sections
  .map((section, index) => `${index + 1}. ${section}`)
  .join("\n")}

SECTION PATTERN INSTRUCTIONS

${filledTemplate}

OUTPUT REQUIREMENTS

- Generate ONE complete, high-fidelity SINGLE-PAGE WEBSITE.
- Do NOT create multiple pages.
- Do NOT create separate screens for individual sections.
- All sections must exist on the same continuous page.
- The header navigation must scroll to sections on the same page.
- Preserve the exact section order defined above.
- Include the shared header and footer exactly as specified.
- Make the entire page responsive for desktop, tablet, and mobile.
- Use smooth scrolling between navigation sections.
- Each major section should have a clear semantic anchor/id so navigation can target it.
- Label every placeholder image with bracketed text describing its intended content.
`;
}

// ---------- persist + dedupe ----------

export async function compileSitePrompts(
  briefDoc,
  tokensDoc,
  { businessName } = {}
) {
  if (!businessName) {
    throw new Error(
      "compileSitePrompts requires businessName (from userInput)"
    );
  }

  const sectionPlans = resolvePatternsForBrief(briefDoc);

  const preamble = buildGlobalPreamble(
    briefDoc,
    tokensDoc,
    businessName
  );

  const patternInstructions = sectionPlans
    .map((plan, index) => {
      const filledTemplate = fillSlots(
        plan.pattern.promptTemplate,
        {
          brief: briefDoc,
          businessName,
          section: plan.section,
        }
      );

      return `
SECTION ${index + 1}: ${plan.section}

${filledTemplate}
`;
    })
    .join("\n");

  const prompt = `${preamble}

================ SINGLE PAGE WEBSITE ================

Website:
${briefDoc.informationArchitecture.title}

Purpose:
${briefDoc.informationArchitecture.purpose}

SECTIONS — EXACT ORDER:

${briefDoc.informationArchitecture.sections
  .map((section, index) => `${index + 1}. ${section}`)
  .join("\n")}

SECTION DESIGN INSTRUCTIONS:

${patternInstructions}

OUTPUT REQUIREMENTS

- Generate ONE complete high-fidelity SINGLE-PAGE WEBSITE.
- Do NOT create multiple pages.
- Do NOT create separate screens.
- All sections must exist on the same continuous page.
- Navigation must scroll to sections on this page.
- Preserve the exact section order.
- Include the shared header and footer.
- Make the website fully responsive.
- Use semantic section IDs for navigation.
- Do not invent colors, fonts, spacing, or other visual values outside the provided design tokens.
- Label placeholder images with bracketed descriptions.

- The website must remain completely static and visual.
- Do NOT generate functional forms or form submission.
- Do NOT generate booking, appointment, reservation, checkout,
  payment, login, signup, authentication, live chat, search,
  filtering, newsletter signup, dashboard, or database-backed
  functionality.
- CTA elements may be visually styled as buttons, but they must not
  imply backend functionality.
- Use only real external destinations explicitly supplied by the user.
- Never invent contact information or external URLs.
`;

  const compiled = {
    pageSlug: "home",
    pageTitle: briefDoc.informationArchitecture.title,
    patternId: sectionPlans.map((p) => p.id).join("+"),
    prompt,
    promptHash: sha(prompt),
  };

  const latestVersionDoc = await CompiledPrompt.findOne({
    project: briefDoc.project,
  })
    .sort({ version: -1 })
    .lean();

  if (latestVersionDoc) {
    const latest = await CompiledPrompt.findOne({
      project: briefDoc.project,
      version: latestVersionDoc.version,
    }).lean();

    if (
      latest &&
      latest.promptHash === compiled.promptHash
    ) {
      return [latest];
    }
  }

  const version =
    (latestVersionDoc?.version ?? 0) + 1;

  return CompiledPrompt.insertMany([
    {
      project: briefDoc.project,
      brief: briefDoc._id,
      tokens: tokensDoc._id,
      version,
      ...compiled,
    },
  ]);
}

/** What step 9 consumes: the newest compile run for a project. */
export async function getLatestCompiledPrompts(projectId) {
  const latest = await CompiledPrompt.findOne({ project: projectId })
    .sort({ version: -1 })
    .lean();
  if (!latest) return [];
  return CompiledPrompt.find({ project: projectId, version: latest.version })
    .sort({ createdAt: 1 })
    .lean();
}