import React from "react";
import ReactTable from "../common-components/ReactTable";
import useCategoriesApi from "../vm";
import PopOver from "../common-components/PopOver";
import { BiSolidPlusCircle } from "react-icons/bi";
import { PropagateLoader } from "react-spinners";
import { warningNotification } from "../common-components/ToastMessage";

export default function Categories() {
  const { categories, loading, addCategory, addNewData, setNewData, columns } =
    useCategoriesApi();

  return (
    <>
      {loading ? (
        <div
          className="w-screen fixed"
          style={{
            backgroundColor: "#cccccc99",
            height: "100%",
            zIndex: "100000",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PropagateLoader
            className="fixed"
            color="#1E62B1"
            size={30}
            style={{ top: "48%", left: "48%" }}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full overflow-y-auto">
          <div className="font-bold text-3xl p-4">Categories</div>
          <div className="flex flex-col p-4 border border-gray-300 rounded-md bg-gray-100 lg:w-1/2 w-full drop-shadow-lg gap-y-4 overflow-y-auto">
            <div className="flex flex-col justify-start gap-y-4 w-full">
              <p className="text-xl font-bold mr-auto">Add Main Category</p>
              <div className="flex gap-x-4 w-full">
                <input
                  className="bg-white border border-gray-300 h-10 rounded-md w-full px-2"
                  onChange={(e) => setNewData(e.target.value)}
                  value={addNewData}
                  placeholder={"Enter new category"}
                />
                <PopOver tilte={`Add New`}>
                  <BiSolidPlusCircle
                    className="w-10 h-10"
                    color="#1E3FAF"
                    onClick={() => {
                      if (addNewData.length > 0) addCategory(addNewData);
                      else
                        warningNotification(
                          "Please type new category and then add"
                        );
                    }}
                  />
                </PopOver>
              </div>
            </div>
            <ReactTable data={categories} columns={columns} />
          </div>
        </div>
      )}
    </>
  );
}
