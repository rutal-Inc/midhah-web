import { noto_nastaliq_urdu } from "@midhah/utils/fonts";
import React from "react";
import { useFormContext } from "react-hook-form";
import { LyricFormValues } from "./types";

interface Step1ContentEditorProps {
  isEditMode: boolean;
  aiLoading: boolean;
  currentContent: string;
  currentTransliterated: string;
  lineCount: number;
  verseCount: number;
  wordCount: number;
  onCleanContent: () => void;
  onAITransliterate: () => void;
  onProceed: () => void;
}

export const Step1ContentEditor: React.FC<Step1ContentEditorProps> = ({
  isEditMode,
  aiLoading,
  currentContent,
  currentTransliterated,
  lineCount,
  verseCount,
  wordCount,
  onCleanContent,
  onAITransliterate,
  onProceed,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LyricFormValues>();

  const romanLineCount = currentTransliterated.trim()
    ? currentTransliterated.split("\n").filter(Boolean).length
    : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Step 1: Lyrics Content & Transliteration
          </h2>
          <p className="text-sm text-gray-500">
            Enter original Urdu Kalaam alongside Roman Urdu transliteration side
            by side.
          </p>
        </div>

        {!isEditMode && (
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <i className="bi bi-shield-check" />
            Auto-saving to local draft
          </div>
        )}
      </div>

      {/* Side-by-Side Dual Editor */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Original Urdu Kalaam */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label
                htmlFor="content"
                className="block text-sm font-bold text-gray-900"
              >
                Original Kalaam (Urdu) <span className="text-red-500">*</span>
              </label>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">
                Nastaliq
              </span>
            </div>
            <button
              type="button"
              onClick={onCleanContent}
              disabled={!currentContent}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 disabled:opacity-40"
              title="Clean extra empty lines and trim whitespace"
            >
              <i className="bi bi-text-left" />
              Format Lines
            </button>
          </div>

          <textarea
            id="content"
            {...register("content")}
            rows={9}
            placeholder="یہاں کلام / نعت مبارکہ درج کریں..."
            className={`block w-full flex-1 rounded-lg border border-gray-300 p-3.5 text-gray-900 shadow-xs focus:border-[#256279] focus:ring-2 focus:ring-[#256279] focus:outline-none sm:text-lg sm:leading-8 ${noto_nastaliq_urdu.className}`}
            dir="auto"
          />
          {errors.content && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.content.message}
            </p>
          )}

          {/* Urdu Column Stats */}
          <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-2.5 text-xs text-gray-500">
            <span>
              <strong>{lineCount}</strong> Lines
            </span>
            <span>•</span>
            <span>
              <strong>~{verseCount}</strong> Ash&apos;aar
            </span>
            <span>•</span>
            <span>
              <strong>{wordCount}</strong> Words
            </span>
          </div>
        </div>

        {/* Right Column: Roman Urdu Transliteration */}
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label
                htmlFor="transliteratedContent"
                className="block text-sm font-bold text-gray-900"
              >
                Roman Urdu Transliteration
              </label>
              <span className="rounded border border-sky-100 bg-sky-50 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
                Optional
              </span>
            </div>
            <button
              type="button"
              onClick={onAITransliterate}
              disabled={aiLoading || !currentContent?.trim()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-[#256279] px-2.5 py-1 text-xs font-semibold text-white shadow-2xs hover:bg-[#1d4f62] disabled:opacity-40"
              title={
                currentContent?.trim()
                  ? "Generate Roman Urdu transliteration from Kalaam"
                  : "Enter Urdu Kalaam first to transliterate"
              }
            >
              {aiLoading ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Transliterating...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-stars" />
                  <span>Transliterate With AI</span>
                </>
              )}
            </button>
          </div>

          <textarea
            id="transliteratedContent"
            {...register("transliteratedContent")}
            rows={9}
            placeholder="e.g. Faslon ko takalluf hai hum se agar..."
            className="block w-full flex-1 rounded-lg border border-gray-300 p-3.5 font-mono text-sm leading-6 text-gray-900 shadow-xs focus:border-[#256279] focus:ring-2 focus:ring-[#256279] focus:outline-none"
          />
          {errors.transliteratedContent && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.transliteratedContent.message}
            </p>
          )}

          {/* Roman Column Stats */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>
                <strong>{romanLineCount}</strong> Lines Roman
              </span>
            </div>
            <div>
              {lineCount > 0 && romanLineCount === lineCount ? (
                <span className="font-medium text-emerald-600">
                  <i className="bi bi-check2" /> Lines match original
                </span>
              ) : (
                <span className="text-gray-400">
                  Manual entry or AI generated
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 1 Actions */}
      <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onProceed}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#256279] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4f62] focus:outline-none"
        >
          <span>Continue to Title & Slug</span>
          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </div>
  );
};
