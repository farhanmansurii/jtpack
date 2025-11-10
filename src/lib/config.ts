export type FeatureIcon =
  | "Leaf"
  | "PackageSearch"
  | "Recycle"
  | "CheckCircle2"
  | "FileText"
  | "Package"
  | "Shield"
  | "Snowflake"
  | "Globe"
  | "Layers"
  | "Factory"
  | "Boxes"
  | "FlaskConical"
  | "Truck";

export type SocialIcon = "Facebook" | "Twitter" | "Instagram" | "Linkedin";

export type ProductImage = {
  url: string;
  description: string;
};

export type Product = {
  category: string;
  title: string;
  subtitle: string;
  image: string | ProductImage[];
  features: string[];
  applications: string[];
  icon: FeatureIcon;
  ctaText: string;
  slug?: string;
};

export type Business = {
  title: string;
  icon: FeatureIcon;
  description: string;
  highlights: string[];
  badge: string;
  gradient: string;
  image: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
};

export type SocialLink = {
  icon: SocialIcon;
  label: string;
};

export type NavigationItem = {
  name: string;
  href: string;
};

// Hero Section Configuration
export const HERO_CONFIG = {
  media: {
    video: "/videos/placeholder.mp4",
    poster: "/images/placeholder.jpg",
  },
  badge: {
    variant: "secondary" as const,
    text: "Sustainable • Circular • Smart",
  },
  title: "Build circular packaging that scales",
  subtitle:
    "Modern tooling and workflows to reduce waste and improve reuse across your supply chain.",
  features: [
    { icon: "Leaf" as FeatureIcon, label: "Compostable and recycled materials" },
    { icon: "PackageSearch" as FeatureIcon, label: "End-to-end traceability" },
    { icon: "Recycle" as FeatureIcon, label: "Closed-loop logistics" },
    { icon: "CheckCircle2" as FeatureIcon, label: "Regulatory compliant" },
  ],
  cta: {
    primary: { text: "Get started", href: "/products" },
    secondary: { variant: "outline" as const, text: "Learn more", href: "/about" },
  },
};
// About Us Section Configuration

export const ABOUT_US_CONFIG = {
  badge: {
    variant: "secondary" as const,
    text: "About Us",
  },
  title: "Driving Sustainability in Recycling & Packaging",
  subtitle: "Precision. Sustainability. Industrial Excellence.",
  description: {
    first:
      "J T Pack Private Limited is a diversified industrial manufacturer and recycler, specializing in corrugated packaging, polymer granules, and multi-category scrap trading. Our product ecosystem bridges manufacturing, recycling, and material recovery — enabling sustainable value chains for India’s manufacturing, FMCG, logistics, and export sectors.",
    second:
      "With fully automated corrugation and polymer-processing facilities, we combine high-throughput production with stringent quality assurance. Our integrated recycling division ensures that waste and by-products are converted into reusable industrial inputs, driving India’s transition toward a closed-loop, resource-efficient economy.",
  },
  features: [
    {
      icon: "Factory" as FeatureIcon,
      label: "Automated Corrugation & Polymer Facilities",
    },
    {
      icon: "Boxes" as FeatureIcon,
      label: "Custom 3-Ply, 5-Ply & 7-Ply Packaging Solutions",
    },
    {
      icon: "FlaskConical" as FeatureIcon,
      label: "LD & Polyester Plastic Granule Manufacturing",
    },
    {
      icon: "Recycle" as FeatureIcon,
      label: "Comprehensive Scrap Recovery & Reuse Systems",
    },
  ],
  highlights: [
    {
      title: "Corrugation Division",
      points: [
        "Manufacturing of precision-cut corrugated boxes and sheets in multiple ply configurations (3-Ply, 5-Ply, 7-Ply)",
        "Automated machinery ensuring dimensional accuracy, edge-crush strength, and consistent GSM calibration",
        "Solutions tailored for e-commerce, FMCG, electronics, and logistics sectors",
        "Sustainable production cycles minimizing raw-paper waste and energy usage",
      ],
    },
    {
      title: "Polymer Granules Division",
      points: [
        "Production of LD, polyester, and pure-LD granules with controlled melt-flow and density parameters",
        "Formulations suited for extrusion, injection molding, and blow-molding processes",
        "Capability to customize color masterbatches, fillers, and additive blends",
        "Recycling-first approach with verified polymer sourcing and quality traceability",
      ],
    },
    {
      title: "Scrap Trading & Recycling",
      points: [
        "Nationwide collection and processing of paper, metal, and plastic scrap streams",
        "Transparent procurement network with competitive, fair-value exchange models",
        "Segregation, grading, and baling for high-efficiency material recovery",
        "Supporting industrial partners in achieving ESG and zero-waste compliance",
      ],
    },
  ],
  kpi: {
    label: "Recycled & Reused Material Share",
    value: "60%+ Annually",
  },
  values: [
    { stat: "Reliability", label: "Consistent Supply & Delivery Assurance" },
    { stat: "Integrity", label: "Ethical, Transparent Trade Operations" },
    { stat: "Innovation", label: "Continuous Process & Material R&D" },
  ],
  mission:
    "To provide reliable, cost-efficient, and eco-optimized materials that strengthen industrial supply chains while preserving environmental resources through innovation and circularity.",
  vision:
    "To establish J T Pack as India’s benchmark in integrated packaging and recycling — where corrugation, polymers, and scrap recovery unite to create a sustainable, closed-loop manufacturing ecosystem.",
  cta: {
    primary: { label: "Explore Our Divisions", href: "/divisions" },
    secondary: { label: "Contact Our Team", href: "/contact" },
  },
} as const;


