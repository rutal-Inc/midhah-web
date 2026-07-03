import MultiSelect from "@/components/MultiSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

const UsersFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fliteredRoles = ["USER", "MANAGER", "ADMIN", "SUPERADMIN"].map((r) => ({
    role: r,
  }));

  const [filters, setFilters] = useState<Record<string, Option[]>>({
    role: [],
  });
  const filterConfigs: {
    key: keyof typeof filters;
    labelKey: string;
    valueKey: string;
    placeholder: string;
    data: { [key: string]: string }[];
  }[] = [
    {
      key: "role",
      labelKey: "role",
      valueKey: "role",
      placeholder: "Role",
      data: fliteredRoles,
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

export default UsersFilter;
