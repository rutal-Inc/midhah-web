"use client";
import {
  APIResponse,
  DeletedUser,
  DeletedUserFilters,
  DeletedUserStatus,
  UserFilters,
} from "@/src/@types";
import ActionButtons from "@/src/components/ActionButton";
import Loader from "@/src/components/Loader";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/src/constants";
import {
  fetchDeletedUsers,
  restoreUserfromDeletion,
} from "@/src/services/users";
import { logoutUser } from "@/src/utils/logout";
import { AxiosError } from "axios";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import DeletedUserFilter from "./components/DeletedUserFilter";

const DeletedUsers: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const orderBy: "asc" | "desc" =
    searchParams.get("orderBy") == "asc" ? "asc" : "desc";
  const pageNumber = searchParams.get("page") ?? "1";
  const pageSize =
    searchParams.get("size") ?? ROWS_PER_PAGE_OPTIONS[0].toString();

  const filters: DeletedUserFilters = {
    statuses: status ? (status.split(",") as DeletedUserStatus[]) : undefined,
    sortBy: sortBy as UserFilters["sortBy"],
    orderBy,
    page: pageNumber,
    size: pageSize,
  };

  const [deletedUsersData, setDeletedUsersData] = useState<DeletedUser[]>([]);

  const columns: TableColumn<DeletedUser>[] = [
    {
      name: "userId",
      selector: (row) => row.userId,
      sortField: "userId",
      sortable: true,
      width: "85px",
      cell: (row) => (
        <div
          className="max-w-21.25 font-medium text-gray-800"
          title={`${row.userId}`}
        >
          {row.userId}
        </div>
      ),
    },

    {
      name: "DP",
      grow: 1,
      cell: (row) => (
        <div className="aspect-square overflow-hidden rounded-full">
          <Image
            src={row.displayPicture}
            width={40}
            height={40}
            className="h-10 w-10 object-cover"
            alt={row.name}
          />
        </div>
      ),
    },
    {
      name: "Name",
      sortable: true,
      sortField: "name",
      grow: 2,
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
      name: "email",
      grow: 3,
      cell: (row) => (
        <div
          className="max-w-55 truncate font-medium text-gray-800"
          title={row.email}
        >
          {row.email}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortField: "genre",
      sortable: true,
      center: true,
      grow: 1,
      cell: (row) => (
        <div
          className="max-w-55 truncate font-medium text-gray-800"
          title={row.status}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
      sortField: "reason",
      sortable: true,
      center: true,
      grow: 1,
      cell: (row) => (
        <div
          title={row.reason}
          className="w-full text-center text-xs text-gray-700"
        >
          {row.reason}
        </div>
      ),
    },
    {
      name: "adminId",
      selector: (row) => row.adminId,
      sortField: "adminId",
      sortable: true,
      width: "85px",
      cell: (row) => (
        <div
          className="max-w-21.25 font-medium text-gray-800"
          title={`${row.adminId}`}
        >
          {row.adminId}
        </div>
      ),
    },

    {
      name: "Deleted At",
      grow: 2,
      cell: (row) => (
        <span>{new Date(row.scheduledDeleteAt).toLocaleString()}</span>
      ),
      sortable: true,
    },
    {
      name: "Created At",
      grow: 2,
      cell: (row) => <span>{new Date(row.createdAt).toLocaleString()}</span>,
      sortable: true,
    },
    {
      name: "Actions",
      width: "100px",
      ignoreRowClick: true,
      center: true,
      cell: (row) => {
        return (
          <ActionButtons
            confirmDelete={() => handleDelete(row)}
            deleteButtonDisabled={
              new Date(row.scheduledDeleteAt) <= new Date() &&
              row.status === "DELETED"
            }
          />
        );
      },
    },
  ];

  const handleDelete = async (row: DeletedUser) => {
    try {
      await restoreUserfromDeletion(row.userId);
      toast.success(`${row.name} is restored.`);
      await refetch();
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`${row.name} unable to restore: ${error}`);
    }
  };

  const handleSort = (
    column: TableColumn<DeletedUser> & { sortField?: string },
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
    APIResponse<DeletedUser[]>
  >({
    queryKey: ["deleted-users", pageNumber, pageSize, filters, sortBy, orderBy],
    queryFn: () => fetchDeletedUsers(filters),
    onSuccess: (data) => {
      setDeletedUsersData(data?.data ?? []);
    },
    onError: () => {
      setDeletedUsersData([]);
    },
  });
  const totalCount = data?.meta.pagination.total || 0;

  return (
    <div className="p-4">
      <DeletedUserFilter />
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          {error && (error as AxiosError).status !== 404 ? (
            <div>Error fetching data: {(error as AxiosError).message}</div>
          ) : (
            <DataTable
              columns={columns}
              data={deletedUsersData}
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

export default DeletedUsers;
