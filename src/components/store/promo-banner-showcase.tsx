"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Tag,
  Clock,
  Copy,
  Check,
  ArrowRight,
  Flame,
  Gift,
  Percent,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { cn } from "cn";
import {
  type PromoBanner,
  type BannerType,
  getStoredBanners,
} from "@/lib/banners";

export function PromoBannerShowcase({
  onSelectCategory,
  onOpenAdmin,
}: {
  onSelectCategory?: (category: string) => void;
  onOpenAdmin?: () => void;
}) {
  const [banners, setBanners] = useState<PromoBanner[]>(getStoredBanners());
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Live countdown timer ticker
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  // Listen for admin banner updates in real-time
  useEffect(() => {
    const handleUpdate = () => {
      const updated = getStoredBanners();
      setBanners(updated);
    };
    window.addEventListener("symi_banners_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("symi_banners_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Filter only active banners
  const activeBanners = useMemo(() => {
    const activeOnly = banners.filter((b) => b.isActive);
    return activeOnly.length > 0 ? activeOnly : banners;
  }, [banners]);

  // Ensure activeIndex is valid
  useEffect(() => {
    if (activeIndex >= activeBanners.length) {
      setActiveIndex(0);
    }
  }, [activeBanners.length, activeIndex]);

  // AUTO-SCROLL ANIMATION INTERVAL (Smooth auto-advance every 5 seconds)
  useEffect(() => {
    if (activeBanners.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeBanners.length, isHovered]);

  // Countdown timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getTypeIcon = (type: BannerType) => {
    switch (type) {
      case "sale":
        return <Flame className="size-3.5 text-[#C06845]" />;
      case "occasional":
        return <Gift className="size-3.5 text-[#8BA894]" />;
      case "offer":
        return <Percent className="size-3.5 text-amber-400" />;
      case "flash_drop":
        return <Zap className="size-3.5 text-emerald-400" />;
      default:
        return <Tag className="size-3.5 text-[#8BA894]" />;
    }
  };

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case "terracotta":
        return "from-[#C06845]/20 via-black/80 to-[#12100E]";
      case "sage":
        return "from-[#52735B]/25 via-black/80 to-[#0E1410]";
      case "gold":
        return "from-amber-600/20 via-black/80 to-[#14120E]";
      case "crimson":
        return "from-rose-950/30 via-black/80 to-[#140E10]";
      default:
        return "from-[#222724] via-black/80 to-[#101311]";
    }
  };

  const getThemeAccentBorder = (theme: string) => {
    switch (theme) {
      case "terracotta":
        return "border-[#C06845]/40 text-[#C06845] bg-[#C06845]/15";
      case "sage":
        return "border-[#52735B]/50 text-[#8BA894] bg-[#52735B]/15";
      case "gold":
        return "border-amber-500/40 text-amber-300 bg-amber-500/15";
      case "crimson":
        return "border-rose-500/40 text-rose-300 bg-rose-500/15";
      default:
        return "border-white/20 text-white/80 bg-white/10";
    }
  };

  if (!activeBanners.length) return null;

  return (
    <section
      id="promotions"
      aria-label="Promotional Banners"
      className="py-6 sm:py-10 lg:py-12 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Animated Carousel Track Wrapper */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/15 bg-[#141715] text-white shadow-xl">
          {/* Horizontal Slide Reel */}
          <div
            className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {activeBanners.map((banner, index) => (
              <div
                key={banner.id}
                className="w-full shrink-0 min-w-full"
                aria-hidden={activeIndex !== index}
              >
                <div className="grid lg:grid-cols-12 min-h-[460px] sm:min-h-[500px]">
                  {/* Left Column: Promotion Copy, Coupon & Countdown */}
                  <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:col-span-7">
                    <div>
                      {/* Badge Tag & Discount Highlight */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[9.5px] font-extrabold tracking-[0.2em] uppercase backdrop-blur-md shadow-xs",
                            getThemeAccentBorder(banner.theme)
                          )}
                        >
                          {getTypeIcon(banner.type)}
                          {banner.badge}
                        </span>

                        {banner.discountTag && (
                          <span className="rounded-full bg-white px-3 py-0.5 text-[9.5px] font-black tracking-widest text-black uppercase shadow-xs">
                            {banner.discountTag}
                          </span>
                        )}
                      </div>

                      {/* Main Headline */}
                      <h2 className="display-tight mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-black tracking-tight text-white uppercase leading-[1.02]">
                        {banner.title}
                      </h2>

                      {/* Subtitle description */}
                      <p className="mt-3.5 max-w-xl text-xs sm:text-sm leading-relaxed text-white/80 font-normal">
                        {banner.subtitle}
                      </p>

                      {/* Live Countdown Timer */}
                      <div className="mt-6 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#8BA894] uppercase">
                          <Clock className="size-3 text-emerald-400" />
                          <span>Limited Window:</span>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-xs font-bold text-white">
                          <span className="rounded-md bg-white/10 px-2 py-1">
                            {String(timeLeft.days).padStart(2, "0")}d
                          </span>
                          <span className="text-white/40">:</span>
                          <span className="rounded-md bg-white/10 px-2 py-1">
                            {String(timeLeft.hours).padStart(2, "0")}h
                          </span>
                          <span className="text-white/40">:</span>
                          <span className="rounded-md bg-white/10 px-2 py-1">
                            {String(timeLeft.minutes).padStart(2, "0")}m
                          </span>
                          <span className="text-white/40">:</span>
                          <span className="rounded-md bg-[#52735B] px-2 py-1 text-white animate-pulse">
                            {String(timeLeft.seconds).padStart(2, "0")}s
                          </span>
                        </div>
                      </div>

                      {/* Promo Coupon Code & CTA Button */}
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        {banner.promoCode && (
                          <div className="flex items-center rounded-xl border border-white/20 bg-white/10 p-1.5 backdrop-blur-md">
                            <div className="px-3 text-[10px] font-bold tracking-widest text-white/60 uppercase">
                              Code:
                            </div>
                            <span className="px-2 font-mono text-sm font-extrabold tracking-wider text-emerald-300">
                              {banner.promoCode}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(banner.promoCode)}
                              className={cn(
                                "ml-1 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[9.5px] font-bold tracking-wider uppercase transition-all duration-200 active:scale-95",
                                copiedCode === banner.promoCode
                                  ? "bg-emerald-500 text-white shadow-sm"
                                  : "bg-white/15 text-white hover:bg-white/25"
                              )}
                            >
                              {copiedCode === banner.promoCode ? (
                                <>
                                  <Check className="size-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        <a
                          href={banner.buttonLink || "#latest"}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-[10.5px] font-bold tracking-[0.18em] text-black uppercase shadow-lg transition-all duration-300 hover:bg-[#52735B] hover:text-white hover:shadow-emerald-950/50 hover:scale-[1.02] active:scale-95"
                        >
                          <span>{banner.buttonText || "Shop Collection"}</span>
                          <ArrowRight className="size-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Bottom Highlights & Terms */}
                    <div className="mt-8 border-t border-white/10 pt-5">
                      <div className="grid grid-cols-3 gap-3">
                        {(banner.highlightStats || [
                          { label: "Direct Courier", value: "Islandwide" },
                          { label: "Fabric Weight", value: "Premium" },
                          { label: "Stock Batch", value: "Limited" },
                        ]).map((stat, i) => (
                          <div key={i} className="border-l border-white/10 pl-3">
                            <div className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
                              {stat.value}
                            </div>
                            <div className="text-[8.5px] font-semibold tracking-wider text-white/50 uppercase">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {banner.terms && (
                        <p className="mt-3.5 text-[9px] text-white/40 italic">
                          {banner.terms}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Artwork & Imagery */}
                  <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-full lg:col-span-5 overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src={banner.bgImage || "/images/symi-festive-ethnic-anarkali-dresses.jpg"}
                        alt={banner.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover object-center transition-all duration-1000 ease-out hover:scale-105"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent lg:bg-linear-to-r lg:from-black lg:via-black/30 lg:to-transparent" />
                      <div
                        className={cn(
                          "absolute inset-0 opacity-40 mix-blend-color",
                          getThemeGradient(banner.theme)
                        )}
                      />
                    </div>

                    {/* Corner Verified Drop Badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] font-bold tracking-widest text-white/90 uppercase backdrop-blur-md">
                      <ShieldCheck className="size-3 text-emerald-400" />
                      <span>Verified Drop</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Animated Slide Indicators */}
        {activeBanners.length > 1 && (
          <div className="mt-3.5 flex items-center justify-center gap-2">
            {activeBanners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  activeIndex === index
                    ? "w-8 bg-[#52735B]"
                    : "w-2 bg-slate-300 dark:bg-white/25 hover:bg-slate-400"
                )}
                aria-label={`Go to banner slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
