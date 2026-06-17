"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { createDataforDeletion } from "@/src/services/users";
import { logoutUser } from "@/src/utils/logout";
import { deleteUserSchema } from "@/src/schemas/users/schema";

type DeleteUserFormValues = z.infer<typeof deleteUserSchema>;

const AddUserForDeletion: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeleteUserFormValues>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      userId: Number(searchParams.get("userId")),
      reason: "On User Request",
      scheduledDeleteAt: tomorrow,
    },
  });

  const onSubmit = async (formData: DeleteUserFormValues) => {
    try {
      const payload = {
        ...formData,
        scheduledDeleteAt: formData.scheduledDeleteAt.toISOString(),
      };
      await createDataforDeletion(payload);
      toast.success("User scheduled for deletion successfully!");
      reset();
      router.push("/users");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`Error scheduling user for deletion: ${error}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:col-span-3">
            Add User For Deletion
          </h2>

          <div className="mt-4 grid grid-cols-1 place-items-center sm:col-span-6 sm:grid-cols-6">
            <div className="grid w-3/4 grid-cols-1 justify-center gap-x-6 gap-y-8 sm:col-span-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Id
                </label>
                <div className="mt-2">
                  <input
                    id="userId"
                    type="number"
                    {...register("userId", { valueAsNumber: true })}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  {errors.userId && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.userId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Reason
                </label>
                <div className="mt-2">
                  <textarea
                    id="reason"
                    {...register("reason")}
                    className="block h-12 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  {errors.reason && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.reason.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="scheduledDeleteAt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Delete At
                </label>
                <div className="mt-2">
                  <input
                    id="scheduledDeleteAt"
                    min={tomorrow.toLocaleDateString("sv-SE")}
                    type="date"
                    {...register("scheduledDeleteAt", { valueAsDate: true })}
                    className="block h-12 w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                  {errors.scheduledDeleteAt && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.scheduledDeleteAt.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-6">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    router.push("/users");
                  }}
                  className="text-sm cursor-pointer font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hover:bg-primary-hover cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserForDeletion;
