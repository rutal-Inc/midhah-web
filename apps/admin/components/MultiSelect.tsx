"use client";

import { APIResponse, LyricSlugs } from "@/@types";
import { useState } from "react";
import Select from "react-select";

interface MultiSelectProps<T> {
  arrayData: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  queryParam: string;
  placeholder?: string;
  value: OptionType[];
  onChange: (selected: OptionType[]) => void;
}

interface OptionType {
  label: string;
  value: string;
}

function MultiSelect<T>({
  arrayData,
  labelKey,
  valueKey,
  placeholder = "Select",
  value,
  onChange,
}: Readonly<MultiSelectProps<T>>) {
  const options: OptionType[] = arrayData
    .filter((item) => item[labelKey] && item[valueKey])
    .map((item) => ({
      label: String(item[labelKey]),
      value: String(item[valueKey]),
    }));

  return (
    <div className="w-full rounded-sm border sm:w-60">
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={options}
        value={value}
        onChange={(selected) =>
          onChange(Array.isArray(selected) ? selected : [])
        }
        placeholder={placeholder}
        className="cursor-pointer text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
}

export default MultiSelect;

interface MultiSelectWithLiveFetchProps {
  placeholder?: string;
  fetchLyricsSlug: (slug: string) => Promise<APIResponse<LyricSlugs>>;
  onChange: (selected: OptionType[]) => void;
  value: OptionType[];
}

export function MultiSelectWithLiveFetch({
  placeholder = "Select",
  fetchLyricsSlug,
  onChange,
  value,
}: Readonly<MultiSelectWithLiveFetchProps>) {
  const [data, setData] = useState<OptionType[]>([]);

  return (
    <div className="w-full rounded-sm border sm:w-60">
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={data}
        value={value}
        onChange={(selected) => {
          onChange(Array.isArray(selected) ? selected : []);
        }}
        onInputChange={(inputValue) => {
          if (inputValue.length > 0) {
            fetchLyricsSlug(inputValue).then((response) => {
              setData(
                Object.values(response.data).map((item) => ({
                  label: item.slug,
                  value: item.slug,
                })),
              );
            });
          }
        }}
        placeholder={placeholder}
        className="text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
}
