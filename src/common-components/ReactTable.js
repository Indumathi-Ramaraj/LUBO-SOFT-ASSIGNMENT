import React, {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useSortBy,
} from "react-table";
import { useState, useEffect, useMemo } from "react";
import ColumnFilter from "./columnFilter";

export default function ReactTable({ data, columns }) {
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (data) {
      setCurrentPage(0);
      setPageSize(10);
    }
  }, [data]);
  const pageButtonClass = "border border-gray-300 bg-gray-200 rounded-md px-2";
  const pageRowCount = () => {
    if (currentPage + 1 === pageOptions.length) return rows.length;
    else return currentPage * pageSize + pageSize;
  };
  return (
    <>
      <div className="flex gap-x-1 mb-4 sm:flex-row flex-col">
        <p>Show :</p>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="text-gray-600 rounded-md border border-gray-300 outline-none bg-white  h-7 px-2"
        >
          {[10, 20, 30, 40, 50, data.length].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <p className="text-sm ml-2 mt-1">
          Showing {currentPage * pageSize + 1} - {pageRowCount()} of -{" "}
          {rows.length}
        </p>
      </div>
      <table
        {...getTableProps()}
        className="border-2 border-gray-300 drop-shadow-md"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="bg-gray-200 border-r-2 border-b-2 border-gray-300 text-center p-2 font-bold text-lg"
                >
                  {column.render("Header")}
                  <span onClick={() => setSort(!sort)}>
                    {column.sortable ? (
                      <div
                        {...column.getHeaderProps(
                          column.sortable && column.getSortByToggleProps()
                        )}
                        sortable={column.sortable}
                      >
                        {column.isSortedDesc ? (
                          <span className="ml-2 abc-color cursor-pointer">
                            &darr;
                          </span>
                        ) : (
                          <>
                            {column.isSorted ? (
                              <span className="ml-2 abc-color cursor-pointer">
                                &uarr;
                              </span>
                            ) : (
                              <span className="ml-2 abc-color cursor-pointer">
                                &harr;
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    ) : null}
                  </span>
                  <div>{column.canFilter && column.render("Filter")}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {rows.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => (
                    <td
                      className={`bg-white text-black text-sm p-3 border-r-2 text-center last:border-r-2 border-gray-300 first:border-l-2 border-b-2 `}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <h4 className="text-center p-4 m-8 flex items-center justify-center w-full">
            No data available
          </h4>
        )}
      </table>

      <div className="mt-1 flex gap-x-2">
        <div>
          <button
            onClick={() => {
              gotoPage(0);
              setCurrentPage(0);
            }}
            disabled={!canPreviousPage}
            className={pageButtonClass}
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => {
              previousPage();
              setCurrentPage(pageIndex - 1);
            }}
            disabled={!canPreviousPage}
            className={pageButtonClass}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={pageButtonClass}
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={pageButtonClass}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {currentPage + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
        <span className=" ml-auto">
          Go to page:{" "}
          <input
            type="number"
            defaultValue={currentPage + 1}
            value={currentPage + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
            className="text-gray-600 rounded-md border border-gray-300 outline-none bg-white  h-7 px-2"
          />
        </span>
      </div>
    </>
  );
}
