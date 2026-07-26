"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
};

/** Styled tooltip on the unstyled Radix primitive (replaces Radix Themes'). */
export default function Tooltip({ content, children }: Readonly<TooltipProps>) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span tabIndex={0}>{children}</span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={6}
            className="z-50 max-w-xs rounded-md bg-gray-900 px-3 py-1.5 text-center text-sm text-white shadow-lg"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
