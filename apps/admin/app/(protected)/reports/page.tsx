"use client";
import {
  APIResponse,
  LyricReport,
  LyricReportStatus,
  LyricReportType,
} from "@/@types";
import ReportsFilter from "@/app/(protected)/reports/components/ReportsFilter";
import ActionButtons from "@/components/ActionButton";
import Loader from "@/components/Loader";
import { DATA_TABLE_STYLES, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import { fetchReports } from "@/services/reports";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useQuery } from "react-query";

const Reports: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const pageNumber = searchParams.get("page") ?? "1";
  const pageSize =
    searchParams.get("size") ?? ROWS_PER_PAGE_OPTIONS[0].toString();

  const filters = {
    type: type ? (type.split(",") as LyricReportType[]) : [],
    status: status ? (status.split(",") as LyricReportStatus[]) : [],
    page: pageNumber,
    size: pageSize,
  };

  const [lyricsReportData, setLyricsReportData] = useState<LyricReport[]>([]);

  const columns: TableColumn<LyricReport>[] = [
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
      grow: 2,
      cell: (row) => (
        <div
          className="max-w-55 truncate font-medium text-gray-800"
          title={row.user!.name!}
        >
          {row.user?.name}
        </div>
      ),
    },

    {
      name: "Lyric",
      sortable: true,
      sortField: "title",
      grow: 2,
      cell: (row) => (
        <div
          className="flex max-w-55 flex-wrap gap-1 truncate font-medium text-gray-800"
          title={row.lyric.title}
        >
          {row.lyric.title}
        </div>
      ),
    },
    {
      name: "Type",
      sortable: true,
      sortField: "type",
      grow: 2,
      cell: (row) => (
        <div
          className="flex max-w-55 flex-wrap gap-1 truncate font-medium text-gray-800"
          title={row.type}
        >
          {row.type}
        </div>
      ),
    },
    {
      name: "Status",
      sortable: true,
      sortField: "status",
      grow: 2,
      cell: (row) => (
        <div
          className="flex max-w-55 flex-wrap gap-1 truncate font-medium text-gray-800"
          title={row.status}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Reviewed By",
      grow: 2,
      cell: (row) => (
        <div
          className="flex max-w-55 flex-wrap gap-1 truncate font-medium text-gray-800"
          title={row.reviewer?.name || "N/A"}
        >
          {row.reviewer?.name || "N/A"}
        </div>
      ),
    },

    {
      name: "Actions",
      width: "100px",
      ignoreRowClick: true,
      center: true,
      cell: (row) => <ActionButtons handleEdit={() => handleEdit(row)} />,
    },
  ];

  const handleEdit = (row: LyricReport) => {
    router.push(`/reports/edit/${row.id}`);
  };

  const handleSort = (
    column: TableColumn<LyricReport> & { sortField?: string },
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

  const { data, isLoading, isFetching, error } = useQuery<
    APIResponse<LyricReport[]>
  >({
    queryKey: ["reports", pageNumber, pageSize, filters],
    queryFn: () => fetchReports(filters),
    onSuccess: (data) => {
      setLyricsReportData(data?.data ?? []);
    },
  });
  const totalCount = data?.meta.pagination.total || 0;

  return (
    <div className="p-4">
      <ReportsFilter />

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div>Error fetching data: {(error as Error).message}</div>
          ) : (
            <DataTable
              columns={columns}
              data={lyricsReportData}
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

export default Reports;
