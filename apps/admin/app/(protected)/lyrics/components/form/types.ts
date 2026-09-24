import { editLyricSchema, lyricSchema } from "@/schemas/lyrics/schema";
import { z } from "zod";

export type CreateFormValues = z.infer<typeof lyricSchema>;
export type EditFormValues = z.infer<typeof editLyricSchema>;
export type LyricFormValues = CreateFormValues | EditFormValues;

export interface LyricFormProps {
  title: string;
  defaultValues?: Partial<EditFormValues>;
  mode: "create" | "edit";
}

export interface OptionType {
  label: string;
  value: string;
}

export const LOCAL_DRAFT_KEY = "midhah_admin_lyric_create_draft";

export const selectStyles = {
  control: (provided: object, state: { isFocused: boolean }) => ({
    ...provided,
    minHeight: "42px",
    height: "42px",
    padding: 0,
    borderWidth: 0,
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#256279" : "#d1d5db",
    boxShadow: state.isFocused
      ? "inset 0 0 0 2px #256279"
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

export const STEPS = [
  { id: 1, title: "1. Content & Roman", subtitle: "Urdu & Transliteration" },
  { id: 2, title: "2. Title & Slug", subtitle: "Unwan & Permalink" },
  { id: 3, title: "3. Categorization", subtitle: "Language, Genre & Poet" },
  { id: 4, title: "4. Status & Publish", subtitle: "Publish & Verify" },
];
