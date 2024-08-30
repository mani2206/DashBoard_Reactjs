import { createContext, useState, useEffect } from "react";
import { tableData } from "../Data";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(tableData);
  const [selectedTab, setSelectedTab] = useState("All");
  const [countData, setCountData] = useState(tableData || []);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (selectedTab === "All") {
      setData(countData);
    } else {
      const newProjects = countData.filter(
        (data) => data.projectStatus === selectedTab
      );
      setData(newProjects);
    }
  }, [selectedTab]);

  const categories = [
    "All",
    "At Risk",
    "On Hold",
    "Potential Risk",
    "On Track",
    "Archived",
  ];

  const calculateCounts = () => {
    const counts = categories.map((category) => ({
      name: category,
      count:
        category === "All"
          ? tableData.filter((item) => item.projectStatus !== "Archived").length
          : tableData.filter((item) => item.projectStatus === category).length,
    }));
    return counts;
  };

  //Table Form
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // Track which row's dropdown is open
  const itemsPerPage = 8; // Set items per page

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    return sortConfig.direction === "ascending"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedRows(paginatedData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    console.log(updatedData, "updatedData");
    setData(updatedData);
  };

  const toggleDropdown = (id) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };

  // table end
  let categoryCounts = calculateCounts();
  return (
    <>
      <DataContext.Provider
        value={{
          data,
          setData,
          selectedTab,
          setSelectedTab,
          countData,
          setCountData,
          selectedRows,
          setSelectedRows,
          categories,
          calculateCounts,
          categoryCounts,
          tableData,
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
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataContext;