// Dual Business Overview Configuration
export const DUAL_BUSINESS_CONFIG = {
  badge: {
    text: "Our Expertise",
    className: "bg-green-100 text-green-800",
  },
  title: "Dual Business Strengths",
  description:
    "Combining end-to-end recycling operations with industry-leading CFC packaging manufacturing to deliver sustainable, high-performance solutions.",
  businesses: [
    {
      title: "Granule Manufacturing",
      icon: "Recycle" as FeatureIcon,
      description:
        "Our LD Polyester and LD Coating Granules are the go-to solution for packaging, lamination, textiles, and industrial use. Consistency and sustainability.",
      highlights: [
        "High-strength polyester granules",
        "Adhesive-grade coating granules",
        "Eco-friendly production process",
        "Consistent melt-flow quality",
        "Custom additive formulations",
      ],
      badge: "Polymer Manufacturing",
      gradient: "from-green-500/10 via-white to-green-500/5",
      image: "/products/granules.webp",
    },
    {
      title: "Corrugated Fibreboard Carton (CFC) Packaging",
      icon: "Package" as FeatureIcon,
      description:
"Our CFC boxes deliver unmatched protection with 3, 5, and 7 PLY options. Designed with eco-conscious precision, they’re trusted across industries",
      highlights: ["3 PLY", "5 PLY", "7 PLY"],
      badge: "CFC Packaging",
      gradient: "from-blue-500/10 via-white to-blue-500/5",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop&auto=format",
    },
  ],

  cta: {
    title: "Ready to Partner with Us?",
    description:
      "From sustainable scrap sourcing to premium packaging solutions, we deliver excellence across the supply chain.",
    buttons: [
      { text: "Get Quote for Recycling", variant: "green" },
      { text: "Request CFC Samples", variant: "blue" },
    ],
  },
};

