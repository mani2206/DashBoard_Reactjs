import { useState,useEffect, useContext } from "react";
import DataContext from "../context/DataContext";

const Modal = ({setModal, setOverlay}) => {
  
  const { data, setData } = useContext(DataContext)
 
  const [projectName, setProjectName] = useState("");
  const [selectedPM, setSelectedPM] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [timelineType, setTimelineType] = useState("Custom");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimation, setEstimation] = useState("");

  const resources = [
    "UX/UI Design",
    "Frontend",
    "Backend",
    "Full Stack",
    "Graphic Designer",
    "Web Designer",
    "QA",
  ];

  const handleCancel = () => {
    setModal(false);
    setOverlay(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const newPost = {
      id,
      isChecked: true,
      companyName: projectName,
      estimatedPrice: estimation,
      OPM: selectedPM,
      startDate: startDate,
      endDate: endDate,
      resources: selectedResource,
      lastUpdate: endDate,
    };
    const allPost = [...data, newPost];
    setData(allPost);
    console.log(newPost, "newpost");
    console.log({
      projectName,
      selectedPM,
      selectedResource,
      timelineType,
      startDate,
      endDate,
      estimation,
    }); 

      
    localStorage.setItem("projectData", JSON.stringify(allPost));


    setProjectName("");
    setSelectedPM("");
    setSelectedResource("");
    setTimelineType("Custom");
    setStartDate("");
    setEndDate("");
    setEstimation("");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("projectData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [setData]);

  return (
    <div className="w-[95%] md:w-fit max-w-lg md:max-w-md p-4 md:mx-auto sm:p-6 bg-white rounded-lg shadow-xl absolute z-30 top-3 left-2 md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-45%]">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Add new project
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="project-name"
          >
            Project name<sup style={{color:"red"}}>*</sup>
          </label>
          <input
            type="text"
            id="project-name"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Project manager (PM)
          </label>
          <div className="flex flex-wrap">
            {["Mani", "Robert Downey Jr.", "Undertaker"].map((pm) => (
              <button
                type="button"
                key={pm}
                className={`px-3 py-1 border ${
                  selectedPM === pm ? "bg-blue-500 text-white" : ""
                } rounded-lg focus:outline-none`}
                onClick={() => setSelectedPM(pm)}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Resources</label>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource) => (
              <span
                key={resource}
                className={`px-3 py-1 border rounded-lg cursor-pointer ${
                  selectedResource === resource ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedResource(resource)}
              >
                {resource}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Project timeline
          </label>
          <div>
            <select
              value={timelineType}
              onChange={(e) => setTimelineType(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
            >
              <option value="Custom">Custom</option>
              {/* Add more options if needed */}
            </select>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="estimation"
          >
            Estimation
          </label>
          <input
            type="number"
            id="estimation"
            value={estimation}
            onChange={(e) => setEstimation(e.target.value)}
            placeholder="US$ 00.00"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Add project
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
