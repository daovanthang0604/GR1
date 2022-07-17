import React from "react";
import { Outlet } from "react-router-dom";
import Calendar from "../components/Calendar";
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";

const Projects = () => {
  return (
    <>
      <Status />
      <ProjectsTab />
      <Calendar />
    </>
  );
};

export default Projects;
