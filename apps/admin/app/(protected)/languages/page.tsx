"use client";
import { APIResponse, Language } from "@/@types";
import ActionButtons from "@/components/ActionButton";
import Loader from "@/components/Loader";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import Add from "@/icons/Add";
import { deleteLanguage, fetchLanguages } from "@/services/languages";
import { logoutUser } from "@/utils/logout";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

const Languages: React.FC = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [languagesData, setLanguagesData] = useState<Language[]>([]);

  const handleEdit = (row: Language) => {
    router.push(`/languages/edit/${row.id}`);
  };

  const handleDelete = async (row: Language) => {
    try {
      await deleteLanguage(row.id);
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

  const columns: TableColumn<Language>[] = [
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
      name: "Actions",
      cell: (row) => (
        <ActionButtons
          handleEdit={() => handleEdit(row)}
          confirmDelete={() => handleDelete(row)}
        />
      ),
      ignoreRowClick: true,
    },
  ];

  const { data, isLoading, isFetching, error, refetch } = useQuery<
    APIResponse<Language[]>
  >({
    queryKey: ["languages", pageNumber, pageSize],
    queryFn: () => fetchLanguages(pageNumber, pageSize),
    onSuccess: (data) => {
      setLanguagesData(data?.data ?? []);
    },
  });

  const totalCount = data?.meta.pagination.total || 0;

  if (error) return <div>Error fetching data: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => {
            router.push(`/languages/create`);
          }}
          className="group border-background bg-primary text-background hover:border-text hover:bg-background-hover hover:text-text flex cursor-pointer flex-row items-center gap-x-2 rounded-md border-2 px-3 py-2"
        >
          <Add
            fill="text-primary-dark"
            className="group-hover:text-text group-hover:fill-current"
          />
          <span className="text-sm">Add Languages</span>
        </button>
      </div>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={languagesData}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          onChangePage={(page) => setPageNumber(page - 1)}
          paginationPerPage={ROWS_PER_PAGE_OPTIONS[0]}
          paginationRowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onChangeRowsPerPage={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(0);
          }}
          customStyles={DATA_TABLE_STYLES}
          noDataComponent={isLoading || isFetching ? null : "No Records found."}
        />
      )}
    </div>
  );
};

export default Languages;
