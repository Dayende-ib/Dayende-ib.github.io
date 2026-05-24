import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[20px] border border-border/40 bg-muted/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
