import React from "react";
import logo from "../Images/logo.png";
import { FaFolderMinus } from "react-icons/fa";
import { HiOutlineCog8Tooth } from "react-icons/hi2";

const Sidebar = () => {
  return (
    <div className="h-screen bg-navyBlue w-[70px] xl:flex flex-col items-center rounded-l-xl fixed left-0 top-0 hidden ">
      <div className="mt-5 mb-8">
        <img src={logo} alt="logo" className="w-10 cursor-pointer" />
      </div>
      <div className="bg-darkBlue flex justify-center align-middle p-2 rounded-md border border-sky-950 cursor-pointer">
        <FaFolderMinus className="text-2xl text-slate-50" />
      </div>
      <div className="my-4 cursor-pointer">
        <HiOutlineCog8Tooth className="text-slate-400 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
