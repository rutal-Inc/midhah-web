import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface TransliterationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onKeepExisting: () => void;
  onGoToContent: () => void;
}

export const TransliterationModal: React.FC<TransliterationModalProps> = ({
  isOpen,
  onOpenChange,
  onKeepExisting,
  onGoToContent,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <i className="bi bi-exclamation-triangle text-lg" />
            </div>
            <div>
              <Dialog.Title className="text-base font-bold text-gray-900">
                Update Transliteration?
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Original lyrics content was changed. Would you like to update
                the transliterated version as well?
              </Dialog.Description>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onKeepExisting}
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              No, Keep Existing
            </button>
            <button
              type="button"
              onClick={onGoToContent}
              className="cursor-pointer rounded-lg bg-[#256279] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4f62]"
            >
              Yes, Go to Content & Transliteration
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
