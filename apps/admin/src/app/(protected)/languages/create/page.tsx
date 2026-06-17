"use client";
import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { createLanguage } from "@/src/services/languages";
import { logoutUser } from "@/src/utils/logout";
import LanguageForm, { LanguageFormValues } from "../components/LanguageForm";
import { useRouter } from "next/navigation";
import { extractError } from "@/src/lib/error";

const CreateLanguage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (formData: LanguageFormValues) => {
    try {
      await createLanguage(formData);
      toast.success("Language added successfully!");
      router.push("/languages");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`Error adding language: ${extractError(error)}`);
    }
  };

  return <LanguageForm title="Add New Language" onSubmit={handleSubmit} />;
};

export default CreateLanguage;
