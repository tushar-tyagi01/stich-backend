// Curated section-level prompt templates for Stitch.
// These patterns are resolved against individual sections
// of ONE single-page website.

export const PATTERN_LIBRARY = {
  hero: {
    name: "Hero Section",

    match: {
      exact: ["hero", "banner", "intro", "introduction"],
      keywords: ["hero", "banner", "intro", "headline"],
    },

    promptTemplate: `
Design the Hero section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a strong above-the-fold hero.
- Use a clear benefit-driven headline.
- Add a short supporting description.
- Include the primary CTA: "{{primaryCTA}}".
- Include an optional secondary text link.
- Use a strong visual hierarchy.
- Hero should occupy approximately 70vh on desktop.
- Keep the layout clean and focused.

DESIGN RULES:
- The headline is the dominant visual element.
- Do not use multiple competing primary CTAs.
- Maintain generous whitespace.
- Use the provided design tokens.
- Make the hero responsive on mobile.
`,
  },

  about: {
    name: "About Section",

    match: {
      exact: ["about", "our story", "story", "mission"],
      keywords: ["about", "story", "mission", "history", "philosophy"],
    },

    promptTemplate: `
Design the About section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Use a two-column layout on desktop.
- One side should contain supporting imagery.
- The other side should contain the business story.
- Include a clear section heading.
- Highlight relevant experience, values, credentials, or mission.
- Stack naturally on mobile.

DESIGN RULES:
- Keep paragraphs concise.
- Use authentic and approachable visual direction.
- Avoid excessive corporate language.
- Maintain the site's typography and spacing system.
`,
  },

  services: {
    name: "Services Section",

    match: {
      exact: ["services", "offerings", "products", "solutions", "features"],
      keywords: ["service", "services", "offering", "product", "solution", "feature"],
    },

    promptTemplate: `
Design the Services / Offerings section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a responsive card grid.
- Use 2-3 columns on desktop.
- Each card should contain:
  - optional image/icon
  - service or offering name
  - short description
  - optional supporting link
- Keep all cards visually consistent.
- Use a clear section heading and supporting description.

DESIGN RULES:
- Do not invent services that are not supported by the brief.
- Keep descriptions concise.
- Cards should have consistent heights.
- Use consistent image ratios.
- Maintain responsive behavior.
`,
  },

  features: {
    name: "Features Section",

    match: {
      exact: ["features", "key features", "benefits"],
      keywords: ["feature", "benefit", "advantage"],
    },

    promptTemplate: `
Design the Features / Benefits section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Present 3-6 important benefits or features.
- Use a clean grid or alternating feature layout.
- Each feature should have an icon or subtle visual indicator.
- Include a concise heading and supporting description.

DESIGN RULES:
- Prioritize scannability.
- Avoid excessive decorative elements.
- Keep feature descriptions short.
- Maintain visual consistency with the rest of the page.
`,
  },

  testimonials: {
    name: "Testimonials Section",

    match: {
      exact: ["testimonials", "reviews", "customer reviews", "social proof"],
      keywords: ["testimonial", "review", "rating", "customer", "social proof"],
    },

    promptTemplate: `
Design the Testimonials / Social Proof section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create 2-3 testimonial cards or a strong featured testimonial.
- Include customer name and optional role/location.
- Include rating indicators only when appropriate.
- Add a clear section heading.
- Use subtle visual separation from surrounding sections.

DESIGN RULES:
- Do not fabricate specific customer claims or statistics.
- Keep testimonials easy to scan.
- Avoid autoplay carousels.
- Ensure cards work well on mobile.
`,
  },

  pricing: {
    name: "Pricing Section",

    match: {
      exact: ["pricing", "plans", "packages", "membership pricing"],
      keywords: ["pricing", "price", "plan", "package", "cost", "membership"],
    },

    promptTemplate: `
Design the Pricing section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create 2-4 pricing cards when pricing tiers are relevant.
- Each card should include:
  - plan/package name
  - price or pricing indication
  - key features
  - CTA
- Clearly differentiate tiers without excessive decoration.

DESIGN RULES:
- Never invent prices.
- If exact pricing is unavailable, use appropriate placeholders or "Contact us".
- Keep feature lists left-aligned for readability.
- Make pricing cards responsive.
`,
  },

  faq: {
    name: "FAQ Section",

    match: {
      exact: ["faq", "faqs", "frequently asked questions"],
      keywords: ["faq", "question", "questions", "frequently asked"],
    },

    promptTemplate: `
Design the FAQ section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Use an accessible accordion layout.
- Display 4-8 relevant questions.
- Each question should have a clear expandable answer.
- Use strong section hierarchy.
- Keep the section compact and easy to scan.

DESIGN RULES:
- Do not invent unsupported policies.
- Use semantic buttons for accordion controls.
- Provide clear open/closed states.
- Ensure keyboard accessibility.
`,
  },

  booking: {
    name: "Booking Section",

    match: {
      exact: [
        "booking",
        "appointment",
        "appointment booking",
        "reservation",
        "reservations",
      ],
      keywords: [
        "book",
        "booking",
        "appointment",
        "reservation",
        "reserve",
        "schedule",
      ],
    },

    promptTemplate: `
Design the Booking / Appointment section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a clear booking area focused on one conversion action.
- Use a concise form.
- Include only necessary fields.
- Typical fields may include name, contact information, preferred date/time, and notes.
- Place the primary CTA "{{primaryCTA}}" prominently.
- Include a reassurance panel when appropriate.
- Explain what happens after submitting the form.

DESIGN RULES:
- Do not create a multi-step wizard.
- Keep the form short.
- Minimum 44px touch targets.
- Provide clear focus and validation states.
- Make the booking experience responsive.
`,
  },

 contact: {
  name: "Contact / Visit Us Section",

  match: {
    exact: ["contact", "contact us", "location", "visit us"],
    keywords: ["contact", "location", "address", "phone", "email", "visit", "map"],
  },

  promptTemplate: `

Design the Contact / Visit Us section for {{businessName}}.

PURPOSE:

{{sectionPurpose}}

LAYOUT:

- Use a balanced two-column layout on desktop.
- LEFT: create a rich location and visit-information panel.
- RIGHT: display contact details and a visual map/location area when a physical location exists.
- Use the available address, phone, email, hours, and directions when supplied.
- Include a clear section heading.
- Use visual elements such as a location icon, directions block, opening-hours card, or map placeholder to make the section visually complete.
- Do not leave large empty areas.
- Stack the columns naturally on mobile.

DESIGN RULES:

- Contact information must be real selectable text.
- Never invent missing contact information.
- Never create a contact form.
- Never create input fields or submit buttons.
- Never create booking or appointment controls.
- If a physical address is available, make the location information visually prominent.
- If a map is shown but no real map embed/destination was supplied, use a clearly labeled static map placeholder.
- Use supplied hours and directions when available.
- Keep the section visually balanced and information-dense without overcrowding.
- Maintain the site's design tokens and visual language.

`,
},

  gallery: {
    name: "Gallery Section",

    match: {
      exact: ["gallery", "portfolio", "visual showcase", "photos"],
      keywords: ["gallery", "portfolio", "photo", "photos", "visual", "showcase"],
    },

    promptTemplate: `
Design the Gallery / Visual Showcase section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Use a clean responsive image grid.
- Use 2-3 columns on desktop.
- Maintain consistent image ratios.
- Allow captions where useful.
- Create a visually balanced composition.

DESIGN RULES:
- Do not use watermarks.
- Do not use autoplay carousels.
- Avoid excessive borders and decorative elements.
- Images should remain the visual focus.
`,
  },

  team: {
    name: "Team Section",

    match: {
      exact: ["team", "our team", "meet the team", "staff"],
      keywords: ["team", "staff", "member", "members", "founder", "experts"],
    },

    promptTemplate: `
Design the Team section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a responsive team grid.
- Each member may include:
  - photo
  - name
  - role
  - short bio
- Use 2-4 columns depending on the number of members.

DESIGN RULES:
- Use consistent image dimensions.
- Keep biographies concise.
- Do not invent people or credentials.
- Maintain a professional but human presentation.
`,
  },

  process: {
    name: "Process Section",

    match: {
      exact: ["process", "how it works", "workflow", "steps"],
      keywords: ["process", "workflow", "steps", "works", "how it works"],
    },

    promptTemplate: `
Design the Process / How It Works section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Present the process as 3-5 sequential steps.
- Give each step a number or visual indicator.
- Include a short title and explanation for every step.
- Connect the steps visually when appropriate.

DESIGN RULES:
- Make the sequence immediately understandable.
- Avoid unnecessary complexity.
- Ensure the layout works vertically on mobile.
`,
  },

  stats: {
    name: "Stats Section",

    match: {
      exact: ["stats", "statistics", "numbers", "achievements"],
      keywords: ["stat", "statistics", "number", "achievement", "metric"],
    },

    promptTemplate: `
Design the Stats / Key Numbers section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Present 3-4 important metrics.
- Use large but controlled typography for numbers.
- Pair each number with a concise label.
- Use a horizontal layout on desktop and stacked layout on mobile.

DESIGN RULES:
- Never invent statistics.
- Use placeholders when exact numbers are unavailable.
- Keep the visual treatment restrained.
`,
  },

  cta: {
    name: "CTA Section",

    match: {
      exact: [
        "cta",
        "call to action",
        "final cta",
        "get started",
        "next step",
      ],
      keywords: ["cta", "action", "get started", "next step"],
    },

    promptTemplate: `
Design the CTA section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a visually distinct but consistent CTA block.
- Include a concise heading.
- Include one supporting sentence.
- Use the primary CTA "{{primaryCTA}}".
- Keep the action immediately understandable.

DESIGN RULES:
- One primary action only.
- Do not overcrowd the section.
- Use the established design tokens.
- Maintain strong contrast and accessibility.
`,
  },

  newsletter: {
    name: "Newsletter Section",

    match: {
      exact: ["newsletter", "subscribe", "email signup"],
      keywords: ["newsletter", "subscribe", "subscription", "email signup"],
    },

    promptTemplate: `
Design the Newsletter / Subscription section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Use a compact signup form.
- Include email input and a clear submit button.
- Add one concise value proposition explaining why users should subscribe.
- Keep the section visually lightweight.

DESIGN RULES:
- Do not use aggressive popups.
- Keep the form accessible.
- Clearly label the email field.
`,
  },

  "generic-section": {
    name: "Generic Section",

    match: {
      exact: [],
      keywords: [],
    },

    promptTemplate: `
Design the "{{sectionName}}" section for {{businessName}}.

PURPOSE:
{{sectionPurpose}}

LAYOUT:
- Create a visually appropriate section based on the section's purpose.
- Choose the most natural layout for the content.
- Possible layouts include:
  - text + image
  - card grid
  - list
  - statistics
  - timeline
  - split layout
  - feature block
- Maintain strong visual hierarchy.
- Use the established design tokens.
- Make the section responsive.

DESIGN RULES:
- This is ONE SECTION of a single-page website.
- Do not create another page.
- Do not create another header or footer.
- Do not invent unsupported information.
- Maintain consistency with all other sections.
`,
  },
};