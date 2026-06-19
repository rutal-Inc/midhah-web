"use client";
import { APIResponse, User, UserFilters, UserRole } from "@/src/@types";
import ActionButtons from "@/src/components/ActionButton";
import Loader from "@/src/components/Loader";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/src/constants";
import { fetchUsers } from "@/src/services/users";
import { AxiosError } from "axios";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useQuery } from "react-query";
import UsersFilter from "./components/UsersFilter";

const Users: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const role = searchParams.get("role");
  const name = searchParams.get("name");
  const sortBy = searchParams.get("sortBy") ?? "createdAt";
  const orderBy: "asc" | "desc" =
    searchParams.get("orderBy") == "asc" ? "asc" : "desc";
  const pageNumber = searchParams.get("page") ?? "1";
  const pageSize =
    searchParams.get("size") ?? ROWS_PER_PAGE_OPTIONS[0].toString();

  const filters: UserFilters = {
    roles: role ? (role.split(",") as UserRole[]) : undefined,
    name: name ?? undefined,
    sortBy: sortBy as UserFilters["sortBy"],
    orderBy,
    page: pageNumber,
    size: pageSize,
  };

  const [usersData, setUsersData] = useState<User[]>([]);

  const handleEdit = (row: User) => {
    router.push(`/users/create?userId=${row.id}`);
  };

  const columns: TableColumn<User>[] = [
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
      name: "Role",
      selector: (row) => row.role,
      sortField: "role",
      sortable: true,
      center: true,
      grow: 1,
      cell: (row) => (
        <div
          title={row.role}
          className="w-full text-center text-xs text-gray-700"
        >
          {row.role}
        </div>
      ),
    },

    {
      name: "Is Active",
      sortable: true,
      sortField: "isActive",
      width: "120px",
      center: true,
      cell: (row) => (
        <label className="relative inline-flex items-center disabled:cursor-none">
          <input
            type="checkbox"
            disabled
            checked={row.isActive}
            className="peer sr-only disabled:cursor-none"
          />
          <div className="peer-checked:bg-primary h-6 w-11 rounded-full bg-gray-200 transition after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      name: "Joined",
      grow: 1.5,
      cell: (row) => (
        <span title={`${new Date(row.createdAt).toLocaleString()}`}>
          {new Date(row.createdAt).toDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      width: "100px",
      ignoreRowClick: true,
      center: true,
      cell: (row) => <ActionButtons handleEdit={() => handleEdit(row)} />,
    },
  ];

  const handleSort = (
    column: TableColumn<User> & { sortField?: string },
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

  const { data, isLoading, isFetching, error } = useQuery<APIResponse<User[]>>({
    queryKey: ["users", pageNumber, pageSize, filters, sortBy, orderBy],
    queryFn: () => fetchUsers(filters),
    onSuccess: (data) => {
      setUsersData(data?.data ?? []);
    },
    onError: () => {
      setUsersData([]);
    },
  });
  const totalCount = data?.meta.pagination.total || 0;

  return (
    <div className="p-4">
      <UsersFilter />

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          {error && (error as AxiosError).status !== 404 ? (
            <div>Error fetching data: {(error as AxiosError).message}</div>
          ) : (
            <DataTable
              columns={columns}
              data={usersData}
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

export default Users;
