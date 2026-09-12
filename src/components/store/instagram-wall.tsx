import { INSTAGRAM, BRAND } from "@/lib/site";
import { EditorialArt } from "@/lib/art";
import { Shell, SectionHeading } from "@/components/store/section";
import { Marquee } from "@/components/ui/marquee";

export function InstagramWall() {
  return (
    <section className="py-14 sm:py-20">
      <Shell>
        <SectionHeading
          title="@SYMI"
          action={
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="border-b border-foreground pb-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-55"
            >
              Tag @symi to be featured
            </a>
          }
        />
      </Shell>
      <Marquee pauseOnHover className="[--duration:18s] [--gap:0.5rem]">
        {INSTAGRAM.map((src, i) => (
          <a
            key={typeof src === "string" ? src : i}
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            className="block aspect-square w-[42vw] shrink-0 overflow-hidden bg-card sm:w-[24vw] lg:w-[15vw]"
          >
            {typeof src === "string" && src.startsWith("/") ? (
              <img
                src={src}
                alt="SYMI Instagram"
                className="size-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            ) : (
              <EditorialArt
                kind={i % 2 ? "figC" : "figA"}
                seed={i + 31}
                ratio="auto"
                label="SYMI on Instagram"
                className="size-full object-cover"
              />
            )}
          </a>
        ))}
      </Marquee>
    </section>
  );
}
