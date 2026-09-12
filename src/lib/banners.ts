export type BannerType = "offer" | "sale" | "occasional" | "flash_drop";
export type BannerTheme = "sage" | "terracotta" | "gold" | "crimson" | "charcoal";

export interface PromoBanner {
  id: string;
  type: BannerType;
  badge: string;
  title: string;
  subtitle: string;
  discountTag: string;
  promoCode: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
  theme: BannerTheme;
  countdownHours?: number; // hours from now or fixed target
  expiryDate?: string;
  terms?: string;
  isActive: boolean;
  highlightStats?: { label: string; value: string }[];
}

export const INITIAL_BANNERS: PromoBanner[] = [
  {
    id: "banner-occasional-festive",
    type: "occasional",
    badge: "AVURUDU & EID FESTIVE DROP",
    title: "Festive Atelier Curation",
    subtitle:
      "Celebrate in contemporary heritage. Handloom sarongs, silk-blend kurtas, and structured oversized essentials tailored for tropical celebrations across Sri Lanka.",
    discountTag: "FLAT 25% OFF",
    promoCode: "FESTIVE25",
    buttonText: "Shop Festive Drop",
    buttonLink: "#latest",
    bgImage: "/images/symi-festive-ethnic-anarkali-dresses.jpg",
    theme: "sage",
    countdownHours: 48,
    terms: "*Valid sitewide on all festive and modern collections. Free islandwide express delivery included.",
    isActive: true,
    highlightStats: [
      { label: "Festive Discount", value: "25% OFF" },
      { label: "Islandwide Delivery", value: "24-48h" },
      { label: "Handcrafted Batches", value: "100%" },
    ],
  },
  {
    id: "banner-mid-season-sale",
    type: "sale",
    badge: "MID-SEASON ARCHIVE SALE",
    title: "Up To 40% Off Archive Drops",
    subtitle:
      "Strictly limited quantities from previous runway drops and signature heavyweight staples. Once warehouse allocations are depleted, they will not restock.",
    discountTag: "UP TO 40% OFF",
    promoCode: "ARCHIVE40",
    buttonText: "Explore Archive Sale",
    buttonLink: "#latest",
    bgImage: "/images/symi-balmain-paris-white-logo-tee.jpg",
    theme: "terracotta",
    countdownHours: 72,
    terms: "*Discount applied automatically or via coupon at checkout. All archive sales are final.",
    isActive: true,
    highlightStats: [
      { label: "Max Discount", value: "40% OFF" },
      { label: "Units Available", value: "Limited" },
      { label: "Authentic Quality", value: "100%" },
    ],
  },
  {
    id: "banner-weekend-bundle-offer",
    type: "offer",
    badge: "WEEKEND BUNDLE OFFER",
    title: "Buy 2 Get 15% Off Sitewide",
    subtitle:
      "Elevate your daily streetwear rotation. Combine any luxury polo, heavyweight tee, or statement handbag and unlock instant markdown.",
    discountTag: "BUY 2 SAVE 15%",
    promoCode: "SYMI15",
    buttonText: "Claim Bundle Deal",
    buttonLink: "#latest",
    bgImage: "/images/symi-armani-exchange-slate-blue-polo.jpg",
    theme: "gold",
    countdownHours: 36,
    terms: "*Add any 2 items to your cart to claim coupon markdown. Valid until Sunday midnight.",
    isActive: true,
    highlightStats: [
      { label: "Bundle Savings", value: "15% OFF" },
      { label: "Minimum Items", value: "2 Pieces" },
      { label: "Courier Support", value: "Direct" },
    ],
  },
  {
    id: "banner-beruwala-exclusive",
    type: "occasional",
    badge: "BERUWALA STUDIO SPECIAL",
    title: "Direct Studio Dispatch",
    subtitle:
      "Order before 2:00 PM for direct courier express delivery straight to your doorstep across Southern and Western provinces.",
    discountTag: "FREE EXPRESS SHIPPING",
    promoCode: "EXPRESSLK",
    buttonText: "Shop Studio Staples",
    buttonLink: "#latest",
    bgImage: "/images/symi-brand-street-campaign-event.jpg",
    theme: "charcoal",
    countdownHours: 24,
    terms: "*Applicable on all orders over Rs. 10,000. Express delivery across Sri Lanka.",
    isActive: false,
    highlightStats: [
      { label: "Delivery Speed", value: "Same-Day" },
      { label: "Threshold", value: "Rs. 10k+" },
      { label: "Live Tracking", value: "WhatsApp" },
    ],
  },
];

const STORAGE_KEY = "symi_admin_banners_v1";

export function getStoredBanners(): PromoBanner[] {
  if (typeof window === "undefined") return INITIAL_BANNERS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load banners from storage", e);
  }
  return INITIAL_BANNERS;
}

export function saveStoredBanners(banners: PromoBanner[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
    window.dispatchEvent(new Event("symi_banners_updated"));
  } catch (e) {
    console.error("Failed to save banners to storage", e);
  }
}
