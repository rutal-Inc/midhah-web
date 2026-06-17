import api from "@midhah/utils/axios";
import { APIResponse, Poet, PoetFormData, PoetIdName } from "@/src/@types";
import { extractError } from "../lib/error";

const fetchPoets = async (
  page: number,
  size: number,
): Promise<APIResponse<Poet[]>> => {
  try {
    const response = await api.get(`/poets/?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchAllPoets = async (): Promise<APIResponse<PoetIdName[]>> => {
  try {
    const response = await api.get(`/poets/all`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const updateIsPoetPublished = async (slug: string, isPublished: boolean) => {
  try {
    const response = await api.patch(`/poets/${slug}`, {
      isPublished,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const createPoet = async (formData: PoetFormData) => {
  try {
    const response = await api.post("/poets", {
      name: formData.name.trim(),
      isPublished: formData.isPublished,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const editPoet = async (formData: PoetFormData, slug: string) => {
  try {
    const response = await api.put(`/poets/${slug}`, {
      name: formData.name.trim(),
      isPublished: formData.isPublished,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchSinglePoet = async (slug: string) => {
  try {
    const response = await api.get(`/poets/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const deletePoet = async (slug: string) => {
  try {
    const response = await api.delete(`/poets/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export {
  fetchPoets,
  fetchAllPoets,
  createPoet,
  updateIsPoetPublished,
  deletePoet,
  fetchSinglePoet,
  editPoet,
};
