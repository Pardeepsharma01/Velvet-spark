import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label rendered above the input */
  label?: string;
  /** Optional helper/error text below the input */
  hint?: string;
  /** Whether this field is in error state */
  error?: boolean;
  /** Left icon or adornment */
  leftAdornment?: React.ReactNode;
  /** Right icon or adornment */
  rightAdornment?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      hint,
      error = false,
      leftAdornment,
      rightAdornment,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-charcoal dark:text-ivory-200 font-sans"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left adornment */}
          {leftAdornment && (
            <span className="absolute left-3 flex items-center text-charcoal-400 pointer-events-none">
              {leftAdornment}
            </span>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              // Base
              "w-full h-11 px-4 py-2.5 rounded-lg",
              "font-sans text-sm text-charcoal dark:text-ivory-200",
              "bg-white dark:bg-charcoal-700",
              "border transition-colors duration-200",
              "placeholder:text-charcoal-400 dark:placeholder:text-charcoal-300",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              // Default border + focus
              !error && [
                "border-border",
                "focus:border-gold focus:ring-gold/20",
              ],
              // Error state
              error && [
                "border-destructive",
                "focus:border-destructive focus:ring-destructive/20",
              ],
              // Adornment padding
              leftAdornment && "pl-10",
              rightAdornment && "pr-10",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />

          {/* Right adornment */}
          {rightAdornment && (
            <span className="absolute right-3 flex items-center text-charcoal-400 pointer-events-none">
              {rightAdornment}
            </span>
          )}
        </div>

        {/* Hint / error text */}
        {hint && (
          <p
            className={cn(
              "text-xs font-sans",
              error ? "text-destructive" : "text-charcoal-400 dark:text-charcoal-300"
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
