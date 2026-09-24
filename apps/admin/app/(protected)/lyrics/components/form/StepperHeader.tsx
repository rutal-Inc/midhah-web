import React from "react";
import { STEPS } from "./types";

interface StepperHeaderProps {
  activeStep: number;
  isEditMode: boolean;
  onStepClick: (stepId: number) => void;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({
  activeStep,
  isEditMode,
  onStepClick,
}) => {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-3 shadow-xs">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((s) => {
          const isActive = activeStep === s.id;
          const isCompleted = activeStep > s.id;
          const isClickable = isEditMode || isCompleted;

          return (
            <button
              key={s.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(s.id)}
              className={`flex items-center gap-3 rounded-lg p-2.5 text-left transition-all ${
                isActive
                  ? "bg-[#256279]/10 text-[#256279] ring-1 ring-[#256279]"
                  : isCompleted
                    ? "cursor-pointer text-gray-800 hover:bg-gray-50"
                    : "cursor-not-allowed text-gray-400 opacity-60"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#256279] text-white shadow-xs"
                    : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {isCompleted ? <i className="bi bi-check-lg text-sm" /> : s.id}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{s.title}</p>
                <p className="hidden truncate text-[11px] text-gray-500 sm:block">
                  {s.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
