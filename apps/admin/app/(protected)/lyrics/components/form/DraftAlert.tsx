import React from "react";

interface DraftAlertProps {
  onRestore: () => void;
  onDiscard: () => void;
}

export const DraftAlert: React.FC<DraftAlertProps> = ({
  onRestore,
  onDiscard,
}) => {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 shadow-sm">
      <div className="flex items-center gap-2">
        <i className="bi bi-clock-history text-lg text-amber-600" />
        <span>
          You have an auto-saved lyrics draft from a previous session.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRestore}
          className="cursor-pointer font-semibold text-amber-900 underline hover:text-amber-700"
        >
          Restore Draft
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        >
          Discard
        </button>
      </div>
    </div>
  );
};
