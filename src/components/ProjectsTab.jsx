import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const ProjectsTab = () => {
  const {project} = useSelector((store)=> store.projectDetail)
  const projectId = project?._id;
  return (
    <div className="pt-4">
      <ul className="flex space-x-8 text-lg items-center font-normal">
        <NavLink to={`/main/projects/${projectId}/boards`}   className={({ isActive, isPending }) =>
    isPending ? "cursor-pointer" : isActive ? "cursor-pointer tab" : ""
  }>
          Boards
        </NavLink>
        <NavLink to={`/main/projects/${projectId}/`} className={({ isActive, isPending }) =>
    isPending ? "cursor-pointer" : isActive ? "cursor-pointer tab" : ""
  }>
          Calendar
        </NavLink>
        <NavLink to={`/main/projects/${projectId}/files`} className={({ isActive, isPending }) =>
    isPending ? "cursor-pointer" : isActive ? "cursor-pointer tab" : ""
  }>
          Files
        </NavLink>
      </ul>
    </div>
  );
};

export default ProjectsTab;
