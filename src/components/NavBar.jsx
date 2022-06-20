import React from "react";
import {
  DatabaseIcon,
  ViewGridIcon,
  ChartBarIcon,
  FolderIcon,
  CogIcon,
  XIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
  UserAddIcon,
  PlusIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import UserImg from "./../assets/user.jpg";
const NavBar = () => {
  return (
    <nav className="p-8 w-[300px] bg-navi h-screen border-r-2 border-slate-100 relative">
      <div className="flex items-center align-middle justify-between">
        <div className="flex items-center align-middle space-x-4">
          <DatabaseIcon className="w-12 h-12 text-white rounded-full bg-ocean p-2" />
          <h3 className="text-4xl font-semibold">PJ</h3>
        </div>
        <ArrowLeftIcon className="w-6 h-6 font-light text-slate-700" />
      </div>
      {/* Nav Content */}
      <div className="pt-16 flex flex-col space-y-8 leading-6">
        <div className="flex items-center align-middle space-x-4">
          <ViewGridIcon className="w-8 h-8 text-slate-400" />
          <span className="text-xl font-medium tracking-tight cursor-pointer">
            Dashboard
          </span>
        </div>
        <div className="flex items-center align-middle space-x-4">
          <ChartBarIcon className="w-8 h-8 text-slate-400" />
          <span className="text-xl font-medium tracking-tight cursor-pointer">
            Analytics
          </span>
        </div>
        <div className="flex items-center align-middle space-x-4">
          <FolderIcon className="w-8 h-8 text-slate-400" />
          <span className="text-xl font-medium tracking-tight cursor-pointer">
            Projects
          </span>
        </div>
        <div className="flex items-center align-middle space-x-4">
          <CogIcon className="w-8 h-8 text-slate-400" />
          <span className="text-xl font-medium tracking-tight cursor-pointer">
            Settings
          </span>
        </div>
      </div>
      {/* Create new task */}
      <div className="flex justify-center items-center space-x-4 mt-16 bg-faze rounded-xl p-4">
        <span className="text-xl w-[120px] block text-left">
          Create <br /> new task
        </span>
        <PlusIcon className="w-10 h-10 text-white rounded-full bg-ocean p-1.5 cursor-pointer" />
      </div>
      {/* User profile */}
      <div className="absolute bottom-8">
        <div className="flex justify-around space-x-4 items-center">
          <img
            src={UserImg}
            alt="user profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h5>Finna</h5>
            <span>finna@gmail.com</span>
          </div>
          <ChevronUpIcon className="w-4 h-4" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
