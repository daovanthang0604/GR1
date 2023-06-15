import React, { useState } from "react";
import {
  XIcon,
  TagIcon,
  CalendarIcon,
  UsersIcon,
  DotsHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { setTask } from "../features/task/taskDetailSlice";
import { toast } from 'react-hot-toast';
const TaskDetails = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { task } = useSelector((store) => store.taskDetail);
  const { users } = useSelector((store) => store.users);
  const { currentUser } = useSelector((store) => store.user);
  const user = task.userId.flatMap(item=>{
    return users.filter(user=> item === user._id)
  });
  let categoryColor = '';
  let categoryBgColor = '';
  switch(task.category){
    case "To Do": 
    categoryColor = "text-accent";
    categoryBgColor = 'bg-orange-100'
    break;
    case "In Progress":
    categoryColor = "text-sun";
    categoryBgColor = 'bg-yellow-100'
    break;
    case "Review":
    categoryColor = "text-pool";
    categoryBgColor = 'bg-sky-100'
    break;
    case "Done":
      categoryColor = "text-done";
      categoryBgColor = 'bg-green-100'
      break;
    default:
      console.log(task.category)
  }
  const updateTaskOnServer = async (task) => {
    try {
      await axios.patch(`http://localhost:8800/api/tasks/${task._id}`, task, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const createNotification = async(notification)=>{
    try {
      await axios.post(`http://localhost:8800/api/notification`, notification, { withCredentials: true });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      comments: [
        ...task.comments,
        {
          text,
          userId: currentUser._id,
          timestamp: Date.now(),
        },
      ],
    };
    const newNotification = {
      recipient: task?.userId,
      giver: currentUser?._id,
      type: "comment"
    }
    await dispatch(setTask(newTask));
    await updateTaskOnServer(newTask);
    setText('');
    await toast.success("Commented",{duration: 2000})
    await createNotification(newNotification);
  };
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white max-h-[85%] lg:w-1/3 w-96 rounded-md">
      <div className="flex flex-col py-4 px-8">
        <div className="flex justify-between">
          <span>Project Name</span>
          <div className="flex space-x-2">
            <PencilIcon className="w-8 h-8 p-2 cursor-pointer border rounded-lg text-stone-500 border-stone-200" />
            <XIcon
              className="w-8 h-8 p-2 cursor-pointer border rounded-lg text-stone-500 border-stone-200 transform hover:rotate-90 transition duration-200 hover:text-ocean"
              onClick={() => dispatch(closeModal({ modalId: "taskDetails" }))}
            />
          </div>
        </div>
        <div className="mt-2">
          <span className="font-medium text-2xl">{task.title}</span>
        </div>
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex justify-between items-center lg:mr-20 md:mr-6">
            <div className="flex space-x-1">
              <TagIcon className="w-6 h-6 rounded-full text-neutral-400 text-md" />
              <span className="text-md font-medium text-neutral-400">
                Status
              </span>
            </div>
            <div className={`${categoryBgColor} py-1 px-8 rounded-xl lg:min-w-[7rem] md:min-w-[4rem]`}>
              <span className={`${categoryColor} text-md font-medium`}>
                {task.category}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center lg:mr-20 md:mr-6">
            <div className="flex space-x-1">
              <CalendarIcon className="w-6 h-6 rounded-full text-neutral-400 text-md" />
              <span className="text-md font-medium text-neutral-400">
                Start Date
              </span>
            </div>
            <div className="lg:min-w-[7rem] md:min-w-[4rem]">
              <span className="text-md font-medium text-black">
                {format(new Date(task.startDate), "MMM dd yyyy")}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center lg:mr-20 md:mr-6">
            <div className="flex space-x-1">
              <CalendarIcon className="w-6 h-6 rounded-full text-neutral-400 text-md" />
              <span className="text-md font-medium text-neutral-400">
                End Date
              </span>
            </div>
            <div className="lg:min-w-[7rem] md:min-w-[4rem]">
              <span className="text-md font-medium text-black">
                {format(new Date(task.endDate), "MMM dd yyyy")}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center lg:mr-20 md:mr-6">
            <div className="flex space-x-1">
              <UsersIcon className="w-6 h-6 rounded-full text-neutral-400 text-md" />
              <span className="text-md font-medium text-neutral-400">
                Asignee
              </span>
            </div>
            <div className="lg:min-w-[7rem] md:min-w-[4rem] flex justify-center">
              {user.map((u,i)=>{
                let trans = -0.75*i;
                return (
                  <span className="w-10 h-10 rounded-full">
                  <img src={u?.image} alt="" className={`rounded-full translate-x-[${trans}rem]`} />
                </span>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex space-x-10 text-neutral-400">
            <span className="text-ocean font-bold text-md">Comments</span>
            <span className="font-bold text-md">Description</span>
            <span className="font-bold text-md">Settings</span>
          </div>
          <div className="mt-2 w-full">
            <form className="w-full relative" onSubmit={handleSubmit}>
              <textarea
                id="comment"
                type="text"
                value={text}
                className="bg-gray-200 w-full h-24 outline-gray-300 rounded-md break-words flex-wrap pr-20 pl-2"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                className="absolute bottom-4 right-4 p-2 rounded-md bg-ocean text-white"
              >
                Publish
              </button>
            </form>
          </div>
          <div className="mt-4 mr-2 overflow-y-auto scrollbar max-h-[15rem] flex flex-col">
            {task.comments.map((comment) => {
              const { userId, text, timestamp } = comment;
              const commentUser = users.find((user) => user._id === userId);
              return (
                <div className="border rounded-lg border-stone-200 p-2 mt-4 ">
                  <div className="flex space-x-4 items-center relative">
                    <img
                      src={commentUser.image}
                      alt=""
                      className="rounded-full w-12 h-12"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-sm">
                        {format(new Date(timestamp), "MMM d yyyy 'at' h:mm a")}
                      </span>
                      <span className="font-medium">{commentUser.fullName}</span>
                    </div>
                   {(currentUser._id === commentUser._id) &&  <DotsHorizontalIcon className="w-6 h-6 absolute top-0 right-0" />}
                  </div>
                  <div className="mt-1">
                    <span className="text-slate-500 text-sm">
                      {text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
