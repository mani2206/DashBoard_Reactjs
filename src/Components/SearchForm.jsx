import { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BsFillSlashSquareFill } from "react-icons/bs";
import { MdFilterListAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import DataContext from '../context/DataContext';

const SearchForm = ({ setModal, setOverlay }) => {
  const { data, tableData, setData, selectedRows } = useContext(DataContext);

  const actions = ["Delete", "Archive"];
  const categories = ["All", "On Track", "On Hold", "Potential Risk", "At Risk"];

  const [action, setAction] = useState("Actions");
  const [category, setCategory] = useState("All"); // Default to "All"
  const [search, setSearch] = useState("");


  const handleActions = (e) => {
    setAction(e.target.value);
  };

  const handleCategories = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {

    let filteredData = tableData;

    // Filter by search input
    filteredData = filteredData.filter((item) =>
      search.toLowerCase() === ""
        ? true
        : item.companyName.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by category
    if (category !== "All") {
      filteredData = filteredData.filter(
        (item) => item.projectStatus === category
      );
    }

    // Update the data state
    setData(filteredData);
  }, [search, category, tableData, setData]);

  const handleModal = () => {
    setModal(true);
    setOverlay(true);
  };

  return (
    <div className="lg:flex lg:justify-between lg:items-center px-5 py-5">
      <form>
        <div className="md:flex items-center font-normal">
          <div className="text-gray-500 text-sm inline-block md:block mr-2 md:mr-0">
            <span>{selectedRows.length} </span>
            <span>selected</span>
          </div>
          <select
            name="action"
            id="action"
            onChange={handleActions}
            value={action}
            className="px-1 py-[4px] text-gray-600 border-solid border-[1px] border-gray-300 focus:none rounded-md text-sm md:mx-2 font-medium mr-2 "
          >
            <option value="Actions" disabled>
              Actions
            </option>
            {actions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <MdCancel className="text-red-600 inline-block md:block" />
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 ">
            <MdFilterListAlt className="absolute ml-4 md:ml-7 pointer-events-none text-gray-600 text-base" />
            <select
              name="category"
              id="category"
              onChange={handleCategories}
              value={category}
              className="w-full md:ml-5 mr-0 pl-7 py-[4px] text-gray-600 border-solid border-[1px] border-gray-300 focus:none text-sm rounded-s-md font-medium mt-2 md:mt-0"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 md:mt-0 relative flex items-center text-gray-400 focus-within:text-gray-600 text-sm">
            <IoIosSearch className="text-lg absolute ml-3 pointer-events-none font-bold" />
            <input
              type="text"
              name="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-9 py-[4px] placeholder-gray-400 text-black border-l-[1px] md:border-l-0 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-300 focus:none text-sm font-normal rounded-e-md"
            />
            <BsFillSlashSquareFill className="absolute right-3 pointer-events-none text-gray-300" />
          </div>
        </div>
      </form>
      <button
        className="mt-3 lg:mt-0 border-none px-4 py-[5px] bg-textPurple rounded-md text-gray-100 text-sm flex justify-center items-center gap-1"
        onClick={handleModal}
      >
        <span>
          <FaPlus />
        </span>
        New Project
      </button>
    </div>
  );
};

export default SearchForm;
