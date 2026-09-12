"use client";

import { useState } from "react";
import { Heart, Check, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "cn";
import { Art } from "@/lib/art";
import { money, type Product } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

const SIZES_APPAREL = ["S", "M", "L", "XL"];

// Curated artisanal colorway palettes: Espresso, Sage, Terracotta, Raw Linen & Ochre
const COLORWAYS: Record<number, string[]> = {
  1: ["#24201C", "#ECE5D8", "#52735B"], // Heavyweight Tee: Espresso, Warm Linen, Sage
  2: ["#2D352E", "#424D44", "#8BA894"], // Bomber: Cypress Slate, Olive Moss, Sage
  3: ["#ECE5D8", "#C06845", "#24201C"], // Overshirt: Raw Linen, Terracotta, Espresso
  4: ["#1E1C1A", "#52735B", "#EDE7DC"], // Cap: Dark Espresso, Sage, Sand
  5: ["#C06845", "#A84D2B", "#D4A853"], // Bandana: Terracotta Clay, Rust, Loom Gold
  6: ["#303E34", "#52735B", "#F7F4EC"], // Polo: Deep Forest, Sage, Warm Linen
  7: ["#F8F5EE", "#EDE7DC", "#8BA894"], // Kamis: Raw Linen, Warm Ecru, Sage
  8: ["#2E332B", "#4A5245", "#7D8874"], // Cargo: Dark Olive, Cypress, Lichen
  9: ["#6E7A70", "#8BA894", "#E1DBD0"], // Hoodie: Weathered Sage, Mist, Oat
  10: ["#1A1715", "#3D322B", "#C06845"], // Midi Dress: Espresso, Warm Umber, Terracotta
  11: ["#3D4A3F", "#1E1C1A", "#EDE7DC"], // Track Jacket: Alpine Cypress, Espresso, Linen
  12: ["#EDE7DC", "#D6CDBF", "#C06845"], // Tote: Natural Canvas, Sand, Clay
  13: ["#4A443E", "#ECE5D8", "#52735B"], // Boxy Raw Edge: Smoked Umber, Linen, Sage
  14: ["#2A2521", "#5C5248", "#8A7D6F"], // Pleated Trouser: Dark Espresso, Warm Taupe, Sandstone
  15: ["#C06845", "#D4A853", "#F0EAD6"], // Handwoven Studio: Terracotta, Amber Ochre, Raw Silk
  16: ["#1C1917", "#323B33", "#8BA894"], // Monogram Zip Hoodie: Roasted Espresso, Cypress, Sage
};

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect?: (product: Product) => void;
}) {
  const { add } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const off = product.was
    ? Math.round((1 - product.price / product.was) * 100)
    : 0;

  const isAccessory = product.cat === "accessories";
  const sizes = isAccessory ? ["ONE SIZE"] : SIZES_APPAREL;
  const swatches = COLORWAYS[product.id] || ["#24201C", "#52735B", "#ECE5D8"];

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
    }, 1600);
  };

  return (
    <article
      onClick={() => onSelect?.(product)}
      className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/60 p-2 sm:p-2.5 transition-all duration-400 ease-out hover:border-foreground/30 hover:bg-card hover:shadow-xl hover:-translate-y-1.5 cursor-pointer"
    >
      {/* 1. Media Artwork / Inset Frame */}
      <div className="relative aspect-3/4 sm:aspect-4/5 w-full overflow-hidden rounded-xl bg-card">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <Art
            kind={product.art}
            seed={product.id + selectedColorIndex * 13}
            label={product.name}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}

        {/* Ambient Gradient Overlay for Contrast */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top Badges (Left) */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.tag === "New" && (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-emerald-500/30 bg-[#162018]/85 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-emerald-300 backdrop-blur-md shadow-xs">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              NEW DROP
            </span>
          )}

          {(product.tag === "Sale" || product.was) && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#C06845]/40 bg-[#A84D2B]/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#FDF4EC] backdrop-blur-md shadow-xs">
              SALE {off > 0 ? `· -${off}%` : ""}
            </span>
          )}

          {product.handloom && (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-amber-500/30 bg-[#351E0E]/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-amber-200 backdrop-blur-md shadow-xs">
              <Sparkles className="size-2 sm:size-2.5 text-amber-400" />
              HANDLOOM
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-2 right-2 z-10 grid size-7 sm:size-8 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-black/75 active:scale-90"
        >
          <Heart
            className={cn(
              "size-3 sm:size-3.5 transition-all duration-200",
              isWishlisted
                ? "fill-[#C06845] text-[#C06845] scale-110"
                : "text-white/80 hover:text-white"
            )}
          />
        </button>

        {/* Technical Coordinate Watermark (Subtle Luxury Stamp) */}
        <div className="pointer-events-none absolute right-2.5 bottom-2.5 hidden font-mono text-[8px] tracking-[0.2em] uppercase text-white/45 transition-opacity duration-300 group-hover:opacity-0 sm:block">
          MOD-{String(product.id).padStart(3, "0")}
        </div>

        {/* 2. Interactive Floating Quick-Add Dock (Slides Up on Hover) */}
        <div className="absolute inset-x-2 bottom-2 z-20 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="flex flex-col gap-1.5 rounded-xl border border-white/15 bg-[#181512]/90 p-2 backdrop-blur-md shadow-xl">
            {addedSize ? (
              <div className="flex items-center justify-center gap-1.5 py-1.5 text-center text-[10px] font-bold tracking-[0.2em] text-emerald-300 uppercase">
                <Check className="size-3.5 text-emerald-400" />
                <span>Added to Bag ({addedSize})</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-1 text-[8.5px] font-bold tracking-[0.2em] text-[#EFE7DC]/70 uppercase">
                  <span>Quick Add</span>
                  <span className="text-[8px] text-[#8BA894]">1-Click</span>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => handleQuickAdd(size, e)}
                      className={cn(
                        "rounded-md border border-white/15 bg-white/10 py-1.5 text-center text-[9.5px] font-bold tracking-[0.14em] text-[#F8F5EE] uppercase transition-all duration-150 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white hover:scale-105 active:scale-95",
                        isAccessory && "col-span-4 py-2 flex items-center justify-center gap-1.5"
                      )}
                    >
                      {isAccessory && <ShoppingBag className="size-3" />}
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Product Editorial Info */}
      <div className="mt-2.5 flex flex-col px-1 pb-1">
        {/* Spec Eyebrow & Swatches */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-mono text-[9px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {product.note}
          </span>

          {/* Colorway Swatches */}
          <div className="flex items-center gap-1 shrink-0" title="Available tones">
            {swatches.map((color, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Select tone ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={cn(
                  "size-2.5 rounded-full transition-all duration-200",
                  selectedColorIndex === idx
                    ? "ring-1 ring-foreground scale-125"
                    : "opacity-60 hover:opacity-100 hover:scale-110"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mt-1 font-heading text-[13.5px] sm:text-[14px] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/90 uppercase line-clamp-1">
          {product.name}
        </h3>

        {/* Price & Category Footer */}
        <div className="mt-1.5 flex items-baseline justify-between gap-2 border-t border-border/50 pt-1.5">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-[13px] tracking-tight text-foreground">
              {money(product.price)}
            </span>
            {product.was ? (
              <s className="text-[11px] text-muted-foreground">
                {money(product.was)}
              </s>
            ) : null}
          </div>

          <span className="font-mono text-[8.5px] font-medium tracking-[0.16em] text-muted-foreground/80 uppercase">
            SYMI // {product.cat}
          </span>
        </div>
      </div>
    </article>
  );
}
