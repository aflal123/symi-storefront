"use client";

import { useState } from "react";
import {
  X,
  Package,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  Boxes,
  Eye,
  BarChart3,
  MapPin,
  Zap,
  Check,
  LayoutDashboard,
  Users,
  Settings,
  ArrowUpRight,
  ChevronRight,
  Bell,
  CircleDot,
  Store,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Megaphone,
  Flame,
  Gift,
  Percent,
  Tag,
  Trash2,
  Edit3,
  Power,
  Copy,
} from "lucide-react";
import { cn } from "cn";
import {
  money,
  INITIAL_ORDERS,
  PRODUCTS,
  type Order,
  type OrderStatus,
  type Product,
} from "@/lib/site";
import {
  type PromoBanner,
  type BannerType,
  type BannerTheme,
  getStoredBanners,
  saveStoredBanners,
} from "@/lib/banners";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PRESET_STORE_IMAGES = [
  { url: "/images/symi-gemstone-multi-strand-saree-necklace.jpg", name: "Gemstone Saree Necklace" },
  { url: "/images/symi-balmain-paris-white-logo-tee.jpg", name: "Balmain White Logo Tee" },
  { url: "/images/symi-lattafa-bint-hooran-perfume.jpg", name: "Lattafa Bint Hooran EDP" },
  { url: "/images/symi-cerave-cleansers-trio-set.jpg", name: "CeraVe Cleansers Trio" },
  { url: "/images/symi-handloom-sarong-orange-pink.jpg", name: "Decency Handloom Sarong" },
  { url: "/images/black-beaded-stripe-clutch.jpg", name: "Hand-Beaded Evening Clutch" },
  { url: "/images/symi-festive-ethnic-anarkali-dresses.jpg", name: "Festive Anarkali Dress" },
  { url: "/images/symi-armani-exchange-slate-blue-polo.jpg", name: "A|X Slate Blue Polo" },
  { url: "/images/symi-tommy-hilfiger-green-tee.jpg", name: "Tommy Hilfiger Tee" },
  { url: "/images/symi-dior-style-lime-green-slides.jpg", name: "Dior Style Lime Slides" },
];

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  tier: "VIP Platinum" | "Atelier Club" | "Repeat Buyer" | "New Customer";
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: "CUST-001",
    name: "Kasun Jayawardena",
    email: "kasun.j@example.lk",
    phone: "+94 77 123 4567",
    city: "Beruwala",
    totalOrders: 6,
    totalSpent: 184500,
    tier: "VIP Platinum",
  },
  {
    id: "CUST-002",
    name: "Dilini Fernando",
    email: "dilini.f@example.lk",
    phone: "+94 71 987 6543",
    city: "Beruwala",
    totalOrders: 4,
    totalSpent: 92000,
    tier: "Atelier Club",
  },
  {
    id: "CUST-003",
    name: "Mohamed Rizan",
    email: "rizan.m@example.lk",
    phone: "+94 76 555 1212",
    city: "Kandy",
    totalOrders: 3,
    totalSpent: 68500,
    tier: "Repeat Buyer",
  },
  {
    id: "CUST-004",
    name: "Anushka Perera",
    email: "anushka.p@example.lk",
    phone: "+94 70 333 4444",
    city: "Galle Fort",
    totalOrders: 2,
    totalSpent: 45000,
    tier: "Repeat Buyer",
  },
  {
    id: "CUST-005",
    name: "Sashini Silva",
    email: "sashini.s@example.lk",
    phone: "+94 75 888 9999",
    city: "Negombo",
    totalOrders: 1,
    totalSpent: 28500,
    tier: "New Customer",
  },
];

