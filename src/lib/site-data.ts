export type NavItem = {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export type Product = {
  model: string;
  brand: "Sub-Zero" | "Wolf";
  category: string;
  series: string;
  type: string;
  width?: string;
  finish?: string;
  status: "active" | "draft" | "archived";
  stock: number;
  reserved: number;
  image: string;
};

export type JournalPost = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  status: "published" | "draft";
  image: string;
};

export const heroVideo =
  "https://videos.pexels.com/video-files/5827774/5827774-uhd_2560_1440_24fps.mp4";

export const imageLibrary = {
  kitchenDark:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=85",
  refrigeration:
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=85",
  cooking:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=85",
  outdoor:
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=85",
  showroom:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=85",
  wine:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85",
};

export const mainNavigation: NavItem[] = [
  {
    title: "Refrigeration",
    href: "/products/refrigeration",
    description: "Sub-Zero preservation, wine, and undercounter systems.",
    children: [
      { title: "Discover Sub-Zero", href: "/products/refrigeration/discover-sub-zero" },
      { title: "Classic Series", href: "/products/refrigeration/classic-series" },
      { title: "Designer Series", href: "/products/refrigeration/designer-series" },
      { title: "Pro Series", href: "/products/refrigeration/pro-series" },
      { title: "Wine Preservation", href: "/products/refrigeration/wine-preservation" },
      { title: "Undercounter", href: "/products/refrigeration/undercounter" },
    ],
  },
  {
    title: "Cooking",
    href: "/products/cooking",
    description: "Wolf performance for refined indoor and outdoor kitchens.",
    children: [
      { title: "Discover Wolf", href: "/products/cooking/discover-wolf" },
      {
        title: "Ranges",
        href: "/products/cooking/ranges",
        children: [
          { title: "Induction Ranges", href: "/products/cooking/induction-ranges" },
          { title: "Dual Fuel Ranges", href: "/products/cooking/dual-fuel-ranges" },
        ],
      },
      {
        title: "Built-In Ovens",
        href: "/products/cooking/built-in-ovens",
        children: [
          { title: "M Series Ovens", href: "/products/cooking/m-series-ovens" },
          { title: "E Series Ovens", href: "/products/cooking/e-series-ovens" },
          { title: "Convection Steam Ovens", href: "/products/cooking/convection-steam-ovens" },
          { title: "Combi-Microwaves with Grill", href: "/products/cooking/combi-microwaves-with-grill" },
        ],
      },
      {
        title: "Cooktops & Rangetops",
        href: "/products/cooking/cooktops-rangetops",
        children: [
          { title: "Module Cooktops - Gas", href: "/products/cooking/module-cooktops-gas" },
          { title: "Module Cooktops - Induction", href: "/products/cooking/module-cooktops-induction" },
          { title: "Induction Cooktops", href: "/products/cooking/induction-cooktops" },
          { title: "Gas Cooktops", href: "/products/cooking/gas-cooktops" },
          { title: "Sealed Burner Rangetops", href: "/products/cooking/sealed-burner-rangetops" },
        ],
      },
      {
        title: "Ventilation",
        href: "/products/cooking/ventilation",
        children: [
          { title: "Cooktop Ventilation", href: "/products/cooking/cooktop-ventilation" },
          { title: "Pro Ventilation", href: "/products/cooking/pro-ventilation" },
        ],
      },
      {
        title: "Warming Drawers",
        href: "/products/cooking/warming-drawers",
        children: [
          { title: "Warming Drawer", href: "/products/cooking/warming-drawer" },
          { title: "Vacuum Seal Drawer", href: "/products/cooking/vacuum-seal-drawer" },
        ],
      },
      { title: "Coffee Systems", href: "/products/cooking/coffee-systems" },
      {
        title: "Module Cooktops",
        href: "/products/cooking/module-cooktops",
        children: [
          { title: "Module Cooktops - Gas", href: "/products/cooking/module-cooktops-gas" },
          { title: "Module Cooktops - Induction", href: "/products/cooking/module-cooktops-induction" },
        ],
      },
      {
        title: "Outdoor & Built-In Grills",
        href: "/products/cooking/outdoor-grills",
        children: [
          { title: "Outdoor Gas Grills and Modules", href: "/products/cooking/outdoor-gas-grills-and-modules" },
        ],
      },
      { title: "Vacuum Seal Drawer", href: "/products/cooking/vacuum-seal-drawer" },
    ],
  },
  {
    title: "Outdoor",
    href: "/products/outdoor",
    description: "Appliances for complete open-air kitchens.",
    children: [{ title: "Discover Outdoor", href: "/products/outdoor/discover-outdoor" }],
  },
  {
    title: "Owners",
    href: "/support",
    description: "Product information, care guides, warranty, and support.",
    children: [
      { title: "Product Information", href: "/support/product-information" },
      { title: "Accessories", href: "/support/accessories" },
      { title: "Recipes", href: "/journal/recipes" },
      { title: "Use and Care Videos", href: "/support/videos" },
      {
        title: "Warranty Information",
        href: "/support/warranty",
        children: [
          { title: "Sub-Zero", href: "/support/warranty/sub-zero" },
          { title: "Wolf", href: "/support/warranty/wolf" },
        ],
      },
      { title: "Product Support", href: "/support/product-support" },
      { title: "Owner Technique Guide", href: "/support/owner-technique-guide" },
      {
        title: "Customer Care",
        href: "/support/customer-care",
        children: [
          { title: "Thailand", href: "/support/customer-care/thailand" },
          { title: "Indonesia", href: "/support/customer-care/indonesia" },
          { title: "Singapore", href: "/support/customer-care/singapore" },
          { title: "Malaysia", href: "/support/customer-care/malaysia" },
        ],
      },
    ],
  },
  {
    title: "Professionals",
    href: "/trade",
    description: "Specification library, brochures, and design resources.",
    children: [
      { title: "Specification Library", href: "/trade/specification-library" },
      { title: "Brochure", href: "/trade/brochure" },
      { title: "Future Products", href: "/trade/future-products" },
      { title: "Kitchen Design Contest", href: "/trade/kitchen-design-contest" },
    ],
  },
  {
    title: "Journal & Culinary",
    href: "/journal",
    description: "Recipes, kitchen stories, and regional inspiration.",
    children: [
      {
        title: "Recipes",
        href: "/journal/recipes",
        children: [
          { title: "Sub-Zero & Wolf Kitchen", href: "/journal/sub-zero-wolf-kitchen" },
          { title: "Southeast Asia Secret", href: "/journal/southeast-asia-secret" },
        ],
      },
      { title: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Regional Experience",
    href: "/showroom",
    description: "Showrooms, appointments, and authorized dealers.",
    children: [
      { title: "Showroom Appointment", href: "/showroom/appointment" },
      { title: "House of Sub-Zero & Wolf Thailand", href: "/showroom/thailand" },
      { title: "House of Sub-Zero & Wolf Singapore", href: "/showroom/singapore" },
      {
        title: "House of Sub-Zero & Wolf Indonesia",
        href: "/showroom/indonesia",
        children: [
          { title: "Indonesia Design District", href: "/showroom/indonesia/design-district" },
          { title: "Jakarta Design Center", href: "/showroom/indonesia/jakarta-design-center" },
        ],
      },
      {
        title: "Dealers",
        href: "/showroom/dealers",
        children: [
          { title: "Authorized Dealers Bangkok", href: "/showroom/dealers/thailand/bangkok" },
          { title: "Authorized Dealers Phuket", href: "/showroom/dealers/thailand/phuket" },
          { title: "Authorized Dealers Indonesia", href: "/showroom/dealers/indonesia" },
          { title: "Authorized Dealers Singapore", href: "/showroom/dealers/singapore" },
          { title: "Authorized Dealers Malaysia", href: "/showroom/dealers/malaysia" },
        ],
      },
    ],
  },
  {
    title: "Our Story",
    href: "/our-story",
    description: "Heritage, milestones, and sustainability.",
    children: [
      { title: "The Sub-Zero Story", href: "/our-story/sub-zero-story" },
      { title: "Company Milestones", href: "/our-story/company-milestones" },
      { title: "Sustainability", href: "/our-story/sustainability" },
    ],
  },
];

export const products: Product[] = [
  {
    model: "ICBCL3650RID",
    brand: "Sub-Zero",
    category: "Refrigeration",
    series: "Classic Series Refrigeration",
    type: "Column Refrigeration",
    width: "91 cm",
    finish: "Panel Ready",
    status: "active",
    stock: 8,
    reserved: 2,
    image: imageLibrary.refrigeration,
  },
  {
    model: "ICBCL4850SID",
    brand: "Sub-Zero",
    category: "Refrigeration",
    series: "Classic Series Refrigeration",
    type: "Side-by-Side",
    width: "122 cm",
    finish: "Stainless",
    status: "active",
    stock: 5,
    reserved: 1,
    image: imageLibrary.refrigeration,
  },
  {
    model: "ICBPRO4850G",
    brand: "Sub-Zero",
    category: "Refrigeration",
    series: "Pro Series Refrigeration",
    type: "Glass Door Refrigerator",
    width: "122 cm",
    finish: "Stainless",
    status: "active",
    stock: 3,
    reserved: 0,
    image: imageLibrary.refrigeration,
  },
  {
    model: "ICBDEC3050W",
    brand: "Sub-Zero",
    category: "Refrigeration",
    series: "Wine Storage",
    type: "Wine Preservation",
    width: "76 cm",
    finish: "Panel Ready",
    status: "active",
    stock: 11,
    reserved: 4,
    image: imageLibrary.wine,
  },
  {
    model: "ICBSO3050TM/S/T",
    brand: "Wolf",
    category: "Cooking",
    series: "M Series Ovens",
    type: "Built-In Oven",
    width: "76 cm",
    finish: "Stainless",
    status: "active",
    stock: 7,
    reserved: 1,
    image: imageLibrary.cooking,
  },
  {
    model: "ICBCSO3050TE/S/T",
    brand: "Wolf",
    category: "Cooking",
    series: "Convection Steam Ovens",
    type: "Steam Oven",
    width: "76 cm",
    finish: "Stainless",
    status: "active",
    stock: 9,
    reserved: 2,
    image: imageLibrary.cooking,
  },
  {
    model: "ICBDF48650G/S/P",
    brand: "Wolf",
    category: "Cooking",
    series: "Dual Fuel Ranges",
    type: "Range",
    width: "122 cm",
    finish: "Stainless",
    status: "active",
    stock: 2,
    reserved: 1,
    image: imageLibrary.cooking,
  },
  {
    model: "ICBOG42",
    brand: "Wolf",
    category: "Outdoor",
    series: "Outdoor Gas Grills and Modules",
    type: "Outdoor Grill",
    width: "107 cm",
    finish: "Stainless",
    status: "active",
    stock: 6,
    reserved: 0,
    image: imageLibrary.outdoor,
  },
];

export const journalPosts: JournalPost[] = [
  {
    title: "Designing a kitchen around preservation and precision",
    slug: "designing-around-preservation-and-precision",
    category: "Journal",
    excerpt:
      "A planning guide for pairing Sub-Zero freshness with Wolf cooking control in Southeast Asian homes.",
    status: "published",
    image: imageLibrary.kitchenDark,
  },
  {
    title: "What to expect from a showroom appointment",
    slug: "what-to-expect-from-showroom-appointment",
    category: "Regional Experience",
    excerpt:
      "How consultants guide owners, designers, and trade professionals from inspiration to specification.",
    status: "draft",
    image: imageLibrary.showroom,
  },
  {
    title: "Wine preservation basics for tropical climates",
    slug: "wine-preservation-basics-tropical-climates",
    category: "Recipes",
    excerpt:
      "Temperature, humidity, and vibration details that protect treasured collections.",
    status: "published",
    image: imageLibrary.wine,
  },
];

export const showrooms = [
  {
    country: "Thailand",
    name: "House of Sub-Zero & Wolf Thailand",
    city: "Bangkok",
    email: "thailand-showroom@example.com",
  },
  {
    country: "Singapore",
    name: "House of Sub-Zero & Wolf Singapore",
    city: "Singapore",
    email: "singapore-showroom@example.com",
  },
  {
    country: "Indonesia",
    name: "House of Sub-Zero & Wolf Indonesia",
    city: "Jakarta",
    email: "indonesia-showroom@example.com",
  },
  {
    country: "Malaysia",
    name: "Authorized Dealer Network Malaysia",
    city: "Kuala Lumpur",
    email: "malaysia-showroom@example.com",
  },
];

export const adminModules = [
  {
    title: "Posts",
    description: "WordPress-like editorial workflow with categories, SEO, and AEO blocks.",
    count: journalPosts.length,
  },
  {
    title: "Products",
    description: "WooCommerce-like catalog management without checkout.",
    count: products.length,
  },
  {
    title: "Inventory",
    description: "Backend-only stock, reserved quantities, and stock movement history.",
    count: products.reduce((total, product) => total + product.stock, 0),
  },
  {
    title: "Appointments",
    description: "Country-routed showroom appointment inbox for SEA teams.",
    count: 12,
  },
  {
    title: "SEO / AEO",
    description: "Metadata, schema, FAQ answers, redirects, and sitemap visibility.",
    count: 31,
  },
];
