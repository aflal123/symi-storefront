// ---------------------------------------------------------------
// Everything the store can edit lives here: brand details, nav,
// products, stats, orders. One file, no CMS yet.
// ---------------------------------------------------------------

export const SYMI_ECOMMERCE_URL = process.env.NEXT_PUBLIC_SYMI_ECOMMERCE_URL || "https://symi.lk";

export const BRAND = {
  name: "SYMI",
  season: "FW26",
  tagline: "Rooted in culture. Made for now.",
  city: "Colombo, Sri Lanka",
  studios: "Colombo // Beruwala",
  email: "hello@symi.lk",
  whatsapp: "94770000000",
  instagram: "https://instagram.com",
  freeShippingOver: 15000,
  heroVideo: {
    mp4: "/videos/hero.mp4",
    title: "FW26 Campaign Reel",
    subtitle: "Colombo // Archive Lookbook 01",
  },
} as const;

export const NAV = ["Men", "Women", "Accessories", "Perfumes", "Household", "New Arrivals", "Sale"] as const;

export const SUBNAV = [
  "Men",
  "Women",
  "Accessories",
  "Perfumes",
  "Household",
  "New Arrivals",
  "Collections",
] as const;

export type ArtKind =
  | "tee"
  | "polo"
  | "jacket"
  | "overshirt"
  | "hoodie"
  | "kamis"
  | "dress"
  | "pant"
  | "cap"
  | "bandana"
  | "tote";

export type ProductCategory = "men" | "women" | "unisex" | "accessories" | "perfumes" | "household";

export type Product = {
  id: number;
  name: string;
  cat: ProductCategory;
  art: ArtKind;
  price: number;
  was: number | null;
  tag: string | null;
  note: string;
  image: string;
  images: string[];
  latest?: boolean;
  arrival?: boolean;
  handloom?: boolean;
  seedCart?: boolean;
};

export type Category = {
  key: ProductCategory;
  name: string;
  note: string;
  art: string;
  image?: string | null;
};

export type OrderStatus = "Pending" | "Paid" | "Processing" | "Shipped" | "Delivered";

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  email: string;
  address: string;
  city: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};

