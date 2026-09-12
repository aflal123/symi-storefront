import { cn } from "cn";

export function Wordmark({
  className,
  dotClassName,
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-3xl lg:text-[38px] font-black leading-none tracking-[0.16em]",
        className,
      )}
    >
      <span>SYMI</span>
      <span
        className={cn("ml-1.5 size-2 lg:size-2.5 self-end bg-[#C06845]", dotClassName)}
      />
    </span>
  );
}
