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
        "inline-flex items-center gap-2 font-display text-2xl sm:text-3xl lg:text-[34px] font-black leading-none tracking-[0.16em]",
        className,
      )}
    >
      {showLogo && (
        <img
          src="/images/symi-official-logo.png"
          alt="SYMI Official Emblem"
          className="size-8 sm:size-9 lg:size-10 rounded-full object-cover shadow-sm border border-emerald-600/40 shrink-0"
        />
      )}
      <span>SYMI</span>
    </span>
  );
}
