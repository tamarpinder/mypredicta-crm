import * as React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.ComponentProps<"div"> {
  variant?: "default" | "gradient" | "stats" | "highlight";
}

function PremiumCard({ className, variant = "default", ...props }: PremiumCardProps) {
  const variants = {
    default: "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-[var(--color-predicta-gold)]/30",
    gradient: "bg-gradient-to-br from-[var(--color-predicta-navy)]/5 to-[var(--color-predicta-gold)]/5 border-[var(--color-predicta-gold)]/20 hover:border-[var(--color-predicta-gold)]/40",
    stats: "bg-gradient-to-br from-white to-[var(--color-predicta-navy)]/5 border-[var(--color-predicta-navy)]/10 hover:border-[var(--color-predicta-navy)]/20",
    highlight: "bg-gradient-to-br from-[var(--color-predicta-gold)]/5 to-[var(--color-predicta-gold)]/10 border-[var(--color-predicta-gold)]/30 hover:border-[var(--color-predicta-gold)]/50"
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

function PremiumCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 pb-4",
        className
      )}
      {...props}
    />
  )
}

function PremiumCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-[var(--color-predicta-navy)]",
        className
      )}
      {...props}
    />
  )
}

function PremiumCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function PremiumCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("pt-0", className)}
      {...props}
    />
  )
}

function PremiumCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center pt-4 border-t border-gray-200/50",
        className
      )}
      {...props}
    />
  )
}

export {
  PremiumCard,
  PremiumCardHeader,
  PremiumCardFooter,
  PremiumCardTitle,
  PremiumCardDescription,
  PremiumCardContent,
}