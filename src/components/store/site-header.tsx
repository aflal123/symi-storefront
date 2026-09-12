"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "cn";
import { NAV, CATEGORIES, money } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";
import { Wordmark } from "@/components/store/wordmark";
import { SearchModal } from "@/components/store/search-modal";

export function SiteHeader({
  onOpenAdmin,
  onSelectProduct,
  onSelectCategory,
}: {
  onOpenAdmin?: () => void;
  onSelectProduct?: (product: any) => void;
  onSelectCategory?: (catKey: string) => void;
}) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrolledFar, setScrolledFar] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("New Arrivals");
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (label: string, e: React.MouseEvent) => {
    setActiveSection(label);
    const key = label.toLowerCase();

    if (["men", "women", "accessories", "perfumes", "household"].includes(key)) {
      if (onSelectCategory) {
        onSelectCategory(key);
      }
    } else if (label === "Sale") {
      if (onSelectCategory) {
        onSelectCategory("all");
      }
    }

    // Smooth scroll to target section
    const targetId = label === "New Arrivals" ? "arrivals" : "latest";
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll detection for dynamic navigation bar animations
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 15);
      setScrolledFar(currentScrollY > 100);

      if (currentScrollY > 200 && currentScrollY > lastScrollY + 5) {
        setHidden(true); // Hide when scrolling down fast
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY < 100) {
        setHidden(false); // Reveal when scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500 ease-out",
          hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
          scrolled
            ? "border-b border-border/80 bg-background/90 backdrop-blur-xl shadow-md"
            : "border-b border-transparent bg-background/70 backdrop-blur-md"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1360px] items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 transition-all duration-500",
            scrolled ? "h-16 sm:h-18" : "h-18 sm:h-24"
          )}
        >
          {/* Brand Wordmark (Left) */}
          <a
            href="#top"
            aria-label="SYMI home"
            className="shrink-0 transition-transform duration-300 hover:scale-102 hover:opacity-90 max-w-[140px] sm:max-w-none overflow-hidden"
          >
            <Wordmark />
          </a>

          {/* Navigation Links with Smooth Active Glider & Megamenu (Center) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-7 xl:gap-11 mx-6 relative">
            {NAV.map((label) => {
              const href =
                (label as string) === "New Arrivals"
                  ? "#arrivals"
                  : "#latest";

              const hasMega = (label as string) === "New Arrivals" || (label as string) === "Men" || (label as string) === "Women" || (label as string) === "Accessories";

              return (
                <div
                  key={label}
                  className="relative py-4"
                  onMouseEnter={() => hasMega && setActiveMegamenu(label)}
                  onMouseLeave={() => setActiveMegamenu(null)}
                >
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(label, e)}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 text-[12.5px] xl:text-[13.5px] font-bold tracking-[0.2em] uppercase transition-all duration-300",
                      activeSection === label
                        ? "text-[#52735B]"
                        : "text-foreground/80 hover:text-[#52735B]"
                    )}
                  >
                    <span>{label}</span>
                    {hasMega && (
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-200",
                          activeMegamenu === label ? "rotate-180 text-[#52735B]" : "opacity-60"
                        )}
                      />
                    )}

                    {/* Active Underline Pill Animation */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#52735B] transition-all duration-300 ease-out",
                        activeSection === label
                          ? "opacity-100 scale-x-100 shadow-[0_0_8px_rgba(82,115,91,0.5)]"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-75"
                      )}
                    />
                  </a>

                  {/* Megamenu Dropdown Drawer */}
                  {hasMega && activeMegamenu === label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] rounded-2xl border border-border bg-[#181512]/95 p-6 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#52735B] uppercase flex items-center gap-1.5">
                          <Sparkles className="size-3" /> SYMI Atelier // {label}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">
                          Handcrafted in Sri Lanka
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-3">
                        {CATEGORIES.map((cat) => (
                          <a
                            key={cat.key}
                            href="#latest"
                            onClick={() => {
                              setActiveMegamenu(null);
                              onSelectCategory?.(cat.key);
                            }}
                            className="group/item flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2 transition-all hover:border-[#52735B] hover:bg-black/80 hover:scale-105"
                          >
                            <div className="aspect-square w-full overflow-hidden rounded-lg bg-card">
                              {cat.image ? (
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="size-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                                />
                              ) : null}
                            </div>
                            <span className="mt-2 text-center text-[10px] font-bold tracking-wider text-white uppercase line-clamp-1">
                              {cat.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Icons & Admin Toggle (Right) */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="group relative inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#52735B]/40 bg-[#52735B]/10 px-2.5 sm:px-3.5 py-1.5 text-[8.5px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#52735B] backdrop-blur-md transition-all duration-300 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white hover:shadow-lg active:scale-95"
            >
              <User className="size-3 sm:size-3.5 transition-transform group-hover:rotate-12" />
              <span className="hidden xs:inline">Admin</span>
              <span className="xs:hidden">Admin</span>
            </button>

            {/* Search Trigger */}
            <IconButton label="Search Store" onClick={() => setSearchOpen(true)}>
              <Search className="size-[18px] sm:size-[22px]" strokeWidth={1.8} />
            </IconButton>

            {/* Wishlist */}
            <IconButton label="Wishlist" className="hidden sm:inline-grid">
              <Heart className="size-[20px] sm:size-[22px]" strokeWidth={1.8} />
            </IconButton>

            {/* Mobile Menu Trigger */}
            <IconButton
              label="Menu"
              className="lg:hidden"
              onClick={() => setMenu(true)}
            >
              <Menu className="size-5 sm:size-6" strokeWidth={1.8} />
            </IconButton>

            {/* Shopping Bag Button */}
            <IconButton
              label={`Bag, ${count} items`}
              onClick={() => setOpen(true)}
              className="relative"
            >
              <ShoppingBag className="size-[18px] sm:size-[22px]" strokeWidth={1.8} />
              {count > 0 ? (
                <span className="absolute -top-1 -right-1 grid min-h-4 min-w-4 sm:min-h-5 sm:min-w-5 place-items-center rounded-full bg-[#C06845] px-1 sm:px-1.5 text-[9px] sm:text-[10px] font-black text-white ring-2 ring-background animate-in zoom-in-50 duration-200">
                  {count}
                </span>
              ) : null}
            </IconButton>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={onSelectProduct}
      />

      {/* Mobile Drawer Menu */}
      {menu ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#141210]/98 p-4 sm:p-6 text-foreground overflow-y-auto max-h-screen backdrop-blur-2xl animate-in slide-in-from-right duration-300 lg:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
            <Wordmark />
            <button
              aria-label="Close menu"
              onClick={() => setMenu(false)}
              className="grid size-10 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 active:scale-95"
            >
              <X className="size-5 sm:size-6" strokeWidth={1.8} />
            </button>
          </div>

          <nav className="my-6 grid gap-1 flex-1">
            {NAV.map((label) => (
              <a
                key={label}
                href="#latest"
                onClick={(e) => {
                  setMenu(false);
                  handleNavClick(label, e);
                }}
                className="flex items-center justify-between border-b border-white/10 py-3.5 sm:py-4 font-display text-xl sm:text-2xl font-bold tracking-widest text-white uppercase transition-colors hover:text-[#52735B] active:text-[#52735B]"
              >
                <span>{label}</span>
                <ArrowRight className="size-4 sm:size-5 text-[#52735B]" />
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-4 sm:pt-6 flex flex-col gap-3 shrink-0">
            <button
              onClick={() => {
                setMenu(false);
                onOpenAdmin?.();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#52735B] py-3 sm:py-3.5 text-xs font-bold tracking-widest text-white uppercase shadow-lg active:scale-95"
            >
              <User className="size-4" /> Open Admin Portal
            </button>
            <div className="flex items-center justify-center gap-2 font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
              <img src="/images/symi-official-logo.png" alt="SYMI" className="size-4 rounded-full" />
              <span>SYMI Atelier · Beruwala, Sri Lanka</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function IconButton({
  label,
  children,
  className,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative grid size-10 sm:size-11 place-items-center rounded-full transition-all duration-300 hover:bg-foreground/10 active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}
