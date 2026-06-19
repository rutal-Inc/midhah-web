import api from "@midhah/utils/axios";
import { AxiosError } from "axios";
import { CollectionType } from "../models/Collection";

const handleError = (error: AxiosError) => {
  throw error;
};

export async function getCollection(
  id: string,
): Promise<CollectionType | null> {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${id}/lyrics`,
  );
  return response.data.data ?? null;
}

export const getUserCollectionsLyric = async (
  userId: number | null,
  lyricId: number,
) => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/user/${userId}?lyricId=${lyricId}`,
    );
    return response.data.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
export const getUserCollections = async (userId: number | null) => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/userId/${userId}`,
    );
    return response.data?.data || [];
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const addNewUserCollection = async (
  name: string,
  userId: number | null,
) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection`,
      { name, userId },
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateUserCollection = async (
  name: string,
  collectionId: number,
  userId: number | null,
) => {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${collectionId}`,
      { name, userId },
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const removeUserCollection = async (
  collectionLyricId: number,
  userId: number | null,
) => {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${collectionLyricId}?userId=${userId}`,
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const addLyricToUserCollection = async (
  collectionId: string,
  lyricId: number,
) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/lyric`,
      { collectionId, lyricId },
    );

    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const removeLyricFromUserCollection = async (
  collectionLyricId: string,
) => {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/lyric/${collectionLyricId}`,
    );

    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
