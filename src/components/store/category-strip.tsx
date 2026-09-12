import { Download, Tag } from "lucide-react";
import { SUBNAV } from "@/lib/site";

export function CategoryStrip({
  onSelectCategory,
}: {
  onSelectCategory?: (categoryKey: string) => void;
}) {
  const handleClick = (label: string, e: React.MouseEvent) => {
    const key = label.toLowerCase();
    if (["men", "women", "accessories", "perfumes", "household"].includes(key)) {
      if (onSelectCategory) {
        onSelectCategory(key);
      }
    }
  };

  const getHref = (label: string) => {
    switch (label.toLowerCase()) {
      case "new arrivals":
        return "#arrivals";
      case "collections":
        return "#category";
      case "men":
      case "women":
      case "accessories":
      case "perfumes":
      case "household":
        return "#latest";
      default:
        return "#latest";
    }
  };

  return (
    <section
      aria-label="Category Navigation"
      className="border-b border-border/60 bg-background/95 py-3 sm:py-4 backdrop-blur-xs transition-colors"
    >
      <div className="mx-auto flex w-full max-w-[1360px] flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-6 lg:px-16">
        {/* Category Navigation Pill Buttons */}
        <div className="no-scrollbar flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 max-w-full touch-pan-x shrink-0">
          {SUBNAV.map((label) => (
            <a
              key={label}
              href={getHref(label)}
              onClick={(e) => handleClick(label, e)}
              id={`cat-btn-${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="group inline-flex items-center justify-center rounded-full border border-border bg-card/90 px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-foreground shadow-2xs transition-all duration-200 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 shrink-0 py-0.5">
          <a
            href="#story"
            id="btn-download-catalog"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/80 bg-card/70 px-3 sm:px-4 py-1.5 sm:py-2 text-[9.5px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-foreground/85 transition-all duration-200 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white active:scale-[0.98] whitespace-nowrap"
          >
            <Download className="size-3 sm:size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>Download Catalog</span>
          </a>
          <a
            href="#story"
            id="btn-as-seen-in-store"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-4 py-2 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/85 transition-all duration-200 hover:border-[#C06845] hover:bg-[#C06845] hover:text-white active:scale-[0.98] whitespace-nowrap"
          >
            <Tag className="size-3.5 text-[#C06845] transition-transform duration-200 group-hover:rotate-12 group-hover:text-white" />
            <span>As Seen In Store</span>
          </a>
        </div>
      </div>
    </section>
  );
}
