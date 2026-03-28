import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export default function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-2 sm:px-3 lg:px-4", className)}
      {...props}
    />
  );
}
