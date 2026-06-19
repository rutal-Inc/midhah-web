"use client";
import { extractError } from "@/src/lib/error";
import { editLanguage, fetchSingleLanguage } from "@/src/services/languages";
import { logoutUser } from "@/src/utils/logout";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LanguageForm, {
  LanguageFormValues,
} from "../../components/LanguageForm";

const EditLanguage: React.FC = () => {
  const params = useParams();
  const apiId = Array.isArray(params.id) ? params.id[0] : params.id || "";
  const router = useRouter();

  const [defaultValues, setDefaultValues] =
    useState<Partial<LanguageFormValues>>();

  useEffect(() => {
    const fetchLanguageDetails = async () => {
      try {
        const response = await fetchSingleLanguage(Number(apiId));
        setDefaultValues({ name: response.data.name });
      } catch (error) {
        if ((error as AxiosError).status === 401) {
          logoutUser();
          return;
        }
        toast.error(`{Error fetching language details: ${extractError(error)}`);
      }
    };

    fetchLanguageDetails();
  }, [apiId]);

  const handleSubmit = async (formData: LanguageFormValues) => {
    try {
      await editLanguage(formData, Number(apiId));
      toast.success("Language edited successfully!");
      router.push("/languages");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error("Error editing language");
    }
  };

  return (
    <LanguageForm
      title="Edit Language"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default EditLanguage;
