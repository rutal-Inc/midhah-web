import { capitalizeFirstLetter } from "@/helpers";
import { fetchLyricsSlug } from "@/services/lyrics";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { LyricFormValues, OptionType, selectStyles } from "./types";

interface Step4PublishReviewProps {
  isEditMode: boolean;
  urlSlug: string;
  redirectOptions: OptionType[];
  setRedirectOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
  currentTitle: string;
  currentGenre: string;
  currentSlug: string;
  currentPoetID?: number;
  poets: { id: number; name: string }[];
  lineCount: number;
  verseCount: number;
  wordCount: number;
  onBack: () => void;
}

export const Step4PublishReview: React.FC<Step4PublishReviewProps> = ({
  isEditMode,
  urlSlug,
  redirectOptions,
  setRedirectOptions,
  currentTitle,
  currentGenre,
  currentSlug,
  currentPoetID,
  poets,
  lineCount,
  verseCount,
  wordCount,
  onBack,
}) => {
  const {
    register,
    control,
    formState: { isSubmitting },
  } = useFormContext<LyricFormValues>();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Step 4: Publishing & Verification Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure public visibility, authenticity verification, and review
          before saving.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Status Toggles Card */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-gray-900">
            Visibility & Verification Controls
          </h3>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            {/* Publish Switch */}
            <label className="flex cursor-pointer items-center gap-3.5">
              <div className="relative inline-flex items-center">
                <input
                  id="isPublished"
                  type="checkbox"
                  {...register("isPublished")}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#256279] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Publish to Public Website
                </span>
                <p className="text-xs text-gray-500">
                  When off, this lyric remains saved as an internal Draft
                </p>
              </div>
            </label>

            {/* Verified Switch */}
            <label className="flex cursor-pointer items-center gap-3.5">
              <div className="relative inline-flex items-center">
                <input
                  id="isVerified"
                  type="checkbox"
                  {...register("isVerified")}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#256279] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Mark as Verified
                </span>
                <p className="text-xs text-gray-500">
                  Confirm authenticity of kalaam text and poet attribution
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Redirect To (Only in edit mode) */}
        {isEditMode && (
          <div className="sm:col-span-2">
            <label
              htmlFor="redirectTo"
              className="block text-sm font-semibold text-gray-900"
            >
              Redirect To (Optional Alias/Canonical)
            </label>
            <div className="mt-2">
              <Controller
                name="redirectTo"
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable
                    options={redirectOptions}
                    value={
                      redirectOptions.find((o) => o.value === field.value) ||
                      null
                    }
                    onChange={(selected) =>
                      field.onChange(selected ? selected.value : null)
                    }
                    onInputChange={(input) => {
                      if (input.length > 0) {
                        fetchLyricsSlug(input, urlSlug).then((res) => {
                          setRedirectOptions(
                            (res.data || []).map(
                              (item: {
                                id: number;
                                slug: string;
                                genre: string;
                              }) => ({
                                label: `${item.slug} - (${item.genre})`,
                                value: `${item.genre}/${item.slug}`,
                              }),
                            ),
                          );
                        });
                      }
                    }}
                    placeholder="Search slug to redirect..."
                    styles={selectStyles}
                  />
                )}
              />
            </div>
          </div>
        )}

        {/* Summary Review Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:col-span-2">
          <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Summary Review
          </h3>
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <dt className="text-xs text-gray-500">Title & URL</dt>
              <dd className="mt-1 truncate font-semibold text-gray-900">
                {currentTitle || "—"}
              </dd>
              <dd className="mt-0.5 truncate font-mono text-xs text-[#256279]">
                /{currentGenre || "genre"}/{currentSlug || "slug"}
              </dd>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <dt className="text-xs text-gray-500">Genre & Poet</dt>
              <dd className="mt-1 font-semibold text-gray-900">
                {capitalizeFirstLetter(currentGenre || "—")}
              </dd>
              <dd className="mt-0.5 text-xs text-gray-600">
                {poets.find((p) => p.id === currentPoetID)?.name ||
                  "Unknown / Anonymous"}
              </dd>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <dt className="text-xs text-gray-500">Content Stats</dt>
              <dd className="mt-1 font-semibold text-gray-900">
                {lineCount} lines ({verseCount} Ash&apos;aar)
              </dd>
              <dd className="mt-0.5 text-xs text-gray-600">
                {wordCount} words
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Step 4 Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <i className="bi bi-arrow-left" />
          <span>Back to Metadata</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#256279] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4f62] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
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
              <span>Saving Lyric...</span>
            </>
          ) : (
            <>
              <i className="bi bi-check2-circle text-lg" />
              <span>
                {isEditMode ? "Save Changes" : "Save & Publish Lyric"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
