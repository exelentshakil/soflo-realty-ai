import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533AFD]/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#533AFD] text-white shadow-2xs hover:bg-[#432DE0] active:scale-[0.99] dark:bg-[#7A68FF] dark:hover:bg-[#9283FF]",
        destructive:
          "bg-red-600 text-white shadow-2xs hover:bg-red-700 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-800",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-2xs hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)] hover:border-[var(--stripe-blurple-border)]",
        secondary:
          "bg-[var(--color-surface)] text-[#533AFD] border border-[#B9B9F9] shadow-2xs hover:bg-[var(--color-panel-subtle)] hover:border-[#533AFD] dark:text-[#7A68FF] dark:border-[#4D40B8] dark:hover:bg-[#141A28]",
        ghost:
          "hover:bg-[var(--color-panel-subtle)] hover:text-[var(--color-text-primary)] text-[var(--color-text-secondary)]",
        link:
          "text-[#533AFD] underline-offset-4 hover:underline dark:text-[#7A68FF]",
        brand:
          "bg-[#533AFD] text-white shadow-2xs hover:bg-[#432DE0] dark:bg-[#7A68FF] dark:hover:bg-[#9283FF]",
      },
      size: {
        default: "h-8.5 px-3.5 py-1.5",
        sm: "h-7.5 rounded-[4px] px-2.5 text-xs",
        lg: "h-10 rounded-[4px] px-6 text-sm",
        icon: "h-8 w-8 rounded-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
