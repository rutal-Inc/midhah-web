"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

type DialogShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  /** Center the title (LoginDialog style); default left. */
  titleCentered?: boolean;
  /** Widen for long-form content (the ads explainer). */
  wide?: boolean;
  children: ReactNode;
};

/**
 * Shared dialog chrome — one overlay, one panel style, one close affordance
 * for LoginDialog, CollectionDialog, and the AdBanner explainer (which
 * previously had three divergent paddings/widths).
 */
export default function DialogShell({
  open,
  onOpenChange,
  title,
  titleCentered = false,
  wide = false,
  children,
}: Readonly<DialogShellProps>) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 z-50 w-[92%] ${wide ? "max-h-[88vh] max-w-[600px]" : "max-h-[60vh] max-w-md"} -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none`}
          aria-describedby={undefined}
        >
          {/* Close is absolutely positioned so a centered title centers
              against the full panel width, not panel-minus-button. */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 cursor-pointer rounded-md p-1 transition-all hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
          <Dialog.Title
            className={`pr-8 text-xl font-bold ${titleCentered ? "pl-8 text-center" : ""}`}
          >
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
