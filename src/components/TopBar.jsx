import React, { useState } from "react";
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Notification from "./Notification";
import { NavLink } from "react-router-dom";
const TopBar = () => {
  const [isHover, setIsHover] = useState(false);
  const { currentUser } = useSelector((store) => store.user);
  const location = useLocation();
  const currentRoute = location.pathname;
  let currentTitle = "";
  const handleMouseHover = () => {
    setIsHover(true);
  };
  const handleMouseout = () => {
    setIsHover(false);
  };
  console.log(currentRoute.split("/"));
  if (currentRoute.split("/").includes("dashboard")) currentTitle = "Dashboard";
  else if (currentRoute.split("/").includes("projects "))
    currentTitle = "Projects";
  return (
    <header className="w-full h-fit">
      <div className="flex justify-between items-center leading-6">
        <div>
          <span className="text-xl font-medium">{currentTitle}</span>
        </div>
        <div className="flex justify-around space-x-8">
          <div className="flex items-center space-x-8">
            <NavLink to="chats">
              <ChatAlt2Icon className="w-6 h-6 cursor-pointer" />
            </NavLink>

            <div
              className="relative"
              onMouseOver={handleMouseHover}
              onMouseOut={handleMouseout}
            >
              <BellIcon className="w-6 h-6 cursor-pointer" />
              {isHover && <Notification />}
            </div>
          </div>
          <div className="relative before:absolute before:bottom-2/4 before:right-0 before:h-6 before:border-r before:border-slate-300 before:translate-y-2/4"></div>
          <div className="flex justify-around space-x-4 items-center">
            <img
              src={currentUser.image}
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
