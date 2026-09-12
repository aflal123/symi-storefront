import { BlurFade } from "@/components/ui/blur-fade";

export function LastChance() {
  return (
    <section
      id="sale"
      className="dark bg-background px-5 py-20 text-center text-foreground sm:px-8 sm:py-28 lg:py-36"
    >
      <BlurFade inView className="mx-auto max-w-2xl">
        <span className="eyebrow text-muted-foreground">Archive sale</span>
        <h2 className="display-tight mt-4 text-6xl text-white sm:text-7xl lg:text-[9rem]">
          Last chance
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
          Selected styles. Limited availability. Archive drops up to 40% off.
          When they are gone, the patterns are retired for good.
        </p>
        <a
          href="#latest"
          className="mt-8 inline-flex items-center justify-center rounded-sm border border-[#F8F5EE] bg-[#F8F5EE] px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-[#1A1714] uppercase shadow-lg transition-all duration-300 hover:border-[#C06845] hover:bg-[#C06845] hover:text-white hover:shadow-[#C06845]/25 hover:scale-[1.02]"
        >
          Shop archive sale
        </a>
      </BlurFade>
    </section>
  );
}
