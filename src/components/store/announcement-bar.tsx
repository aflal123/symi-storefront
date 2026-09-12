import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  "Free islandwide shipping over LKR 15,000",
  
];

export function AnnouncementBar() {
  return (
    <div className="dark border-y border-[#52735B]/25 bg-[#141813] text-foreground">
      <Marquee className="[--duration:36s] [--gap:0px] py-0.5">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="flex items-center py-2.5 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#F5F2EB]/90"
          >
            {item}
            <span className="mx-8 size-1.5 rounded-full bg-[#8BA894]" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
