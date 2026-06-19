"use client";
import { APIResponse, Poet } from "@/src/@types";
import ActionButtons from "@/src/components/ActionButton";
import Loader from "@/src/components/Loader";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/src/constants";
import Add from "@/src/icons/Add";
import {
  deletePoet,
  fetchPoets,
  updateIsPoetPublished,
} from "@/src/services/poet";
import { logoutUser } from "@/src/utils/logout";
import { AxiosError } from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

const Poets: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page") ?? "1";
  const pageSize =
    searchParams.get("size") ?? ROWS_PER_PAGE_OPTIONS[0].toString();

  const [poetsData, setPoetsData] = useState<Poet[]>([]);

  const handleEdit = (row: Poet) => {
    router.push(`/poets/edit/${row.slug}`);
  };

  const handleDelete = async (row: Poet) => {
    try {
      await deletePoet(row.slug);
      toast.success(`${row.name} is deleted.`);
      await refetch();
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`${row.name} unable to delete: ${error}`);
    }
  };

  const handleTogglePublish = async (row: Poet) => {
    try {
      const updatedPoetsData = poetsData.map((poet) => {
        if (poet.slug === row.slug) {
          return { ...poet, isPublished: !row.isPublished };
        }
        return poet;
      });
      setPoetsData(updatedPoetsData);

      const updatedPoet = await updateIsPoetPublished(
        row.slug,
        !row.isPublished,
      );

      toast.success(
        `Poet "${row.name}" is ${row.isPublished ? "unpublished" : "published"}`,
      );

      setPoetsData((prevData) =>
        prevData.map((poet) =>
          poet.slug === row.slug ? { ...poet, ...updatedPoet } : poet,
        ),
      );
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }

      setPoetsData((prevData) =>
        prevData.map((poet) =>
          poet.slug === row.slug
            ? { ...poet, isPublished: row.isPublished }
            : poet,
        ),
      );

      toast.error(`Failed to update publish status: ${error}`);
    }
  };

  const handleSort = (
    column: TableColumn<Poet> & { sortField?: string },
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

  const columns: TableColumn<Poet>[] = [
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
      name: "Name",
      sortable: true,
      sortField: "name",
      grow: 3,
      cell: (row) => (
        <div
          className="max-w-55 truncate font-medium text-gray-800"
          title={row.name}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: "Created At",
      grow: 2,
      cell: (row) => <span>{new Date(row.createdAt).toLocaleString()}</span>,
      sortable: true,
    },
    {
      name: "Lyrics Count",
      selector: (row) => row.lyricsCount,
      sortable: true,
      center: true,
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
          <div className="peer peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
        </label>
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

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    APIResponse<Poet[]>
  >({
    queryKey: ["poets", pageNumber, pageSize],
    queryFn: () => fetchPoets(Number(pageNumber), Number(pageSize)),
    onSuccess: (data) => {
      setPoetsData(data?.data ?? []);
    },
  });

  const totalCount = data?.meta.pagination.total || 0;

  if (error) return <div>Error fetching data: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => {
            router.push(`/poets/create`);
          }}
          className="group border-background bg-primary text-background hover:border-text hover:bg-background-hover hover:text-text flex cursor-pointer flex-row items-center gap-x-2 rounded-md border-2 px-3 py-2"
        >
          <Add
            fill="text-primary-dark"
            className="group-hover:text-text group-hover:fill-current"
          />
          <span className="text-sm">Add Poets</span>
        </button>
      </div>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={poetsData}
          pagination
          paginationServer
          onSort={handleSort}
          paginationTotalRows={totalCount}
          onChangePage={handleChangePage}
          paginationPerPage={Number(pageSize)}
          paginationRowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          paginationDefaultPage={Number(pageNumber)}
          customStyles={DATA_TABLE_STYLES}
          noDataComponent={isLoading || isFetching ? null : "No Records found."}
        />
      )}
    </div>
  );
};

export default Poets;
