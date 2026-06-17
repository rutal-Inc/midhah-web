import {
  APIResponse,
  DeletedUser,
  DeletedUserFilters,
  DeleteUserFormData,
  User,
  UserFilters,
} from "@/src/@types";
import api from "@midhah/utils/axios";
import { extractError } from "../lib/error";

const fetchUsers = async (
  filters?: UserFilters,
): Promise<APIResponse<User[]>> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.roles?.length)
        params.append("roles", filters.roles.join(","));
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.orderBy) params.append("orderBy", filters.orderBy);
      if (filters.page) params.append("page", String(Number(filters.page) - 1));
      if (filters.size) params.append("size", String(filters.size));
    }

    const response = await api.get(`/users?${params.toString()}`);
    return response.data as APIResponse<User[]>;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const fetchDeletedUsers = async (
  filters?: DeletedUserFilters,
): Promise<APIResponse<DeletedUser[]>> => {
  try {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.statuses?.length)
        params.append("statuses", filters.statuses.join(","));
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.orderBy) params.append("orderBy", filters.orderBy);
      if (filters.page) params.append("page", String(Number(filters.page) - 1));
      if (filters.size) params.append("size", String(filters.size));
    }

    const response = await api.get(`/users/deleted?${params.toString()}`);
    return response.data as APIResponse<DeletedUser[]>;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const createDataforDeletion = async (formData: DeleteUserFormData) => {
  try {
    const response = await api.post(
      `/users/schedule-delete`,

      {
        userId: formData.userId,
        reason: formData.reason.trim(),
        scheduledDeleteAt: formData.scheduledDeleteAt,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

const restoreUserfromDeletion = async (userId: number) => {
  try {
    const response = await api.delete(`/users/deleted/${userId}/restore`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
};

export {
  createDataforDeletion,
  restoreUserfromDeletion,
  fetchUsers,
  fetchDeletedUsers,
};
