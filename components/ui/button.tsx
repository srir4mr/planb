import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold uppercase tracking-widest2 transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
  {
    variants: {
      variant: {
        primary: "bg-accent text-background hover:bg-accent-light active:bg-accent-dark",
        outline: "border border-foreground/30 text-foreground hover:border-accent hover:text-accent",
        ghost: "text-foreground hover:text-accent",
        racing: "bg-racing text-foreground hover:bg-racing-light",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
