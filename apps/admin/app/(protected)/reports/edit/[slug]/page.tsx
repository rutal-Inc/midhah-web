"use client";

import { LyricReport } from "@/@types";
import { fetchSingleReport } from "@/services/reports";
import { logoutUser } from "@/utils/logout";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReportForm, { ReportFormValues } from "../../components/ReportForm";

const EditReport: React.FC = () => {
  const params = useParams();
  const apiId = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";

  const [report, setReport] = useState<LyricReport | null>(null);
  const [defaultValues, setDefaultValues] =
    useState<Partial<ReportFormValues>>();

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetchSingleReport(apiId);
        setReport(response.data);

        setDefaultValues({
          status: response.data.status,
          adminNote: response.data.adminNote ?? "",
        });
      } catch (error) {
        if ((error as AxiosError).status === 401) {
          logoutUser();
          return;
        }

        toast.error(`Error fetching report: ${error}`);
      }
    };

    fetchReportDetails();
  }, [apiId]);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <ReportForm report={report} defaultValues={defaultValues} apiId={apiId} />
  );
};

export default EditReport;
