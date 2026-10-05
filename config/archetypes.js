
const archetypesconfig = {
  archetypes: {
    "service-booking": {
      id: "service-booking",
      name: "Service booking",
      audienceNote:
        "Local customers researching trust and quality before getting in touch by a supplied phone number or email.",
      toneDefaults: ["warm", "trustworthy", "approachable"],
      conventions: [
        "Contact CTA (call or email) prominent in the top navigation and repeated in the final contact section; do not require sticky behavior",
        "Hours and location clearly visible (footer or dedicated section) when supplied",
        "Show only supplied trust signals near the top, such as reviews, before/after imagery, certifications, or experience",
        "Supplied phone number or email easy to find without scrolling",
      ],
      inputSchema: [
        {
          id: "services",
          label: "What services do you provide?",
          type: "list",
          required: true,
        },
        {
          id: "hours",
          label: "What are your opening hours?",
          type: "text",
          required: false,
        },
        {
          id: "pricing",
          label: "What is your pricing or price range?",
          type: "text",
          required: false,
        },
        {
          id: "usp",
          label: "What makes your business different?",
          type: "textarea",
          required: false,
        },
        {
          id: "about",
          label: "Owner, team, experience, or business story",
          type: "textarea",
          required: false,
        },
        {
          id: "testimonials",
          label: "Customer testimonials or reviews",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "First impression + clear contact CTA",
          sourceFields: [],
        },
        {
          id: "services",
          name: "Services Overview",
          purpose: "Short list of what's offered, with short descriptions",
          sourceFields: ["services"],
        },
        {
          id: "testimonials",
          name: "Testimonials / Trust Signals",
          purpose: "Supplied reviews, before/after photos, certifications",
          sourceFields: ["testimonials"],
        },
        {
          id: "pricing",
          name: "Pricing Hints",
          purpose: "Price ranges or 'what's included', not a full table",
          sourceFields: ["pricing"],
        },
        {
          id: "about",
          name: "About / Team",
          purpose: "Owner/team story and credentials to build trust",
          sourceFields: ["about", "usp"],
        },
        {
          id: "location-hours",
          name: "Hours & Location",
          purpose: "Supplied address and hours",
          sourceFields: ["hours", "contact.address"],
        },
        {
          id: "final-cta",
          name: "Contact",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    ecommerce: {
      id: "ecommerce",
      name: "E-commerce / product sales",
      audienceNote:
        "Shoppers comparing products and deciding whether to buy now.",
      toneDefaults: ["clean", "confident", "product-focused"],
      conventions: [
        "Product imagery is the visual centerpiece, not decoration",
        "Show supplied prices and a visual 'explore products' CTA near featured products; do not imply cart or checkout functionality",
        "Category highlights visible near the top",
        "Show supplied reviews and shipping/return information; do not imply a checkout system",
      ],
      inputSchema: [
        {
          id: "products",
          label: "Featured products",
          type: "list",
          required: true,
        },
        {
          id: "categories",
          label: "Product categories",
          type: "list",
          required: true,
        },
        {
          id: "priceRange",
          label: "Typical price range",
          type: "text",
          required: false,
        },
        {
          id: "shipping",
          label: "Shipping / delivery information",
          type: "textarea",
          required: false,
        },
        {
          id: "returns",
          label: "Return / exchange policy",
          type: "textarea",
          required: false,
        },
        {
          id: "reviews",
          label: "Customer reviews or testimonials",
          type: "list",
          required: false,
        },
        {
          id: "usp",
          label: "What makes your brand different?",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero Banner",
          purpose: "Brand impression + primary 'explore products' CTA",
          sourceFields: [],
        },
        {
          id: "featured-products",
          name: "Featured / Bestselling Products",
          purpose: "Showcase supplied products with supplied prices",
          sourceFields: ["products"],
        },
        {
          id: "categories",
          name: "Category Highlights",
          purpose: "Grid teasing product categories",
          sourceFields: ["categories"],
        },
        {
          id: "brand-story",
          name: "Brand Story",
          purpose: "Short origin/values teaser",
          sourceFields: ["usp", "description"],
        },
        {
          id: "reviews",
          name: "Reviews / Trust Signals",
          purpose: "Supplied reviews plus shipping and return information",
          sourceFields: ["reviews", "shipping", "returns"],
        },
        {
          id: "final-cta",
          name: "Explore / Contact",
          purpose: "Final nudge to explore products or reach out by phone/email",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "restaurant-hospitality": {
      id: "restaurant-hospitality",
      name: "Restaurant / hospitality",
      audienceNote:
        "Hungry visitors deciding where to eat or how to contact the restaurant, often on mobile.",
      toneDefaults: ["inviting", "sensory", "warm"],
      conventions: [
        "Menu (or key offerings) reachable without scrolling far",
        "Supplied hours, address, and phone/email contact always easy to find",
        "High-quality food/space imagery is the emotional hook",
        "Mobile-first layout assumption since many visits happen on the go",
      ],
      inputSchema: [
        {
          id: "cuisine",
          label: "What type of cuisine do you offer?",
          type: "text",
          required: true,
        },
        {
          id: "menuHighlights",
          label: "Signature dishes / offerings (names only — add prices in the price list below)",
          type: "list",
          required: true,
        },
        {
          id: "pricing",
          label: "Menu price list (dish – price)",
          type: "list",
          placeholder: "e.g. Pani puri (6 pcs) – ₹40",
          required: false,
        },
        {
          id: "hours",
          label: "Opening hours",
          type: "text",
          required: true,
        },
        {
          id: "priceRange",
          label: "Typical price range",
          type: "text",
          required: false,
        },
        {
          id: "story",
          label: "Tell us about your restaurant",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Mood-setting imagery + clear contact CTA",
          sourceFields: [],
        },
        {
          id: "menu-highlights",
          name: "Menu Highlights",
          purpose: "Signature items, categorized menu teaser",
          sourceFields: ["menuHighlights", "cuisine"],
        },
        {
          id: "menu-prices",
          name: "Menu Prices",
          purpose: "Supplied dishes with their prices, shown exactly as entered",
          sourceFields: ["pricing"],
        },
        {
          id: "about",
          name: "About / Story",
          purpose: "Concept, atmosphere, chef/owner background",
          sourceFields: ["story", "description"],
        },
        {
          id: "gallery",
          name: "Gallery",
          purpose: "Photos of food and space",
          sourceFields: ["imageUrls"],
        },
        {
          id: "location-hours",
          name: "Hours & Location",
          purpose: "Supplied address, hours, phone",
          sourceFields: ["hours", "contact.address"],
        },
        {
          id: "final-cta",
          name: "Contact",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "saas-software": {
      id: "saas-software",
      name: "SaaS / software product",
      audienceNote:
        "Prospective users or buyers evaluating whether the product solves their problem, often comparing alternatives.",
      toneDefaults: ["modern", "confident", "clear"],
      conventions: [
        "Value proposition stated in the hero within one sentence",
        "When supplied, pricing should be visible on the same landing page; do not invent plans or prices",
        "Social proof (logos, testimonials, numbers) near the top, only when supplied",
        "Clear primary CTA repeated throughout, pointing to a supplied contact method or an in-page section (no signup flow)",
      ],
      inputSchema: [
        {
          id: "problem",
          label: "What problem does your product solve?",
          type: "textarea",
          required: true,
        },
        {
          id: "targetUsers",
          label: "Who is the product for?",
          type: "text",
          required: true,
        },
        {
          id: "features",
          label: "Key features",
          type: "list",
          required: true,
        },
        {
          id: "benefits",
          label: "Key benefits",
          type: "list",
          required: false,
        },
        {
          id: "pricing",
          label: "Pricing / plans",
          type: "list",
          required: false,
        },
        {
          id: "integrations",
          label: "Integrations",
          type: "list",
          required: false,
        },
        {
          id: "socialProof",
          label: "Customer logos, testimonials, or usage numbers",
          type: "list",
          required: false,
        },
        {
          id: "faqs",
          label: "Common questions and your answers",
          type: "list",
          required: false,
        },
        {
          id: "cta",
          label: "Primary CTA wording (optional)",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Value prop + primary CTA",
          sourceFields: [],
        },
        {
          id: "features",
          name: "Feature Highlights",
          purpose: "Key capabilities with visuals",
          sourceFields: ["features", "benefits"],
        },
        {
          id: "social-proof",
          name: "Social Proof",
          purpose: "Supplied logos, testimonials, usage numbers",
          sourceFields: ["socialProof"],
        },
        {
          id: "pricing",
          name: "Pricing",
          purpose: "Supplied plan tiers, simplified comparison",
          sourceFields: ["pricing"],
        },
        {
          id: "integrations",
          name: "Integrations",
          purpose: "Tools and platforms the product works with",
          sourceFields: ["integrations"],
        },
        {
          id: "faq",
          name: "FAQ",
          purpose: "Supplied questions and answers",
          sourceFields: ["faqs"],
        },
        {
          id: "final-cta",
          name: "Final CTA",
          purpose: "Closing CTA to get in touch or explore features",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "portfolio-creative": {
      id: "portfolio-creative",
      name: "Portfolio / creative showcase",
      audienceNote:
        "Potential clients or collaborators judging skill and style through the work itself.",
      toneDefaults: ["distinctive", "visual-first", "minimal chrome"],
      conventions: [
        "The work/imagery is the interface — minimal text competing for attention",
        "Contact/hire CTA present but understated",
        "Personal voice in the about section, since the person often is the brand",
      ],
      inputSchema: [
        {
          id: "profession",
          label: "Profession / creative field",
          type: "text",
          required: true,
        },
        {
          id: "work",
          label: "Featured work / projects",
          type: "list",
          required: true,
        },
        {
          id: "about",
          label: "About / bio",
          type: "textarea",
          required: false,
        },
        {
          id: "services",
          label: "Services offered",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero / Intro",
          purpose: "Immediate visual impression of the work/style",
          sourceFields: [],
        },
        {
          id: "work-showcase",
          name: "Work Showcase",
          purpose: "Grid or featured pieces of best work",
          sourceFields: ["work", "imageUrls"],
        },
        {
          id: "services",
          name: "Services",
          purpose: "What the creative offers to clients",
          sourceFields: ["services"],
        },
        {
          id: "about",
          name: "About",
          purpose: "Bio, philosophy",
          sourceFields: ["about", "description"],
        },
        {
          id: "contact-cta",
          name: "Contact",
          purpose: "Understated hire/inquiry CTA using supplied phone or email",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "local-retail": {
      id: "local-retail",
      name: "Local brick-and-mortar / retail",
      audienceNote: "Nearby customers deciding whether to visit in person.",
      toneDefaults: ["friendly", "grounded", "community-oriented"],
      conventions: [
        "Supplied address, hours, and directions are top priority information",
        "Photos of the physical space/products build local trust when supplied",
        "Simple, short page — no need for many sections",
      ],
      inputSchema: [
        {
          id: "offerings",
          label: "Products / categories offered (names only — add prices in the price list below)",
          type: "list",
          required: true,
        },
        {
          id: "pricing",
          label: "Price list (item – price)",
          type: "list",
          placeholder: "e.g. Steam momos (6 pcs) – ₹60",
          required: false,
        },
        {
          id: "hours",
          label: "Opening hours",
          type: "text",
          required: true,
        },
        {
          id: "directions",
          label: "Directions / nearby landmark",
          type: "text",
          required: false,
        },
        {
          id: "story",
          label: "Shop story",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Introduce the shop and draw visits",
          sourceFields: [],
        },
        {
          id: "offerings",
          name: "What We Offer",
          purpose: "Product or category highlights",
          sourceFields: ["offerings"],
        },
        {
          id: "price-list",
          name: "Price List",
          purpose: "Supplied items with their prices, shown exactly as entered",
          sourceFields: ["pricing"],
        },
        {
          id: "about",
          name: "About / Story",
          purpose: "Shop story, owner/team",
          sourceFields: ["story", "description"],
        },
        {
          id: "location-hours",
          name: "Visit Us",
          purpose: "Supplied address, hours, directions, phone",
          sourceFields: ["hours", "directions", "contact.address"],
        },
      ],
    },

    "professional-services": {
      id: "professional-services",
      name: "Professional services",
      audienceNote:
        "Clients evaluating credibility and expertise before reaching out, often a considered decision.",
      toneDefaults: ["credible", "polished", "authoritative"],
      conventions: [
        "Credentials and experience signaled early when supplied (years in business, certifications, clients served)",
        "Clear, digestible service breakdown since offerings can be complex",
        "Consultation/contact CTA rather than a hard sell",
        "Conservative, uncluttered visual style builds trust",
      ],
      inputSchema: [
        {
          id: "services",
          label: "Services offered",
          type: "list",
          required: true,
        },
        {
          id: "credentials",
          label: "Credentials / certifications",
          type: "list",
          required: false,
        },
        {
          id: "experience",
          label: "Years of experience / track record",
          type: "text",
          required: false,
        },
        {
          id: "team",
          label: "Team members",
          type: "list",
          required: false,
        },
        {
          id: "clients",
          label: "Notable clients / industries served",
          type: "list",
          required: false,
        },
        {
          id: "testimonials",
          label: "Client testimonials",
          type: "list",
          required: false,
        },
        {
          id: "usp",
          label: "What makes your service different?",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Value statement + consultation CTA",
          sourceFields: [],
        },
        {
          id: "services",
          name: "Services Overview",
          purpose: "Breakdown of offerings",
          sourceFields: ["services"],
        },
        {
          id: "credentials",
          name: "Credentials / About",
          purpose: "Team bios, credentials, history",
          sourceFields: ["credentials", "experience", "team", "usp"],
        },
        {
          id: "clients",
          name: "Clients & Industries",
          purpose: "Supplied clients or industries served",
          sourceFields: ["clients"],
        },
        {
          id: "testimonials",
          name: "Testimonials / Social Proof",
          purpose: "Supplied client trust signals",
          sourceFields: ["testimonials"],
        },
        {
          id: "final-cta",
          name: "Contact / Consultation",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "nonprofit-community": {
      id: "nonprofit-community",
      name: "Nonprofit / community",
      audienceNote:
        "Potential donors, volunteers, or community members deciding whether to support or engage.",
      toneDefaults: ["sincere", "hopeful", "mission-driven"],
      conventions: [
        "Mission stated clearly and early",
        "Donate/volunteer CTA prominent but not aggressive; link only to a supplied donation link or contact method",
        "Impact shown concretely (stories, numbers, photos) rather than abstractly, only when supplied",
        "Transparency cues (where funds go, who runs it) build trust when supplied",
      ],
      inputSchema: [
        {
          id: "mission",
          label: "What is your mission?",
          type: "textarea",
          required: true,
        },
        {
          id: "causes",
          label: "Causes / programs",
          type: "list",
          required: true,
        },
        {
          id: "impact",
          label: "Impact stories / numbers",
          type: "list",
          required: false,
        },
        {
          id: "getInvolved",
          label: "How can people get involved?",
          type: "list",
          required: false,
        },
        {
          id: "donationMethod",
          label: "Donation link (if you have one)",
          type: "text",
          required: false,
        },
        {
          id: "team",
          label: "Team / board information",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Mission statement + primary CTA",
          sourceFields: [],
        },
        {
          id: "programs",
          name: "Causes & Programs",
          purpose: "What the organization works on",
          sourceFields: ["causes"],
        },
        {
          id: "impact",
          name: "Impact Highlights",
          purpose: "Supplied stories, numbers, photos of impact",
          sourceFields: ["impact"],
        },
        {
          id: "about-mission",
          name: "About / Mission",
          purpose: "Mission detail, history, team/board",
          sourceFields: ["mission", "team"],
        },
        {
          id: "get-involved",
          name: "Get Involved",
          purpose: "Supplied ways to donate or volunteer, via a supplied link or contact",
          sourceFields: ["getInvolved", "donationMethod"],
        },
        {
          id: "contact",
          name: "Contact",
          purpose: "Questions and partnership inquiries by phone or email",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "education-learning": {
      id: "education-learning",
      name: "Education / learning",
      audienceNote:
        "Prospective students or parents evaluating whether the program is credible and worth the time/money.",
      toneDefaults: ["encouraging", "credible", "clear"],
      conventions: [
        "Curriculum/course highlights with clear outcomes",
        "Instructor/institution credibility signaled early when supplied",
        "Inquiry CTA (call or email) prominent",
        "Supplied testimonials or outcomes (placements, results) build trust",
      ],
      inputSchema: [
        {
          id: "programs",
          label: "Courses / programs",
          type: "list",
          required: true,
        },
        {
          id: "outcomes",
          label: "Student outcomes / results",
          type: "list",
          required: false,
        },
        {
          id: "instructors",
          label: "Instructors / faculty",
          type: "list",
          required: false,
        },
        {
          id: "duration",
          label: "Course duration / format",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Outcome-focused headline + inquiry CTA",
          sourceFields: [],
        },
        {
          id: "programs",
          name: "Courses / Programs Highlights",
          purpose: "What's taught, duration/format",
          sourceFields: ["programs", "duration"],
        },
        {
          id: "testimonials",
          name: "Testimonials / Outcomes",
          purpose: "Supplied student results, placements",
          sourceFields: ["outcomes"],
        },
        {
          id: "about",
          name: "About / Instructors",
          purpose: "Institution story, instructor credibility",
          sourceFields: ["instructors", "description"],
        },
        {
          id: "final-cta",
          name: "Contact / Admissions",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "events-conferences": {
      id: "events-conferences",
      name: "Events / conferences",
      audienceNote:
        "Potential attendees deciding whether the event is worth attending and planning around.",
      toneDefaults: ["energetic", "urgent", "professional"],
      conventions: [
        "Date, location, and primary CTA visible above the fold",
        "Speaker/lineup or agenda shown prominently to signal value when supplied",
        "Use the supplied event date and static urgency treatment; do not require a live countdown",
        "Ticket pricing/tiers easy to compare when supplied",
      ],
      inputSchema: [
        {
          id: "date",
          label: "Event date",
          type: "text",
          required: true,
        },
        {
          id: "location",
          label: "Event location",
          type: "text",
          required: true,
        },
        {
          id: "agenda",
          label: "Agenda highlights",
          type: "list",
          required: false,
        },
        {
          id: "speakers",
          label: "Speakers / lineup",
          type: "list",
          required: false,
        },
        {
          id: "tickets",
          label: "Ticket tiers / pricing",
          type: "list",
          required: false,
        },
        {
          id: "registrationMethod",
          label: "Registration link (if you have one)",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "What/when/where + primary CTA",
          sourceFields: [],
        },
        {
          id: "agenda",
          name: "Agenda Teaser",
          purpose: "Schedule highlights by day/track",
          sourceFields: ["agenda"],
        },
        {
          id: "speakers",
          name: "Speakers / Lineup",
          purpose: "Speaker profiles to build excitement",
          sourceFields: ["speakers"],
        },
        {
          id: "tickets",
          name: "Tickets",
          purpose: "Supplied ticket tiers and pricing",
          sourceFields: ["tickets"],
        },
        {
          id: "venue-contact",
          name: "Venue / Contact",
          purpose: "Event location, supplied address, and contact details",
          sourceFields: ["location", "contact.address", "contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "real-estate-property": {
      id: "real-estate-property",
      name: "Real estate / property",
      audienceNote:
        "Buyers, renters, or investors browsing listings and evaluating an agent/developer's credibility.",
      toneDefaults: ["polished", "aspirational", "trustworthy"],
      conventions: [
        "Property listings with strong imagery are the core content",
        "Agent/agency credibility (experience, past sales) shown when supplied",
        "Inquiry CTA (call or email) prominent",
      ],
      inputSchema: [
        {
          id: "propertyTypes",
          label: "Property types",
          type: "list",
          required: true,
        },
        {
          id: "areas",
          label: "Locations / areas served",
          type: "list",
          required: true,
        },
        {
          id: "featuredListings",
          label: "Featured properties",
          type: "list",
          required: false,
        },
        {
          id: "experience",
          label: "Experience / track record",
          type: "text",
          required: false,
        },
        {
          id: "testimonials",
          label: "Client testimonials",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Property-discovery framing + primary CTA; any search-style UI is visual-only and must not imply live search",
          sourceFields: [],
        },
        {
          id: "featured-listings",
          name: "Featured Listings",
          purpose: "Showcase of supplied properties",
          sourceFields: ["featuredListings"],
        },
        {
          id: "areas",
          name: "Areas & Property Types",
          purpose: "Where and what the agent works with",
          sourceFields: ["areas", "propertyTypes"],
        },
        {
          id: "why-us",
          name: "Why Work With Us",
          purpose: "Agent/agency credibility, track record",
          sourceFields: ["experience"],
        },
        {
          id: "testimonials",
          name: "Testimonials",
          purpose: "Supplied client trust signals",
          sourceFields: ["testimonials"],
        },
        {
          id: "final-cta",
          name: "Contact / Viewing Inquiry",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "directory-marketplace": {
      id: "directory-marketplace",
      name: "Directory / marketplace",
      audienceNote:
        "Two distinct audiences — people browsing listings, and providers/sellers who list on the platform.",
      toneDefaults: ["neutral", "functional", "trustworthy"],
      conventions: [
        "Category browsing shown as the primary entry point (static; no functional search)",
        "Clear separation between 'browse as a user' and 'list your business/item' paths",
        "Supplied ratings/reviews or verification cues build marketplace trust",
      ],
      inputSchema: [
        {
          id: "categories",
          label: "Categories / listing types",
          type: "list",
          required: true,
        },
        {
          id: "howItWorks",
          label: "How does the marketplace work?",
          type: "textarea",
          required: false,
        },
        {
          id: "trustSignals",
          label: "Ratings / verification / safety information",
          type: "list",
          required: false,
        },
        {
          id: "providerAction",
          label: "What should providers / sellers do?",
          type: "text",
          required: false,
        },
        {
          id: "userAction",
          label: "What should customers / users do?",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Platform value prop + route both audiences (no functional search)",
          sourceFields: [],
        },
        {
          id: "featured-listings",
          name: "Featured Categories",
          purpose: "Sample of what's on the platform",
          sourceFields: ["categories"],
        },
        {
          id: "how-it-works",
          name: "How It Works",
          purpose: "Value prop for both sides",
          sourceFields: ["howItWorks", "userAction", "providerAction"],
        },
        {
          id: "trust",
          name: "Trust / Safety",
          purpose: "Supplied ratings, reviews, verification cues",
          sourceFields: ["trustSignals"],
        },
        {
          id: "dual-cta",
          name: "For Users / For Providers",
          purpose: "Two audience paths, pointing to in-page sections or the supplied phone/email",
          sourceFields: ["userAction", "providerAction", "contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "content-media-publication": {
      id: "content-media-publication",
      name: "Content / media / publication",
      audienceNote:
        "Readers browsing for content, often arriving via search or social rather than the homepage.",
      toneDefaults: ["editorial", "readable", "voice-driven"],
      conventions: [
        "Reading experience (typography, line length) is the top priority",
        "Author/byline credibility shown where relevant and supplied",
        "No signup form; invite readers to get in touch through the supplied email or phone",
      ],
      inputSchema: [
        {
          id: "topics",
          label: "Main topics / categories",
          type: "list",
          required: true,
        },
        {
          id: "featuredContent",
          label: "Featured stories / content",
          type: "list",
          required: false,
        },
        {
          id: "authors",
          label: "Authors / contributors",
          type: "list",
          required: false,
        },
        {
          id: "about",
          label: "Publication mission / about",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Featured Content",
          purpose: "Lead story or featured piece",
          sourceFields: ["featuredContent"],
        },
        {
          id: "topics",
          name: "Topics",
          purpose: "Main categories the publication covers",
          sourceFields: ["topics"],
        },
        {
          id: "authors",
          name: "Authors",
          purpose: "Supplied writers and contributors",
          sourceFields: ["authors"],
        },
        {
          id: "about",
          name: "About",
          purpose: "Publication mission, team/writers",
          sourceFields: ["about", "description"],
        },
        {
          id: "subscribe",
          name: "Contact",
          purpose: "Reach the publication by the supplied email or phone (no signup form)",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "membership-community": {
      id: "membership-community",
      name: "Membership / community",
      audienceNote:
        "Prospective members deciding whether the community and its benefits are worth joining.",
      toneDefaults: ["belonging", "exclusive", "warm"],
      conventions: [
        "Membership benefits clearly listed before inviting an inquiry",
        "Single inquiry CTA via supplied phone/email — no sign-in/member-portal element, since there's no auth on a static page",
        "Social proof — member count, testimonials, community highlights, only when supplied",
      ],
      inputSchema: [
        {
          id: "benefits",
          label: "Membership benefits",
          type: "list",
          required: true,
        },
        {
          id: "membershipTypes",
          label: "Membership tiers / types",
          type: "list",
          required: false,
        },
        {
          id: "pricing",
          label: "Membership pricing",
          type: "list",
          required: false,
        },
        {
          id: "memberProof",
          label: "Member count / testimonials / highlights",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Value prop of belonging + inquiry CTA",
          sourceFields: [],
        },
        {
          id: "benefits",
          name: "Benefits Overview",
          purpose: "What membership includes",
          sourceFields: ["benefits", "membershipTypes"],
        },
        {
          id: "testimonials",
          name: "Member Highlights",
          purpose: "Supplied testimonials and community proof",
          sourceFields: ["memberProof"],
        },
        {
          id: "pricing",
          name: "Membership Pricing",
          purpose: "Supplied tier comparison",
          sourceFields: ["pricing"],
        },
        {
          id: "final-cta",
          name: "Contact to Join",
          purpose: "Invite visitors to call or email to learn how to join",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "documentation-developer": {
      id: "documentation-developer",
      name: "Documentation / developer",
      audienceNote:
        "Developers or technical users looking to quickly find accurate reference information, not be marketed to.",
      toneDefaults: ["precise", "minimal", "no-nonsense"],
      conventions: [
        "Static anchor-link navigation to key sections — no functional search, since there's no backend",
        "Code examples shown prominently, often with syntax highlighting",
        "Minimal marketing language — clarity over persuasion",
      ],
      inputSchema: [
        {
          id: "installation",
          label: "Installation / quickstart information",
          type: "textarea",
          required: true,
        },
        {
          id: "keyLinks",
          label: "Important documentation links",
          type: "list",
          required: false,
        },
        {
          id: "examples",
          label: "Code examples / use cases",
          type: "list",
          required: false,
        },
        {
          id: "support",
          label: "Community / support links",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "What this is, in one line + jump link to quickstart",
          sourceFields: [],
        },
        {
          id: "quickstart",
          name: "Quickstart",
          purpose: "Minimal installation/working example",
          sourceFields: ["installation"],
        },
        {
          id: "examples",
          name: "Examples",
          purpose: "Supplied code examples and use cases",
          sourceFields: ["examples"],
        },
        {
          id: "key-links",
          name: "Key Links / Reference Highlights",
          purpose: "Pointers into supplied docs/reference links",
          sourceFields: ["keyLinks"],
        },
        {
          id: "community",
          name: "Community / Support",
          purpose: "Supplied community links, support contact",
          sourceFields: ["support", "contact.businessEmail"],
        },
      ],
    },

    "healthcare-medical": {
      id: "healthcare-medical",
      name: "Healthcare / medical",
      audienceNote:
        "Patients evaluating a provider's credibility and deciding whether to get in touch, often searching in urgent or health-anxious moments.",
      toneDefaults: ["reassuring", "professional", "clean"],
      conventions: [
        "Provider credentials and specializations signaled early when supplied",
        "Appointment inquiry CTA (call or email) prominent and repeated",
        "Insurance/payment and new-patient info easy to find when supplied",
        "Calm, trustworthy visual style — avoid overly salesy language and unsupported medical claims",
      ],
      inputSchema: [
        {
          id: "services",
          label: "Services / treatments",
          type: "list",
          required: true,
        },
        {
          id: "specializations",
          label: "Specializations",
          type: "list",
          required: false,
        },
        {
          id: "providers",
          label: "Doctors / providers",
          type: "list",
          required: false,
        },
        {
          id: "hours",
          label: "Opening hours",
          type: "text",
          required: true,
        },
        {
          id: "insurance",
          label: "Accepted insurance / payment information",
          type: "list",
          required: false,
        },
        {
          id: "testimonials",
          label: "Patient testimonials or review excerpts",
          type: "list",
          required: false,
        },
        {
          id: "faqs",
          label: "Common patient questions and your answers",
          type: "list",
          required: false,
        },
        {
          id: "usp",
          label: "What makes the practice different?",
          type: "textarea",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Reassuring first impression + call/email CTA",
          sourceFields: [],
        },
        {
          id: "services",
          name: "Services / Treatments",
          purpose: "Conditions/treatments offered",
          sourceFields: ["services", "specializations"],
        },
        {
          id: "providers",
          name: "Providers / Team",
          purpose: "Doctor/staff credentials and specializations",
          sourceFields: ["providers"],
        },
        {
          id: "testimonials",
          name: "Patient Testimonials",
          purpose: "Supplied reviews and trust signals",
          sourceFields: ["testimonials"],
        },
        {
          id: "insurance-info",
          name: "Insurance & New Patients",
          purpose: "Supplied insurance information, what to expect on first visit",
          sourceFields: ["insurance"],
        },
        {
          id: "location-hours",
          name: "Hours & Location",
          purpose: "Supplied address and hours",
          sourceFields: ["hours", "contact.address"],
        },
        {
          id: "faq",
          name: "FAQ",
          purpose: "Supplied patient questions and answers",
          sourceFields: ["faqs"],
        },
        {
          id: "final-cta",
          name: "Contact / Appointments",
          purpose: "Invite visitors to call or email to arrange an appointment",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "fitness-wellness": {
      id: "fitness-wellness",
      name: "Fitness / wellness",
      audienceNote:
        "People deciding whether to try a class, join a membership, or get in touch, often comparing several nearby studios.",
      toneDefaults: ["energetic", "motivating", "welcoming"],
      conventions: [
        "Class schedule or membership options visible early when supplied",
        "Trial or first-class inquiry CTA prominent via supplied phone/email",
        "Instructor credibility and studio atmosphere shown via imagery when supplied",
        "Membership pricing tiers easy to compare when supplied",
      ],
      inputSchema: [
        {
          id: "classes",
          label: "Classes / programs",
          type: "list",
          required: true,
        },
        {
          id: "schedule",
          label: "Class schedule",
          type: "list",
          required: false,
        },
        {
          id: "instructors",
          label: "Instructors / trainers",
          type: "list",
          required: false,
        },
        {
          id: "pricing",
          label: "Membership / pricing tiers",
          type: "list",
          required: false,
        },
        {
          id: "memberProof",
          label: "Member testimonials, results, or community highlights",
          type: "list",
          required: false,
        },
        {
          id: "hours",
          label: "Opening hours",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Energy/atmosphere + inquiry CTA",
          sourceFields: [],
        },
        {
          id: "classes-programs",
          name: "Classes / Programs",
          purpose: "What's offered, schedule teaser",
          sourceFields: ["classes", "schedule"],
        },
        {
          id: "instructors",
          name: "Instructors / Trainers",
          purpose: "Credentials and personality",
          sourceFields: ["instructors"],
        },
        {
          id: "testimonials",
          name: "Member Testimonials",
          purpose: "Supplied results and social proof",
          sourceFields: ["memberProof"],
        },
        {
          id: "membership-pricing",
          name: "Membership / Pricing",
          purpose: "Supplied tier comparison",
          sourceFields: ["pricing"],
        },
        {
          id: "location-hours",
          name: "Hours & Location",
          purpose: "Supplied address and hours",
          sourceFields: ["hours", "contact.address"],
        },
        {
          id: "final-cta",
          name: "Contact",
          purpose: "Invite visitors to call or email about a trial or membership",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "app-landing": {
      id: "app-landing",
      name: "Mobile app landing page",
      audienceNote:
        "Potential users deciding whether to download the app, usually landing from an ad or app store search.",
      toneDefaults: ["modern", "energetic", "benefit-driven"],
      conventions: [
        "Show App Store / Play Store badges only when store links are supplied",
        "Screenshots or device mockups showing the app in use",
        "Key benefits stated simply, not feature lists",
        "Social proof (ratings, download count, press mentions) near the top, only when supplied",
      ],
      inputSchema: [
        {
          id: "targetUsers",
          label: "Who is the app for?",
          type: "text",
          required: true,
        },
        {
          id: "benefits",
          label: "Key benefits",
          type: "list",
          required: true,
        },
        {
          id: "features",
          label: "Key features",
          type: "list",
          required: false,
        },
        {
          id: "storeLinks",
          label: "App Store / Play Store links",
          type: "list",
          required: false,
        },
        {
          id: "socialProof",
          label: "Ratings / downloads / press mentions",
          type: "list",
          required: false,
        },
        {
          id: "faqs",
          label: "Common questions and your answers",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Value prop + store badges (linked only if store links are supplied)",
          sourceFields: [],
        },
        {
          id: "screenshots",
          name: "App Screenshots / Demo",
          purpose: "Show the app in use via device mockups",
          sourceFields: ["imageUrls"],
        },
        {
          id: "features",
          name: "Feature Highlights",
          purpose: "Key benefits, simply stated",
          sourceFields: ["benefits", "features"],
        },
        {
          id: "social-proof",
          name: "Social Proof",
          purpose: "Supplied ratings, download numbers, press mentions",
          sourceFields: ["socialProof"],
        },
        {
          id: "faq",
          name: "FAQ",
          purpose: "Supplied questions and answers",
          sourceFields: ["faqs"],
        },
        {
          id: "final-cta",
          name: "Download / Contact",
          purpose: "Closing CTA linking to supplied store links, or phone/email",
          sourceFields: ["storeLinks", "contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "personal-brand-coach": {
      id: "personal-brand-coach",
      name: "Personal brand / coach / speaker",
      audienceNote:
        "Potential clients or bookers evaluating the person's credibility, style, and fit before reaching out.",
      toneDefaults: ["personal", "confident", "authentic"],
      conventions: [
        "The person's own story and voice lead the page, not a company narrative",
        "Clear single CTA (call or email) repeated",
        "Credibility shown via supplied results, media mentions, or client outcomes rather than corporate credentials",
        "Photo of the person featured prominently when supplied",
      ],
      inputSchema: [
        {
          id: "profession",
          label: "Role / profession",
          type: "text",
          required: true,
        },
        {
          id: "story",
          label: "Personal story / background",
          type: "textarea",
          required: false,
        },
        {
          id: "offerings",
          label: "Services / coaching / speaking offerings",
          type: "list",
          required: true,
        },
        {
          id: "results",
          label: "Client results / outcomes",
          type: "list",
          required: false,
        },
        {
          id: "media",
          label: "Media / press mentions",
          type: "list",
          required: false,
        },
        {
          id: "cta",
          label: "Primary CTA wording (optional)",
          type: "text",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Personal introduction + single clear CTA",
          sourceFields: [],
        },
        {
          id: "about",
          name: "About / Story",
          purpose: "The person's background and approach",
          sourceFields: ["story", "description"],
        },
        {
          id: "offerings",
          name: "What I Offer",
          purpose: "Coaching packages, speaking topics, or services",
          sourceFields: ["offerings"],
        },
        {
          id: "testimonials",
          name: "Testimonials / Results",
          purpose: "Supplied client outcomes and social proof",
          sourceFields: ["results"],
        },
        {
          id: "media-mentions",
          name: "Media / Press",
          purpose: "Supplied features, podcasts, publications",
          sourceFields: ["media"],
        },
        {
          id: "final-cta",
          name: "Contact",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "travel-tourism": {
      id: "travel-tourism",
      name: "Travel / tourism",
      audienceNote:
        "Travelers researching and deciding whether to inquire about a trip or tour, often comparing multiple operators.",
      toneDefaults: ["adventurous", "inspiring", "trustworthy"],
      conventions: [
        "Destination imagery is the emotional hook, front and center, when supplied",
        "Show supplied tour/package options and pricing early; do not invent prices",
        "Show only supplied trust signals, such as reviews, safety/licensing information, or years of experience",
        "Inquiry CTA (call or email) prominent",
      ],
      inputSchema: [
        {
          id: "destinations",
          label: "Destinations",
          type: "list",
          required: true,
        },
        {
          id: "tours",
          label: "Tours / packages",
          type: "list",
          required: true,
        },
        {
          id: "pricing",
          label: "Package pricing",
          type: "list",
          required: false,
        },
        {
          id: "trustSignals",
          label: "Reviews / safety / licensing information",
          type: "list",
          required: false,
        },
        {
          id: "faqs",
          label: "Common trip-planning questions and your answers",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Destination imagery + primary inquiry CTA",
          sourceFields: [],
        },
        {
          id: "tours-packages",
          name: "Tours / Packages",
          purpose: "What's offered, itinerary highlights, supplied pricing",
          sourceFields: ["tours", "destinations", "pricing"],
        },
        {
          id: "gallery",
          name: "Gallery",
          purpose: "Destination and past-trip photos",
          sourceFields: ["imageUrls"],
        },
        {
          id: "testimonials",
          name: "Traveler Reviews & Trust",
          purpose: "Supplied reviews, safety and licensing information",
          sourceFields: ["trustSignals"],
        },
        {
          id: "about",
          name: "About / Why Us",
          purpose: "Experience and credibility from supplied details",
          sourceFields: ["description"],
        },
        {
          id: "faq",
          name: "FAQ",
          purpose: "Supplied trip-planning questions and answers",
          sourceFields: ["faqs"],
        },
        {
          id: "final-cta",
          name: "Inquire",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    automotive: {
      id: "automotive",
      name: "Automotive",
      audienceNote:
        "Customers deciding whether to bring their vehicle in for service or browse inventory, often comparing on trust and price.",
      toneDefaults: ["reliable", "straightforward", "trustworthy"],
      conventions: [
        "Service list or inventory highlights visible early",
        "Trust signals when supplied: certifications, years in business, reviews",
        "Clear CTA (explore services / browse inventory / call or email for a quote)",
        "Supplied location and hours prominent since this is an in-person visit",
      ],
      inputSchema: [
        {
          id: "servicesInventory",
          label: "Services / inventory",
          type: "list",
          required: true,
        },
        {
          id: "certifications",
          label: "Certifications / credentials",
          type: "list",
          required: false,
        },
        {
          id: "experience",
          label: "Years in business",
          type: "text",
          required: false,
        },
        {
          id: "testimonials",
          label: "Customer reviews or testimonials",
          type: "list",
          required: false,
        },
        {
          id: "hours",
          label: "Opening hours",
          type: "text",
          required: true,
        },
        {
          id: "cta",
          label: "Primary action",
          type: "select",
          options: [
            "Explore services",
            "Browse inventory",
            "Call or email for a quote",
            "Contact us",
          ],
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose:
            "First impression + primary CTA (explore services / browse inventory / contact)",
          sourceFields: [],
        },
        {
          id: "services-inventory",
          name: "Services / Inventory Highlights",
          purpose: "What's offered — repairs, services, or vehicles",
          sourceFields: ["servicesInventory"],
        },
        {
          id: "testimonials",
          name: "Testimonials / Trust Signals",
          purpose: "Supplied reviews and certifications",
          sourceFields: ["testimonials", "certifications"],
        },
        {
          id: "about",
          name: "About",
          purpose: "Supplied years in business, credentials",
          sourceFields: ["experience", "certifications"],
        },
        {
          id: "location-hours",
          name: "Hours & Location",
          purpose: "Supplied address and hours",
          sourceFields: ["hours", "contact.address"],
        },
        {
          id: "final-cta",
          name: "Contact",
          purpose: "Invite visitors to call or email using the supplied details",
          sourceFields: ["contact.phone", "contact.businessEmail"],
        },
      ],
    },

    "wedding-event-venue": {
      id: "wedding-event-venue",
      name: "Wedding / event venue",
      audienceNote:
        "Couples or event planners evaluating whether the venue fits their event, comparing multiple venues.",
      toneDefaults: ["elegant", "aspirational", "warm"],
      conventions: [
        "Venue photography is the emotional hook, front and center, when supplied",
        "Show supplied capacity, packages, and pricing early; do not invent price ranges",
        "Inquiry CTA (call or email) prominent",
        "Past-event gallery builds trust and inspiration when images are supplied",
      ],
      inputSchema: [
        {
          id: "capacity",
          label: "Venue capacity",
          type: "text",
          required: true,
        },
        {
          id: "amenities",
          label: "Amenities / facilities",
          type: "list",
          required: false,
        },
        {
          id: "packages",
          label: "Packages",
          type: "list",
          required: true,
        },
        {
          id: "pricing",
          label: "Pricing / price ranges",
          type: "list",
          required: false,
        },
        {
          id: "testimonials",
          label: "Couple / client reviews",
          type: "list",
          required: false,
        },
        {
          id: "faqs",
          label: "Common planning questions and your answers",
          type: "list",
          required: false,
        },
      ],
      landingPageSections: [
        {
          id: "hero",
          name: "Hero",
          purpose: "Venue imagery + primary inquiry CTA",
          sourceFields: [],
        },
        {
          id: "gallery",
          name: "Gallery",
          purpose: "Photos of the venue and past events",
          sourceFields: ["imageUrls"],
        },
        {
          id: "packages-pricing",
          name: "Packages & Pricing",
          purpose: "Supplied capacity, packages, pricing ranges",
          sourceFields: ["packages", "pricing", "capacity"],
        },
        {
          id: "testimonials",
          name: "Testimonials",
          purpose: "Supplied couple/client reviews",
          sourceFields: ["testimonials"],
        },
        {
          id: "about",
          name: "About the Venue",
          purpose: "Venue story, amenities",
          sourceFields: ["amenities", "description"],
        },
        {
          id: "faq",
          name: "FAQ",
          purpose: "Supplied planning questions and answers",
          sourceFields: ["faqs"],
        },
        {
          id: "final-cta",
          name: "Inquire",
          purpose: "Invite visitors to call or email about a tour or event",
          sourceFields: ["contact.phone", "contact.businessEmail", "contact.address"],
        },
      ],
    },
  },
};

export default archetypesconfig;