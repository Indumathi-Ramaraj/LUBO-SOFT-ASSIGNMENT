import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <span className="flex items-center justify-center">
      <input
        className="rounded-md text-sm text-center font-normal w-40"
        value={filterValue ? filterValue : ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        type="text"
      />
      {filterValue && (
        <button className="ml-2" onClick={clearFilter} type="button">
          x
        </button>
      )}
    </span>
  );
};

export default ColumnFilter;
