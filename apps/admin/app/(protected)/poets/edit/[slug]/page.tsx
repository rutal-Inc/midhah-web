"use client";
import { editPoet, fetchSinglePoet } from "@/services/poet";
import { logoutUser } from "@/utils/logout";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PoetForm, { PoetFormValues } from "../../components/PoetForm";

const EditPoet: React.FC = () => {
  const params = useParams();
  const apiSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || "";
  const router = useRouter();

  const [defaultValues, setDefaultValues] = useState<Partial<PoetFormValues>>();

  useEffect(() => {
    const fetchPoetDetails = async () => {
      try {
        const response = await fetchSinglePoet(apiSlug);
        const { name, isPublished } = response.data;
        setDefaultValues({ name, isPublished });
      } catch (error) {
        if ((error as AxiosError).status === 401) {
          logoutUser();
          return;
        }
        toast.error(`Error fetching poet details: ${error}`);
      }
    };

    fetchPoetDetails();
  }, [apiSlug]);

  const handleSubmit = async (formData: PoetFormValues) => {
    try {
      await editPoet(formData, apiSlug);
      toast.success("Poet edited successfully!");
      router.push("/poets");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`Error editing poet: ${error}`);
    }
  };

  return (
    <PoetForm
      title="Edit Poet"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default EditPoet;
