"use client";
import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { z } from "zod";
import Select, { MultiValue, SingleValue } from "react-select";
import { toast } from "react-hot-toast";
import axios from "axios";
import slugCreater from "slug";
import { fetchPoets } from "@/src/services/poet";
import { fetchLanguages } from "@/src/services/languages";
import { logoutUser } from "@/src/utils/logout";
import { editLyricSchema, lyricSchema } from "@/src/schemas/lyrics/schema";
import { capitalizeFirstLetter } from "@/src/helpers";
import {
  fetchTranliterate,
  createLyric,
  editLyric,
} from "@/src/services/lyrics";
import { genreOptions } from "@/src/@types";
import { noto_nastaliq_urdu } from "@midhah/utils/fonts";
import * as Dialog from "@radix-ui/react-dialog";
import { extractError } from "@/src/lib/error";

type CreateFormValues = z.infer<typeof lyricSchema>;
type EditFormValues = z.infer<typeof editLyricSchema>;

type LyricFormValues = CreateFormValues | EditFormValues;

interface LyricFormProps {
  title: string;
  defaultValues?: Partial<EditFormValues>;
  mode: "create" | "edit";
}

const selectStyles = {
  control: (provided: object, state: { isFocused: boolean }) => ({
    ...provided,
    minHeight: "37px",
    height: "37px",
    padding: 0,
    borderWidth: 0,
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#237c9c" : "#d1d5db",
    boxShadow: state.isFocused
      ? "inset 0 0 0 2px #237c9c"
      : "inset 0 0 0 1px #d1d5db",
    "&:hover": { borderColor: "none" },
    outline: "none",
  }),
  valueContainer: (provided: object) => ({
    ...provided,
    paddingTop: "0px",
    paddingBottom: "0px",
  }),
  input: (provided: object) => ({
    ...provided,
    marginTop: "0px",
    marginBottom: "0px",
  }),
};
const LyricForm: React.FC<LyricFormProps> = ({
  title,
  defaultValues,
  mode,
}) => {
  const router = useRouter();
  const params = useParams();
  const urlSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || "";
  const searchParams = useSearchParams();
  const isEditMode = mode === "edit";

  const [poets, setPoets] = React.useState<{ id: number; name: string }[]>([]);
  const [languages, setLanguages] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [createdSlug] = React.useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditFormValues>({
    resolver: zodResolver(isEditMode ? editLyricSchema : lyricSchema),
    defaultValues: {
      title: "",
      slug: "",
      lyrics: "",
      transliteratedContent: "",
      genre: "",
      languageIDs: [],
      poetID: undefined,
      isPublished: true,
      ...defaultValues,
    },
  });

  const currentGenre = useWatch({ control, name: "genre" });
  const currentLanguageIDs = useWatch({ control, name: "languageIDs" }) || [];
  const currentPoetID = useWatch({ control, name: "poetID" });

  const step = searchParams.get("step");
  const activeStep = Number(step) === 2 ? 2 : 1;

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [langRes, poetRes] = await Promise.all([
          fetchLanguages(0, 1000),
          fetchPoets(0, 1000),
        ]);

        setLanguages(langRes.data);
        setPoets(poetRes.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logoutUser();
          return;
        }
        toast.error("Error fetching form data. Please try again.");
      }
    };

    loadFormData();
  }, []);

  const genreSelectOptions = genreOptions.map((genre) => ({
    value: genre,
    label: capitalizeFirstLetter(genre),
  }));
  const languageSelectOptions = languages.map((lang) => ({
    value: lang.id,
    label: lang.name,
  }));
  const poetSelectOptions = poets.map((poet) => ({
    value: poet.id,
    label: poet.name,
  }));

  const handleGenreChange = (
    selected: SingleValue<{ value: string; label: string }>,
  ) => setValue("genre", selected?.value ?? "", { shouldDirty: true });
  const handleLanguageChange = (
    selected: MultiValue<{ value: number; label: string }>,
  ) =>
    setValue(
      "languageIDs",
      selected.map((l) => l.value),
      { shouldDirty: true },
    );
  const handlePoetChange = (
    selected: SingleValue<{ value: number; label: string }>,
  ) => setValue("poetID", selected?.value, { shouldDirty: true });

  const handleFormSubmit = async (data: LyricFormValues) => {
    try {
      if (isEditMode) {
        await editLyric(data, urlSlug);
        toast.success("Lyrics edited successfully!");
        reset(data);
        if (activeStep === 1 && defaultValues?.lyrics !== data.lyrics) {
          setIsOpen(true);
        } else {
          router.push(`/lyrics`);
        }
      } else {
        await createLyric(data);
        toast.success("Lyrics added successfully!");

        router.push(`/lyrics/edit/${data.slug}?step=2`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logoutUser();
        return;
      }

      toast.error(`Error saving lyric: ${error}`);
    }
  };

  const fetchTransliterateLyric = async (lyricId: number) => {
    try {
      if (!lyricId) throw new Error("No lyric provided");
      setLoading(true);
      const res = await fetchTranliterate(lyricId);
      console.log(res);
      setValue("transliteratedContent", res.data.content);
    } catch (error) {
      toast.error(`Error Transliterating lyric: ${extractError(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const transliterateSlug = isEditMode ? urlSlug : createdSlug;
  const canAccessStep2 = isEditMode && !isDirty;
  const canGoBackToStep1 = isEditMode && !isDirty;

  return (
    <>
      <div className="p-6">
        <div className="mb-8 flex items-center gap-0">
          <button
            type="button"
            onClick={() => {
              if (canGoBackToStep1) {
                router.push(`/lyrics/edit/${transliterateSlug}?step=1`);
              }
            }}
            disabled={activeStep === 1 || !canGoBackToStep1}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors
            ${
              activeStep === 1
                ? "border-primary text-primary"
                : "border-transparent text-gray-400"
            }
            ${
              activeStep !== 1 && canGoBackToStep1
                ? "cursor-pointer hover:text-gray-600"
                : "cursor-default"
            }`}
          >
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold bg-primary text-white`}
            >
              1
            </span>
            <span>Details</span>
          </button>

          <div className="h-px w-8 bg-gray-200" />

          {/* Step 2 tab */}
          <button
            type="button"
            onClick={() => {
              if (canAccessStep2) {
                router.push(`/lyrics/edit/${transliterateSlug}?step=2`);
              }
            }}
            disabled={activeStep === 2 || !canAccessStep2}
            className={`flex  items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors
            ${
              activeStep === 2
                ? "border-primary text-primary"
                : "border-transparent text-gray-400"
            }
            ${
              activeStep !== 2 && canAccessStep2
                ? "cursor-pointer hover:text-gray-600"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
              ${activeStep === 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </span>
            Transliteration
            {!isEditMode && !createdSlug && (
              <span className="ml-1 text-xs text-gray-600">(create first)</span>
            )}
            {isEditMode && isDirty && activeStep === 1 && (
              <span className="ml-1 text-xs text-gray-600">
                (unsaved changes)
              </span>
            )}
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit, (errors) => {
            console.log("Errors: ", errors);
          })}
        >
          {activeStep === 1 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <h2 className="text-lg font-semibold text-gray-900 sm:col-span-3">
                {title}
              </h2>

              <div className="sm:col-span-3">
                <div className="flex items-center justify-end">
                  <label
                    htmlFor="isPublished"
                    className="mr-4 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Publish
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="isPublished"
                      type="checkbox"
                      {...register("isPublished")}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 place-items-center sm:col-span-6 sm:grid-cols-6">
                <div className="grid w-3/4 grid-cols-1 justify-center gap-x-6 gap-y-8 sm:col-span-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        {...register("title")}
                        onChange={(e) => {
                          setValue("title", e.target.value, {
                            shouldDirty: true,
                          });
                          if (!defaultValues?.title) {
                            setValue(
                              "slug",
                              slugCreater(e.target.value, {
                                lower: true,
                                remove: /\d/g,
                              }),
                            );
                          }
                        }}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Slug (Only lowercase letters, numbers, and hyphens)
                    </label>
                    <div className="mt-2">
                      <div className="flex flex-row gap-2">
                        <Controller
                          name="slug"
                          control={control}
                          render={({ field }) => (
                            <input
                              placeholder="Enter slug"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                const collapsed = slugCreater(e.target.value, {
                                  lower: true,
                                  remove: /\d/g,
                                });
                                field.onChange(collapsed);
                              }}
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                          )}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setValue(
                              "slug",
                              slugCreater(getValues("title"), { lower: true }),
                            )
                          }
                          className="hover:bg-primary-hover cursor-pointer rounded-md bg-primary px-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <i className="bi bi-arrow-clockwise text-base" />
                        </button>
                      </div>
                      {errors.slug && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.slug.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Genre
                    </label>
                    <div className="mt-2">
                      <Select
                        id="genre"
                        options={genreSelectOptions}
                        onChange={handleGenreChange}
                        value={
                          genreSelectOptions.find(
                            (o) => o.value === currentGenre,
                          ) ?? null
                        }
                        classNamePrefix="react-select"
                        className="block w-full rounded-md p-0 text-gray-900 shadow-sm outline-none sm:text-sm sm:leading-6"
                        styles={selectStyles}
                      />
                      {errors.genre && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.genre.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="lyrics"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lyrics
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="lyrics"
                        {...register("lyrics")}
                        className={`block h-58 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-lg sm:leading-8 ${noto_nastaliq_urdu.className}`}
                        dir="auto"
                      />
                      {errors.lyrics && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.lyrics.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="languageIDs"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Languages
                    </label>
                    <div className="mt-2">
                      <Select
                        id="languageIDs"
                        isMulti
                        options={languageSelectOptions}
                        onChange={handleLanguageChange}
                        value={languageSelectOptions.filter((o) =>
                          currentLanguageIDs.includes(o.value),
                        )}
                        classNamePrefix="react-select"
                        className="block w-full rounded-md text-gray-900 shadow-sm outline-none sm:text-sm sm:leading-6"
                        styles={selectStyles}
                      />
                      {errors.languageIDs && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.languageIDs.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="poetID"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Poet
                    </label>
                    <div className="mt-2">
                      <Select
                        id="poetID"
                        options={poetSelectOptions}
                        onChange={handlePoetChange}
                        value={
                          poetSelectOptions.find(
                            (o) => o.value === currentPoetID,
                          ) ?? null
                        }
                        classNamePrefix="react-select"
                        className="block w-full rounded-md text-gray-900 shadow-sm outline-none sm:text-sm sm:leading-6"
                        styles={selectStyles}
                      />
                      {errors.poetID && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.poetID.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-6">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        router.push("/lyrics");
                      }}
                      className="text-sm font-semibold cursor-pointer leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`hover:bg-primary-hover cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 ${isSubmitting && "cursor-not-allowed"}`}
                    >
                      {isSubmitting
                        ? "Saving…"
                        : isEditMode
                          ? "Save"
                          : "Save & Continue"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && defaultValues && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Transliteration
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Generate or manually edit the transliterated version of the
                  lyrics.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 place-items-center sm:col-span-6 sm:grid-cols-6">
                <div className="grid w-3/4 grid-cols-1 gap-x-6 gap-y-8 sm:col-span-6 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <div className="flex justify-between items-end">
                      <label
                        htmlFor="transliteratedContent"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Transliterated Lyrics
                      </label>
                      <div className="flex justify-center sm:col-span-6">
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() =>
                            fetchTransliterateLyric(defaultValues.id!)
                          }
                          className="hover:bg-primary-hover cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60 flex items-center gap-2"
                        >
                          {loading && (
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
                          )}
                          {loading
                            ? "Transliterating…"
                            : "Transliterate With AI"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <textarea
                        id="transliteratedContent"
                        {...register("transliteratedContent")}
                        className="block h-64 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                      {errors.transliteratedContent && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.transliteratedContent.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between sm:col-span-6">
                    <div className="flex items-center gap-x-6">
                      <button
                        type="button"
                        onClick={() => router.push("/lyrics")}
                        className="text-sm cursor-pointer font-semibold leading-6 text-gray-900"
                      >
                        {isEditMode ? "Cancel" : "Skip & Finish"}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="hover:bg-primary-hover cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
                      >
                        {isSubmitting ? "Saving…" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content
            className={`fixed top-1/2 left-1/2 max-h-[60vh] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none md:w-full`}
          >
            <div className="flex flex-col justify-between items-start gap-4">
              <Dialog.Title className="mx-1 w-full text-start text-xl font-bold">
                Alert
              </Dialog.Title>
              <Dialog.Description>
                <div className="text-start ">
                  Lyrics have been changed. Do you want to update the
                  transliteration?
                </div>
              </Dialog.Description>
            </div>
            <div className="mt-6">
              <div className="mt-2 flex flex-row justify-center gap-2">
                <button
                  className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm/6 font-semibold text-black shadow hover:shadow-black/20"
                  onClick={() => {
                    setIsOpen(false);
                    const slug = getValues("slug");
                    router.push(`/lyrics/edit/${slug}?step=2`);
                  }}
                >
                  <p>Yes</p>
                </button>
                <button
                  className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm/6 font-semibold text-black shadow hover:shadow-black/20"
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/lyrics`);
                  }}
                >
                  <p>No</p>
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default LyricForm;
