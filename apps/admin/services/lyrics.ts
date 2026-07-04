import { APIResponse, Filters, Lyric, LyricFormData } from "@/@types";
import api from "@midhah/utils/axios";
import { extractError } from "../lib/error";

const fetchLyricsSlug = async (slug: string) => {
  try {
    const response = await api.get(`/lyrics/slugs/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};
const fetchLyrics = async (
  filters?: Filters,
): Promise<APIResponse<Lyric[]>> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.slugs?.length)
        params.append("slugs", filters.slugs.join(","));
      if (filters.isPublished?.length)
        params.append("isPublished", filters.isPublished.join(","));
      if (filters.genre?.length)
        params.append("genre", filters.genre.join(","));
      if (filters.poet?.length) params.append("poet", filters.poet.join(","));
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.orderBy) params.append("orderBy", filters.orderBy);
      if (filters.page) params.append("page", String(Number(filters.page) - 1));
      if (filters.size) params.append("size", String(filters.size));
    }

    const response = await api.get(`/lyrics?${params.toString()}`);
    return response.data as APIResponse<Lyric[]>;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchSingleLyrics = async (slug: string) => {
  try {
    const response = await api.get(`/lyrics/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const updateIsLyricPublished = async (slug: string, isPublished: boolean) => {
  try {
    const response = await api.patch(`/lyrics/${slug}`, {
      isPublished,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const createLyric = async (formData: LyricFormData) => {
  try {
    const response = await api.post("/lyrics", {
      title: formData.title.trim(),
      slug: formData.slug,
      content: formData.content.trim(),
      genre: formData.genre,
      poetID: formData.poetID,
      isPublished: formData.isPublished,
      languageIDs: formData.languageIDs,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const editLyric = async (formData: LyricFormData, slug: string) => {
  try {
    const response = await api.put(`/lyrics/${slug}`, {
      title: formData.title.trim(),
      slug: formData.slug,
      content: formData.content.trim(),
      transliteratedContent:
        formData.transliteratedContent?.trim() || undefined,
      genre: formData.genre,
      poetID: formData.poetID,
      isPublished: formData.isPublished,
      languageIDs: formData.languageIDs,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const deleteLyric = async (slug: string) => {
  try {
    const response = await api.delete(`/lyrics/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchTranliterate = async (lyricId: number) => {
  try {
    const response = await api.post("/lyrics/transliterate", {
      lyricId: lyricId,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export {
  createLyric,
  deleteLyric,
  editLyric,
  fetchLyrics,
  fetchLyricsSlug,
  fetchSingleLyrics,
  fetchTranliterate,
  updateIsLyricPublished,
};
