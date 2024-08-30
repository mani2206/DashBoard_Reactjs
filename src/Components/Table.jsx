import { useContext } from "react";
import { LiaChevronCircleRightSolid } from "react-icons/lia";
import { GoChevronRight } from "react-icons/go";
import { BiSolidSquareRounded } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { TbCaretUpDownFilled, TbArrowUp, TbArrowDown } from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";
import user from "../Images/user.jpeg";
import user02 from "../Images/user02.jpeg";
import user03 from "../Images/user03.jpeg";
import DataContext from "../context/DataContext";

const Table = () => {
  const {
    data,
    setSelectedRows,
    selectedRows,
    setData,
    sortConfig,
    setSortConfig,
    currentPage,
    setCurrentPage,
    isDropdownOpen,
    setIsDropdownOpen,
    handleSort,
    sortedData,
    paginatedData,
    handleRowSelect,
    handleSelectAll,
    goToNextPage,
    goToPreviousPage,
    handleDeleteRow,
    toggleDropdown,
    totalPages
  } = useContext(DataContext);

  return (
    <div className="overflow-auto shadow">
      <table className="w-full">
        <thead className="bg-slate-100 border-y border-slate-300">
          <tr className="text-left">
            <th className="pl-5 py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 ">
              <input
                type="checkbox"
                checked={selectedRows.length === paginatedData.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="accent-textPurple"
              />
            </th>
            <th
              className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-800 flex items-center cursor-pointer"
              onClick={() => handleSort("id")}
            >
              #
              {sortConfig.key === "id" &&
                (sortConfig.direction === "ascending" ? (
                  <TbArrowUp className="text-sm text-gray-400" />
                ) : (
                  <TbArrowDown className="text-sm text-gray-400" />
                ))}
              {sortConfig.key !== "id" && (
                <TbCaretUpDownFilled className="text-sm text-gray-400" />
              )}
            </th>
            <th
              className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 cursor-pointer"
              onClick={() => handleSort("companyName")}
            >
              project plan
              {sortConfig.key === "companyName" &&
                (sortConfig.direction === "ascending" ? (
                  <TbArrowUp className="text-sm text-gray-400" />
                ) : (
                  <TbArrowDown className="text-sm text-gray-400" />
                ))}
            </th>
            <th className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500">
              pm
            </th>
            <th className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500">
              status
            </th>
            <th
              className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 flex items-center cursor-pointer"
              onClick={() => handleSort("lastUpdate")}
            >
              last update
              {sortConfig.key === "lastUpdate" &&
                (sortConfig.direction === "ascending" ? (
                  <TbArrowUp className="text-sm text-gray-400" />
                ) : (
                  <TbArrowDown className="text-sm text-gray-400" />
                ))}
              {sortConfig.key !== "lastUpdate" && (
                <TbCaretUpDownFilled className="text-sm text-gray-400" />
              )}
            </th>
            <th className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 text-center">
              resources
            </th>
            <th className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500">
              project timeline
            </th>
            <th
              className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 cursor-pointer"
              onClick={() => handleSort("estimatedPrice")}
            >
              estimation
              {sortConfig.key === "estimatedPrice" &&
                (sortConfig.direction === "ascending" ? (
                  <TbArrowUp className="text-sm text-gray-400" />
                ) : (
                  <TbArrowDown className="text-sm text-gray-400" />
                ))}
            </th>
            <th className="py-2 px-1 font-semibold text-[0.7rem] tracking-wide uppercase text-slate-500 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(
            ({
              id,
              companyName,
              OPM,
              projectStatus,
              lastUpdate,
              resources,
              startDate,
              endDate,
              estimatedPrice,
            }) => {
              return (
                <tr
                  className={`text-left ${
                    selectedRows.includes(id)
                      ? "bg-highLight"
                      : "border-b border-slate-300"
                  }`}
                  key={id}
                >
                  <td className="py-2 px-1 pl-5 whitespace-nowrap">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(id)}
                        onChange={() => handleRowSelect(id)}
                        className="border-gray-400 accent-textPurple"
                      />
                      <LiaChevronCircleRightSolid className="text-gray-500 font-normal" />
                    </div>
                  </td>
                  <td className="py-2 px-1 font-semibold text-xs whitespace-nowrap">
                    {id}
                  </td>
                  <td className="py-2 px-1 font-semibold text-sm tracking-wide text-textPurple whitespace-nowrap">
                    {companyName}
                  </td>
                  <td className="py-2 px-1 font-semibold text-xs tracking-wide uppercase whitespace-nowrap">
                    <img
                      src={
                        OPM === "Mani"
                          ? user
                          : OPM === "Undertaker"
                          ? user02
                          : OPM === "Robert Downey Jr."
                          ? user03
                          : null
                      }
                      alt="opm"
                      className="w-5 h-5 lg:w-7 lg:h-7 rounded-md object-cover"
                    />
                  </td>
                  <td className="py-2 px-1 font-semibold whitespace-nowrap">
                    <div
                      className={`flex items-center gap-1 rounded-sm w-fit px-2 py-[1px] ${
                        projectStatus === "On Track"
                          ? "bg-green-100"
                          : projectStatus === "On Hold"
                          ? "bg-gray-100"
                          : projectStatus === "At Risk"
                          ? "bg-red-100"
                          : projectStatus === "Potential Risk"
                          ? "bg-yellow-100"
                          : projectStatus === "Archived"
                          ? "bg-blue-100"
                          : null
                      }`}
                    >
                      <BiSolidSquareRounded
                        className={`text-[6px] ${
                          projectStatus === "On Track"
                            ? "text-green-600"
                            : projectStatus === "On Hold"
                            ? "text-gray-600"
                            : projectStatus === "At Risk"
                            ? "text-red-600"
                            : projectStatus === "Potential Risk"
                            ? "text-yellow-600"
                            : projectStatus === "Archived"
                            ? "text-blue-600"
                            : null
                        }`}
                      />
                      <span
                        className={`text-xs  ${
                          projectStatus === "On Track"
                            ? "text-green-600"
                            : projectStatus === "On Hold"
                            ? "text-gray-600"
                            : projectStatus === "At Risk"
                            ? "text-red-600"
                            : projectStatus === "Potential Risk"
                            ? "text-yellow-600"
                            : projectStatus === "Archived"
                            ? "text-blue-600"
                            : null
                        }`}
                      >
                        {projectStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-1 font-normal text-sm tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <CgNotes className="text-textPurple" />
                      {lastUpdate}
                    </div>
                  </td>
                  <td className="py-2 px-1 text-center font-semibold text-sm text-gray-600 whitespace-nowrap">
                    {resources.length}
                  </td>
                  <td className="py-2 px-1 font-semibold text-xs tracking-wide uppercase whitespace-nowrap">
                    <div className="flex gap-[0.2rem] items-center">
                      <span className="bg-gray-100 rounded-sm w-fit px-2 py-[1px] text-gray-500">
                        {startDate}
                      </span>
                      <GoChevronRight />
                      <span className="bg-gray-100 rounded-sm w-fit px-2 py-[1px] text-gray-500">
                        {endDate}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-1 font-normal text-sm tracking-wide whitespace-nowrap">
                    {`US$ ${estimatedPrice}k`}
                  </td>
                  <td className="py-2 px-1 text-center relative">
                    <button
                      onClick={() => toggleDropdown(id)}
                      className="text-gray-600"
                    >
                      <FiMoreVertical />
                    </button>
                    {isDropdownOpen === id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => handleDeleteRow(id)}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-2 bg-slate-100 border-t border-slate-300">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm font-semibold bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm font-semibold bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
