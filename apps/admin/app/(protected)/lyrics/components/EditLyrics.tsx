"use client";
import { editLyricSchema } from "@/schemas/lyrics/schema";
import { fetchSingleLyrics } from "@/services/lyrics";
import { logoutUser } from "@/utils/logout";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import LyricForm from "./LyricForm";

type LyricFormValues = z.infer<typeof editLyricSchema>;

const EditLyrics: React.FC = () => {
  const params = useParams();
  const apiSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug || "";
  const [defaultValues, setDefaultValues] =
    useState<Partial<LyricFormValues>>();

  useEffect(() => {
    const fetchLyricDetails = async () => {
      try {
        const response = await fetchSingleLyrics(apiSlug);
        const {
          id,
          title,
          content,
          slug,
          genre,
          isPublished,
          poetID,
          languages,
          transliteratedContent,
        } = response.data;
        setDefaultValues({
          id,
          title,
          slug,
          content: content ?? "",
          genre,
          isPublished,
          poetID: poetID || undefined,
          languageIDs: languages?.map((lang: { id: number }) => lang.id) ?? [],
          transliteratedContent: transliteratedContent ?? "",
        });
      } catch (error) {
        if ((error as AxiosError).status === 401) {
          logoutUser();
          return;
        }
        toast.error(`Error fetching lyric details: ${error}`);
      }
    };
    fetchLyricDetails();
  }, [apiSlug]);

  return (
    <LyricForm title="Edit Lyrics" defaultValues={defaultValues} mode="edit" />
  );
};

export default EditLyrics;
