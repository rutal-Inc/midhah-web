import { APIResponse, Filters, LyricReport } from "@/@types";
import { ReportFormValues } from "@/app/(protected)/reports/components/ReportForm";
import api from "@midhah/utils/axios";
import { extractError } from "../lib/error";

const fetchReports = async (
  filters?: Filters,
): Promise<APIResponse<LyricReport[]>> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.type?.length) params.append("type", filters.type.join(","));
      if (filters.status?.length)
        params.append("status", filters.status.join(","));
      if (filters.page) params.append("page", String(Number(filters.page) - 1));
      if (filters.size) params.append("size", String(filters.size));
    }

    const response = await api.get(`/report?${params.toString()}`);
    return response.data as APIResponse<LyricReport[]>;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchSingleReport = async (id: string) => {
  try {
    const response = await api.get(`/report/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const editReport = async (formData: ReportFormValues, id: string) => {
  try {
    const response = await api.put(`/report/${id}`, {
      adminNote: formData.adminNote?.trim() ?? "",
      status: formData.status,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export { editReport, fetchReports, fetchSingleReport };
