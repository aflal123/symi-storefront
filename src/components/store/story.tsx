import { ArrowRight, MapPin, ExternalLink, Navigation, Compass } from "lucide-react";
import { BRAND } from "@/lib/site";
import { Section, Shell } from "@/components/store/section";
import { BlurFade } from "@/components/ui/blur-fade";

export function Story() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=SYMI+Holdings+Beruwala+Sri+Lanka";

  return (
    <Section id="story">
      <Shell className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Actual Google Maps Location & Pinned Studio Card */}
        <BlurFade inView className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg">
          {/* Interactive Google Map Embed */}
          <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden bg-muted">
            <iframe
              title="SYMI Holdings Beruwala Location Map"
              src="https://maps.google.com/maps?q=SYMI+Holdings+Beruwala+Sri+Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="size-full border-0 filter contrast-[1.05] grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Map showing SYMI Holdings in Beruwala, Sri Lanka"
            />

            {/* Top Studio Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-background/90 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-foreground">
                {BRAND.studios}
              </span>
            </div>

            {/* Floating Pinned Location Card with Direct Navigation */}
            <div className="absolute right-4 bottom-4 left-4 z-10 rounded-xl border border-black/10 dark:border-white/15 bg-background/95 p-4 backdrop-blur-md shadow-xl transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#52735B] text-white shadow-xs">
                    <MapPin className="size-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold tracking-wide uppercase text-foreground">
                      SYMI Holdings Atelier
                    </h4>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5">
                      Beruwala, Western / Southern Coast · Sri Lanka
                    </p>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[9px] text-[#52735B] font-semibold">
                      <Compass className="size-3" />
                      <span>6.4786° N, 79.9806° E</span>
                    </div>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#52735B] px-3.5 py-2 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm transition-all duration-200 hover:bg-[#43604b] hover:shadow-md active:scale-95"
                  title="Open exact store location on Google Maps"
                >
                  <Navigation className="size-3" />
                  <span>Navigate</span>
                  <ExternalLink className="size-2.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Right Column: About SYMI Story Copy */}
        <BlurFade inView delay={0.1}>
          <span className="eyebrow text-[#52735B]">About SYMI</span>
          <h2 className="display-tight mt-3.5 text-4xl sm:text-5xl lg:text-[4.4rem]">
            Rooted in culture.
            <br />
            Made for now.
          </h2>
          <p className="mt-6 max-w-lg text-sm text-muted-foreground leading-relaxed">
            SYMI brings contemporary style and cultural identity together through
            thoughtfully designed products made for everyday life. Born from an
            artisanal root in Beruwala, each garment balances heritage craft and forward intent.
          </p>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed">
            We work with independent looms and small workrooms across the island,
            keeping skills local and supply chains short — resilience woven in.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#category"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-[10.5px] font-bold tracking-[0.18em] text-background uppercase shadow-md transition-all duration-300 hover:bg-[#52735B] hover:text-white active:scale-95"
            >
              <span>Discover Collection</span>
              <ArrowRight className="size-3.5" />
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-[10.5px] font-bold tracking-[0.16em] uppercase text-foreground transition-all duration-300 hover:border-[#52735B] hover:text-[#52735B] active:scale-95"
            >
              <MapPin className="size-3.5 text-[#52735B]" />
              <span>Visit Beruwala Studio</span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          </div>
        </BlurFade>
      </Shell>
    </Section>
  );
}
