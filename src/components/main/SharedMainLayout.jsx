import React from "react";
import Calendar from "../Calendar";
import CreateTaskModal from "../CreateTaskModal";
import NavBar from "../NavBar";
import ProjectsTab from "../ProjectsTab";
import Status from "../Status";
import TopBar from "../TopBar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const SharedMainLayout = () => {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <>
      {" "}
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-overlay z-30"></div>
      )}
      <div className="flex">
        {isOpen && <CreateTaskModal />}
        <NavBar />
        <div className="flex flex-col  px-8 pt-8 h-screen overflow-hidden w-full">
          <TopBar />
          <Outlet />
        </div>
      </div>{" "}
      <Toaster/>
    </>
  );
};

export default SharedMainLayout;
