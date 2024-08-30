import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";


const Tabs = () => {
  const { categoryCounts, setSelectedTab } = useContext(DataContext)
  const [activeBut, setActiveBut] = useState(null);

  useEffect(() => {
    setActiveBut("All");
  }, []);

  const handleTabChange = (name) => {
    setActiveBut(name);
    setSelectedTab(name);
  };

  return (
    <div className="flex gap-8 pt-2 px-5 flex-wrap">
      {categoryCounts?.map((category) => {
        const { name, count } = category;

        return (
          <button
            className={`text-sm font-semibold pb-2 ${
              activeBut === name
                ? " text-textPurple md:border-b-2 border-textPurple"
                : "text-gray"
            }`}
            key={name}
            onClick={() => handleTabChange(name)}
          >
            {name}
            <span
              className={`ml-1 rounded-lg text-[0.7rem] px-1 ${
                activeBut === name
                  ? "text-textPurple bg-highLight"
                  : "text-gray-500 bg-slate-200"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
