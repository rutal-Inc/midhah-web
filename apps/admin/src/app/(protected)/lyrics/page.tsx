"use client";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionButtons from "@/src/components/ActionButton";
import Loader from "@/src/components/Loader";
import LyricsFilter from "@/src/app/(protected)/lyrics/components/LyricsFilter";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/src/constants";
import { APIResponse, Lyric } from "@/src/@types";
import { AxiosError } from "axios";
import { logoutUser } from "@/src/utils/logout";
import {
  deleteLyric,
  fetchLyrics,
  updateIsLyricPublished,
} from "@/src/services/lyrics";
import { noto_nastaliq_urdu } from "@midhah/utils/fonts";
import Add from "@/src/icons/Add";

const Lyrics: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slug = searchParams.get("slug");
  const genre = searchParams.get("genre");
  const isPublished = searchParams.get("isPublished");
  const poet = searchParams.get("poet");
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const orderBy: "asc" | "desc" =
    searchParams.get("orderBy") == "asc" ? "asc" : "desc";
  const pageNumber = searchParams.get("page") ?? "1";
  const pageSize =
    searchParams.get("size") ?? ROWS_PER_PAGE_OPTIONS[0].toString();

  const labelToBoolean: Record<string, boolean> = {
    Published: true,
    "Not Published": false,
  };

  const filters = {
    slugs: slug ? slug.split(",") : [],
    genre: genre ? genre.split(",") : [],
    poet: poet ? poet.split(",") : [],
    isPublished: isPublished
      ? isPublished.split(",").map((str) => labelToBoolean[str])
      : [],
    sortBy,
    orderBy,
    page: pageNumber,
    size: pageSize,
  };

  const [lyricsData, setLyricsData] = useState<Lyric[]>([]);

  const columns: TableColumn<Lyric>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortField: "id",
      sortable: true,
      width: "85px",
      cell: (row) => (
        <div
          className="max-w-21.25 font-medium text-gray-800"
          title={`${row.id}`}
        >
          {row.id}
        </div>
      ),
    },

    {
      name: "Title",
      sortable: true,
      sortField: "title",
      grow: 2,
      cell: (row) => (
        <div
          className="max-w-55 truncate font-medium text-gray-800"
          title={row.title}
        >
          {row.title}
        </div>
      ),
    },

    {
      name: "Preview",
      sortable: true,
      sortField: "lyrics",
      grow: 3,
      center: true,
      cell: (row) => (
        <div
          className={`line-clamp-2 leading-7 p-2 max-w-fit whitespace-pre-wrap text-wrap text-sm text-gray-600 ${noto_nastaliq_urdu.className}`}
          dir="auto"
          title={row.preview?.trim()}
        >
          {row.preview?.trim()}
        </div>
      ),
    },

    {
      name: "Genre",
      selector: (row) => row.genre,
      sortField: "genre",
      sortable: true,
      center: true,
      grow: 1,
      cell: (row) => (
        <div
          title={row.genre}
          className="w-full text-center text-xs text-gray-700"
        >
          {row.genre}
        </div>
      ),
    },

    {
      name: "Published",
      sortable: true,
      sortField: "isPublished",
      width: "120px",
      center: true,
      cell: (row) => (
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={row.isPublished}
            onChange={() => handleTogglePublish(row)}
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
        </label>
      ),
    },

    {
      name: "Slug",
      sortable: true,
      sortField: "slug",
      grow: 2,
      cell: (row) => (
        <div
          className="max-w-50 truncate text-xs text-gray-500"
          title={row.slug}
        >
          {row.slug}
        </div>
      ),
    },

    {
      name: "Actions",
      width: "100px",
      ignoreRowClick: true,
      center: true,
      cell: (row) => (
        <ActionButtons
          handleEdit={() => handleEdit(row)}
          confirmDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

  const handleEdit = (row: Lyric) => {
    router.push(`/lyrics/edit/${row.slug}`);
  };

  const handleDelete = async (row: Lyric) => {
    try {
      await deleteLyric(row.slug);
      toast.success(`${row.title} is deleted.`);
      await refetch();
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`${row.title} unable to delete: ${error}`);
    }
  };

  const handleTogglePublish = async (row: Lyric) => {
    try {
      const updatedLyricsData = lyricsData.map((lyric) => {
        if (lyric.slug === row.slug) {
          return { ...lyric, isPublished: !row.isPublished };
        }
        return lyric;
      });

      const filteredData = updatedLyricsData.filter((lyric) => {
        if (filters.slugs.length && !filters.slugs.includes(lyric.slug))
          return false;
        if (filters.genre.length && !filters.genre.includes(lyric.genre))
          return false;
        if (
          filters.isPublished.length &&
          !filters.isPublished.includes(lyric.isPublished)
        )
          return false;
        return true;
      });

      setLyricsData(filteredData);

      const updatedLyric = await updateIsLyricPublished(
        row.slug,
        !row.isPublished,
      );

      toast.success(
        `Lyric "${row.title}" is ${row.isPublished ? "unpublished" : "published"}`,
      );

      setLyricsData((prevData) =>
        prevData.map((lyric) =>
          lyric.slug === row.slug ? { ...lyric, ...updatedLyric } : lyric,
        ),
      );
    } catch (error) {
      setLyricsData((prevData) =>
        prevData.map((lyric) =>
          lyric.slug === row.slug
            ? { ...lyric, isPublished: row.isPublished }
            : lyric,
        ),
      );

      toast.error(`Failed to update publish status: ${error}`);
    }
  };

  const handleSort = (
    column: TableColumn<Lyric> & { sortField?: string },
    sortDirection: "asc" | "desc",
  ) => {
    if (!column.sortField) return;
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", column.sortField);
    params.set("orderBy", sortDirection);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (newPageSize: number) => {
    if (newPageSize === Number(pageSize)) return;
    const params = new URLSearchParams(searchParams.toString());

    params.set("size", String(newPageSize));
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleChangePage = (newPageNumber: number) => {
    if (newPageNumber === Number(pageNumber)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPageNumber));

    router.replace(`${pathname}?${params.toString()}`);
  };

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    APIResponse<Lyric[]>
  >({
    queryKey: ["lyrics", pageNumber, pageSize, filters, sortBy, orderBy],
    queryFn: () => fetchLyrics(filters),
    onSuccess: (data) => {
      setLyricsData(data?.data ?? []);
    },
  });
  const totalCount = data?.meta.pagination.total || 0;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-3">
        <button
          onClick={() => {
            router.push(`/lyrics/create`);
          }}
          className="group cursor-pointer flex flex-row items-center gap-x-2 rounded-md border-2 border-background bg-primary px-3 py-2 text-background hover:border-text hover:bg-background-hover hover:text-text"
        >
          <Add
            fill="text-primary-dark"
            className="group-hover:fill-current group-hover:text-text"
          />
          <span className="text-sm">Add Lyrics</span>
        </button>
      </div>
      <LyricsFilter />

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div>Error fetching data: {(error as Error).message}</div>
          ) : (
            <DataTable
              columns={columns}
              data={lyricsData}
              pagination
              paginationServer
              sortServer
              defaultSortFieldId="createdAt"
              defaultSortAsc={false}
              onSort={handleSort}
              paginationTotalRows={totalCount}
              onChangePage={handleChangePage}
              paginationPerPage={Number(pageSize)}
              paginationRowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              paginationDefaultPage={Number(pageNumber)}
              customStyles={DATA_TABLE_STYLES}
              noDataComponent={
                isLoading || isFetching ? null : "No Records found."
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Lyrics;
