import React from "react";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import clsx from "clsx";

const textColorMap = {
  gray: "text-gray-500",
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  lime: "text-lime-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  violet: "text-violet-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  rose: "text-rose-500",
};

const borderColorMap = {
  gray: "border-gray-500",
  red: "border-red-500",
  orange: "border-orange-500",
  amber: "border-amber-500",
  yellow: "border-yellow-500",
  lime: "border-lime-500",
  green: "border-green-500",
  emerald: "border-emerald-500",
  teal: "border-teal-500",
  cyan: "border-cyan-500",
  sky: "border-sky-500",
  blue: "border-blue-500",
  indigo: "border-indigo-500",
  violet: "border-violet-500",
  purple: "border-purple-500",
  pink: "border-pink-500",
  rose: "border-rose-500",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium hover:cursor-pointer transition-all ease-out disabled:opacity-80 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        filled: "bg-opacity-100",
        subtle: "bg-opacity-10 mix-blend-difference",
        outline: "border bg-opacity-0",
        ghost: "bg-opacity-0 hover:bg-opacity-10",
        text: "bg-opacity-0",
      },
      bg: {
        gray: "bg-gray-500",
        red: "bg-red-500",
        orange: "bg-orange-500",
        amber: "bg-amber-500",
        yellow: "bg-yellow-500",
        lime: "bg-lime-500",
        green: "bg-green-500",
        emerald: "bg-emerald-500",
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        sky: "bg-sky-500",
        blue: "bg-blue-500",
        indigo: "bg-indigo-500",
        violet: "bg-violet-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        rose: "bg-rose-500",
      },
      size: {
        xs: "h-5 px-2 text-xs",
        sm: "h-7 px-3 text-sm",
        md: "h-9 px-4 text-md",
        lg: "h-11 px-8 text-lg",
        xl: "h-13 px-10 py-3 text-xl",
        icon: "h-10 w-10",
      },
      radius: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "filled",
      bg: "red",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, bg, size, radius, variant, fullWidth, children, ...props },
    ref
  ) => {
    const textColor =
      (variant === "ghost" ||
        variant == "outline" ||
        variant == "subtle" ||
        variant == "text") &&
      bg != null
        ? textColorMap[bg] || "text-white"
        : "text-white";
    const borderColor =
      variant === "outline" && bg != null ? borderColorMap[bg] || "" : "";
    const updatedClassname = cn(className, textColor, borderColor);
    console.log(fullWidth);
    return (
      <button
        ref={ref}
        className={clsx(
          buttonVariants({ bg, size, radius, variant }),
          updatedClassname,
          { "!w-full": fullWidth }
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
