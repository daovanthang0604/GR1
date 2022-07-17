import React from "react";
import { NavLink } from "react-router-dom";
const ProjectsTab = () => {
  return (
    <div className="pt-4">
      <ul className="flex space-x-8 text-lg items-center font-normal">
        <NavLink to="/boards" className="cursor-pointer">
          Boards
        </NavLink>
        <NavLink to="/calendar" className="tab cursor-pointer">
          Calendar
        </NavLink>
        <NavLink to="/files" className="cursor-pointer">
          Files
        </NavLink>
      </ul>
    </div>
  );
};

export default ProjectsTab;
