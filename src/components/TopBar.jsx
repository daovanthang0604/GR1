import React from "react";
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import UserImg from "./../assets/user.jpg";
const TopBar = () => {
  const { currentUser } = useSelector((store) => store.user);
  return (
    <header className="w-full h-fit">
      <div className="flex justify-between items-center leading-6">
        <div>
          <span className="text-xl font-medium">Projects</span>
        </div>
        <div className="flex justify-around space-x-8">
          <div className="flex items-center space-x-8">
            <ChatAlt2Icon className="w-6 h-6 cursor-pointer" />
            <BellIcon className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="relative before:absolute before:bottom-2/4 before:right-0 before:h-6 before:border-r before:border-slate-300 before:translate-y-2/4"></div>
          <div className="flex justify-around space-x-4 items-center">
            <img
              src={UserImg}
              alt="user profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{currentUser.fullName}</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
