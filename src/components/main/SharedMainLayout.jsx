import React from "react";
import Calendar from "../Calendar";
import CreateTaskModal from "../CreateTaskModal";
import NavBar from "../NavBar";
import ProjectsTab from "../ProjectsTab";
import Status from "../Status";
import TopBar from "../TopBar";
import TaskDetails from "../TaskDetails";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { isModalOpen } from './../../features/modal/modalSlice';
import AddMember from "../AddMember";
const SharedMainLayout = () => {
  const modalId = 'createTaskModal';
  const isOpen = useSelector((state) => isModalOpen(state.modal, modalId));
  const taskDetailsModalId = 'taskDetails';
  const isTaskDetailsOpen = useSelector((state) => isModalOpen(state.modal, taskDetailsModalId));
  const addMemberModalId = 'addMember';
  const isAddMemberOpen = useSelector((state)=> isModalOpen(state.modal, addMemberModalId));
  console.log(isOpen);
  return (
    <>
      {" "}
      {(isOpen || isTaskDetailsOpen || isAddMemberOpen) && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-overlay z-30"></div>
      )}
      <div className="flex">
        {isOpen && <CreateTaskModal />}
        {isTaskDetailsOpen && <TaskDetails/>}
        {isAddMemberOpen && <AddMember/>}
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
