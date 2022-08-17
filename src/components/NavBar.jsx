import React, { useState } from "react";
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
  ChevronDoubleRightIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import UserImg from "./../assets/user.jpg";
import { openModal } from "../features/modal/modalSlice";
import { logout } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
const NavBar = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav
      className={`p-8 w-[300px] bg-navi h-screen border-r-2 border-slate-100 relative transition-all ease-out duration-200 ${
        toggle && "w-[100px]"
      }`}
    >
      <div className={`flex items-center align-middle justify-between`}>
        <div className="flex items-center align-middle space-x-4">
          <DatabaseIcon className="w-12 h-12 text-white rounded-full bg-ocean p-2" />
          {!toggle && <h3 className="text-4xl font-semibold">PJ</h3>}
        </div>
        {!toggle ? (
          <ArrowLeftIcon
            className="w-6 h-6 font-light text-slate-700 cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        ) : (
          <ChevronDoubleRightIcon
            className="absolute w-6 h-6 text-gray-400 right-[-1rem] cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        )}
      </div>
      {/* Nav Content */}
      <div className="pt-16 flex flex-col space-y-8 leading-6">
        <div className="flex items-center align-middle space-x-4">
          <ViewGridIcon className="w-8 h-8 text-slate-400" />
          {!toggle && (
            <NavLink
              to="/main/dashboard"
              className="text-xl font-medium tracking-tight cursor-pointer"
            >
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="flex items-center align-middle space-x-4">
          <ChartBarIcon className="w-8 h-8 text-slate-400" />
          {!toggle && (
            <NavLink
              to="/main/analytics"
              className="text-xl font-medium tracking-tight cursor-pointer"
            >
              Analytics
            </NavLink>
          )}
        </div>
        <div className="flex items-center align-middle space-x-4">
          <FolderIcon className="w-8 h-8 text-slate-400" />
          {!toggle && (
            <NavLink
              to="/main"
              className="text-xl font-medium tracking-tight cursor-pointer"
            >
              Projects
            </NavLink>
          )}
        </div>
        <div className="flex items-center align-middle space-x-4">
          <CogIcon className="w-8 h-8 text-slate-400" />
          {!toggle && (
            <NavLink
              to="/main/settings"
              className="text-xl font-medium tracking-tight cursor-pointer"
            >
              Settings
            </NavLink>
          )}
        </div>
      </div>
      {/* Create new task */}
      <div
        className={`flex justify-center items-center space-x-4 mt-16 bg-faze rounded-xl p-4 ${
          toggle && "p-0"
        }`}
      >
        {!toggle && (
          <span className="text-xl w-[120px] block text-left">
            Create <br /> new task
          </span>
        )}
        <PlusIcon
          className={`w-10 h-10 text-white rounded-full bg-ocean p-1.5 cursor-pointer ${
            toggle && "shrink-0"
          }`}
          onClick={() => dispatch(openModal())}
        />
      </div>
      {/* User profile */}
      <div className="absolute bottom-4">
        {!toggle ? (
          <div
            className={`flex justify-around space-x-4 items-center ${
              toggle && "space-x-1"
            }`}
          >
            <img
              src={currentUser?.image}
              alt="user profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h5>{currentUser?.fullName}</h5>
              <span>{currentUser?.email}</span>
            </div>
            <ChevronUpIcon className="w-4 h-4" />
          </div>
        ) : (
          <div className="flex justify-center items-center w-8 h-8 text-slate-400 cursor-pointer">
            <LogoutIcon onClick={handleLogout} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