export const CATEGORIES: Category[] = [
  { key: "men", name: "Men", note: "01 — Structured staples & shirts", art: "figA", image: "/images/symi-balmain-paris-white-logo-tee.jpg" },
  { key: "women", name: "Women", note: "02 — Draped & tailored eveningwear", art: "figB", image: "/images/symi-festive-ethnic-anarkali-dresses.jpg" },
  { key: "accessories", name: "Accessories", note: "03 — Fine jewelry & handcrafted clutches", art: "still", image: "/images/symi-gemstone-multi-strand-saree-necklace.jpg" },
  { key: "perfumes", name: "Perfumes", note: "04 — Signature EDP scents & skincare", art: "perfume", image: "/images/symi-lattafa-maahir-black-perfume.jpg" },
  { key: "household", name: "Household", note: "05 — Objects, living & handloom", art: "household", image: "/images/symi-handloom-sarong-orange-pink.jpg" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "SYMI Gemstone Multi-Strand Saree Necklace",
    cat: "accessories",
    art: "bandana",
    price: 14500,
    was: 18000,
    tag: "Fine Jewelry",
    note: "Multi-strand faceted gemstone necklace hand-crafted for saree & eveningwear elegance.",
    image: "/images/symi-gemstone-multi-strand-saree-necklace.jpg",
    images: [
      "/images/symi-gemstone-multi-strand-saree-necklace.jpg",
      "/images/symi-chandelier-gemstone-choker-necklace.jpg",
      "/images/symi-silver-multi-gemstone-bracelet.jpg"
    ],
    latest: true,
    arrival: true,
    handloom: false,
    seedCart: true,
  },
  {
    id: 2,
    name: "CeraVe Facial Cleansers Trio Care Set",
    cat: "perfumes",
    art: "tote",
    price: 7850,
    was: 9200,
    tag: "Skincare",
    note: "Foaming Cleanser, Hydrating Cleansing Oil & Acne Control 2% Salicylic Acid Cleanser.",
    image: "/images/symi-cerave-cleansers-trio-set.jpg",
    images: [
      "/images/symi-cerave-cleansers-trio-set.jpg",
      "/images/champagne-gold-botanical-orchid-body-wash-194.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: false,
    seedCart: true,
  },
  {
    id: 3,
    name: "SYMI Handcrafted Silver Multi-Gemstone Bracelet",
    cat: "accessories",
    art: "bandana",
    price: 9850,
    was: 12500,
    tag: "Trending",
    note: "Hand-set faceted ruby, sapphire, topaz & peridot silver link bracelet in red velvet gift box.",
    image: "/images/symi-silver-multi-gemstone-bracelet.jpg",
    images: [
      "/images/symi-silver-multi-gemstone-bracelet.jpg",
      "/images/symi-garnet-amethyst-oval-gemstone-bracelet.jpg",
      "/images/symi-silver-gemstone-tennis-bracelet.jpg"
    ],
    latest: true,
    arrival: true,
    handloom: false,
  },
  {
    id: 4,
    name: "SYMI Garnet & Amethyst Oval Gemstone Bracelet",
    cat: "accessories",
    art: "bandana",
    price: 11200,
    was: null,
    tag: "Exclusive",
    note: "Faceted garnet & deep amethyst sterling silver oval link bracelet in presentation velvet box.",
    image: "/images/symi-garnet-amethyst-oval-gemstone-bracelet.jpg",
    images: [
      "/images/symi-garnet-amethyst-oval-gemstone-bracelet.jpg",
      "/images/symi-silver-multi-gemstone-bracelet.jpg"
    ],
    latest: false,
    arrival: true,
    handloom: false,
  },
  {
    id: 5,
    name: "Lattafa Bint Hooran Eau De Parfum (100ml)",
    cat: "perfumes",
    art: "bandana",
    price: 9500,
    was: 11500,
    tag: "Best Seller",
    note: "Sensual oriental gourmand EDP with almond, tuberose, jasmine & dark vanilla notes.",
    image: "/images/symi-lattafa-bint-hooran-perfume.jpg",
    images: [
      "/images/symi-lattafa-bint-hooran-perfume.jpg",
      "/images/symi-lattafa-maahir-black-perfume.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: false,
  },
  {
    id: 6,
    name: "SYMI Chandelier Gemstone Choker Necklace",
    cat: "accessories",
    art: "bandana",
    price: 16500,
    was: 21000,
    tag: "Luxury",
    note: "Statement chandelier choker necklace hand-set with multi-cut precious stones.",
    image: "/images/symi-chandelier-gemstone-choker-necklace.jpg",
    images: [
      "/images/symi-chandelier-gemstone-choker-necklace.jpg",
      "/images/symi-gemstone-multi-strand-saree-necklace.jpg"
    ],
    latest: false,
    arrival: true,
    handloom: false,
  },
  {
    id: 7,
    name: "Tommy Hilfiger Emerald Green Graphic Tee",
    cat: "men",
    art: "tee",
    price: 6950,
    was: null,
    tag: "New",
    note: "Hilfiger MC MLXXXV colorblock emerald green crewneck tee.",
    image: "/images/symi-tommy-hilfiger-green-tee.jpg",
    images: [
      "/images/symi-tommy-hilfiger-green-tee.jpg",
      "/images/symi-balmain-paris-white-logo-tee.jpg"
    ],
    latest: true,
    arrival: true,
    handloom: false,
  },
  {
    id: 8,
    name: "SYMI Beige Braided Platform Sandals",
    cat: "women",
    art: "bandana",
    price: 4250,
    was: 5200,
    tag: "Sale",
    note: "Platform comfort sandals with intricate beige braided strap design.",
    image: "/images/symi-beige-braided-platform-sandals.jpg",
    images: [
      "/images/symi-beige-braided-platform-sandals.jpg",
      "/images/symi-pink-cross-strap-comfort-slides.jpg"
    ],
    latest: false,
    arrival: false,
    handloom: false,
  },
  {
    id: 9,
    name: "Adorable Pour Femme Eau De Parfum (100ml)",
    cat: "perfumes",
    art: "bandana",
    price: 6450,
    was: null,
    tag: "Popular",
    note: "Feminine floral & fruity gourmand EDP fragrance in vintage script box.",
    image: "/images/symi-adorable-pour-femme-perfume.jpg",
    images: [
      "/images/symi-adorable-pour-femme-perfume.jpg"
    ],
    latest: false,
    arrival: true,
    handloom: false,
  },
  {
    id: 10,
    name: "Armani Exchange Slate Blue Graphic Polo",
    cat: "men",
    art: "polo",
    price: 8450,
    was: 9800,
    tag: "Sale",
    note: "A|X slate blue cotton pique polo shirt with bold chest graphic print.",
    image: "/images/symi-armani-exchange-slate-blue-polo.jpg",
    images: [
      "/images/symi-armani-exchange-slate-blue-polo.jpg",
      "/images/symi-armani-exchange-pique-polo-black.jpg",
      "/images/symi-armani-exchange-pique-polo-green.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: false,
  },
  {
    id: 11,
    name: "SYMI Dior-Style Lime Green Embossed Slides",
    cat: "women",
    art: "bandana",
    price: 3950,
    was: null,
    tag: "Trending",
    note: "Lime green embossed woven-texture slip-on sandals.",
    image: "/images/symi-dior-style-lime-green-slides.jpg",
    images: [
      "/images/symi-dior-style-lime-green-slides.jpg"
    ],
    latest: false,
    arrival: true,
    handloom: false,
  },
  {
    id: 12,
    name: "Mousuf Eau De Parfum (100ml) with Woven Jute Bag",
    cat: "perfumes",
    art: "bandana",
    price: 8950,
    was: null,
    tag: "Gift",
    note: "Rich oriental woody oud fragrance presented in authentic burlap jute pouch.",
    image: "/images/symi-mousuf-eau-de-parfum-jute-bag.jpg",
    images: [
      "/images/symi-mousuf-eau-de-parfum-jute-bag.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: false,
  },
  {
    id: 13,
    name: "Disney Stitch LED Flexible Mini Desk Lamp & Bonsai",
    cat: "household",
    art: "bandana",
    price: 2450,
    was: 3200,
    tag: "Decor",
    note: "Rechargeable Disney Stitch flexible desk light with artificial bonsai planter.",
    image: "/images/symi-stitch-led-desk-lamp-bonsai.jpg",
    images: [
      "/images/symi-stitch-led-desk-lamp-bonsai.jpg"
    ],
    latest: false,
    arrival: false,
    handloom: false,
  },
  {
    id: 14,
    name: "SYMI Balmain Paris White Logo Tee",
    cat: "men",
    art: "tee",
    price: 7850,
    was: 9500,
    tag: "Trending",
    note: "Signature Balmain Paris white crewneck tee with branded shoulder taping.",
    image: "/images/symi-balmain-paris-white-logo-tee.jpg",
    images: [
      "/images/symi-balmain-paris-white-logo-tee.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: false,
  },
  {
    id: 15,
    name: "SYMI Black Beaded & Crystal Striped Evening Clutch",
    cat: "women",
    art: "tote",
    price: 6750,
    was: 8500,
    tag: "Handcrafted",
    note: "Hand-beaded black evening purse featuring vertical crystal rhinestone stripes & gold clasp.",
    image: "/images/black-beaded-stripe-clutch.jpg",
    images: [
      "/images/black-beaded-stripe-clutch.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: true,
  },
  {
    id: 16,
    name: "SYMI Black Heart Glitter Clutch with Gold Tassel",
    cat: "women",
    art: "tote",
    price: 7250,
    was: null,
    tag: "Exclusive",
    note: "Sculpted heart-shaped black glitter clutch with luxury gold crystal chain tassel.",
    image: "/images/black-heart-tassel-clutch.jpg",
    images: [
      "/images/black-heart-tassel-clutch.jpg"
    ],
    latest: true,
    arrival: true,
    handloom: false,
  },
  {
    id: 17,
    name: "Decency Traditional Sri Lankan Handloom Sarong",
    cat: "household",
    art: "kamis",
    price: 4950,
    was: null,
    tag: "Handloom",
    note: "100% woven cotton traditional Sri Lankan sarong in orange & pink presentation gift box.",
    image: "/images/symi-handloom-sarong-orange-pink.jpg",
    images: [
      "/images/symi-handloom-sarong-orange-pink.jpg",
      "/images/symi-handloom-sarong-pink-magenta.jpg",
      "/images/symi-handloom-sarong-yellow-magenta.jpg"
    ],
    latest: true,
    arrival: false,
    handloom: true,
  },
  {
    id: 18,
    name: "SYMI Festive Ethnic Anarkali Kurti Collection",
    cat: "women",
    art: "dress",
    price: 8950,
    was: 11500,
    tag: "Festive",
    note: "Draped ethnic festive dresses with intricate neck embroidery & matching dupattas.",
    image: "/images/symi-festive-ethnic-anarkali-dresses.jpg",
    images: [
      "/images/symi-festive-ethnic-anarkali-dresses.jpg"
    ],
    latest: true,
    arrival: true,
    handloom: false,
  }
];

export const STATS = [
  { value: 2, suffix: "", label: "Studios (Colombo // Beruwala)" },
  { value: 100, suffix: "%", label: "Curated Craftsmanship" },
  { value: 24, suffix: "h", label: "Islandwide Dispatch" },
] as const;

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-9481",
    customerName: "Kasun Jayawardena",
    customerPhone: "+94 77 123 4567",
    email: "kasun@gmail.com",
    address: "45 Galle Road, Bambalapitiya",
    city: "Colombo 04",
    total: 16100,
    status: "Shipped",
    createdAt: "2026-09-12 14:30",
    items: [
      { id: 1, name: "SYMI Gemstone Multi-Strand Saree Necklace", price: 14500, qty: 1, image: "/images/symi-gemstone-multi-strand-saree-necklace.jpg" },
      { id: 3, name: "SYMI Handcrafted Silver Multi-Gemstone Bracelet", price: 9850, qty: 1, image: "/images/symi-silver-multi-gemstone-bracelet.jpg" },
    ],
  },
  {
    id: "ORD-9482",
    customerName: "Dilini Perera",
    customerPhone: "+94 71 987 6543",
    email: "dilini.p@yahoo.com",
    address: "12 Beach Road",
    city: "Beruwala",
    total: 7850,
    status: "Processing",
    createdAt: "2026-09-12 15:15",
    items: [
      { id: 2, name: "CeraVe Facial Cleansers Trio Care Set", price: 7850, qty: 1, image: "/images/symi-cerave-cleansers-trio-set.jpg" },
    ],
  },
  {
    id: "ORD-9483",
    customerName: "Mohomed Rizwan",
    customerPhone: "+94 76 555 8899",
    email: "rizwan@outlook.com",
    address: "88 Main Street",
    city: "Colombo 11",
    total: 8950,
    status: "Pending",
    createdAt: "2026-09-12 16:45",
    items: [
      { id: 18, name: "SYMI Festive Ethnic Anarkali Kurti Collection", price: 8950, qty: 1, image: "/images/symi-festive-ethnic-anarkali-dresses.jpg" },
    ],
  },
];

export function money(n: number): string {
  return `LKR ${n.toLocaleString()}`;
}

export const INSTAGRAM = [
  "/images/instagram-champagne-satin-rosette-clutch.jpg",
  "/images/instagram-fruiser-lavender-scrub.jpg",
  "/images/instagram-gold-heart-tassel-clutch.jpg",
  "/images/instagram-lux-body-wash-orchid.jpg",
  "/images/instagram-pink-satin-rosette-clutch.jpg",
  "/images/instagram-skincare-gift-set.jpg",
  "/images/symi-brand-street-campaign-event.jpg",
];
