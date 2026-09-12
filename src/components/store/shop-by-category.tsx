import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import { EditorialArt } from "@/lib/art";
import { Section, Shell, SectionHeading } from "@/components/store/section";
import { BlurFade } from "@/components/ui/blur-fade";

export function ShopByCategory({
  onSelectCategory,
}: {
  onSelectCategory?: (categoryKey: string) => void;
}) {
  return (
    <Section id="category">
      <Shell>
        <SectionHeading
          eyebrow="Apparel // Accents // Fragrance // Living"
          title="Shop by category"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <BlurFade key={cat.key} inView delay={i * 0.05}>
              <a
                href="#latest"
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.key);
                  }
                }}
                className="group relative block aspect-3/4 overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-foreground/30 hover:shadow-lg active:scale-98"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <EditorialArt
                    kind={cat.art}
                    seed={i + 11}
                    ratio="auto"
                    label={cat.name}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1.5 bg-linear-to-t from-black/90 via-black/35 to-transparent p-2.5 sm:p-3.5 pt-10">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[7.5px] sm:text-[8.5px] font-medium tracking-[0.14em] text-white/75 uppercase line-clamp-1">
                      {cat.note}
                    </span>
                    <span className="mt-0.5 block font-display text-base sm:text-xl lg:text-2xl tracking-[0.04em] text-white uppercase line-clamp-1">
                      {cat.name}
                    </span>
                  </span>
                  <span className="grid size-6 sm:size-8 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-all duration-200 group-hover:border-[#52735B] group-hover:bg-[#52735B] group-hover:text-white">
                    <ArrowRight className="size-2.5 sm:size-3.5" />
                  </span>
                </div>
              </a>
            </BlurFade>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
