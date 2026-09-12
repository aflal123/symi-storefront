import { Calendar, MapPin, Award, Users, ExternalLink, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";
import { Section, Shell, SectionHeading } from "@/components/store/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { Wordmark } from "@/components/store/wordmark";
import { SYMI_ECOMMERCE_URL } from "@/lib/site";

export function ShahmeeEventShowcase() {
  const eventPhotos = [
    {
      id: "garland-walk",
      title: "Ceremonial Flower Garland Walk",
      subtitle: "Shahmy Shaheed wearing ceremonial orchid garlands during the community procession.",
      tag: "Procession Walk",
      date: "2024.09.03",
      image: "/images/symi-shahmee-shaheedh-garland-walk-procession.jpg",
    },
    {
      id: "honour-walk",
      title: "Community Procession Walk",
      subtitle: "Walking alongside family elders and community leaders.",
      tag: "Heritage Walk",
      date: "2024.09.03",
      image: "/images/symi-shahmee-shaheedh-honour-walk.jpg",
    },
    {
      id: "ceremony-seated",
      title: "L.M Honouring Ceremony",
      subtitle: "Formal felicitation with distinguished Guests of Honour.",
      tag: "Felicitation",
      date: "2024.09.03",
      image: "/images/symi-shahmee-shaheedh-honouring-ceremony-seated.jpg",
    },
    {
      id: "ceremony-handshake",
      title: "Presentation & Felicitation",
      subtitle: "Receiving congratulations from community elders.",
      tag: "Felicitation",
      date: "2024.09.03",
      image: "/images/symi-shahmee-shaheedh-honouring-handshake.jpg",
    },
    {
      id: "street-parade",
      title: "Night Street Parade & Fire Rally",
      subtitle: "SYMI brand street rally with fire performers & Sri Lankan flag bearers.",
      tag: "Street Rally",
      date: "2024.09.03",
      image: "/images/symi-brand-street-parade-fire.jpg",
    },
  ];

  return (
    <Section id="event-showcase" className="dark bg-[#12100E] text-foreground py-12 sm:py-20 border-y border-white/10">
      <Shell>
        {/* 1. Official Sponsor Banner Header */}
        <BlurFade inView>
          <div className="mb-10 sm:mb-14 rounded-2xl border border-[#52735B]/40 bg-linear-to-r from-[#1B261F] via-[#141C16] to-[#12100E] p-5 sm:p-8 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Sponsor Logo & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="grid h-12 px-4 place-items-center rounded-xl bg-black/60 border border-white/15">
                    <Wordmark />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#52735B] px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase shadow-sm">
                      <ShieldCheck className="size-3 text-emerald-300" />
                      OFFICIAL SPONSOR
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#8BA894] uppercase">
                      SYMI Holdings
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white uppercase">
                    Official Sponsor of Shahmy Shaheed&apos;s Walking Journey
                  </h3>
                </div>
              </div>

              {/* E-Commerce Promotional CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <a
                  href={SYMI_ECOMMERCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-visit-symi-ecommerce"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-[#52735B] bg-[#52735B] px-6 py-3.5 text-[10.5px] font-bold tracking-[0.2em] text-white uppercase shadow-lg transition-all duration-300 hover:bg-[#43604b] hover:shadow-[#52735B]/30 active:scale-95"
                >
                  <ShoppingBag className="size-4 text-emerald-200" />
                  <span>Visit SYMI E-Commerce</span>
                  <ExternalLink className="size-3.5 text-white/70" />
                </a>
              </div>
            </div>

            {/* Supporting the Journey Story */}
            <div className="mt-6 border-t border-white/10 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/80">
              <div className="md:col-span-2">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8BA894] block mb-1">
                  Supporting the Journey
                </span>
                <p className="leading-relaxed text-white/75">
                  SYMI Holdings proudly supported Shahmy Shaheed&apos;s historic walking journey on September 3, 2024 — honoring local youth achievement, community strength, and cultural heritage across Sri Lanka.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8BA894] block mb-1">
                  Shop with SYMI Holdings
                </span>
                <p className="leading-relaxed text-white/75">
                  Discover curated apparel, handcrafted accessories, signature fragrances, and lifestyle goods through our official e-commerce platform.
                </p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* 2. Main Event Section Heading */}
        <SectionHeading
          eyebrow="Community // Heritage // Honouring Procession"
          title="Shahmy Shaheed Honouring Walk"
          copy="A historic community milestone on September 3, 2024 — celebrating perseverance, youth inspiration, and cultural pride in Sri Lanka."
          action={
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#8BA894] uppercase backdrop-blur-md">
                <Calendar className="size-3 text-[#52735B]" />
                2024.09.03
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur-md">
                <MapPin className="size-3 text-[#C06845]" />
                Beruwala
              </span>
            </div>
          }
        />

        {/* 3. Event Imagery Grid */}
        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {eventPhotos.map((item, idx) => (
            <BlurFade key={item.id} inView delay={idx * 0.08}>
              <div className="group relative aspect-4/5 overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-500 hover:border-white/30 hover:shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent p-4 sm:p-5 flex flex-col justify-end transition-opacity duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#52735B] px-2 py-0.5 sm:px-2.5 text-[8.5px] sm:text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                      <Award className="size-2.5 sm:size-3" />
                      {item.tag}
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] font-mono tracking-widest text-white/60">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl md:text-2xl tracking-wide text-white uppercase group-hover:text-[#8BA894] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* 4. Footer Sponsor Commemoration Banner */}
        <BlurFade inView delay={0.4}>
          <div className="mt-8 sm:mt-10 rounded-2xl border border-[#52735B]/40 bg-linear-to-r from-[#1A261E]/80 via-[#141E18]/80 to-[#12100E] p-4 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="grid size-10 sm:size-12 shrink-0 place-items-center rounded-xl bg-[#52735B]/20 text-[#8BA894] border border-[#52735B]/30">
                <Users className="size-5 sm:size-6" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-[#8BA894]">
                  SYMI Holdings • Official Sponsor • 2024.09.03
                </span>
                <h4 className="mt-0.5 font-display text-lg sm:text-2xl text-white uppercase tracking-wide">
                  Rooted in Community & Culture
                </h4>
                <p className="mt-1 max-w-xl text-xs text-white/70">
                  SYMI Holdings is proud to support Shahmy Shaheed&apos;s journey, local leadership, and community milestones across Sri Lanka.
                </p>
              </div>
            </div>

            <a
              href={SYMI_ECOMMERCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md transition-all hover:bg-white hover:text-black shrink-0 active:scale-95"
            >
              <Sparkles className="size-3.5 text-[#8BA894]" />
              <span>Visit SYMI E-Commerce</span>
            </a>
          </div>
        </BlurFade>
      </Shell>
    </Section>
  );
}
