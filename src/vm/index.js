import React, { useState, useEffect, useRef } from "react";
import {
  errorNotification,
  sucessNotification,
} from "../common-components/ToastMessage";
import Endpoints from "../endpoints";
import axios from "axios";
import { HiPencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import PopOver from "../common-components/PopOver";
import Tooltip from "../common-components/Tooltip";

const useCategoriesApi = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addNewData, setNewData] = useState("");
  const [update, setUpdate] = useState({ id: null, value: "" });
  const inputRef = useRef(null);
  const params = {
    deviceType: "web",
    username: "anvar",
  };

  const getCategories = async () => {
    setLoading(true);
    await axios
      .post(Endpoints.GET_CATEGORIES, params)
      .then((response) => setCategories(response.data.message))
      .catch(() =>
        errorNotification("There is an error fetching the categories!")
      )
      .finally(() => setLoading(false));
  };

  const addCategory = async (cat_name) => {
    setLoading(true);
    axios
      .post(Endpoints.ADD_CATEGORY, { ...params, cat_name: cat_name })
      .then(() => {
        sucessNotification("Successfully added the new category");
        setNewData("");
        getCategories();
      })
      .catch(() =>
        errorNotification("Error adding new category!.Please try again.")
      )
      .finally(() => setLoading(false));
  };

  const updateCategory = async (cat_name, main_cat_id, flag) => {
    setLoading(true);
    axios
      .post(Endpoints.EDIT_CATEGORY, {
        ...params,
        cat_name,
        main_cat_id,
        deleted_flg: flag,
      })
      .then(() => {
        sucessNotification(
          `${
            flag === "U"
              ? `Successfully updated the category`
              : `Successfully deleted the category`
          }`
        );
        getCategories();
      })
      .catch(() =>
        errorNotification(
          `${
            flag === "U"
              ? `Error updating the category!.Please try again.`
              : `Error deleting the category!.Please try again.`
          }`
        )
      )
      .finally(() => setLoading(false));
  };

  const renderCustomDeleteContent = ({ hideTooltip, handleAction }) => (
    <div
      className={`absolute p-2 text-sm text-white shadow-lg opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-blue-500 rounded-lg z-50`}
    >
      <div className="flex flex-col gap-y-2">
        <p className="text-white text-center">
          Are you sure you want to delete?
        </p>
        <div className="flex gap-x-2 justify-center items-center">
          <button
            className="bg-white hover:bg-gray-200 rounded text-blue-500 font-medium px-2 py-1 text-xs"
            onClick={handleAction}
          >
            Yes
          </button>
          <button
            className="bg-white hover:bg-gray-200 rounded text-blue-500 font-medium px-2 py-1 text-xs"
            onClick={hideTooltip}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Main Category Name",
        accessor: "MAIN_CAT_NAME",
        sortable: true,
        Cell: ({ row }) => {
          const isEditing = update.id === row.original.MAIN_CAT_ID;
          useEffect(() => {
            if (isEditing && inputRef.current) {
              inputRef.current.focus();
            }
          }, [isEditing]);
          return isEditing ? (
            <div>
              <input
                ref={inputRef}
                className="bg-white border border-gray-300 h-8 rounded-md px-2 w-40"
                value={update.value}
                onChange={(e) =>
                  setUpdate((prev) => {
                    return { ...prev, value: e.target.value };
                  })
                }
              />
              <button
                className="bg-blue-500 text-white rounded-md ml-2 px-2 py-1 font-medium"
                onClick={() => {
                  updateCategory(update.value, row.original.MAIN_CAT_ID, "U");
                  setUpdate({ id: null, value: "" });
                }}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white rounded-md ml-2 px-2 py-1 font-medium"
                onClick={() => setUpdate({ id: null, value: "" })}
              >
                Close
              </button>
            </div>
          ) : (
            <div>{row.original.MAIN_CAT_NAME}</div>
          );
        },
      },
      {
        Header: "Action",
        accessor: "",
        id: "action",
        disableFilters: true,
        Cell: ({ row }) => {
          const { MAIN_CAT_NAME, MAIN_CAT_ID } = row.original;
          return (
            <div className="flex gap-x-2 justify-center items-center">
              <PopOver tilte={`Update`}>
                <HiPencil
                  className="w-6 h-6 cursor-pointer text-green-600"
                  onClick={() =>
                    setUpdate({ id: MAIN_CAT_ID, value: MAIN_CAT_NAME })
                  }
                />
              </PopOver>
              <Tooltip
                action={() => updateCategory(MAIN_CAT_NAME, MAIN_CAT_ID, "D")}
                customContent={renderCustomDeleteContent}
              >
                <RiDeleteBinLine className="w-6 h-6 cursor-pointer text-red-500" />
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [update, updateCategory, getCategories]
  );

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    loading,
    addCategory,
    addNewData,
    setNewData,
    columns,
  };
};

export default useCategoriesApi;
