import { poetSchema } from "@/src/schemas/poets/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type PoetFormValues = z.infer<typeof poetSchema>;

interface PoetFormProps {
  title: string;
  defaultValues?: Partial<PoetFormValues>;
  onSubmit: (data: PoetFormValues) => Promise<void>;
}

const PoetForm: React.FC<PoetFormProps> = ({
  title,
  defaultValues,
  onSubmit,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PoetFormValues>({
    resolver: zodResolver(poetSchema),
    defaultValues: {
      name: "",
      isPublished: true,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      (Object.keys(defaultValues) as (keyof PoetFormValues)[]).forEach(
        (key) => {
          const value = defaultValues[key];
          if (value !== undefined) {
            setValue(key, value as never);
          }
        },
      );
    }
  }, [defaultValues, setValue]);

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h2 className="text-lg font-semibold text-gray-900 sm:col-span-3">
            {title}
          </h2>

          <div className="sm:col-span-3">
            <div className="flex items-center justify-end">
              <label
                htmlFor="isPublished"
                className="mr-4 block text-sm leading-6 font-medium text-gray-900"
              >
                Publish
              </label>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="isPublished"
                  type="checkbox"
                  {...register("isPublished")}
                  className="peer sr-only"
                />
                <div className="peer peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
              </label>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 place-items-center sm:col-span-6 sm:grid-cols-6">
            <div className="grid w-3/4 grid-cols-1 justify-center gap-x-6 gap-y-8 sm:col-span-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm leading-6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Muhammad Tahir"
                    className="focus:ring-primary block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-6">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    router.push("/poets");
                  }}
                  className="cursor-pointer text-sm leading-6 font-semibold text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark focus-visible:outline-primary cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PoetForm;
