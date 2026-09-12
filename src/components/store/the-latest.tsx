"use client";

import { useState } from "react";
import { ChevronDown, Filter, Sparkles } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Product, type ProductCategory } from "@/lib/site";
import { Section, Shell, SectionHeading } from "@/components/store/section";
import { ProductCard } from "@/components/store/product-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "cn";

export function TheLatest({
  selectedCategory = "all",
  onSelectCategory,
  onSelectProduct,
}: {
  selectedCategory?: string;
  onSelectCategory?: (catKey: string) => void;
  onSelectProduct?: (product: Product) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory);
  const [limit, setLimit] = useState(16);

  // Sync internal activeTab if prop changes
  const currentCategory = selectedCategory !== "all" ? selectedCategory : activeTab;

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (onSelectCategory) {
      onSelectCategory(key);
    }
  };

  // STRICT CATEGORY FILTERING LOGIC:
  // Each category contains ONLY its products.
  const filteredProducts = PRODUCTS.filter((product) => {
    if (currentCategory === "all") return true;
    if (currentCategory === "men") return product.cat === "men" || product.cat === "unisex";
    if (currentCategory === "women") return product.cat === "women" || product.cat === "unisex";
    return product.cat === currentCategory;
  });

  const visibleProducts = filteredProducts.slice(0, limit);
  const hasMore = limit < filteredProducts.length;

  const filterTabs = [
    { key: "all", label: "All Items", count: PRODUCTS.length },
    ...CATEGORIES.map((c) => ({
      key: c.key,
      label: c.name,
      count: PRODUCTS.filter((p) =>
        c.key === "men" || c.key === "women"
          ? p.cat === c.key || p.cat === "unisex"
          : p.cat === c.key
      ).length,
    })),
  ];

  return (
    <Section id="latest" className="py-14 sm:py-20">
      <Shell>
        <SectionHeading
          eyebrow="Structured weights · precise drops"
          title="The latest collection"
          copy="Explore authentic SYMI pieces — apparel, fine jewelry, signature fragrances, and handcrafted accessories."
          action={
            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
              <Filter className="size-3 text-[#52735B]" />
              <span>
                Showing {visibleProducts.length} of {filteredProducts.length}
              </span>
            </div>
          }
        />

        {/* Interactive Category Filter Bar */}
        <div className="mb-6 sm:mb-8 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {filterTabs.map((tab) => {
            const isActive = currentCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={cn(
                  "group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 active:scale-95",
                  isActive
                    ? "bg-foreground text-background shadow-md"
                    : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "grid size-4 place-items-center rounded-full text-[8.5px] sm:text-[9px] font-bold transition-colors",
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground group-hover:bg-foreground/10"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid - Shows ONLY products belonging to selected category */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {visibleProducts.map((product, i) => (
              <BlurFade key={product.id} inView delay={Math.min((i % 12) * 0.03, 0.36)}>
                <ProductCard product={product} onSelect={onSelectProduct} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 sm:p-16 text-center">
            <Sparkles className="size-8 text-muted-foreground/50 mb-3" />
            <h3 className="font-display text-lg sm:text-xl uppercase tracking-wider text-foreground">
              No products found in this category
            </h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              We are adding new drops soon. Try selecting another category above.
            </p>
            <button
              onClick={() => handleTabChange("all")}
              className="mt-4 rounded-full border border-foreground bg-foreground px-6 py-2 text-[10px] font-bold tracking-[0.16em] text-background uppercase active:scale-95"
            >
              View All Products
            </button>
          </div>
        )}

        {hasMore && (
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setLimit((prev) => Math.min(prev + 16, filteredProducts.length))}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-8 py-3.5 text-[10px] font-bold tracking-[0.2em] text-background uppercase shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg active:scale-98"
            >
              Load more items ({filteredProducts.length - limit} remaining)
              <ChevronDown className="size-4" />
            </button>
            <button
              onClick={() => setLimit(filteredProducts.length)}
              className="text-[9px] font-semibold tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
            >
              Show all {filteredProducts.length} items in {filterTabs.find(t => t.key === currentCategory)?.label}
            </button>
          </div>
        )}
      </Shell>
    </Section>
  );
}
