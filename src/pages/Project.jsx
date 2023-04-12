import React, { useEffect } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import {
  fetchSuccess,
  fetchFailure,
  updateProjects,
} from "../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProject, setMembers } from "../features/project/projectDetailSlice";
import { setAllUsers } from "../features/user/usersSlice";
import { openModal } from "../features/modal/modalSlice";
import axios from "axios";
import { Link } from "react-router-dom";
const Project = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((store) => store.project);
  const { users } = useSelector((store) => store.users);
  //render all users
  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:8800/api/users/", {
      withCredentials: true,
    });
    await dispatch(setAllUsers(res.data));
  };
  const getAllProject = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/projects/", {
        withCredentials: true,
      });
      dispatch(fetchSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure());
    }
  };
  useEffect(() => {
    getAllProject();
    getAllProject();
  }, []);
  console.log(projects);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">Project List</span>
        <div>
          <button className="bg-ocean text-white p-2 ">Create Project</button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3 mt-8 overflow-y-auto max-h-[80vh] scrollbar">
        {projects.map((project) => {
          const membersInProject = project.members.flatMap(
            (memberId) => users.find((user) => user._id === memberId) || []
          );
          const showedMember = membersInProject.slice(0, 3);
          console.log(showedMember);
          console.log(membersInProject);
          return (
            <div
              className="border shadow-md p-4 border-gray-200"
              key={project._id}
            >
              <div className="flex justify-between">
                {/* Start Date */}
                <span className="text-gray-400 font-extralight">
                  {format(new Date(project.startDate), "MMM dd yyyy")}
                </span>
                <DotsHorizontalIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <div className="flex justify-center">
                  <img
                    src="https://cdn.dribbble.com/users/2162265/screenshots/5816007/media/5ce9f7fbfc412dc21ecacfb6798176a9.png?compress=1&resize=400x300&vertical=top"
                    alt=""
                    className="w-20 h-20"
                  />
                </div>
                {/* Title of Project */}
                <div>
                  <h3 className="capitalize text-center font-medium text-lg">
                    {project.name}
                  </h3>
                </div>
                {/* Number of Members */}
                <div className="flex items-center justify-center translate-x-[1rem]">
                  {showedMember.map((mem, index) => {
                    return (
                      <img
                        src={mem.image}
                        alt=""
                        className={`w-8 h-8 rounded-full border-white border translate-x-[${
                          -0.75 * index
                        }rem]`}
                      />
                    );
                  })}
                  {project.members.length >= 4 && (
                    <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                      +{project.members.length - 3}
                    </div>
                  )}
                </div>
                {/* Status of Project */}
                <div className="flex justify-center">
                  <span
                    className={`text-sm ${
                      project.status === "Active" && "text-green-400"
                    } ${
                      project.status === "In Progress" && "text-sun"
                    } font-medium`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-center mt-2">
                  <hr className="w-[50%]" />
                </div>
              </div>
              <div className="flex justify-around mt-8 mb-4">
                <span
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    dispatch(openModal({ modalId: "addMember" }));
                    dispatch(setMembers(membersInProject));
                  }}
                >
                  Add people
                </span>
                <Link to={`/main/projects/${project._id}`}>
                  <span
                    className="text-gray-400 cursor-pointer"
                    onClick={() => {
                      dispatch(setProject(project));
                      dispatch(setMembers(membersInProject));
                    }}
                  >
                    Details
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
