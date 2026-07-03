import { APIResponse, genreOptions, PoetIdName } from "@/@types";
import MultiSelect, {
  MultiSelectWithLiveFetch,
} from "@/components/MultiSelect";
import { fetchLyricsSlug } from "@/services/lyrics";
import { fetchAllPoets } from "@/services/poet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

interface Option {
  label: string;
  value: string;
}

const LyricsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fliteredGenre = genreOptions.map((g) => ({ genre: g }));

  const isPublishedOptions = [
    { isPublished: "Published" },
    { isPublished: "Not Published" },
  ];

  const { data } = useQuery<APIResponse<PoetIdName[]>>({
    queryKey: ["poetsData"],
    queryFn: () => fetchAllPoets(),
    keepPreviousData: true,
  });

  const poetsdata =
    data?.data.map((d) => {
      return {
        poet: d.name,
      };
    }) ?? [];

  const [filters, setFilters] = useState<Record<string, Option[]>>({
    slug: [],
    isPublished: [],
    genre: [],
    poet: [],
  });
  const filterConfigs: {
    key: keyof typeof filters;
    labelKey: string;
    valueKey: string;
    placeholder: string;
    data: { [key: string]: string }[];
  }[] = [
    {
      key: "poet",
      labelKey: "poet",
      valueKey: "poet",
      placeholder: "Poet",
      data: poetsdata,
    },
    {
      key: "genre",
      labelKey: "genre",
      valueKey: "genre",
      placeholder: "Genre",
      data: fliteredGenre,
    },
    {
      key: "isPublished",
      labelKey: "isPublished",
      valueKey: "isPublished",
      placeholder: "Published",
      data: isPublishedOptions,
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
        <MultiSelectWithLiveFetch
          placeholder="Type Slug"
          fetchLyricsSlug={fetchLyricsSlug}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              ["slug"]: value,
            }))
          }
          value={filters["slug"]}
        />
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

export default LyricsFilter;
