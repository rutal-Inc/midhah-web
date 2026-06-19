import { z } from "zod";

export const lyricSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
  lyrics: z
    .string()
    .min(1, "Lyrics is required")
    .max(100000, "Lyrics is too long"),
  genre: z.string().min(1, "Genre is required").max(100, "Genre is too long"),
  languageIDs: z.array(z.number()).min(1, "Select at least one language"),
  poetID: z.number().optional(),
  isPublished: z.boolean().optional(),
  transliteratedContent: z.string().max(100000).optional(),
});

export const editLyricSchema = z.object({
  id: z.number().min(1, "ID is required").optional(),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(100, "Slug is too long"),
  lyrics: z
    .string()
    .min(1, "Lyrics is required")
    .max(100000, "Lyrics is too long"),
  transliteratedContent: z
    .string()
    .min(1, "Transliterated lyrics is required")
    .max(100000, "Transliterated lyrics is too long")
    .optional()
    .or(z.literal("")),
  genre: z.string().min(1, "Genre is required").max(100, "Genre is too long"),
  languageIDs: z.array(z.number()).min(1, "Select at least one language"),
  poetID: z.number().optional(),
  isPublished: z.boolean().optional(),
});
