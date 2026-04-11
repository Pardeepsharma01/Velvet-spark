"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow multiple items open at once */
  multiple?: boolean;
}

export function Accordion({ items, className, multiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={cn("flex flex-col divide-y divide-border", className)}>
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i);
        return (
          <div key={i} className="py-4 first:pt-0 last:pb-0">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-sm font-semibold text-charcoal dark:text-ivory group-hover:text-gold transition-colors">
                {item.title}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "text-charcoal-400 transition-transform duration-200 flex-shrink-0",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
              )}
            >
              <p className="text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
