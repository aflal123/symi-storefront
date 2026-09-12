"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { PRODUCTS, money, type Product } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

export function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { add } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.note.toLowerCase().includes(query.toLowerCase()) ||
          p.cat.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const trendingTags = ["Clutch", "Gold", "Quilted", "Woven", "Crystal", "Pink", "Shoulder Bag"];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/85 p-4 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="mx-auto w-full max-w-3xl pt-8 sm:pt-16">
        {/* Top Search Input Bar */}
        <div className="relative flex items-center border-b border-white/20 pb-4">
          <Search className="size-6 text-[#52735B]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search 278 luxury clutches, handbags, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent px-4 font-display text-lg sm:text-2xl font-bold tracking-wide text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-all hover:bg-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Trending Keywords */}
        {!query.trim() && (
          <div className="mt-8">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
              <TrendingUp className="size-3.5 text-[#52735B]" />
              <span>Trending Searches</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 transition-all hover:border-[#52735B] hover:bg-[#52735B] hover:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query.trim() !== "" && (
          <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3">
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
              Found {results.length} item(s) for &ldquo;{query}&rdquo;
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct?.(product);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-[#52735B] hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="size-14 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-heading text-xs font-semibold text-white uppercase line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="mt-1 font-semibold text-xs text-emerald-400">
                          {money(product.price)}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-white/40" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-white/50">
                No matching items found. Try searching for &ldquo;Clutch&rdquo; or &ldquo;Bag&rdquo;.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
