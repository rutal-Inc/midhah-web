import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { languageSchema } from "@/src/schemas/languages/schema";

export type LanguageFormValues = z.infer<typeof languageSchema>;

interface LanguageFormProps {
  title: string;
  defaultValues?: Partial<LanguageFormValues>;
  onSubmit: (data: LanguageFormValues) => Promise<void>;
}

const LanguageForm: React.FC<LanguageFormProps> = ({
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
  } = useForm<LanguageFormValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      (Object.keys(defaultValues) as (keyof LanguageFormValues)[]).forEach(
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
          <div className="sm:col-span-3" />

          <div className="mt-4 grid grid-cols-1 place-items-center sm:col-span-6 sm:grid-cols-6">
            <div className="grid w-3/4 grid-cols-1 justify-center gap-x-6 gap-y-8 sm:col-span-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="Language..."
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                    router.push("/languages");
                  }}
                  className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md cursor-pointer bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
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

export default LanguageForm;
