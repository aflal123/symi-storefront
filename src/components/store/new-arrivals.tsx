"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/site";
import { Section, Shell, SectionHeading } from "@/components/store/section";
import { ProductCard } from "@/components/store/product-card";
import { BlurFade } from "@/components/ui/blur-fade";

export function NewArrivals({
  onSelectProduct,
}: {
  onSelectProduct?: (product: Product) => void;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const arrivals = PRODUCTS.filter((p) => p.arrival);

  const nudge = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <Section id="arrivals" className="bg-[color:var(--paper-2)] py-14 sm:py-20">
      <Shell>
        <SectionHeading
          eyebrow="Off the loom & the atelier"
          title="New arrivals"
          copy="Fresh cuts from the Colombo and Beruwala workrooms. Handmade essentials, limited runs."
          action={
            <div className="flex gap-2">
              <button
                aria-label="Previous"
                onClick={() => nudge(-1)}
                className="grid size-9 place-items-center rounded-sm border border-border bg-card transition-colors hover:border-[#52735B] hover:bg-[#52735B] hover:text-white"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => nudge(1)}
                className="grid size-9 place-items-center rounded-sm border border-border bg-card transition-colors hover:border-[#52735B] hover:bg-[#52735B] hover:text-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          }
        />
        <div
          ref={rail}
          className="no-scrollbar grid snap-x snap-mandatory grid-flow-col auto-cols-[78%] gap-3.5 overflow-x-auto pb-1 sm:auto-cols-[46%] lg:auto-cols-[23.5%]"
        >
          {arrivals.map((product, i) => (
            <BlurFade key={product.id} inView delay={i * 0.05} className="snap-start">
              <ProductCard product={product} onSelect={onSelectProduct} />
            </BlurFade>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
