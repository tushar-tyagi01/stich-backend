const archetypesconfig = {
  archetypes: {
    "service-booking": {
      id: "service-booking",
      name: "Service booking",
      keywords: [
        "salon",
        "spa",
        "clinic",
        "grooming",
        "repair",
        "consultant",
        "tutoring",
        "therapist",
        "gym trainer",
        "cleaning service",
        "photographer"
      ],
      audienceNote: "Local customers researching trust/quality before booking an appointment or service slot.",
      toneDefaults: [
        "warm",
        "trustworthy",
        "approachable"
      ],
      conventions: [
        "Booking/appointment call-to-action visible in the header on every page",
        "Hours and location clearly visible (footer or dedicated section)",
        "Trust signals near the top: reviews, before/after photos, certifications",
        "Phone number or contact method easy to find without scrolling"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "First impression + quick path to booking",
          sections: [
            "hero with CTA",
            "services overview",
            "testimonials",
            "hours/location teaser",
            "final CTA"
          ]
        },
        services: {
          page: "Services",
          purpose: "List what's offered",
          sections: [
            "service list with short descriptions",
            "pricing hints if applicable"
          ]
        },
        pricing: {
          page: "Pricing",
          purpose: "Transparent cost expectations",
          sections: [
            "price table or ranges",
            "what's included"
          ]
        },
        "book-contact": {
          page: "Book / Contact",
          purpose: "Convert visitor to booking",
          sections: [
            "booking form or calendar embed",
            "contact info",
            "map/location"
          ]
        },
        about: {
          page: "About",
          purpose: "Build trust",
          sections: [
            "team/owner story",
            "credentials",
            "photos of space/work"
          ]
        }
      }
    },
    ecommerce: {
      id: "ecommerce",
      name: "E-commerce / product sales",
      keywords: [
        "shop",
        "store",
        "boutique",
        "products",
        "online store",
        "retailer",
        "brand"
      ],
      audienceNote: "Shoppers comparing products and deciding whether to buy now.",
      toneDefaults: [
        "clean",
        "confident",
        "product-focused"
      ],
      conventions: [
        "Product imagery is the visual centerpiece, not decoration",
        "Clear pricing and add-to-cart/buy CTA on every product view",
        "Category navigation visible near the top",
        "Trust signals: reviews, shipping/return policy, secure checkout cues"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Showcase brand + bestsellers",
          sections: [
            "hero banner",
            "featured/bestselling products",
            "category grid",
            "brand story teaser"
          ]
        },
        "shop-category": {
          page: "Shop / Category",
          purpose: "Browse products",
          sections: [
            "filterable product grid",
            "sort options"
          ]
        },
        "product-detail": {
          page: "Product Detail",
          purpose: "Convert to purchase",
          sections: [
            "product images",
            "price + CTA",
            "description",
            "reviews"
          ]
        },
        about: {
          page: "About",
          purpose: "Brand story",
          sections: [
            "origin story",
            "values",
            "team/founder"
          ]
        },
        "contact-faq": {
          page: "Contact / FAQ",
          purpose: "Reduce purchase friction",
          sections: [
            "shipping/returns info",
            "contact form"
          ]
        }
      }
    },
    "restaurant-hospitality": {
      id: "restaurant-hospitality",
      name: "Restaurant / hospitality",
      keywords: [
        "restaurant",
        "cafe",
        "bakery",
        "bar",
        "catering",
        "food truck",
        "hotel",
        "bnb"
      ],
      audienceNote: "Hungry or planning visitors deciding where to eat or stay, often on mobile.",
      toneDefaults: [
        "inviting",
        "sensory",
        "warm"
      ],
      conventions: [
        "Menu (or key offerings) reachable within one click from home",
        "Hours, location, and reservation/order CTA always visible",
        "High-quality food/space imagery is the emotional hook",
        "Mobile-first layout assumption since many visits happen on the go"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Set mood + quick access to menu/reservation",
          sections: [
            "hero imagery",
            "highlights/signature items",
            "hours/location",
            "reservation CTA"
          ]
        },
        menu: {
          page: "Menu",
          purpose: "Show offerings and pricing",
          sections: [
            "categorized menu items with prices"
          ]
        },
        about: {
          page: "About",
          purpose: "Story and atmosphere",
          sections: [
            "concept/story",
            "chef or owner background",
            "gallery"
          ]
        },
        "reservations-order": {
          page: "Reservations / Order",
          purpose: "Convert intent to action",
          sections: [
            "booking widget or order link",
            "contact info"
          ]
        },
        "contact-location": {
          page: "Contact / Location",
          purpose: "Help visitors arrive",
          sections: [
            "map",
            "hours",
            "phone"
          ]
        }
      }
    },
    "saas-software": {
      id: "saas-software",
      name: "SaaS / software product",
      keywords: [
        "software",
        "app",
        "platform",
        "saas",
        "tool",
        "dashboard",
        "api"
      ],
      audienceNote: "Prospective users or buyers evaluating whether the product solves their problem, often comparing alternatives.",
      toneDefaults: [
        "modern",
        "confident",
        "clear"
      ],
      conventions: [
        "Value proposition stated in the hero within one sentence",
        "Pricing/plans easy to find, ideally one click from anywhere",
        "Social proof (logos, testimonials, numbers) near the top",
        "Clear primary CTA repeated throughout (Try free / Get started)"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Communicate value prop + drive signup",
          sections: [
            "hero with value prop + CTA",
            "feature highlights",
            "social proof",
            "final CTA"
          ]
        },
        features: {
          page: "Features",
          purpose: "Detail capabilities",
          sections: [
            "feature breakdown with visuals"
          ]
        },
        pricing: {
          page: "Pricing",
          purpose: "Plan comparison",
          sections: [
            "pricing tiers",
            "feature comparison table",
            "FAQ"
          ]
        },
        about: {
          page: "About",
          purpose: "Build credibility",
          sections: [
            "mission",
            "team",
            "milestones"
          ]
        },
        "contact-demo": {
          page: "Contact / Demo",
          purpose: "Capture leads not ready to self-serve",
          sections: [
            "contact/demo request form"
          ]
        }
      }
    },
    "portfolio-creative": {
      id: "portfolio-creative",
      name: "Portfolio / creative showcase",
      keywords: [
        "designer",
        "artist",
        "photographer portfolio",
        "freelancer",
        "creative",
        "illustrator",
        "architect"
      ],
      audienceNote: "Potential clients or collaborators judging skill and style through the work itself.",
      toneDefaults: [
        "distinctive",
        "visual-first",
        "minimal chrome"
      ],
      conventions: [
        "The work/imagery is the interface — minimal text competing for attention",
        "Easy navigation between projects without heavy reloads",
        "Contact/hire CTA present but understated",
        "Personal voice in About, since the person often is the brand"
      ],
      typicalPages: {
        "home-gallery": {
          page: "Home / Gallery",
          purpose: "Showcase best work immediately",
          sections: [
            "project grid or featured pieces"
          ]
        },
        "project-detail": {
          page: "Project Detail",
          purpose: "Deep dive on one project",
          sections: [
            "images/media",
            "process notes",
            "outcome"
          ]
        },
        about: {
          page: "About",
          purpose: "Personal story and approach",
          sections: [
            "bio",
            "philosophy",
            "photo"
          ]
        },
        contact: {
          page: "Contact",
          purpose: "Convert interest into inquiry",
          sections: [
            "contact form or email",
            "social links"
          ]
        }
      }
    },
    "local-retail": {
      id: "local-retail",
      name: "Local brick-and-mortar / retail",
      keywords: [
        "shop",
        "store front",
        "boutique",
        "florist",
        "hardware store",
        "local business"
      ],
      audienceNote: "Nearby customers deciding whether to visit in person.",
      toneDefaults: [
        "friendly",
        "grounded",
        "community-oriented"
      ],
      conventions: [
        "Address, hours, and directions are top priority information",
        "Photos of the physical space/products build local trust",
        "Simple structure — these sites don't need many pages"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Introduce the shop and draw visits",
          sections: [
            "hero",
            "what we offer",
            "location/hours teaser"
          ]
        },
        "products-offerings": {
          page: "Products / Offerings",
          purpose: "Show what's available",
          sections: [
            "product or category highlights"
          ]
        },
        about: {
          page: "About",
          purpose: "Local trust and story",
          sections: [
            "shop story",
            "owner/team"
          ]
        },
        "contact-visit-us": {
          page: "Contact / Visit Us",
          purpose: "Drive foot traffic",
          sections: [
            "map",
            "hours",
            "phone"
          ]
        }
      }
    },
    "professional-services": {
      id: "professional-services",
      name: "Professional services",
      keywords: [
        "law firm",
        "accounting",
        "agency",
        "consulting firm",
        "financial advisor",
        "real estate agent"
      ],
      audienceNote: "Clients evaluating credibility and expertise before reaching out, often a considered decision.",
      toneDefaults: [
        "credible",
        "polished",
        "authoritative"
      ],
      conventions: [
        "Credentials and experience signaled early (years in business, certifications, clients served)",
        "Clear service breakdown since offerings can be complex",
        "Consultation/contact CTA rather than a hard sell",
        "Conservative, uncluttered visual style builds trust"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Establish credibility + direct to services",
          sections: [
            "hero with value statement",
            "service overview",
            "credentials/social proof",
            "CTA"
          ]
        },
        services: {
          page: "Services",
          purpose: "Explain offerings in depth",
          sections: [
            "service breakdown"
          ]
        },
        "about-team": {
          page: "About / Team",
          purpose: "Establish expertise",
          sections: [
            "team bios",
            "credentials",
            "history"
          ]
        },
        contact: {
          page: "Contact",
          purpose: "Convert to consultation",
          sections: [
            "contact form",
            "office info"
          ]
        }
      }
    },
    "nonprofit-community": {
      id: "nonprofit-community",
      name: "Nonprofit / community",
      keywords: [
        "nonprofit",
        "charity",
        "ngo",
        "community organization",
        "foundation",
        "church",
        "association"
      ],
      audienceNote: "Potential donors, volunteers, or community members deciding whether to support or engage.",
      toneDefaults: [
        "sincere",
        "hopeful",
        "mission-driven"
      ],
      conventions: [
        "Mission stated clearly and early",
        "Donate/volunteer CTA prominent but not aggressive",
        "Impact shown concretely (stories, numbers, photos) rather than abstractly",
        "Transparency cues (where funds go, who runs it) build trust"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Communicate mission + drive action",
          sections: [
            "hero with mission statement",
            "impact highlights",
            "donate/volunteer CTA"
          ]
        },
        "about-mission": {
          page: "About / Mission",
          purpose: "Explain the cause and organization",
          sections: [
            "mission detail",
            "history",
            "team/board"
          ]
        },
        "get-involved": {
          page: "Get Involved",
          purpose: "Convert visitors to donors/volunteers",
          sections: [
            "donate options",
            "volunteer signup"
          ]
        },
        contact: {
          page: "Contact",
          purpose: "Answer questions, enable partnerships",
          sections: [
            "contact form",
            "location if applicable"
          ]
        }
      }
    },
    "education-learning": {
      id: "education-learning",
      name: "Education / learning",
      keywords: [
        "school",
        "course",
        "academy",
        "coaching institute",
        "online course",
        "training center",
        "tutor platform",
        "university"
      ],
      audienceNote: "Prospective students or parents evaluating whether the program is credible and worth the time/money.",
      toneDefaults: [
        "encouraging",
        "credible",
        "clear"
      ],
      conventions: [
        "Curriculum/course list easy to browse with clear outcomes",
        "Instructor/institution credibility signaled early",
        "Enroll/apply CTA prominent",
        "Testimonials or outcomes (placements, results) build trust"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Communicate value + drive enrollment",
          sections: [
            "hero with outcome-focused headline",
            "course/program highlights",
            "testimonials",
            "enroll CTA"
          ]
        },
        "courses-programs": {
          page: "Courses / Programs",
          purpose: "Browse offerings",
          sections: [
            "course list with descriptions",
            "duration/format/price"
          ]
        },
        "course-detail": {
          page: "Course Detail",
          purpose: "Convert to enrollment",
          sections: [
            "curriculum breakdown",
            "instructor info",
            "enroll CTA"
          ]
        },
        about: {
          page: "About",
          purpose: "Establish credibility",
          sections: [
            "institution story",
            "instructors/faculty",
            "accreditation"
          ]
        },
        "contact-apply": {
          page: "Contact / Apply",
          purpose: "Capture leads",
          sections: [
            "application or inquiry form"
          ]
        }
      }
    },
    "events-conferences": {
      id: "events-conferences",
      name: "Events / conferences",
      keywords: [
        "conference",
        "summit",
        "festival",
        "workshop",
        "meetup",
        "expo",
        "event"
      ],
      audienceNote: "Potential attendees deciding whether the event is worth registering for and planning around.",
      toneDefaults: [
        "energetic",
        "urgent",
        "professional"
      ],
      conventions: [
        "Date, location, and register CTA visible above the fold",
        "Speaker/lineup or agenda shown prominently to signal value",
        "Countdown or urgency cues common for time-bound events",
        "Ticket pricing/tiers easy to compare"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Communicate what/when/why + drive registration",
          sections: [
            "hero with date/location",
            "highlights/speakers teaser",
            "register CTA"
          ]
        },
        "agenda-schedule": {
          page: "Agenda / Schedule",
          purpose: "Show event structure",
          sections: [
            "schedule by day/track"
          ]
        },
        "speakers-lineup": {
          page: "Speakers / Lineup",
          purpose: "Build credibility and excitement",
          sections: [
            "speaker profiles"
          ]
        },
        "tickets-register": {
          page: "Tickets / Register",
          purpose: "Convert to registration",
          sections: [
            "ticket tiers",
            "registration form"
          ]
        },
        "venue-contact": {
          page: "Venue / Contact",
          purpose: "Practical logistics",
          sections: [
            "location/map",
            "travel info",
            "contact"
          ]
        }
      }
    },
    "real-estate-property": {
      id: "real-estate-property",
      name: "Real estate / property",
      keywords: [
        "real estate",
        "realtor",
        "property management",
        "apartments",
        "housing developer",
        "rentals"
      ],
      audienceNote: "Buyers, renters, or investors browsing listings and evaluating an agent/developer's credibility.",
      toneDefaults: [
        "polished",
        "aspirational",
        "trustworthy"
      ],
      conventions: [
        "Property listings with strong imagery are the core content",
        "Search/filter for listings expected even in simple versions",
        "Agent/agency credibility (experience, past sales) shown",
        "Inquiry/schedule-viewing CTA on every listing"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Showcase listings + agent credibility",
          sections: [
            "hero with search bar",
            "featured listings",
            "why work with us"
          ]
        },
        listings: {
          page: "Listings",
          purpose: "Browse available properties",
          sections: [
            "filterable listing grid"
          ]
        },
        "listing-detail": {
          page: "Listing Detail",
          purpose: "Convert interest to inquiry",
          sections: [
            "photo gallery",
            "property details/price",
            "schedule viewing CTA"
          ]
        },
        "about-agent": {
          page: "About / Agent",
          purpose: "Build trust",
          sections: [
            "experience",
            "track record",
            "photo"
          ]
        },
        contact: {
          page: "Contact",
          purpose: "Capture leads",
          sections: [
            "contact form",
            "office info"
          ]
        }
      }
    },
    "directory-marketplace": {
      id: "directory-marketplace",
      name: "Directory / marketplace",
      keywords: [
        "marketplace",
        "directory",
        "listings platform",
        "aggregator",
        "classifieds",
        "two-sided platform"
      ],
      audienceNote: "Two distinct audiences — people searching/browsing listings, and providers/sellers who list on the platform.",
      toneDefaults: [
        "neutral",
        "functional",
        "trustworthy"
      ],
      conventions: [
        "Search and filtering are the primary interaction, not just browsing",
        "Clear separation between 'browse as a user' and 'list your business/item' paths",
        "Ratings/reviews or verification cues build marketplace trust",
        "Category structure needs to be visible and scannable"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Route both audiences + surface search",
          sections: [
            "hero with search",
            "featured categories/listings",
            "how it works"
          ]
        },
        "browse-search-results": {
          page: "Browse / Search Results",
          purpose: "Find relevant listings",
          sections: [
            "filterable results grid"
          ]
        },
        "listing-detail": {
          page: "Listing Detail",
          purpose: "Evaluate a specific listing",
          sections: [
            "details",
            "reviews/ratings",
            "contact/inquiry CTA"
          ]
        },
        "list-your-business-item": {
          page: "List Your Business/Item",
          purpose: "Onboard providers",
          sections: [
            "submission form or signup flow"
          ]
        },
        "about-how-it-works": {
          page: "About / How It Works",
          purpose: "Explain the platform and build trust",
          sections: [
            "value prop for both sides",
            "trust/safety info"
          ]
        }
      }
    },
    "content-media-publication": {
      id: "content-media-publication",
      name: "Content / media / publication",
      keywords: [
        "blog",
        "magazine",
        "news site",
        "publication",
        "media outlet",
        "newsletter"
      ],
      audienceNote: "Readers browsing for content, often arriving via search or social rather than the homepage.",
      toneDefaults: [
        "editorial",
        "readable",
        "voice-driven"
      ],
      conventions: [
        "Reading experience (typography, line length) is the top priority",
        "Article/post list organized by category or recency",
        "Author/byline credibility shown on articles",
        "Newsletter or subscribe CTA common but shouldn't block reading"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Surface latest/featured content",
          sections: [
            "featured article",
            "recent posts grid",
            "category navigation"
          ]
        },
        "article-detail": {
          page: "Article Detail",
          purpose: "Deliver the reading experience",
          sections: [
            "article body",
            "author byline",
            "related articles"
          ]
        },
        "category-archive": {
          page: "Category / Archive",
          purpose: "Browse by topic",
          sections: [
            "filtered article list"
          ]
        },
        about: {
          page: "About",
          purpose: "Establish editorial credibility",
          sections: [
            "publication mission",
            "team/writers"
          ]
        },
        "subscribe-contact": {
          page: "Subscribe / Contact",
          purpose: "Grow audience",
          sections: [
            "newsletter signup",
            "contact form"
          ]
        }
      }
    },
    "membership-community": {
      id: "membership-community",
      name: "Membership / community",
      keywords: [
        "membership club",
        "community platform",
        "association",
        "forum",
        "fan club",
        "subscription community"
      ],
      audienceNote: "Prospective members deciding whether the community/benefits are worth joining, plus existing members needing access.",
      toneDefaults: [
        "belonging",
        "exclusive",
        "warm"
      ],
      conventions: [
        "Membership benefits clearly listed before asking for signup",
        "Join/sign-in CTA distinct from each other (new vs existing members)",
        "Social proof — member count, testimonials, community highlights",
        "Tiered pricing common if multiple membership levels exist"
      ],
      typicalPages: {
        home: {
          page: "Home",
          purpose: "Sell the value of belonging",
          sections: [
            "hero with value prop",
            "benefits overview",
            "member testimonials",
            "join CTA"
          ]
        },
        "membership-pricing": {
          page: "Membership / Pricing",
          purpose: "Compare tiers and convert",
          sections: [
            "tier comparison",
            "join CTA per tier"
          ]
        },
        "about-community": {
          page: "About / Community",
          purpose: "Show what membership feels like",
          sections: [
            "community story",
            "highlights/events"
          ]
        },
        "sign-in-member-portal": {
          page: "Sign In / Member Portal",
          purpose: "Serve existing members",
          sections: [
            "login",
            "member-only content teaser"
          ]
        },
        contact: {
          page: "Contact",
          purpose: "Answer questions",
          sections: [
            "contact form",
            "FAQ"
          ]
        }
      }
    },
    "documentation-developer": {
      id: "documentation-developer",
      name: "Documentation / developer",
      keywords: [
        "docs",
        "developer portal",
        "api reference",
        "technical documentation",
        "sdk",
        "open source project"
      ],
      audienceNote: "Developers or technical users looking to quickly find accurate reference information, not be marketed to.",
      toneDefaults: [
        "precise",
        "minimal",
        "no-nonsense"
      ],
      conventions: [
        "Navigation/search is the most important element — technical users need to find things fast",
        "Code examples shown prominently, often with syntax highlighting",
        "Getting-started path clearly separated from deep reference material",
        "Minimal marketing language — clarity over persuasion"
      ],
      typicalPages: {
        "home-landing": {
          page: "Home / Landing",
          purpose: "Orient new visitors quickly",
          sections: [
            "what this is in one line",
            "quickstart CTA",
            "key links"
          ]
        },
        "getting-started": {
          page: "Getting Started",
          purpose: "Get a developer to first success fast",
          sections: [
            "installation steps",
            "minimal working example"
          ]
        },
        "reference-api-docs": {
          page: "Reference / API Docs",
          purpose: "Serve as lookup reference",
          sections: [
            "searchable reference content",
            "code examples"
          ]
        },
        guides: {
          page: "Guides",
          purpose: "Deeper how-to content",
          sections: [
            "task-based guides"
          ]
        },
        "contact-community": {
          page: "Contact / Community",
          purpose: "Support and engagement",
          sections: [
            "community links",
            "support contact"
          ]
        }
      }
    }
  }
};

export default archetypesconfig;