export function AdminPortal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "products" | "banners" | "analytics" | "customers" | "settings"
  >("overview");

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [customers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [banners, setBanners] = useState<PromoBanner[]>(() => getStoredBanners());
  const [orderFilter, setOrderFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeStudio, setActiveStudio] = useState<string>("All Studios");

  // Notifications Log
  const [notifications] = useState([
    { id: 1, msg: "New Order #SYMI-9821 received from Beruwala", time: "10m ago", type: "order" },
    { id: 2, msg: "Low stock alert: Lattafa Bint Hooran (3 units remaining)", time: "25m ago", type: "stock" },
    { id: 3, msg: "Express courier pickup completed for Order #SYMI-9819", time: "1h ago", type: "shipping" },
  ]);

  // New product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState<Product["cat"]>("women");
  const [newImage, setNewImage] = useState(PRESET_STORE_IMAGES[0].url);
  const [imageSourceMode, setImageSourceMode] = useState<"upload" | "url" | "preset">("upload");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [editPriceVal, setEditPriceVal] = useState("");

  // Banner Management Form state
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerFormType, setBannerFormType] = useState<BannerType>("occasional");
  const [bannerFormBadge, setBannerFormBadge] = useState("AVURUDU & EID FESTIVE DROP");
  const [bannerFormTitle, setBannerFormTitle] = useState("");
  const [bannerFormSubtitle, setBannerFormSubtitle] = useState("");
  const [bannerFormDiscountTag, setBannerFormDiscountTag] = useState("FLAT 25% OFF");
  const [bannerFormPromoCode, setBannerFormPromoCode] = useState("FESTIVE25");
  const [bannerFormButtonText, setBannerFormButtonText] = useState("Shop Collection");
  const [bannerFormButtonLink, setBannerFormButtonLink] = useState("#latest");
  const [bannerFormBgImage, setBannerFormBgImage] = useState(PRESET_STORE_IMAGES[0].url);
  const [bannerFormTheme, setBannerFormTheme] = useState<BannerTheme>("sage");
  const [bannerFormTerms, setBannerFormTerms] = useState("*Valid sitewide. Free islandwide shipping.");
  const [bannerFormIsActive, setBannerFormIsActive] = useState(true);
  const [bannerImageSourceMode, setBannerImageSourceMode] = useState<"preset" | "url" | "upload">("preset");
  const [bannerCustomUrl, setBannerCustomUrl] = useState("");

  // Store Settings state
  const [expressDeliveryEnabled, setExpressDeliveryEnabled] = useState(true);
  const [centralStudioOnline, setCentralStudioOnline] = useState(true);
  const [beruwalaStudioOnline, setBeruwalaStudioOnline] = useState(true);

  if (!isOpen) return null;

  const handleToggleBanner = (id: string) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b));
    setBanners(updated);
    saveStoredBanners(updated);
  };

  const handleDeleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    saveStoredBanners(updated);
  };

  const handleOpenEditBanner = (banner: PromoBanner) => {
    setEditingBannerId(banner.id);
    setBannerFormType(banner.type);
    setBannerFormBadge(banner.badge);
    setBannerFormTitle(banner.title);
    setBannerFormSubtitle(banner.subtitle);
    setBannerFormDiscountTag(banner.discountTag || "");
    setBannerFormPromoCode(banner.promoCode || "");
    setBannerFormButtonText(banner.buttonText || "Shop Collection");
    setBannerFormButtonLink(banner.buttonLink || "#latest");
    setBannerFormBgImage(banner.bgImage);
    setBannerFormTheme(banner.theme);
    setBannerFormTerms(banner.terms || "");
    setBannerFormIsActive(banner.isActive);
    setShowAddBanner(true);
  };

  const handleOpenCreateBanner = () => {
    setEditingBannerId(null);
    setBannerFormType("occasional");
    setBannerFormBadge("FESTIVE SPECIAL DROP");
    setBannerFormTitle("");
    setBannerFormSubtitle("");
    setBannerFormDiscountTag("20% OFF");
    setBannerFormPromoCode("SYMI20");
    setBannerFormButtonText("Explore Drop");
    setBannerFormButtonLink("#latest");
    setBannerFormBgImage(PRESET_STORE_IMAGES[0].url);
    setBannerFormTheme("sage");
    setBannerFormTerms("*Valid sitewide. Limited time offer.");
    setBannerFormIsActive(true);
    setShowAddBanner(true);
  };

  const handleSaveBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerFormTitle.trim()) return;

    if (editingBannerId) {
      const updated = banners.map((b) => {
        if (b.id === editingBannerId) {
          return {
            ...b,
            type: bannerFormType,
            badge: bannerFormBadge,
            title: bannerFormTitle,
            subtitle: bannerFormSubtitle,
            discountTag: bannerFormDiscountTag,
            promoCode: bannerFormPromoCode,
            buttonText: bannerFormButtonText,
            buttonLink: bannerFormButtonLink,
            bgImage: bannerFormBgImage,
            theme: bannerFormTheme,
            terms: bannerFormTerms,
            isActive: bannerFormIsActive,
          };
        }
        return b;
      });
      setBanners(updated);
      saveStoredBanners(updated);
    } else {
      const newBanner: PromoBanner = {
        id: `banner-${Date.now()}`,
        type: bannerFormType,
        badge: bannerFormBadge,
        title: bannerFormTitle,
        subtitle: bannerFormSubtitle,
        discountTag: bannerFormDiscountTag,
        promoCode: bannerFormPromoCode,
        buttonText: bannerFormButtonText,
        buttonLink: bannerFormButtonLink,
        bgImage: bannerFormBgImage,
        theme: bannerFormTheme,
        terms: bannerFormTerms,
        isActive: bannerFormIsActive,
        countdownHours: 48,
        highlightStats: [
          { label: "Discount", value: bannerFormDiscountTag || "Active" },
          { label: "Availability", value: "Limited" },
          { label: "Delivery", value: "24-48h" },
        ],
      };
      const updated = [newBanner, ...banners];
      setBanners(updated);
      saveStoredBanners(updated);
    }

    setShowAddBanner(false);
    setEditingBannerId(null);
  };

  const handleApplyQuickPreset = (preset: "avurudu" | "eid" | "flash40" | "bogo") => {
    let presetBanner: PromoBanner;
    if (preset === "avurudu") {
      presetBanner = {
        id: `banner-avurudu-${Date.now()}`,
        type: "occasional",
        badge: "SINHALA & TAMIL NEW YEAR",
        title: "Avurudu Heritage Collection",
        subtitle: "Traditional handloom weaves re-imagined for modern streetwear. Celebrate auspicious moments with tailored linen & authentic crafts.",
        discountTag: "FLAT 25% OFF",
        promoCode: "AVURUDU25",
        buttonText: "Shop Avurudu Drop",
        buttonLink: "#latest",
        bgImage: "/images/symi-handloom-sarong-orange-pink.jpg",
        theme: "gold",
        terms: "*Valid sitewide on festive apparel. Free islandwide shipping.",
        isActive: true,
        highlightStats: [
          { label: "Festive Markdown", value: "25% OFF" },
          { label: "Handloom Batches", value: "100% Pure" },
          { label: "Dispatch Hub", value: "Beruwala Studio" },
        ],
      };
    } else if (preset === "eid") {
      presetBanner = {
        id: `banner-eid-${Date.now()}`,
        type: "occasional",
        badge: "RAMADAN & EID SPECIAL",
        title: "Eid Festive Luxe Drop",
        subtitle: "Luxury silk-blend tunics, oriental fragrance sets, and embroidered couture clutches curated for festive elegance.",
        discountTag: "UP TO 30% OFF",
        promoCode: "EIDMUBARAK",
        buttonText: "Explore Eid Edit",
        buttonLink: "#latest",
        bgImage: "/images/symi-festive-ethnic-anarkali-dresses.jpg",
        theme: "sage",
        terms: "*Limited seasonal edition. Available while allocations last.",
        isActive: true,
        highlightStats: [
          { label: "Festive Markdown", value: "30% OFF" },
          { label: "Fragrance Gift", value: "Complimentary" },
          { label: "Courier Window", value: "Same-Day" },
        ],
      };
    } else if (preset === "flash40") {
      presetBanner = {
        id: `banner-flash-${Date.now()}`,
        type: "sale",
        badge: "24-HOUR FLASH CLEARANCE",
        title: "Flash Archive Markdown",
        subtitle: "Unprecedented clearance discount across runway archive pieces and statement tees. Strict 24-hour expiration.",
        discountTag: "FLAT 40% OFF",
        promoCode: "FLASH40",
        buttonText: "Claim Flash Deal",
        buttonLink: "#latest",
        bgImage: "/images/symi-balmain-paris-white-logo-tee.jpg",
        theme: "terracotta",
        terms: "*Strictly limited quantities. Flash sale prices valid for 24h.",
        isActive: true,
        highlightStats: [
          { label: "Instant Markdown", value: "40% OFF" },
          { label: "Countdown", value: "24 Hours" },
          { label: "Restock Policy", value: "No Restock" },
        ],
      };
    } else {
      presetBanner = {
        id: `banner-bogo-${Date.now()}`,
        type: "offer",
        badge: "BUY 2 GET 1 FREE",
        title: "Streetwear Triple Rotation",
        subtitle: "Mix and match any tees, polos, or accessories. Add 3 items to your basket and the 3rd piece is complimentary.",
        discountTag: "BUY 2 GET 1 FREE",
        promoCode: "B2G1FREE",
        buttonText: "Shop The Offer",
        buttonLink: "#latest",
        bgImage: "/images/symi-armani-exchange-slate-blue-polo.jpg",
        theme: "gold",
        terms: "*Lowest priced item discounted at checkout. Islandwide delivery.",
        isActive: true,
        highlightStats: [
          { label: "Bonus Item", value: "1 Free Piece" },
          { label: "Eligible Items", value: "All Tees & Polos" },
          { label: "Packaging", value: "Studio Box" },
        ],
      };
    }
    const updated = [presetBanner, ...banners];
    setBanners(updated);
    saveStoredBanners(updated);
  };

  // Calculated Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = Math.round(totalRevenue / (orders.length || 1));
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const shippedOrders = orders.filter((o) => o.status === "Shipped" || o.status === "Delivered").length;
  const fulfillmentRate = Math.round((shippedOrders / (orders.length || 1)) * 100);

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const priceNum = Number(newPrice);
    const newProd: Product = {
      id: productList.length + 1,
      name: newTitle,
      cat: newCategory,
      art: "tee",
      price: priceNum,
      was: Math.round(priceNum * 1.25),
      tag: "New Arrival",
      note: "Hand-curated piece at SYMI Atelier",
      image: newImage,
      images: [newImage],
      latest: true,
      arrival: true,
    };
    setProductList([newProd, ...productList]);
    setShowAddProduct(false);
    setNewTitle("");
    setNewPrice("");
  };

  const handleSavePriceEdit = (id: number) => {
    const val = Number(editPriceVal);
    if (val > 0) {
      setProductList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, price: val } : p))
      );
    }
    setEditingPriceId(null);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === "All" || o.status === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredProducts = productList.filter((p) => {
    const matchesCat = categoryFilter === "All" || p.cat === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-2 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex h-[94vh] w-full max-w-[1440px] flex-col md:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT EXECUTIVE SIDEBAR - WHITE THEME */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/80 p-4 flex flex-col justify-between shrink-0">
          <div>
            {/* Branding & Status Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full overflow-hidden border border-[#52735B]/30 shadow-sm bg-white shrink-0 p-0.5">
                  <img src="/images/symi-official-logo.png" alt="SYMI Logo" className="size-full rounded-full object-cover" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold tracking-wider uppercase text-slate-900">
                    SYMI OS
                  </h2>
                  <span className="text-[9px] font-mono tracking-widest text-[#52735B] font-bold uppercase block">
                    Atelier Executive
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon-xs"
                onClick={onClose}
                aria-label="Close admin portal"
                className="md:hidden text-slate-500 hover:text-slate-900"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-5 space-y-1">
              {[
                { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
                { id: "orders", label: `Orders (${orders.length})`, icon: Package, badge: pendingOrders > 0 ? `${pendingOrders} New` : null },
                { id: "products", label: `Catalog (${productList.length})`, icon: ShoppingBag },
                { id: "banners", label: `Banners & Offers (${banners.filter(b => b.isActive).length})`, icon: Megaphone, badge: banners.filter(b => b.isActive).length > 0 ? `${banners.filter(b => b.isActive).length} Live` : null },
                { id: "analytics", label: "Regional Logistics", icon: BarChart3 },
                { id: "customers", label: "VIP Directory", icon: Users },
                { id: "settings", label: "Studio Config", icon: Settings },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all group",
                      isActive
                        ? "bg-[#52735B] text-white shadow-sm font-bold"
                        : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={cn("size-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900")} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[9px] px-1.5 py-0 font-mono font-bold">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Studio Link Live Status & Quick Close */}
          <div className="mt-6 border-t border-slate-200 pt-4 space-y-3 hidden md:block">
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600"></span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Studios Online
                </span>
              </div>
              <div className="mt-1 text-[9.5px] text-emerald-900 font-medium">
                Beruwala Atelier connected to dispatch grid.
              </div>
            </div>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 border-slate-300 bg-white hover:bg-slate-100"
            >
              <X className="size-3.5 mr-1.5" /> Return to Storefront
            </Button>
          </div>
        </aside>

        {/* RIGHT MAIN WORKSPACE - CLEAN WHITE THEME */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Top Operational Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 py-3.5 shrink-0">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-base sm:text-lg font-bold tracking-wider uppercase text-slate-900">
                {activeTab === "overview" && "Executive Dashboard"}
                {activeTab === "orders" && "Order Fulfillment Center"}
                {activeTab === "products" && "Product Catalog & Inventory"}
                {activeTab === "analytics" && "Regional Delivery Analytics"}
                {activeTab === "customers" && "VIP Customer Directory"}
                {activeTab === "settings" && "Storefront & Studio Controls"}
              </h1>
              <Badge variant="outline" className="border-[#52735B]/40 text-[#52735B] bg-[#52735B]/10 text-[9px] uppercase font-mono font-bold hidden sm:inline-flex">
                {activeStudio}
              </Badge>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* Studio Selector dropdown */}
              <select
                value={activeStudio}
                onChange={(e) => setActiveStudio(e.target.value)}
                className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-800 font-medium focus:border-[#52735B] focus:outline-none shadow-2xs"
              >
                <option value="All Studios">All Studios (Global)</option>
                <option value="Beruwala Studio">Beruwala Coastal Hub</option>
              </select>

              <Button
                size="sm"
                onClick={() => setShowAddProduct(true)}
                className="bg-[#52735B] text-white hover:bg-[#43604b] text-xs font-bold uppercase tracking-wider gap-1.5 shadow-sm"
              >
                <Plus className="size-4" /> Add Product
              </Button>

              <Button
                variant="outline"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close admin portal"
                className="rounded-full shrink-0 md:flex hidden border-slate-300 text-slate-600 hover:text-slate-900"
              >
                <X className="size-4" />
              </Button>
            </div>
          </header>

          {/* Workspace Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/40">
            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Executive Metric Cards Grid - WHITE THEME */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-white border-slate-200 shadow-xs">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <CardDescription className="text-[9.5px] font-bold tracking-widest text-slate-500 uppercase">
                        Gross Store Revenue
                      </CardDescription>
                      <div className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                        <DollarSign className="size-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="font-display text-2xl font-bold text-slate-900">
                        {money(totalRevenue)}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-bold">
                        <ArrowUpRight className="size-3" />
                        <span>+14.8% vs last week</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-slate-200 shadow-xs">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <CardDescription className="text-[9.5px] font-bold tracking-widest text-slate-500 uppercase">
                        Average Order Value
                      </CardDescription>
                      <div className="grid size-8 place-items-center rounded-lg bg-blue-100 text-blue-800">
                        <TrendingUp className="size-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="font-display text-2xl font-bold text-slate-900">
                        {money(avgOrderValue)}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-blue-700 font-bold">
                        <ArrowUpRight className="size-3" />
                        <span>High-tier luxury cart avg</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-slate-200 shadow-xs">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <CardDescription className="text-[9.5px] font-bold tracking-widest text-slate-500 uppercase">
                        Fulfillment Rate
                      </CardDescription>
                      <div className="grid size-8 place-items-center rounded-lg bg-purple-100 text-purple-800">
                        <Truck className="size-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="font-display text-2xl font-bold text-slate-900">
                        {fulfillmentRate}%
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-purple-700 font-bold">
                        <CheckCircle2 className="size-3" />
                        <span>{shippedOrders} of {orders.length} dispatched</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-slate-200 shadow-xs">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <CardDescription className="text-[9.5px] font-bold tracking-widest text-slate-500 uppercase">
                        Pending Actions
                      </CardDescription>
                      <div className="grid size-8 place-items-center rounded-lg bg-amber-100 text-amber-800">
                        <Clock className="size-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="font-display text-2xl font-bold text-slate-900">
                        {pendingOrders} Orders
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-amber-700 font-bold">
                        <span>Requires courier scheduling</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Trend Visual Representation & Studio Activity Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sales Performance Chart Graphic */}
                  <Card className="lg:col-span-2 bg-white border-slate-200 shadow-xs">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-sm font-bold uppercase text-slate-900 flex items-center gap-2">
                          <BarChart3 className="size-4 text-[#52735B]" />
                          Weekly Revenue & Fulfillment Velocity (LKR)
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-500">
                          Real-time stream from Beruwala Point-of-Sale terminal.
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="font-mono text-[9px] text-[#52735B] border-[#52735B]/40 bg-[#52735B]/10">
                        LKR Currency
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {/* Stylized SVG Chart Bar visualization */}
                      <div className="h-44 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-200">
                        {[
                          { day: "Mon", val: 65, amount: "LKR 124K" },
                          { day: "Tue", val: 82, amount: "LKR 185K" },
                          { day: "Wed", val: 45, amount: "LKR 92K" },
                          { day: "Thu", val: 95, amount: "LKR 210K" },
                          { day: "Fri", val: 78, amount: "LKR 164K" },
                          { day: "Sat", val: 100, amount: "LKR 245K" },
                          { day: "Sun", val: 88, amount: "LKR 198K" },
                        ].map((bar, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                            <div className="text-[9px] font-mono text-slate-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.amount}
                            </div>
                            <div
                              style={{ height: `${bar.val}%` }}
                              className="w-full max-w-[36px] rounded-t-md bg-gradient-to-t from-[#52735B]/30 to-[#52735B] transition-all group-hover:brightness-90"
                            />
                            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase">
                              {bar.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Studio Real-time Notification Feed */}
                  <Card className="bg-white border-slate-200 shadow-xs">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold uppercase text-slate-900 flex items-center gap-2">
                        <Bell className="size-4 text-[#52735B]" />
                        Real-Time Studio Stream
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Live dispatch & inventory events.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3.5">
                      {notifications.map((n) => (
                        <div key={n.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3">
                          <CircleDot className="size-3.5 text-[#52735B] mt-0.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-900 font-medium leading-snug">{n.msg}</p>
                            <span className="text-[9.5px] text-slate-500 font-mono mt-1 block">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Recent Orders Table Preview */}
                <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-bold uppercase text-slate-900">
                        Recent Fulfillment Requests
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500">
                        Orders awaiting packaging and courier dispatch.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-bold uppercase border-slate-300 text-slate-700 hover:text-slate-900"
                    >
                      View All Orders <ChevronRight className="size-3 ml-1" />
                    </Button>
                  </CardHeader>
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="text-slate-700 font-bold">Order ID</TableHead>
                        <TableHead className="text-slate-700 font-bold">Customer</TableHead>
                        <TableHead className="text-slate-700 font-bold">City</TableHead>
                        <TableHead className="text-slate-700 font-bold">Total</TableHead>
                        <TableHead className="text-slate-700 font-bold">Status</TableHead>
                        <TableHead className="text-right text-slate-700 font-bold">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 4).map((order) => (
                        <TableRow key={order.id} className="hover:bg-slate-50">
                          <TableCell className="font-mono font-bold text-slate-900">#{order.id.slice(-4)}</TableCell>
                          <TableCell className="font-semibold text-slate-900 uppercase text-xs">{order.customerName}</TableCell>
                          <TableCell className="text-xs text-slate-600 font-mono">{order.city}</TableCell>
                          <TableCell className="font-semibold text-xs text-slate-900">{money(order.total)}</TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                "text-[9px] uppercase tracking-wider font-bold",
                                order.status === "Paid" && "bg-emerald-100 text-emerald-800 border border-emerald-300",
                                order.status === "Processing" && "bg-amber-100 text-amber-800 border border-amber-300",
                                order.status === "Shipped" && "bg-blue-100 text-blue-800 border border-blue-300",
                                order.status === "Delivered" && "bg-purple-100 text-purple-800 border border-purple-300"
                              )}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => {
                                setSelectedOrder(order);
                                setActiveTab("orders");
                              }}
                              className="text-[9px] font-bold uppercase border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* TAB 2: ORDERS FULFILLMENT CENTER */}
            {activeTab === "orders" && (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  {/* Search and Status Pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search by Order ID, Customer, Phone, City..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {["All", "Paid", "Processing", "Shipped", "Delivered"].map((st) => (
                        <Button
                          key={st}
                          size="xs"
                          variant={orderFilter === st ? "default" : "outline"}
                          onClick={() => setOrderFilter(st)}
                          className={cn(
                            "text-[9px] font-bold tracking-widest uppercase transition-all shrink-0",
                            orderFilter === st
                              ? "bg-[#52735B] text-white hover:bg-[#43604b]"
                              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                          )}
                        >
                          {st}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Orders Table */}
                  <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-slate-700 font-bold">Order ID</TableHead>
                          <TableHead className="text-slate-700 font-bold">Customer Info</TableHead>
                          <TableHead className="text-slate-700 font-bold">Date & Items</TableHead>
                          <TableHead className="text-slate-700 font-bold">Total Amount</TableHead>
                          <TableHead className="text-slate-700 font-bold">Status</TableHead>
                          <TableHead className="text-right text-slate-700 font-bold">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className={cn(
                              "cursor-pointer transition-colors",
                              selectedOrder?.id === order.id ? "bg-[#52735B]/10 font-medium" : "hover:bg-slate-50"
                            )}
                          >
                            <TableCell className="font-mono font-bold text-slate-900">
                              <Badge variant="outline" className="font-mono text-xs border-slate-300 bg-slate-100 text-slate-800">
                                #{order.id.slice(-4)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-slate-900 uppercase text-xs">
                                {order.customerName}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                <MapPin className="size-3 text-[#52735B]" />
                                {order.city}
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-slate-600 font-mono">
                              {order.createdAt}
                              <div className="text-[10px] text-slate-500">
                                {order.items.length} item(s)
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold text-xs text-slate-900">
                              {money(order.total)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  "text-[9px] uppercase tracking-wider font-bold",
                                  order.status === "Paid" && "bg-emerald-100 text-emerald-800 border border-emerald-300",
                                  order.status === "Processing" && "bg-amber-100 text-amber-800 border border-amber-300",
                                  order.status === "Shipped" && "bg-blue-100 text-blue-800 border border-blue-300",
                                  order.status === "Delivered" && "bg-purple-100 text-purple-800 border border-purple-300"
                                )}
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button size="icon-xs" variant="ghost" className="text-slate-500 hover:text-slate-900">
                                <Eye className="size-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>

                {/* Right Inspector Column (Order Details Side Panel) - WHITE THEME */}
                {selectedOrder && (
                  <div className="w-full lg:w-80 border border-slate-200 bg-white p-4 sm:p-5 rounded-2xl flex flex-col justify-between shrink-0 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="font-display text-sm font-bold tracking-wider text-slate-900 uppercase flex items-center gap-2">
                          <Package className="size-4 text-[#52735B]" />
                          Order #{selectedOrder.id.slice(-4)}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setSelectedOrder(null)}
                          aria-label="Close details"
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>

                      <div className="mt-4 space-y-3 font-mono text-xs">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Customer Info</span>
                          <span className="text-slate-900 font-semibold block">{selectedOrder.customerName}</span>
                          <div className="text-slate-600 text-[10.5px] mt-0.5">{selectedOrder.customerPhone}</div>
                          <div className="text-slate-600 text-[10.5px]">{selectedOrder.email}</div>
                        </div>

                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Delivery Address</span>
                          <span className="text-slate-800 text-[11px] block">{selectedOrder.address}</span>
                          <Badge variant="outline" className="text-emerald-800 text-[10px] font-semibold border-emerald-300 bg-emerald-50 mt-1">
                            {selectedOrder.city}, Sri Lanka
                          </Badge>
                        </div>
                      </div>

                      {/* Items Purchased */}
                      <div className="mt-5 border-t border-slate-200 pt-4">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-3">
                          Purchased Items ({selectedOrder.items.length})
                        </span>
                        <div className="space-y-2.5">
                          {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <Avatar className="size-11 rounded-md border border-slate-200 shrink-0">
                                <AvatarImage src={item.image} alt={item.name} />
                                <AvatarFallback className="rounded-md bg-slate-100 text-slate-600 text-xs">ITEM</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-[11px] font-semibold text-slate-900 uppercase line-clamp-1">
                                  {item.name}
                                </h5>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  {item.qty} x {money(item.price)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status Updater Buttons */}
                    <div className="mt-6 border-t border-slate-200 pt-4">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-2">
                        Update Order Status
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {(["Paid", "Processing", "Shipped", "Delivered"] as OrderStatus[]).map(
                          (st) => (
                            <Button
                              key={st}
                              size="xs"
                              variant={selectedOrder.status === st ? "default" : "outline"}
                              onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                              className={cn(
                                "text-[9px] font-bold tracking-widest uppercase transition-all",
                                selectedOrder.status === st
                                  ? "bg-[#52735B] text-white hover:bg-[#43604b]"
                                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                              )}
                            >
                              {st}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PRODUCT CATALOG & INVENTORY */}
            {activeTab === "products" && (
              <div className="space-y-4">
                {/* Search & Category Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search inventory by item title, category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-white border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {["All", "women", "men", "accessories", "perfumes", "household"].map((cat) => (
                      <Button
                        key={cat}
                        size="xs"
                        variant={categoryFilter === cat ? "default" : "outline"}
                        onClick={() => setCategoryFilter(cat)}
                        className={cn(
                          "text-[9px] font-bold tracking-widest uppercase transition-all shrink-0",
                          categoryFilter === cat
                            ? "bg-[#52735B] text-white hover:bg-[#43604b]"
                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        )}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Product Grid Cards - WHITE THEME */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.slice(0, 36).map((product) => (
                    <Card key={product.id} className="bg-white border-slate-200 shadow-xs hover:shadow-md transition-all">
                      <CardHeader className="p-3.5 pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-16 rounded-lg border border-slate-200 shrink-0">
                            <AvatarImage src={product.image || PRESET_STORE_IMAGES[0].url} alt={product.name} />
                            <AvatarFallback className="rounded-lg bg-slate-100 text-slate-600">{product.cat.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <Badge variant="outline" className="text-[8.5px] font-mono tracking-wider text-[#52735B] border-[#52735B]/40 bg-[#52735B]/10 font-bold uppercase mb-1">
                              {product.cat}
                            </Badge>
                            <CardTitle className="text-xs font-semibold text-slate-900 uppercase line-clamp-1">
                              {product.name}
                            </CardTitle>
                            
                            <div className="mt-1 flex items-baseline gap-2 font-mono text-[10.5px]">
                              {editingPriceId === product.id ? (
                                <div className="flex items-center gap-1">
                                  <Input
                                    type="number"
                                    value={editPriceVal}
                                    onChange={(e) => setEditPriceVal(e.target.value)}
                                    className="w-20 h-6 text-xs px-1.5 py-0 bg-white text-slate-900 border-[#52735B]"
                                  />
                                  <Button
                                    size="xs"
                                    onClick={() => handleSavePriceEdit(product.id)}
                                    className="bg-[#52735B] text-white hover:bg-[#43604b] h-6 px-2 text-[9px]"
                                  >
                                    Save
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-800 font-bold">{money(product.price)}</span>
                                  <button
                                    onClick={() => {
                                      setEditingPriceId(product.id);
                                      setEditPriceVal(String(product.price));
                                    }}
                                    className="text-[9px] text-slate-500 hover:text-slate-900 underline font-sans"
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <Separator className="bg-slate-200" />
                      <CardFooter className="p-2.5 px-3.5 flex items-center justify-between text-[9.5px] font-mono bg-slate-50/50">
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-bold">
                          <Check className="size-3" /> In Stock & Ready
                        </span>
                        <span className="text-slate-500 uppercase text-[9px] font-bold">
                          {product.tag || "Core Item"}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROMOTIONS, OFFERS & OCCASIONAL BANNERS */}
            {activeTab === "banners" && (
              <div className="space-y-6">
                {/* Banner Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="grid size-8 place-items-center rounded-lg bg-[#52735B] text-white">
                        <Megaphone className="size-4" />
                      </div>
                      <h3 className="text-base font-bold uppercase text-slate-900">
                        Promotions, Offers & Occasion Banners
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 max-w-2xl">
                      Deploy seasonal offers, Avurudu / Eid festival drops, warehouse clearance banners, and discount coupon codes directly to the homepage banner showcase.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={handleOpenCreateBanner}
                      className="bg-[#52735B] hover:bg-[#43604b] text-white text-xs font-bold uppercase tracking-wider gap-1.5 shadow-sm"
                    >
                      <Plus className="size-4" /> Post New Banner
                    </Button>
                  </div>
                </div>

                {/* 1-Click Instant Quick Preset Templates */}
                <Card className="bg-slate-50/80 border-slate-200">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs font-bold uppercase text-slate-800 flex items-center gap-2">
                        <Zap className="size-3.5 text-amber-500" />
                        1-Click Festive & Offer Campaign Templates
                      </CardTitle>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        Instant Storefront Deployment
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleApplyQuickPreset("avurudu")}
                        className="flex flex-col items-start p-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/80 text-left transition-all group"
                      >
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-800 uppercase">
                          <Gift className="size-3 text-amber-600" /> Sinhala & Tamil New Year
                        </span>
                        <span className="mt-1 text-xs font-bold text-slate-900 group-hover:text-amber-900">
                          Avurudu Heritage 25% Off
                        </span>
                        <span className="mt-0.5 text-[9.5px] text-slate-500 font-mono">
                          Code: AVURUDU25
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyQuickPreset("eid")}
                        className="flex flex-col items-start p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 text-left transition-all group"
                      >
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-800 uppercase">
                          <Gift className="size-3 text-emerald-600" /> Ramadan & Eid Drop
                        </span>
                        <span className="mt-1 text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                          Festive Luxe 30% Off
                        </span>
                        <span className="mt-0.5 text-[9.5px] text-slate-500 font-mono">
                          Code: EIDMUBARAK
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyQuickPreset("flash40")}
                        className="flex flex-col items-start p-3 rounded-xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100/80 text-left transition-all group"
                      >
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-orange-800 uppercase">
                          <Flame className="size-3 text-orange-600" /> 24h Flash Clearance
                        </span>
                        <span className="mt-1 text-xs font-bold text-slate-900 group-hover:text-orange-900">
                          Archive Clearance 40% Off
                        </span>
                        <span className="mt-0.5 text-[9.5px] text-slate-500 font-mono">
                          Code: FLASH40
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyQuickPreset("bogo")}
                        className="flex flex-col items-start p-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 text-left transition-all group"
                      >
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-blue-800 uppercase">
                          <Percent className="size-3 text-blue-600" /> Bundle Rotation
                        </span>
                        <span className="mt-1 text-xs font-bold text-slate-900 group-hover:text-blue-900">
                          Buy 2 Get 1 Free Deal
                        </span>
                        <span className="mt-0.5 text-[9.5px] text-slate-500 font-mono">
                          Code: B2G1FREE
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Banner Cards Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                      Configured Banners ({banners.length})
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      Toggle active status to display or hide on the homepage showcase.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {banners.map((banner) => (
                      <Card
                        key={banner.id}
                        className={cn(
                          "bg-white border transition-all overflow-hidden",
                          banner.isActive
                            ? "border-emerald-300 shadow-xs ring-1 ring-emerald-300/40"
                            : "border-slate-200 opacity-75"
                        )}
                      >
                        <div className="flex flex-col sm:flex-row min-h-[160px]">
                          {/* Banner Visual Thumbnail */}
                          <div className="relative w-full sm:w-44 shrink-0 bg-slate-900 min-h-[120px] overflow-hidden">
                            <img
                              src={banner.bgImage}
                              alt={banner.title}
                              className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-2 left-2">
                              <Badge
                                className={cn(
                                  "text-[8.5px] px-2 py-0.5 font-bold uppercase",
                                  banner.type === "sale"
                                    ? "bg-rose-500 text-white"
                                    : banner.type === "occasional"
                                    ? "bg-[#52735B] text-white"
                                    : "bg-amber-500 text-white"
                                )}
                              >
                                {banner.type}
                              </Badge>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <span className="text-[9px] font-mono font-bold text-white/90 truncate block">
                                {banner.discountTag || "Special Promo"}
                              </span>
                            </div>
                          </div>

                          {/* Banner Details & Controls */}
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-[9px] font-bold tracking-widest text-[#52735B] uppercase block">
                                    {banner.badge}
                                  </span>
                                  <h4 className="text-sm font-bold text-slate-900 uppercase line-clamp-1 mt-0.5">
                                    {banner.title}
                                  </h4>
                                </div>

                                <Button
                                  size="xs"
                                  variant={banner.isActive ? "default" : "outline"}
                                  onClick={() => handleToggleBanner(banner.id)}
                                  className={cn(
                                    "text-[9px] font-bold tracking-wider uppercase h-6 px-2.5",
                                    banner.isActive
                                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                      : "border-slate-300 text-slate-500 hover:bg-slate-100"
                                  )}
                                >
                                  <Power className="size-3 mr-1" />
                                  {banner.isActive ? "ACTIVE" : "HIDDEN"}
                                </Button>
                              </div>

                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                                {banner.subtitle}
                              </p>

                              {/* Promo Code & Theme Pill */}
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                {banner.promoCode && (
                                  <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[9.5px] font-bold text-slate-800">
                                    <Tag className="size-2.5 text-[#52735B]" />
                                    {banner.promoCode}
                                  </span>
                                )}
                                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-mono text-slate-600 uppercase">
                                  Theme: {banner.theme}
                                </span>
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[9px] font-mono text-slate-400">
                                Link: {banner.buttonLink || "#latest"}
                              </span>

                              <div className="flex items-center gap-1">
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => handleOpenEditBanner(banner)}
                                  className="h-7 px-2 text-[10px] text-slate-600 hover:text-slate-900"
                                >
                                  <Edit3 className="size-3 mr-1" /> Edit
                                </Button>
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => handleDeleteBanner(banner.id)}
                                  className="h-7 px-2 text-[10px] text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                                >
                                  <Trash2 className="size-3 mr-1" /> Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REGIONAL LOGISTICS ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <Card className="bg-white border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold tracking-wider text-slate-900 uppercase flex items-center gap-2">
                      <BarChart3 className="size-4 text-[#52735B]" />
                      Sri Lanka Regional Dispatch Matrix
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Real-time regional delivery statistics across primary provinces.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card size="sm" className="bg-slate-50 border-slate-200">
                      <CardHeader className="p-3 pb-1">
                        <CardDescription className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          Western & Coastal Region
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-900 mt-1">
                          58% Volume
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <span className="text-[10px] text-emerald-800 font-bold font-mono block">Same-Day Express Dispatch</span>
                        <span className="text-[9px] text-slate-500 font-medium font-mono">Express Courier Service</span>
                      </CardContent>
                    </Card>

                    <Card size="sm" className="bg-slate-50 border-slate-200">
                      <CardHeader className="p-3 pb-1">
                        <CardDescription className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          Beruwala & Kalutara
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-900 mt-1">
                          24% Volume
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <span className="text-[10px] text-emerald-800 font-bold font-mono block">Direct Coastal Studio</span>
                        <span className="text-[9px] text-slate-500 font-medium">Local Courier Hub</span>
                      </CardContent>
                    </Card>

                    <Card size="sm" className="bg-slate-50 border-slate-200">
                      <CardHeader className="p-3 pb-1">
                        <CardDescription className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          Kandy & Central
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-900 mt-1">
                          12% Volume
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <span className="text-[10px] text-blue-800 font-bold font-mono block">24h Express Route</span>
                        <span className="text-[9px] text-slate-500 font-medium">SpeedDraft Courier</span>
                      </CardContent>
                    </Card>

                    <Card size="sm" className="bg-slate-50 border-slate-200">
                      <CardHeader className="p-3 pb-1">
                        <CardDescription className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          Galle & Southern
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-900 mt-1">
                          6% Volume
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <span className="text-[10px] text-blue-800 font-bold font-mono block">Southern Expressway</span>
                        <span className="text-[9px] text-slate-500 font-medium">Standard Islandwide</span>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                {/* Shipping Partner Performance Table */}
                <Card className="bg-white border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase text-slate-900">
                      Logistics Partner On-Time Performance
                    </CardTitle>
                  </CardHeader>
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="text-slate-700 font-bold">Partner Name</TableHead>
                        <TableHead className="text-slate-700 font-bold">Service Type</TableHead>
                        <TableHead className="text-slate-700 font-bold">Avg Delivery Time</TableHead>
                        <TableHead className="text-slate-700 font-bold">Success Rate</TableHead>
                        <TableHead className="text-slate-700 font-bold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "PromptX Express", type: "Express Same-Day", time: "2.4 Hours", rate: "99.2%", status: "Active" },
                        { name: "SpeedDraft Logistics", type: "Islandwide 24h", time: "18.5 Hours", rate: "97.8%", status: "Active" },
                        { name: "Islandwide Post", type: "Provincial Trunk", time: "24.0 Hours", rate: "96.4%", status: "Active" },
                      ].map((partner, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-semibold text-slate-900">{partner.name}</TableCell>
                          <TableCell className="text-xs text-slate-600 font-mono">{partner.type}</TableCell>
                          <TableCell className="text-xs text-emerald-800 font-mono font-bold">{partner.time}</TableCell>
                          <TableCell className="text-xs text-slate-900 font-mono font-bold">{partner.rate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-emerald-300 text-emerald-800 bg-emerald-50 text-[9px] font-bold">
                              {partner.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* TAB 5: VIP CUSTOMER DIRECTORY */}
            {activeTab === "customers" && (
              <div className="space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search VIP clients by name, city, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="text-slate-700 font-bold">Customer Name</TableHead>
                        <TableHead className="text-slate-700 font-bold">Contact & Email</TableHead>
                        <TableHead className="text-slate-700 font-bold">City / Region</TableHead>
                        <TableHead className="text-slate-700 font-bold">Orders Count</TableHead>
                        <TableHead className="text-slate-700 font-bold">Lifetime Spend</TableHead>
                        <TableHead className="text-slate-700 font-bold">Tier Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((cust) => (
                        <TableRow key={cust.id}>
                          <TableCell className="font-semibold text-slate-900 uppercase text-xs">
                            <div className="flex items-center gap-2.5">
                              <Avatar className="size-8">
                                <AvatarFallback className="bg-[#52735B]/15 text-[#52735B] text-xs font-bold">
                                  {cust.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{cust.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 font-mono">
                            <div>{cust.phone}</div>
                            <div className="text-[10px] text-slate-500">{cust.email}</div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-800 font-mono">{cust.city}</TableCell>
                          <TableCell className="text-xs text-slate-900 font-mono font-bold">{cust.totalOrders} Orders</TableCell>
                          <TableCell className="text-xs text-emerald-800 font-mono font-bold">{money(cust.totalSpent)}</TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                "text-[9px] uppercase tracking-wider font-bold",
                                cust.tier === "VIP Platinum" && "bg-purple-100 text-purple-800 border-purple-300",
                                cust.tier === "Atelier Club" && "bg-[#52735B]/10 text-[#52735B] border-[#52735B]/30",
                                cust.tier === "Repeat Buyer" && "bg-blue-100 text-blue-800 border-blue-300",
                                cust.tier === "New Customer" && "bg-slate-100 text-slate-700 border border-slate-300"
                              )}
                            >
                              {cust.tier}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* TAB 6: STORE & STUDIO CONTROLS */}
            {activeTab === "settings" && (
              <div className="max-w-3xl space-y-6">
                <Card className="bg-white border-slate-200 shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase text-slate-900 flex items-center gap-2">
                      <Store className="size-4 text-[#52735B]" />
                      Studio & Storefront Dispatch Controls
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Manage real-time operational status for physical atelier hubs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Beruwala Central Atelier Hub</h4>
                        <p className="text-[10.5px] text-slate-500">Primary dispatch center for same-day express orders.</p>
                      </div>
                      <Button
                        size="xs"
                        variant={centralStudioOnline ? "default" : "outline"}
                        onClick={() => setCentralStudioOnline(!centralStudioOnline)}
                        className={centralStudioOnline ? "bg-emerald-700 hover:bg-emerald-800 text-white" : "border-slate-300 text-slate-700"}
                      >
                        {centralStudioOnline ? "ONLINE" : "OFFLINE"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Beruwala Coastal Loom Workroom</h4>
                        <p className="text-[10.5px] text-slate-500">Coastal workroom for handloom & artisan craft dispatches.</p>
                      </div>
                      <Button
                        size="xs"
                        variant={beruwalaStudioOnline ? "default" : "outline"}
                        onClick={() => setBeruwalaStudioOnline(!beruwalaStudioOnline)}
                        className={beruwalaStudioOnline ? "bg-emerald-700 hover:bg-emerald-800 text-white" : "border-slate-300 text-slate-700"}
                      >
                        {beruwalaStudioOnline ? "ONLINE" : "OFFLINE"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase">Express Delivery Route Dispatch</h4>
                        <p className="text-[10.5px] text-slate-500 font-sans">Enable instant express delivery checkout option.</p>
                      </div>
                      <Button
                        size="xs"
                        variant={expressDeliveryEnabled ? "default" : "outline"}
                        onClick={() => setExpressDeliveryEnabled(!expressDeliveryEnabled)}
                        className={expressDeliveryEnabled ? "bg-[#52735B] hover:bg-[#43604b] text-white" : "border-slate-300 text-slate-700"}
                      >
                        {expressDeliveryEnabled ? "ENABLED" : "DISABLED"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Add Product Modal Overlay - WHITE THEME WITH SEPARATE IMAGE UPLOADER */}
        {showAddProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs">
            <Card className="w-full max-w-lg border-slate-200 bg-white text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <CardTitle className="text-base font-bold uppercase text-slate-900 flex items-center gap-2">
                    <Package className="size-4 text-[#52735B]" />
                    Add New Product to Store Catalog
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Upload product photography or select from studio assets.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setShowAddProduct(false)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>

              <form onSubmit={handleAddProduct}>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                      Product Title
                    </label>
                    <Input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. SYMI Velvet Crystal Evening Clutch"
                      className="bg-white border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Price (LKR)
                      </label>
                      <Input
                        type="number"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="e.g. 14500"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as Product["cat"])}
                        className="w-full h-8 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:border-[#52735B] focus:outline-none font-medium"
                      >
                        <option value="women">Women</option>
                        <option value="accessories">Accessories</option>
                        <option value="perfumes">Perfumes</option>
                        <option value="household">Household</option>
                        <option value="men">Men</option>
                      </select>
                    </div>
                  </div>

                  {/* Dedicated Image Upload & Picker Section */}
                  <div className="space-y-2.5 border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[9.5px] font-bold tracking-widest text-slate-700 uppercase block">
                        Product Imagery Source
                      </label>
                      <span className="text-[9px] text-[#52735B] font-mono font-bold uppercase">
                        File / URL / Studio Gallery
                      </span>
                    </div>

                    {/* Image Mode Selector */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setImageSourceMode("upload")}
                        className={cn(
                          "py-1.5 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          imageSourceMode === "upload"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <Upload className="size-3" /> Upload File
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageSourceMode("url")}
                        className={cn(
                          "py-1.5 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          imageSourceMode === "url"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <LinkIcon className="size-3" /> Image URL
                      </button>

                      <button
                        type="button"
                        onClick={() => setImageSourceMode("preset")}
                        className={cn(
                          "py-1.5 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          imageSourceMode === "preset"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <ImageIcon className="size-3" /> Presets
                      </button>
                    </div>

                    {/* MODE 1: Local File Uploader */}
                    {imageSourceMode === "upload" && (
                      <div className="space-y-2">
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors p-4">
                          <Upload className="size-6 text-[#52735B] mb-1.5" />
                          <span className="text-xs font-bold text-slate-800">
                            Click to Upload Image File
                          </span>
                          <span className="text-[9.5px] text-slate-500 font-mono mt-0.5">
                            PNG, JPG, WEBP up to 10MB
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (evt) => {
                                  if (evt.target?.result) {
                                    setNewImage(String(evt.target.result));
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}

                    {/* MODE 2: Custom URL Entry */}
                    {imageSourceMode === "url" && (
                      <div className="space-y-1.5">
                        <Input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => {
                            setCustomImageUrl(e.target.value);
                            if (e.target.value.trim()) {
                              setNewImage(e.target.value.trim());
                            }
                          }}
                          placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                          className="bg-white border-slate-300 text-xs text-slate-900"
                        />
                      </div>
                    )}

                    {/* MODE 3: Preset Image Grid Picker */}
                    {imageSourceMode === "preset" && (
                      <div className="grid grid-cols-5 gap-2 pt-1">
                        {PRESET_STORE_IMAGES.map((imgItem) => (
                          <button
                            key={imgItem.url}
                            type="button"
                            onClick={() => setNewImage(imgItem.url)}
                            className={cn(
                              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                              newImage === imgItem.url
                                ? "border-[#52735B] ring-2 ring-[#52735B]/40 scale-105"
                                : "border-slate-200 opacity-70 hover:opacity-100"
                            )}
                            title={imgItem.name}
                          >
                            <img src={imgItem.url} alt={imgItem.name} className="size-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* High Definition Live Image Preview Box */}
                    {newImage && (
                      <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50 mt-2">
                        <img
                          src={newImage}
                          alt="Product preview"
                          className="size-14 rounded-lg object-cover border border-slate-300 shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase block">
                            Active Preview Selected
                          </span>
                          <span className="text-xs font-semibold text-slate-900 truncate block">
                            {newTitle || "New Product Item"}
                          </span>
                          <span className="text-[9.5px] text-slate-500 font-mono">
                            Ready for catalog publish
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddProduct(false)}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#52735B] text-white hover:bg-[#43604b] text-xs font-bold uppercase"
                  >
                    Save Product to Catalog
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Add / Edit Banner Modal Overlay */}
        {showAddBanner && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
            <Card className="w-full max-w-2xl border-slate-200 bg-white text-slate-900 shadow-2xl max-h-[92vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <CardTitle className="text-base font-bold uppercase text-slate-900 flex items-center gap-2">
                    <Megaphone className="size-4 text-[#52735B]" />
                    {editingBannerId ? "Edit Promotional Banner" : "Post New Promotional Banner"}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Deploy occasional offers, sale campaigns, and discount vouchers to the homepage.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setShowAddBanner(false)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>

              <form onSubmit={handleSaveBannerSubmit}>
                <CardContent className="space-y-4 pt-4">
                  {/* Banner Type & Theme Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Campaign / Banner Type
                      </label>
                      <select
                        value={bannerFormType}
                        onChange={(e) => {
                          const t = e.target.value as BannerType;
                          setBannerFormType(t);
                          if (t === "occasional") {
                            setBannerFormBadge("AVURUDU & EID FESTIVE DROP");
                            setBannerFormTheme("sage");
                          } else if (t === "sale") {
                            setBannerFormBadge("MID-SEASON ARCHIVE SALE");
                            setBannerFormTheme("terracotta");
                          } else if (t === "offer") {
                            setBannerFormBadge("WEEKEND BUNDLE OFFER");
                            setBannerFormTheme("gold");
                          } else {
                            setBannerFormBadge("LIMITED FLASH DROP");
                            setBannerFormTheme("crimson");
                          }
                        }}
                        className="w-full h-8.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:border-[#52735B] focus:outline-none font-medium"
                      >
                        <option value="occasional">Occasional / Festive Banner (Avurudu, Eid, Seasonal)</option>
                        <option value="sale">Sale Banner (Archive, Clearance, Markdown)</option>
                        <option value="offer">Offer Banner (Bundle, BOGO, Voucher Deal)</option>
                        <option value="flash_drop">Flash Drop (Limited Time, 24h Window)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Color Theme Palette
                      </label>
                      <select
                        value={bannerFormTheme}
                        onChange={(e) => setBannerFormTheme(e.target.value as BannerTheme)}
                        className="w-full h-8.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:border-[#52735B] focus:outline-none font-medium"
                      >
                        <option value="sage">Sage Green & Cypress (Artisanal Earth)</option>
                        <option value="terracotta">Terracotta Rust (Warm Sunset Clay)</option>
                        <option value="gold">Obsidian Gold (Royal Sri Lankan Luxe)</option>
                        <option value="crimson">Velvet Crimson (Deep Scarlet Couture)</option>
                        <option value="charcoal">Slate Obsidian (Minimalist Cyber Noir)</option>
                      </select>
                    </div>
                  </div>

                  {/* Badge & Headline */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Occasion / Badge Label
                      </label>
                      <Input
                        type="text"
                        required
                        value={bannerFormBadge}
                        onChange={(e) => setBannerFormBadge(e.target.value)}
                        placeholder="e.g. AVURUDU FESTIVE DROP"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Banner Headline / Title
                      </label>
                      <Input
                        type="text"
                        required
                        value={bannerFormTitle}
                        onChange={(e) => setBannerFormTitle(e.target.value)}
                        placeholder="e.g. Festive Atelier Curation"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Subtitle / Copy */}
                  <div>
                    <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                      Banner Subtitle / Promotional Story
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={bannerFormSubtitle}
                      onChange={(e) => setBannerFormSubtitle(e.target.value)}
                      placeholder="Celebrate in contemporary heritage with handloom sarongs and structured oversized essentials..."
                      className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs text-slate-900 focus:border-[#52735B] focus:outline-none"
                    />
                  </div>

                  {/* Discount Highlight & Coupon Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Discount Highlight Tag
                      </label>
                      <Input
                        type="text"
                        value={bannerFormDiscountTag}
                        onChange={(e) => setBannerFormDiscountTag(e.target.value)}
                        placeholder="e.g. FLAT 25% OFF"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Promo Coupon Code
                      </label>
                      <Input
                        type="text"
                        value={bannerFormPromoCode}
                        onChange={(e) => setBannerFormPromoCode(e.target.value.toUpperCase())}
                        placeholder="e.g. FESTIVE25"
                        className="bg-white border-slate-300 text-xs text-slate-900 font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                        Button Action Text
                      </label>
                      <Input
                        type="text"
                        value={bannerFormButtonText}
                        onChange={(e) => setBannerFormButtonText(e.target.value)}
                        placeholder="e.g. Shop Festive Drop"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Image Selection Section */}
                  <div className="space-y-2 border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[9.5px] font-bold tracking-widest text-slate-700 uppercase block">
                        Banner Background Artwork
                      </label>
                      <span className="text-[9px] text-[#52735B] font-mono font-bold uppercase">
                        Select from studio photography or enter custom URL
                      </span>
                    </div>

                    {/* Mode Selector */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setBannerImageSourceMode("preset")}
                        className={cn(
                          "py-1 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          bannerImageSourceMode === "preset"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <ImageIcon className="size-3" /> Preset Gallery
                      </button>

                      <button
                        type="button"
                        onClick={() => setBannerImageSourceMode("url")}
                        className={cn(
                          "py-1 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          bannerImageSourceMode === "url"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <LinkIcon className="size-3" /> Image URL
                      </button>

                      <button
                        type="button"
                        onClick={() => setBannerImageSourceMode("upload")}
                        className={cn(
                          "py-1 px-2 text-[10px] font-bold uppercase rounded-md transition-all flex items-center justify-center gap-1",
                          bannerImageSourceMode === "upload"
                            ? "bg-white text-slate-900 shadow-2xs"
                            : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        <Upload className="size-3" /> Upload File
                      </button>
                    </div>

                    {/* Preset Image Grid */}
                    {bannerImageSourceMode === "preset" && (
                      <div className="grid grid-cols-5 gap-2 pt-1">
                        {PRESET_STORE_IMAGES.map((imgItem) => (
                          <button
                            key={imgItem.url}
                            type="button"
                            onClick={() => setBannerFormBgImage(imgItem.url)}
                            className={cn(
                              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                              bannerFormBgImage === imgItem.url
                                ? "border-[#52735B] ring-2 ring-[#52735B]/40 scale-105"
                                : "border-slate-200 opacity-70 hover:opacity-100"
                            )}
                            title={imgItem.name}
                          >
                            <img src={imgItem.url} alt={imgItem.name} className="size-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* URL Entry */}
                    {bannerImageSourceMode === "url" && (
                      <Input
                        type="url"
                        value={bannerCustomUrl}
                        onChange={(e) => {
                          setBannerCustomUrl(e.target.value);
                          if (e.target.value.trim()) {
                            setBannerFormBgImage(e.target.value.trim());
                          }
                        }}
                        placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                        className="bg-white border-slate-300 text-xs text-slate-900"
                      />
                    )}

                    {/* File Upload */}
                    {bannerImageSourceMode === "upload" && (
                      <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                        <label className="cursor-pointer block">
                          <Upload className="size-6 text-[#52735B] mx-auto mb-1.5" />
                          <span className="text-xs font-bold text-slate-800 block">
                            Click to browse image from computer
                          </span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">
                            PNG, JPG, WEBP recommended (1920x1080)
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (typeof event.target?.result === "string") {
                                    setBannerFormBgImage(event.target.result);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}

                    {/* Live Visual Preview Box */}
                    {bannerFormBgImage && (
                      <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 mt-2">
                        <img
                          src={bannerFormBgImage}
                          alt="Banner preview"
                          className="size-16 rounded-lg object-cover border border-slate-300 shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase block">
                            {bannerFormBadge || "PROMO BANNER"}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {bannerFormTitle || "Banner Headline Preview"}
                          </span>
                          <span className="text-[9.5px] text-slate-500 font-mono">
                            Promo: {bannerFormPromoCode || "None"} • {bannerFormDiscountTag || "Active"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Toggle & Terms */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bannerFormIsActive}
                        onChange={(e) => setBannerFormIsActive(e.target.checked)}
                        className="size-4 rounded border-slate-300 text-[#52735B] focus:ring-[#52735B]"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Publish & Activate immediately on Storefront
                      </span>
                    </label>

                    <div className="flex-1 max-w-xs">
                      <Input
                        type="text"
                        value={bannerFormTerms}
                        onChange={(e) => setBannerFormTerms(e.target.value)}
                        placeholder="Terms & Conditions note"
                        className="bg-white border-slate-300 text-[10px] text-slate-600 h-7"
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddBanner(false)}
                    className="text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#52735B] text-white hover:bg-[#43604b] text-xs font-bold uppercase"
                  >
                    {editingBannerId ? "Save Changes" : "Deploy Banner to Storefront"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