// Scrap and Packaging Section Configuration
export const SCRAP_AND_PACKAGING_CONFIG = {
  scrapMaterials: {
    badge: {
      text: "Recycling Division",
      className: "bg-green-100 text-green-800",
    },
    title: "Waste Materials Trading",
    description: null,
    products: [
      {
        category: "Paper Scrap",
        title: "Recycled Plastic Trading",
        subtitle: "High-quality paper waste processing and trading solutions",
        image: [
          {
            url: "/products/waste-materials-trading/recycled-plastic-trading/pure-ld.png",
            description: "Pure LD plastic granules - high quality recycled plastic material",
          },
          {
            url: "/products/waste-materials-trading/recycled-plastic-trading/ldpe.jpg",
            description: "LDPE (Low Density Polyethylene) - versatile plastic material for various applications",
          },
          {
            url: "/products/waste-materials-trading/recycled-plastic-trading/ldpe-film-rolls.jpg",
            description: "LDPE film rolls - premium quality film material for packaging and lamination",
          },
          {
            url: "/products/waste-materials-trading/recycled-plastic-trading/pp-coating-layers.webp",
            description: "PP Coating 2-3 Layers - multi-layer polypropylene coating material for industrial use",
          },
        ],
        features: ["Pure LD", "LD Coating", "LD Lamination", "PP Coating 2-3 Layers"],
        applications: ["Industrial Use", "Export Ready", "Quality Assured"],
        icon: "FileText" as FeatureIcon,
        ctaText: "Get Quote",
        slug: "recycled-plastic-trading",
      },
      {
        category: "Plastic Trading",
        title: "Waste Paper Trading",
        subtitle: "Specialized plastic waste management and recycling services",
        image: [
          {
            url: "/products/waste-materials-trading/recycled-paper-trading/duplex.webp",
            description: "Duplex paper - high quality recycled paper material",
          },
          {
            url: "/products/waste-materials-trading/recycled-paper-trading/lcc.webp",
            description: "LCC (Lineboard Corrugated Container) paper grade",
          },
          {
            url: "/products/waste-materials-trading/recycled-paper-trading/cyber-xl.webp",
            description: "Cyber XL paper - premium recycled paper grade",
          },
          {
            url: "/products/waste-materials-trading/recycled-paper-trading/pulp-board.webp",
            description: "Pulp board - high density recycled paper board",
          },
          {
            url: "/products/waste-materials-trading/recycled-paper-trading/pasting-kraft.webp",
            description: "Pasting kraft - strong kraft paper for lamination",
          },
        ],
        features: [
          "Duplex",
          "LCC",
          "Cyber XL",
          "Pulp Board",
          "Pasting Kraft",
          "Lamination",
          "Kraft",
          "...and many more",
        ],
        applications: ["Manufacturing", "Export Trade", "Eco-Friendly"],
        icon: "Recycle" as FeatureIcon,
        ctaText: "Get Quote",
        slug: "waste-paper-trading",
      },
      {
        category: "Alloy Trading",
        title: "Alloy Trading",
        subtitle: "Comprehensive metal scrap collection and processing",
        image: [
          {
            url: "/products/waste-materials-trading/alloy-trading/aluminium.webp",
            description: "Aluminium scrap - high quality recycled aluminium material for industrial use",
          },
          {
            url: "/products/waste-materials-trading/alloy-trading/copper.jpg",
            description: "Copper scrap - premium grade copper material for manufacturing and export",
          },
          {
            url: "/products/waste-materials-trading/alloy-trading/ss-steel.png",
            description: "Stainless Steel scrap - certified quality SS steel for industrial applications",
          },
          {
            url: "/products/waste-materials-trading/alloy-trading/brass.webp",
            description: "Brass scrap - high-grade brass material for various industrial uses",
          },
          {
            url: "/products/waste-materials-trading/alloy-trading/mixed-metals.jpg",
            description: "Mixed metals scrap - comprehensive metal collection and processing services",
          },
        ],
        features: ["Aluminium", "Copper", "SS Steel", "Metal", "Brass"],
        applications: ["Industrial Supply", "Export Ready", "Certified Quality"],
        icon: "Shield" as FeatureIcon,
        ctaText: "Get Quote",
        slug: "alloy-trading",
      },
    ],
    cta: {
      primary: "View All Materials",
      secondary: "Bulk Quote Request",
    },
  },
  packagingProducts: {
    badge: {
      text: "Manufacturing Division",
      className: "bg-blue-100 text-blue-800",
    },
    title: "Packaging Manufacturing",
    description:
      "Precision-engineered packaging solutions including corrugated boxes, CFC thermal insulation products, and export-grade custom solutions.",
    products: [
      {
        category: "Corrugated Boxes",
        title: "Industrial Corrugated Solutions",
        subtitle: "Durable packaging solutions for heavy-duty applications",
        image: [
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/3ply-boxes.webp",
            description: "3-Ply Construction - standard strength corrugated boxes for general packaging",
          },
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/5ply-boxes.webp",
            description: "5-Ply Heavy Duty - reinforced corrugated boxes for heavy-duty applications",
          },
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/7ply-boxes.webp",
            description: "7-Ply Extra Strong - maximum strength corrugated boxes for industrial use",
          },
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/boxes-manufacturing.webp",
            description: "Boxes Manufacturing - professional corrugated box production facility",
          },
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/cfc-desc.webp",
            description: "CFC Description - detailed information about corrugated fiberboard carton solutions",
          },
          {
            url: "/products/packaging-manufacturing/industrial-corrugated-solutions/cfc-industry.webp",
            description: "CFC Industry Solutions - corrugated fiberboard carton for industrial applications",
          },
        ],
        features: [
          "3-Ply Construction",
          "5-Ply Heavy Duty",
          "7-Ply Extra Strong",
          "Load Strength Tested",
        ],
        applications: ["Industrial Packaging", "Export Ready", "Custom Sizing"],
        icon: "Package" as FeatureIcon,
        ctaText: "Get Quote",
        slug: "industrial-corrugated-solutions",
      },
      {
        category: "CFC Boxes",
        title: "Thermal Insulation Packaging",
        subtitle: "Advanced temperature-controlled packaging solutions",
        image: [
          {
            url: "/products/packaging-manufacturing/thermal-insulation-packaging/thermal-boxes.webp",
            description: "Thermal Boxes - temperature-controlled packaging solutions for sensitive products",
          },
          {
            url: "/products/packaging-manufacturing/thermal-insulation-packaging/thermal-box-2.png",
            description: "Thermal Insulation Box - advanced temperature-regulated packaging with insulated core",
          },
          {
            url: "/products/packaging-manufacturing/thermal-insulation-packaging/thermal-precision-fit.jpg",
            description: "Precision Fit - custom-sized thermal packaging for optimal product protection",
          },
          {
            url: "/products/packaging-manufacturing/thermal-insulation-packaging/temperature-controlled-distribution-boxes.webp",
            description: "Temperature Controlled Distribution Boxes - specialized packaging maintaining consistent temperature during shipping",
          },
        ],
        features: [
          "Controlled Foam Core",
          "Shock Protection",
          "Precision Fit",
          "Temperature Control",
        ],
        applications: ["Pharmaceutical", "Food Industry", "Electronics"],
        icon: "Snowflake" as FeatureIcon,
        ctaText: "Get Quote",
        slug: "thermal-insulation-packaging",
      },
      // {
      //   category: "Export Packaging",
      //   title: "International Export Solutions",
      //   subtitle: "Global-standard packaging for international trade",
      //   image: [
      //     {
      //       url: "/products/packaging-manufacturing/international-export-solutions/global-standards.webp",
      //       description: "Global Standards Compliance - packaging meeting international quality standards",
      //     },
      //     {
      //       url: "/products/packaging-manufacturing/international-export-solutions/incoterms-ready.webp",
      //       description: "Incoterms Ready - export packaging compliant with international trade terms",
      //     },
      //     {
      //       url: "/products/packaging-manufacturing/international-export-solutions/multi-currency.webp",
      //       description: "Multi-Currency Support - packaging solutions for global trade operations",
      //     },
      //     {
      //       url: "/products/packaging-manufacturing/international-export-solutions/documentation.webp",
      //       description: "Documentation - complete export documentation and labeling services",
      //     },
      //   ],
      //   features: [
      //     "Global Standards Compliance",
      //     "Incoterms Ready",
      //     "Multi-Currency Support",
      //     "Documentation",
      //   ],
      //   applications: ["International Trade", "Export Compliance", "Global Shipping"],
      //   icon: "Globe" as FeatureIcon,
      //   ctaText: "Get Quote",
      //   slug: "international-export-solutions",
      // },
    ],
    cta: {
      primary: "View All Packaging",
      secondary: "Custom Quote Request",
    },
  },
};
// Footer Section Configuration
export const FOOTER_CONFIG = {
  company: {
    name: "JTPack",
    description:
      "Leading provider of scrap trading and packaging solutions, committed to sustainable business practices and exceptional service.",
    badges: ["Trusted", "Sustainable"],
  },
  quickLinks: ["About Us", "Services", "Products", "Contact"],
  services: ["Scrap Trading", "Packaging Solutions", "Metal Processing", "Recycling"],
  contact: {
    title: "Get in Touch",
    description: "Ready to start your project?",
    phone: "+91 9930496506",
    email: "info@jtpack.com",
    address: "Plot No. 57/A/1 & 2, 1st Phase Industrial Road, G.I.D.C., Vapi - 396 195, Gujarat",
  },
  socialLinks: [
    { icon: "Facebook" as SocialIcon, label: "Facebook" },
    { icon: "Twitter" as SocialIcon, label: "Twitter" },
    { icon: "Instagram" as SocialIcon, label: "Instagram" },
    { icon: "Linkedin" as SocialIcon, label: "LinkedIn" },
  ],
  legal: ["Privacy Policy", "Terms of Service"],
};

// Navbar Configuration
export const LOGO_COLORS = {
  light: {
    primary: "#3D670C", // Green - main logo color
    secondary: "#2D4A08", // Darker green for accents
    text: "#1A2E05", // Dark green for text elements
    background: "#FFFFFF", // White background
    accent: "#5A8A1A", // Lighter green for highlights
  },
  dark: {
    primary: "#7DD87D", // Light green for dark mode
    secondary: "#5AB85A", // Medium green for accents
    text: "#B8E6B8", // Light green for text elements
    background: "#0A0A0A", // Dark background
    accent: "#9EE89E", // Bright green for highlights
  },
} as const;

export const NAVBAR_CONFIG = {
  logo: {
    text: "JTPack",
    badge: "Trusted",
    image: "/svgviewer-inherit.svg",
    colors: LOGO_COLORS,
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "/products" },
  ],
  cta: {
    primary: { text: "Get a Quote", href: "#contact" },
  },
};
