import React from "react";
import { useFormContext } from "react-hook-form";
import Select, { MultiValue, SingleValue } from "react-select";
import { LyricFormValues, selectStyles } from "./types";

interface Step3CategorizationProps {
  genreSelectOptions: { value: string; label: string }[];
  languageSelectOptions: { value: number; label: string }[];
  poetSelectOptions: { value: number; label: string }[];
  currentGenre: string;
  currentLanguageIDs: number[];
  currentPoetID?: number;
  onBack: () => void;
  onProceed: () => void;
}

export const Step3Categorization: React.FC<Step3CategorizationProps> = ({
  genreSelectOptions,
  languageSelectOptions,
  poetSelectOptions,
  currentGenre,
  currentLanguageIDs,
  currentPoetID,
  onBack,
  onProceed,
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<LyricFormValues>();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Step 3: Language, Genre & Poet
        </h2>
        <p className="text-sm text-gray-500">
          Categorize this lyric with appropriate taxonomy and publishing
          controls.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-semibold text-gray-900"
          >
            Genre (Sinf) <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <Select
              id="genre"
              options={genreSelectOptions}
              onChange={(
                selected: SingleValue<{ value: string; label: string }>,
              ) =>
                setValue("genre", selected?.value ?? "", { shouldDirty: true })
              }
              value={
                genreSelectOptions.find((o) => o.value === currentGenre) ?? null
              }
              classNamePrefix="react-select"
              styles={selectStyles}
            />
            {errors.genre && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.genre.message}
              </p>
            )}
          </div>
        </div>

        {/* Poet */}
        <div>
          <label
            htmlFor="poetID"
            className="block text-sm font-semibold text-gray-900"
          >
            Poet (Shayar)
          </label>
          <div className="mt-2">
            <Select
              id="poetID"
              isClearable
              placeholder="Select poet (or leave empty if unknown)"
              options={poetSelectOptions}
              onChange={(
                selected: SingleValue<{ value: number; label: string }>,
              ) => setValue("poetID", selected?.value, { shouldDirty: true })}
              value={
                poetSelectOptions.find((o) => o.value === currentPoetID) ?? null
              }
              classNamePrefix="react-select"
              styles={selectStyles}
            />
            {errors.poetID && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.poetID.message}
              </p>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="sm:col-span-2">
          <label
            htmlFor="languageIDs"
            className="block text-sm font-semibold text-gray-900"
          >
            Languages <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <Select
              id="languageIDs"
              isMulti
              placeholder="Select one or more languages (Urdu, Punjabi, etc.)"
              options={languageSelectOptions}
              onChange={(
                selected: MultiValue<{ value: number; label: string }>,
              ) =>
                setValue(
                  "languageIDs",
                  selected.map((l) => l.value),
                  { shouldDirty: true },
                )
              }
              value={languageSelectOptions.filter((o) =>
                currentLanguageIDs.includes(o.value),
              )}
              classNamePrefix="react-select"
              styles={{
                ...selectStyles,
                control: (provided: object, state: { isFocused: boolean }) => ({
                  ...provided,
                  minHeight: "42px",
                  borderWidth: 0,
                  borderRadius: "0.375rem",
                  borderColor: state.isFocused ? "#256279" : "#d1d5db",
                  boxShadow: state.isFocused
                    ? "inset 0 0 0 2px #256279"
                    : "inset 0 0 0 1px #d1d5db",
                }),
              }}
            />
            {errors.languageIDs && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.languageIDs.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Step 3 Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <i className="bi bi-arrow-left" />
          <span>Back to Title & Slug</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#256279] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4f62]"
        >
          <span>Continue to Status & Publishing</span>
          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </div>
  );
};
