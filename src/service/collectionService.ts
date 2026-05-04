import axios, { AxiosError } from "axios";
import { CollectionType } from "../models/Collection";

const handleError = (error: AxiosError, functionName: string) => {
  const message = error.response?.data || error.message;
  console.error(`Service Error [${functionName}]:`, message);
  throw error;
};

export async function getCollection(
  id: string,
  token: string,
): Promise<CollectionType | null> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${id}/lyrics`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
    },
  );
  return response.data.data ?? null;
}

export const getUserCollectionsLyric = async (
  userId: number | null,
  lyricId: number,
  authToken: string | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/user/${userId}?lyricId=${lyricId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    handleError(error as AxiosError, "getUserCollectionsLyric");
  }
};
export const getUserCollections = async (
  userId: number | null,
  authToken: string | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/userId/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      },
    );
    return response.data?.data || [];
  } catch (error) {
    handleError(error as AxiosError, "getUserCollections");
  }
};

export const addNewUserCollection = async (
  name: string,
  userId: number | null,
  authToken: string | null,
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection`,
      { name, userId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authToken}`,
        },
      },
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError, "addNewUserCollection");
  }
};

export const updateUserCollection = async (
  name: string,
  collectionId: number,
  userId: number | null,
  authToken: string | null,
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${collectionId}`,
      { name, userId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authToken}`,
        },
      },
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError, "updateUserCollection");
  }
};

export const removeUserCollection = async (
  collectionLyricId: number,
  userId: number | null,
  authToken: string | null,
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${collectionLyricId}?userId=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${authToken}`,
        },
      },
    );
    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError, "removeUserCollection");
  }
};

export const addLyricToUserCollection = async (
  collectionId: string,
  lyricId: number,
  token: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/lyric`,
      { collectionId, lyricId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      },
    );

    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError, "addLyricToUserCollection");
  }
};

export const removeLyricFromUserCollection = async (
  collectionLyricId: string,
  token: string,
) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/lyric/${collectionLyricId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      },
    );

    return response.data?.data;
  } catch (error) {
    handleError(error as AxiosError, "removeLyricFromUserCollection");
  }
};
