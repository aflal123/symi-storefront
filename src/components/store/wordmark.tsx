import { cn } from "cn";

export function Wordmark({
  className,
  dotClassName,
  showLogo = true,
}: {
  className?: string;
  dotClassName?: string;
  showLogo?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-lg sm:text-xl lg:text-2xl font-black leading-none tracking-[0.14em]",
        className,
      )}
    >
      {showLogo && (
        <img
          src="/images/symi-official-logo.png"
          alt="SYMI Official Emblem"
          className="size-7 sm:size-8 lg:size-8 rounded-full object-cover shadow-sm border border-emerald-600/40 shrink-0"
        />
      )}
      <span className="whitespace-nowrap">SYMI</span>
    </span>
  );
}
