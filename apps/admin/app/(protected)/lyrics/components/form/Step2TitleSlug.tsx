import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import slugCreater from "slug";
import { LyricFormValues } from "./types";

interface Step2TitleSlugProps {
  isEditMode: boolean;
  currentGenre: string;
  currentSlug: string;
  onSuggestTitle: () => void;
  onBack: () => void;
  onProceed: () => void;
}

export const Step2TitleSlug: React.FC<Step2TitleSlugProps> = ({
  isEditMode,
  currentGenre,
  currentSlug,
  onSuggestTitle,
  onBack,
  onProceed,
}) => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<LyricFormValues>();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Step 2: Title & URL Slug
          </h2>
          <p className="text-sm text-gray-500">
            Define the primary title and SEO-friendly web permalink.
          </p>
        </div>
        <button
          type="button"
          onClick={onSuggestTitle}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#256279] bg-[#256279]/5 px-3 py-1.5 text-xs font-semibold text-[#256279] shadow-xs hover:bg-[#256279]/10"
        >
          <i className="bi bi-magic" />
          Suggest from 1st Verse
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Title Field */}
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-900"
          >
            Lyric Title (Unwan) <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="title"
              {...register("title")}
              placeholder="e.g. Faslon Ko Takalluf Hai Hum Se Agar"
              onChange={(e) => {
                setValue("title", e.target.value, { shouldDirty: true });
                if (!isEditMode) {
                  setValue(
                    "slug",
                    slugCreater(e.target.value, {
                      lower: true,
                      remove: /\d/g,
                    }),
                    { shouldDirty: true },
                  );
                }
              }}
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-xs focus:border-[#256279] focus:ring-2 focus:ring-[#256279] focus:outline-none sm:text-sm"
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        {/* Slug Field */}
        <div className="sm:col-span-2">
          <label
            htmlFor="slug"
            className="block text-sm font-semibold text-gray-900"
          >
            Permalink Slug (URL path) <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 flex gap-2">
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <input
                  placeholder="faslon-ko-takalluf-hai-hum-se-agar"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const collapsed = slugCreater(e.target.value, {
                      lower: true,
                      remove: /\d/g,
                    });
                    field.onChange(collapsed);
                  }}
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-xs focus:border-[#256279] focus:ring-2 focus:ring-[#256279] focus:outline-none sm:text-sm"
                />
              )}
            />
            <button
              type="button"
              onClick={() =>
                setValue(
                  "slug",
                  slugCreater(getValues("title"), {
                    lower: true,
                    remove: /\d/g,
                  }),
                  { shouldDirty: true },
                )
              }
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              title="Regenerate from title"
            >
              <i className="bi bi-arrow-clockwise text-base" />
            </button>
          </div>
          {errors.slug && (
            <p className="mt-1.5 text-xs text-red-600">{errors.slug.message}</p>
          )}

          {/* Live URL Preview */}
          <div className="mt-3 flex items-center gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-2.5 text-xs text-gray-600">
            <i className="bi bi-link-45deg text-sm text-gray-500" />
            <span className="text-gray-400">Public URL:</span>
            <span className="font-mono text-[#256279]">
              lyrics.midhah.com/{currentGenre || "genre"}/
              {currentSlug || "slug"}
            </span>
          </div>
        </div>
      </div>

      {/* Step 2 Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <i className="bi bi-arrow-left" />
          <span>Back to Content</span>
        </button>
        <button
          type="button"
          onClick={onProceed}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#256279] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4f62] focus:outline-none"
        >
          <span>Continue to Metadata</span>
          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </div>
  );
};
