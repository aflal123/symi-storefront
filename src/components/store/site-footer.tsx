"use client";

import { useState } from "react";
import { BRAND } from "@/lib/site";
import { Wordmark } from "@/components/store/wordmark";

const COLUMNS = [
  { heading: "Shop", items: ["New Arrivals", "Men", "Women", "Accessories", "Perfumes", "Household", "Sale"] },
  { heading: "Help", items: ["Contact", "FAQ", "Shipping", "Returns", "Size Guide"] },
  { heading: "Know", items: ["Our Story", "Journal", "Careers"] },
  { heading: "Social", items: ["Instagram", "Facebook", "TikTok"] },
];

export function SiteFooter({
  onSelectCategory,
}: {
  onSelectCategory?: (categoryKey: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleLinkClick = (item: string) => {
    const key = item.toLowerCase();
    if (["men", "women", "accessories", "perfumes", "household"].includes(key)) {
      if (onSelectCategory) {
        onSelectCategory(key);
      }
      const elem = document.getElementById("latest");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item === "New Arrivals") {
      const elem = document.getElementById("arrivals");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item === "Sale") {
      if (onSelectCategory) {
        onSelectCategory("all");
      }
      const elem = document.getElementById("latest");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="dark border-t border-border bg-background pt-16 pb-8 text-foreground sm:pt-20">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_repeat(4,1fr)]">
          <div>
            <Wordmark className="text-white" />
            <p className="mt-4 max-w-[30ch] text-xs text-muted-foreground">
              {BRAND.tagline} Contemporary Sri Lankan streetwear from{" "}
              {BRAND.studios}.
            </p>
            <form
              className="mt-5 flex max-w-[280px] border border-white/20"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent px-3 py-2.5 text-xs text-[#F8F5EE] outline-none placeholder:text-muted-foreground"
              />
              <button className="bg-[#F8F5EE] px-3.5 text-[9px] font-bold tracking-[0.16em] text-[#1A1714] uppercase transition-colors hover:bg-[#52735B] hover:text-white">
                Join
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[9px] font-bold tracking-[0.2em] text-[#8BA894] uppercase">
                {col.heading}
              </h4>
              <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
                {col.items.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleLinkClick(item)}
                    className="cursor-pointer transition-colors hover:text-[#F8F5EE]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="text-[10px] tracking-wider uppercase text-muted-foreground/60">
            Colombo // Beruwala Studio Flagship
          </p>
        </div>
      </div>
    </footer>
  );
}
