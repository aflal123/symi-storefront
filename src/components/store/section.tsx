import { cn } from "cn";
import { BlurFade } from "@/components/ui/blur-fade";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-10 sm:py-16 md:py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}

export function Shell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <BlurFade inView className="max-w-xl">
        {eyebrow ? (
          <span className="eyebrow block">{eyebrow}</span>
        ) : null}
        <h2 className="display-tight mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem]">
          {title}
        </h2>
        {copy ? (
          <p className="mt-2.5 max-w-md text-xs sm:text-sm text-muted-foreground">{copy}</p>
        ) : null}
      </BlurFade>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
