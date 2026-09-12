import { STATS } from "@/lib/site";
import { EditorialArt } from "@/lib/art";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

export function BuiltDifferent() {
  return (
    <section id="collection" className="dark bg-background text-foreground">
      <div className="grid min-h-[560px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-20 lg:py-24">
          <BlurFade inView>
            <span className="eyebrow text-muted-foreground">
              Culture // Architecture
            </span>
            <h2 className="display-tight mt-3.5 text-5xl text-white sm:text-6xl lg:text-[6.5rem]">
              Built
              <br />
              Different
            </h2>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              Everyday pieces designed for the modern Sri Lankan lifestyle.
              Heavyweight ring-spun cotton, reinforced architectural seams,
              tailored for tropical wearability.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <dl className="mt-9 grid grid-cols-3 gap-5 border-t border-white/10 pt-7">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="flex items-baseline font-display text-3xl text-white sm:text-4xl">
                    <NumberTicker
                      value={stat.value}
                      className="text-white dark:text-white"
                    />
                    {stat.suffix}
                  </dd>
                  <dt className="mt-1.5 text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </BlurFade>

          <BlurFade inView delay={0.18}>
            <a
              href="#latest"
              className="mt-9 inline-flex w-fit items-center justify-center rounded-sm border border-[#F8F5EE] bg-[#F8F5EE] px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-[#1A1714] uppercase shadow-lg transition-all duration-300 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white hover:shadow-[#52735B]/25 hover:scale-[1.02]"
            >
              Shop the collection
            </a>
          </BlurFade>
        </div>

        <div className="relative min-h-[320px] overflow-hidden bg-card">
          <EditorialArt
            kind="workshop"
            seed={7}
            ratio="auto"
            tone="dark"
            label="Inside the SYMI studio"
            className="size-full object-cover"
          />
          <span className="absolute right-5 bottom-5 border border-white/25 px-3 py-2 text-[9px] font-bold tracking-[0.18em] text-white/70 uppercase">
            Beruwala Atelier
          </span>
        </div>
      </div>
    </section>
  );
}
