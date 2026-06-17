import { LanguageFormData } from "@/src/@types";
import api from "@midhah/utils/axios";
import { extractError } from "../lib/error";

const fetchLanguages = async (page: number, size: number) => {
  try {
    const response = await api.get(`/languages/?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchSingleLanguage = async (id: number) => {
  try {
    const response = await api.get(`/languages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const createLanguage = async (formData: LanguageFormData) => {
  try {
    const response = await api.post("/languages", {
      name: formData.name.trim(),
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const editLanguage = async (formData: LanguageFormData, id: number) => {
  try {
    const response = await api.put(`/languages/${id}`, {
      name: formData.name.trim(),
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const deleteLanguage = async (id: number) => {
  try {
    const response = await api.delete(`/languages/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export {
  fetchLanguages,
  fetchSingleLanguage,
  createLanguage,
  editLanguage,
  deleteLanguage,
};
