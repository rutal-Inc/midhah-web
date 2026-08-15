import MultiSelect from "@/components/MultiSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

const ReportsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const reportTypes: Option[] = [
    { value: "INCORRECT_LYRICS", label: "Incorrect Lyrics" },
    { value: "INCORRECT_POET", label: "Incorrect Poet" },
    { value: "SPELLING_ERROR", label: "Spelling Error" },
    { value: "PUNCTUATION_ERROR", label: "Punctuation Error" },
    { value: "TRANSLITERATION_ERROR", label: "Transliteration Error" },
    { value: "OTHER", label: "Other" },
  ];

  const statusTypes: Option[] = [
    { value: "PENDING", label: "Pending" },
    { value: "REVIEWED", label: "Reviewed" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  const [filters, setFilters] = useState<Record<string, Option[]>>({
    type: [],
    status: [],
  });

  const filterConfigs: {
    key: keyof typeof filters;
    labelKey: keyof Option;
    valueKey: keyof Option;
    placeholder: string;
    data: Option[];
  }[] = [
    {
      key: "type",
      labelKey: "label",
      valueKey: "value",
      placeholder: "Type",
      data: reportTypes,
    },
    {
      key: "status",
      labelKey: "label",
      valueKey: "value",
      placeholder: "Status",
      data: statusTypes,
    },
  ];

  const applyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, selected]) => {
      if (selected.length) {
        params.set(key, selected.map((s) => s.value).join(","));
      } else {
        params.delete(key);
      }
    });

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-3 mb-8 flex w-full flex-col gap-5">
      <div className="flex flex-col flex-wrap items-end justify-start gap-3 sm:flex-row sm:items-center">
        {filterConfigs.map((config) => (
          <MultiSelect
            key={config.key}
            arrayData={config.data}
            labelKey={config.labelKey}
            valueKey={config.valueKey}
            queryParam={config.key}
            placeholder={config.placeholder}
            value={filters[config.key]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                [config.key]: value,
              }))
            }
          />
        ))}

        <button
          type="button"
          onClick={applyFilters}
          className="border-background bg-primary text-background hover:border-text hover:bg-background-hover hover:text-text cursor-pointer rounded-md border-2 px-3 py-2"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ReportsFilter;
