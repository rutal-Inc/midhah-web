import axios from "axios";

export const getUserCollectionsLyric = async (
  userId: number | null,
  lyricId: number,
  authToken: string | null,
) => {
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
};
export const getUserCollections = async (
  userId: number | null,
  authToken: string | null,
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/userId/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authToken,
      },
    },
  );
  return response.data.data;
};

export const addNewUserCollection = async (
  name: string,
  userId: number | null,
  authToken: string | null,
) => {
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
  return response.data.data;
};

export const updateUserCollection = async (
  name: string,
  collectionId: number,
  userId: number | null,
  authToken: string | null,
) => {
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
  return response.data.data;
};

export const removeUserCollection = async (
  collectionLyricId: number,
  userId: number | null,
  authToken: string | null,
) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${collectionLyricId}?userId=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authToken}`,
      },
    },
  );
  return response.data.data;
};

export const addLyricToUserCollection = async (
  collectionId: string,
  lyricId: number,
  token: string,
) => {
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

  return response.data.data;
};

export const removeLyricFromUserCollection = async (
  collectionLyricId: string,
  token: string,
) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/lyric/${collectionLyricId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    },
  );

  return response.data.data;
};
