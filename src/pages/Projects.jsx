import React, {useEffect} from "react";
import Calendar from "../components/Calendar";
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";
import axios from "axios";
import { fetchSuccess, fetchFailure } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";
const Projects = () => {
  const dispatch = useDispatch();
  const getAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/tasks/", {
        withCredentials: true,
      });
      dispatch(fetchSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure());
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <>
      <Status />
      <ProjectsTab />
      <Calendar />
    </>
  );
};

export default Projects;
