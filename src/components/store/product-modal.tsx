"use client";

import { useState, useEffect } from "react";
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import { cn } from "cn";
import { money, type Product } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedImgIndex(0);
    setSelectedSize(
      ["accessories", "perfumes", "household"].includes(product?.cat ?? "")
        ? "ONE SIZE"
        : "M"
    );
    setQty(1);
    setAdded(false);
  }, [product]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const currentImage = images[selectedImgIndex] || product.image;

  const isSingleSize = ["accessories", "perfumes", "household"].includes(product.cat);
  const sizes = isSingleSize ? ["ONE SIZE"] : ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      add(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex max-h-[90vh] sm:max-h-[88vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-2.5 right-2.5 z-30 grid size-8 sm:size-9 place-items-center rounded-full border border-border/80 bg-background/80 text-foreground backdrop-blur-md transition-all hover:bg-background active:scale-95"
        >
          <X className="size-4" />
        </button>

        {/* Left Column: Multi-Image Gallery */}
        <div className="flex flex-col bg-muted/20 p-3 sm:p-4 md:w-1/2 md:p-6 justify-between shrink-0">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-card border border-border/50">
            <img
              src={currentImage}
              alt={product.name}
              className="size-full object-cover transition-all duration-500"
            />

            {/* Gallery Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImgIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 grid size-7 sm:size-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/70 active:scale-95"
                >
                  <ChevronLeft className="size-3.5 sm:size-4" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImgIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid size-7 sm:size-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-black/70 active:scale-95"
                >
                  <ChevronRight className="size-3.5 sm:size-4" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
              {product.tag && (
                <span className="rounded-full bg-[#52735B] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[9px] font-bold tracking-widest text-white uppercase shadow-xs">
                  {product.tag}
                </span>
              )}
              {product.handloom && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[9px] font-bold tracking-widest text-white uppercase shadow-xs">
                  <Award className="size-2.5" /> Handloom
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-3 sm:mt-4 flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={cn(
                    "relative aspect-square w-12 sm:w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    selectedImgIndex === idx
                      ? "border-[#52735B] ring-2 ring-[#52735B]/30 opacity-100 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8 justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              <span>SYMI // {product.cat}</span>
              <span>MOD-{String(product.id).padStart(3, "0")}</span>
            </div>

            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">
              {product.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-semibold text-xl text-foreground">
                {money(product.price)}
              </span>
              {product.was && (
                <s className="text-sm text-muted-foreground">
                  {money(product.was)}
                </s>
              )}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {product.note}. Crafted at the SYMI atelier in Beruwala, Sri Lanka. Designed for longevity with reinforced seams and premium finishes.
            </p>

            {/* Size Picker (Apparel Only) */}
            {!isSingleSize && (
              <div className="mt-6">
                <div className="flex justify-between text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  <span>Select Size</span>
                  <span className="cursor-pointer underline">Size Guide</span>
                </div>
                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "rounded-md border py-2 text-[10px] font-bold tracking-widest uppercase transition-all",
                        selectedSize === size
                          ? "border-[#52735B] bg-[#52735B] text-white shadow-xs"
                          : "border-border bg-card text-foreground hover:border-foreground/40"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center justify-between border-y border-border/60 py-4">
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                Quantity
              </span>
              <div className="flex items-center rounded-md border border-border bg-card">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold text-foreground hover:bg-muted"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-1 text-sm font-bold text-foreground hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-sm py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-md active:scale-98",
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#52735B] text-white hover:bg-[#43604b]"
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" /> Added to Bag ({qty})
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" /> Add to Bag — {money(product.price * qty)}
                </>
              )}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-border bg-card py-3 text-[10px] font-bold tracking-[0.16em] uppercase text-foreground transition-all hover:bg-muted"
              >
                <Heart
                  className={cn(
                    "size-3.5",
                    isWishlisted ? "fill-[#C06845] text-[#C06845]" : ""
                  )}
                />
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            {/* Value Props */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[8.5px] font-medium text-muted-foreground uppercase">
              <div className="flex flex-col items-center gap-1">
                <Truck className="size-3.5 text-[#52735B]" />
                <span>Islandwide Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="size-3.5 text-[#52735B]" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="size-3.5 text-[#52735B]" />
                <span>Easy Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
