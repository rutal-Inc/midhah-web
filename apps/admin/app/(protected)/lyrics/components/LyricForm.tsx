"use client";

import { genreOptions, LyricFormData } from "@/@types";
import { capitalizeFirstLetter } from "@/helpers";
import { extractError } from "@/lib/error";
import { editLyricSchema, lyricSchema } from "@/schemas/lyrics/schema";
import { fetchLanguages } from "@/services/languages";
import { createLyric, editLyric, fetchTranliterate } from "@/services/lyrics";
import { fetchPoets } from "@/services/poet";
import { logoutUser } from "@/utils/logout";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import slugCreater from "slug";
import {
  DraftAlert,
  EditFormValues,
  LOCAL_DRAFT_KEY,
  LyricFormProps,
  LyricFormValues,
  OptionType,
  Step1ContentEditor,
  Step2TitleSlug,
  Step3Categorization,
  Step4PublishReview,
  StepperHeader,
  TransliterationModal,
} from "./form";

const LyricForm: React.FC<LyricFormProps> = ({
  title,
  defaultValues,
  mode,
}) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const urlSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || "";
  const isEditMode = mode === "edit";

  const initialStepParam = Number(searchParams.get("step"));
  const [activeStep, setActiveStep] = useState<number>(
    initialStepParam >= 1 && initialStepParam <= 4 ? initialStepParam : 1,
  );

  const [poets, setPoets] = useState<{ id: number; name: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [aiLoading, setAiLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [redirectOptions, setRedirectOptions] = useState<OptionType[]>([]);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  const methods = useForm<EditFormValues>({
    resolver: zodResolver(isEditMode ? editLyricSchema : lyricSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      transliteratedContent: "",
      genre: "",
      languageIDs: [],
      poetID: undefined,
      isPublished: true,
      isVerified: false,
      redirectTo: null,
      ...defaultValues,
    },
  });

  const { handleSubmit, reset, control, setValue, getValues, trigger } =
    methods;

  const currentContent = useWatch({ control, name: "content" }) || "";
  const currentTitle = useWatch({ control, name: "title" }) || "";
  const currentSlug = useWatch({ control, name: "slug" }) || "";
  const currentGenre = useWatch({ control, name: "genre" }) || "";
  const currentLanguageIDs = useWatch({ control, name: "languageIDs" }) || [];
  const currentPoetID = useWatch({ control, name: "poetID" });
  const currentTransliterated =
    useWatch({ control, name: "transliteratedContent" }) || "";

  // Content Statistics
  const contentLines = currentContent
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const lineCount = contentLines.length;
  const verseCount = Math.floor(lineCount / 2);
  const wordCount = currentContent.trim()
    ? currentContent.trim().split(/\s+/).length
    : 0;

  // Handle default values on edit mode
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
      if (defaultValues.redirectTo) {
        const redirect = defaultValues.redirectTo.split("/");
        const label = `${redirect[1]} - (${redirect[0]})`;
        const value = `${redirect[0]}/${redirect[1]}`;
        setValue("redirectTo", value);
        setRedirectOptions((prev) => {
          const exists = prev.some((o) => o.value === value);
          return exists ? prev : [{ label, value }, ...prev];
        });
      }
    }
  }, [defaultValues, reset, setValue]);

  // Load languages and poets from API
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const [langRes, poetRes] = await Promise.all([
          fetchLanguages(0, 1000),
          fetchPoets(0, 1000),
        ]);
        setLanguages(langRes.data);
        setPoets(poetRes.data);

        // Pre-select Urdu by default in create mode if no language is selected yet
        if (
          !isEditMode &&
          (!getValues("languageIDs") || getValues("languageIDs").length === 0)
        ) {
          const urdu = langRes.data.find(
            (l: { name: string }) => l.name.toLowerCase() === "urdu",
          );
          if (urdu) {
            setValue("languageIDs", [urdu.id]);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logoutUser();
          return;
        }
        toast.error("Error fetching form data. Please try again.");
      }
    };
    loadFormData();
  }, [isEditMode, setValue, getValues]);

  // Check for auto-saved draft in localStorage (create mode only)
  useEffect(() => {
    if (isEditMode) return;
    try {
      const saved = localStorage.getItem(LOCAL_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.content && !getValues("content")) {
          setHasSavedDraft(true);
        }
      }
    } catch {}
  }, [isEditMode, getValues]);

  // Auto-save draft changes to localStorage (create mode only)
  useEffect(() => {
    if (isEditMode) return;
    if (currentContent || currentTitle || currentTransliterated) {
      try {
        localStorage.setItem(
          LOCAL_DRAFT_KEY,
          JSON.stringify({
            content: currentContent,
            transliteratedContent: currentTransliterated,
            title: currentTitle,
            slug: currentSlug,
            genre: currentGenre,
            languageIDs: currentLanguageIDs,
            poetID: currentPoetID,
            savedAt: new Date().toLocaleTimeString(),
          }),
        );
      } catch {}
    }
  }, [
    isEditMode,
    currentContent,
    currentTransliterated,
    currentTitle,
    currentSlug,
    currentGenre,
    currentLanguageIDs,
    currentPoetID,
  ]);

  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(LOCAL_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.content)
          setValue("content", parsed.content, { shouldDirty: true });
        if (parsed.transliteratedContent)
          setValue("transliteratedContent", parsed.transliteratedContent, {
            shouldDirty: true,
          });
        if (parsed.title)
          setValue("title", parsed.title, { shouldDirty: true });
        if (parsed.slug) setValue("slug", parsed.slug, { shouldDirty: true });
        if (parsed.genre)
          setValue("genre", parsed.genre, { shouldDirty: true });
        if (parsed.languageIDs)
          setValue("languageIDs", parsed.languageIDs, { shouldDirty: true });
        if (parsed.poetID)
          setValue("poetID", parsed.poetID, { shouldDirty: true });
        setHasSavedDraft(false);
        toast.success(
          `Draft restored (saved at ${parsed.savedAt || "earlier"})`,
        );
      }
    } catch {
      toast.error("Could not restore draft.");
    }
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(LOCAL_DRAFT_KEY);
    setHasSavedDraft(false);
    toast.success("Saved draft discarded.");
  };

  // Helper to generate and set Title and Slug from first verse
  const applyTitleAndSlugFromFirstVerse = (firstLine: string) => {
    const cleanTitle = firstLine.replace(/[۔،,.\-—–!؟?]+$/g, "").trim();
    setValue("title", cleanTitle, { shouldDirty: true });
    setValue("slug", slugCreater(cleanTitle, { lower: true, remove: /\d/g }), {
      shouldDirty: true,
    });
  };

  // Step 1 to Step 2: Validate content and suggest title if empty
  const handleProceedFromStep1 = async () => {
    const isValid = await trigger("content");
    if (!isValid || !getValues("content")?.trim()) {
      toast.error("Please enter the lyrics content before proceeding.");
      return;
    }

    // Auto-suggest Title from 1st verse if title is still empty
    const existingTitle = getValues("title");
    if (!existingTitle || existingTitle.trim().length === 0) {
      const firstLine = contentLines[0] || "";
      if (firstLine) {
        applyTitleAndSlugFromFirstVerse(firstLine);
      }
    }

    setActiveStep(2);
  };

  // Step 2 to Step 3: Validate title and slug
  const handleProceedFromStep2 = async () => {
    const isValid = await trigger(["title", "slug"]);
    if (!isValid) {
      toast.error("Please provide a valid Title and URL Slug.");
      return;
    }
    setActiveStep(3);
  };

  // Step 3 to Step 4: Validate categorization (genre & languages)
  const handleProceedFromStep3 = async () => {
    const isValid = await trigger(["genre", "languageIDs"]);
    if (!isValid) {
      toast.error("Please select a Genre and at least one Language.");
      return;
    }
    setActiveStep(4);
  };

  // Suggest Title from Content 1st Line
  const handleSuggestTitleFromContent = () => {
    const firstLine = contentLines[0];
    if (!firstLine) {
      toast.error("Please enter lyrics content in Step 1 first.");
      return;
    }
    applyTitleAndSlugFromFirstVerse(firstLine);
    toast.success("Title and Slug updated from 1st verse!");
  };

  // Format and clean text content
  const handleCleanContent = () => {
    const raw = getValues("content") || "";
    if (!raw.trim()) return;
    const cleaned = raw
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
    setValue("content", cleaned, { shouldDirty: true });
    toast.success("Cleaned extra spaces and empty lines.");
  };

  // Final Form Submission (Step 4)
  const handleFormSubmit = async (data: LyricFormValues) => {
    try {
      if (isEditMode) {
        await editLyric(data as LyricFormData, urlSlug);
        toast.success("Lyrics updated successfully!");
        reset(data);
        router.push("/lyrics");
      } else {
        await createLyric(data as LyricFormData);
        localStorage.removeItem(LOCAL_DRAFT_KEY);
        toast.success("Lyrics created successfully!");
        router.push("/lyrics");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logoutUser();
        return;
      }
      toast.error(`Error saving lyric: ${extractError(error)}`);
    }
  };

  // AI Transliterate action
  const handleAITransliterate = async () => {
    const rawContent = getValues("content");
    if (!rawContent || !rawContent.trim()) {
      toast.error("Please enter Urdu Kalaam in the left box first.");
      return;
    }
    try {
      setAiLoading(true);
      const lyricId = defaultValues?.id;
      const res = await fetchTranliterate(
        lyricId ? { lyricId, content: rawContent } : { content: rawContent },
      );
      if (res?.data?.content) {
        setValue("transliteratedContent", res.data.content, {
          shouldDirty: true,
        });
        toast.success("Transliterated successfully via AI!");
      }
    } catch (error) {
      toast.error(`Error transliterating lyric: ${extractError(error)}`);
    } finally {
      setAiLoading(false);
    }
  };

  const genreSelectOptions = useMemo(
    () =>
      genreOptions.map((genre) => ({
        value: genre,
        label: capitalizeFirstLetter(genre),
      })),
    [],
  );

  const languageSelectOptions = useMemo(
    () =>
      languages.map((lang) => ({
        value: lang.id,
        label: lang.name,
      })),
    [languages],
  );

  const poetSelectOptions = useMemo(
    () =>
      poets.map((poet) => ({
        value: poet.id,
        label: poet.name,
      })),
    [poets],
  );

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {/* Draft Restore Notification */}
        {hasSavedDraft && !isEditMode && (
          <DraftAlert
            onRestore={handleRestoreDraft}
            onDiscard={handleDiscardDraft}
          />
        )}

        {/* Header and Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {isEditMode
                ? `Editing: ${defaultValues?.title || urlSlug}`
                : "Step-by-step incremental lyric creation"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/lyrics")}
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel & Exit
          </button>
        </div>

        {/* Modern Stepper Header */}
        <StepperHeader
          activeStep={activeStep}
          isEditMode={isEditMode}
          onStepClick={(stepId) => setActiveStep(stepId)}
        />

        {/* Main Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {activeStep === 1 && (
            <Step1ContentEditor
              isEditMode={isEditMode}
              aiLoading={aiLoading}
              currentContent={currentContent}
              currentTransliterated={currentTransliterated}
              lineCount={lineCount}
              verseCount={verseCount}
              wordCount={wordCount}
              onCleanContent={handleCleanContent}
              onAITransliterate={handleAITransliterate}
              onProceed={handleProceedFromStep1}
            />
          )}

          {activeStep === 2 && (
            <Step2TitleSlug
              isEditMode={isEditMode}
              currentGenre={currentGenre}
              currentSlug={currentSlug}
              onSuggestTitle={handleSuggestTitleFromContent}
              onBack={() => setActiveStep(1)}
              onProceed={handleProceedFromStep2}
            />
          )}

          {activeStep === 3 && (
            <Step3Categorization
              genreSelectOptions={genreSelectOptions}
              languageSelectOptions={languageSelectOptions}
              poetSelectOptions={poetSelectOptions}
              currentGenre={currentGenre}
              currentLanguageIDs={currentLanguageIDs}
              currentPoetID={currentPoetID}
              onBack={() => setActiveStep(2)}
              onProceed={handleProceedFromStep3}
            />
          )}

          {activeStep === 4 && (
            <Step4PublishReview
              isEditMode={isEditMode}
              urlSlug={urlSlug}
              redirectOptions={redirectOptions}
              setRedirectOptions={setRedirectOptions}
              currentTitle={currentTitle}
              currentGenre={currentGenre}
              currentSlug={currentSlug}
              currentPoetID={currentPoetID}
              poets={poets}
              lineCount={lineCount}
              verseCount={verseCount}
              wordCount={wordCount}
              onBack={() => setActiveStep(3)}
            />
          )}
        </form>

        {/* Confirmation Dialog when content edited */}
        <TransliterationModal
          isOpen={isAlertOpen}
          onOpenChange={setIsAlertOpen}
          onKeepExisting={() => {
            setIsAlertOpen(false);
            router.push("/lyrics");
          }}
          onGoToContent={() => {
            setIsAlertOpen(false);
            setActiveStep(1);
          }}
        />
      </div>
    </FormProvider>
  );
};

export default LyricForm;
