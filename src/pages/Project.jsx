import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import User1 from "./../assets/Users/1.jpg";
import User2 from "./../assets/Users/2.jpg";
import User3 from "./../assets/Users/3.jpg";
const Project = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">Project List</span>
        <div>
          <button className="bg-ocean text-white p-2 ">Create Project</button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-3 mt-8 overflow-y-auto scrollbar h-[85vh]">
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div className="border shadow-md p-4 border-gray-200">
          <div className="flex justify-between">
            {/* Start Date */}
            <span className="text-gray-400 font-extralight">Feb 14 2023</span>
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
                User Interface design
              </h3>
            </div>
            {/* Number of Members */}
            <div className="flex items-center justify-center translate-x-[1rem]">
              <img
                src={User1}
                alt=""
                className="w-8 h-8 rounded-full border-white border"
              />
              <img
                src={User2}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
              />
              <img
                src={User3}
                alt=""
                className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
              />
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +15
              </div>
            </div>
            {/* Status of Project */}
            <div className="flex justify-center">
              <span className="text-sm text-sun font-medium">In Progress</span>
            </div>
            <div className="flex justify-center mt-2">
              <hr className="w-[50%]" />
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-4">
            <span className="text-gray-400">Add people</span>
            <span className="text-gray-400">Details</span>
          </div>
        </div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </div>
    </div>
  );
};

export default Project;
