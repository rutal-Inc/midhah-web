import { LyricReport } from "@/@types";
import { reportSchema } from "@/schemas/reports/schema";
import { editReport } from "@/services/reports";
import { logoutUser } from "@/utils/logout";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportFormProps {
  report: LyricReport;
  defaultValues?: Partial<ReportFormValues>;
  apiId: string;
}

const ReportForm: React.FC<ReportFormProps> = ({
  report,
  defaultValues,
  apiId,
}) => {
  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      adminNote: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      (Object.keys(defaultValues) as (keyof ReportFormValues)[]).forEach(
        (key) => {
          const value = defaultValues[key];
          if (value !== undefined) {
            setValue(key, value as never);
          }
        },
      );
    }
  }, [defaultValues, setValue]);

  const handleSubmit = async (status: ReportFormValues["status"]) => {
    try {
      const formData = {
        ...getValues(),
        status,
      };

      await editReport(formData, apiId);

      toast.success("Report edited successfully!");
      router.push("/reports");
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        logoutUser();
        return;
      }

      toast.error(`Error editing report: ${error}`);
    }
  };

  return (
    <div className="p-6">
      <form>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-gray-700">
              Reported By:
            </span>
            <div className="flex items-center gap-2">
              <Image
                src={report.user!.displayPicture}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
                alt={report.user?.name || "N/A"}
              />
              <span>{report.user?.name || "N/A"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="block text-sm font-medium text-gray-700">
                Report Type:
              </span>
              <span>{report.type}</span>
            </div>
            <div className="flex gap-2">
              <span className="block text-sm font-medium text-gray-700">
                Report Status:
              </span>
              <span>{report.status}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <span className="block text-sm font-medium text-gray-700">
              Reported Lyric: <small>Click below to edit lyric</small>
            </span>
            <Link
              href={`/lyrics/edit/${report.lyric.slug}`}
              className="hover:text-primary underline"
            >
              <span>{report.lyric.title}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-gray-700">
              Report Message:
            </span>
            <p> {report.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-gray-700">
              Reviewed By:
            </span>
            {report.reviewer ? (
              <div className="">
                <Image
                  src={report.reviewer.displayPicture}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                  alt={report.reviewer?.name || "N/A"}
                />
                <span>{report.reviewer?.name || "N/A"}</span>
              </div>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-8">
          <div className="sm:col-span-3">
            <label
              htmlFor="adminNote"
              className="block text-sm leading-6 font-medium text-gray-900"
            >
              Admin Note
            </label>
            <div className="mt-2">
              <textarea
                id="adminNote"
                {...register("adminNote")}
                rows={5}
                maxLength={1000}
                placeholder="Enter admin note here..."
                className="focus:ring-primary block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
              />
              {errors.adminNote && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.adminNote.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-6">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit("REVIEWED")}
              className="bg-primary hover:bg-primary-dark focus-visible:outline-primary cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-60"
            >
              REVIEWED
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit("RESOLVED")}
              className="focus-visible:outline-primary cursor-pointer rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-60"
            >
              RESOLVED
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit("REJECTED")}
              className="focus-visible:outline-primary cursor-pointer rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-60"
            >
              REJECTED
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
