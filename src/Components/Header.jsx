import { FaBell } from "react-icons/fa6";
import { RxQuestionMarkCircled } from "react-icons/rx";
import user from "../Images/user.jpeg";
import { tableData } from "../Data";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Header = () => {
  const {data}=useContext(DataContext)
  let archived = data.filter((item) => item.projectStatus === "Archived");
  return (
    <div className="flex justify-between items-center xl:w-[calc(100vw-70px)] px-5 py-3 bg-slate-100 border-b border-slate-300">
      <div className="flex gap-3 items-center justify-center">
        <h1 className="text-stone-950 text-2xl font-bold">Projects</h1>
        <span className="text-textPurple bg-highLight rounded-lg text-[0.8rem] px-1">
          {data.length - archived.length}
        </span>
      </div>
      <div className="flex items-center gap-7">
        <div className="text-xl text-zinc-500 cursor-pointer relative">
          <FaBell />
          <span className="w-3 h-3 block rounded-full bg-textPurple absolute right-0 top-0 z-10 border-2"></span>
        </div>
        <div className="text-xl text-zinc-500 cursor-pointer">
          <RxQuestionMarkCircled />
        </div>
        <div className="cursor-pointer">
          <img src={user} alt="" className="w-7 h-7 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
