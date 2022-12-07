import React,{useEffect, useState} from 'react'
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";
import UserImg from "./../assets/user.jpg";
import { format } from "date-fns";
import { PlusIcon, DotsVerticalIcon, CalendarIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, fetchFailure } from "../features/task/taskSlice";
import axios from "axios";
const Boards = () => {
  const dispatch = useDispatch();
  const {tasks} = useSelector((store)=>store.task)
  const [users,setUsers] = useState([]);
  const getAllUsers = async()=>{
    const res = await axios.get("http://localhost:8800/api/users/", { withCredentials: true });
    await setUsers(res.data);   
  }
  // const getAllTasks = async()=>{
  //   try {
  //     const res = await axios.get("http://localhost:8800/api/tasks/", { withCredentials: true });
  //     dispatch(fetchSuccess(res.data))  
  //   } catch (error) {
  //     dispatch(fetchFailure())      
  //   }
  // }
  useEffect(() => {
    getAllUsers()
  }, []);
  console.log(users)
  const toDo = tasks.filter(t=> t.category == "To Do");
  const inProgress = tasks.filter(t=>t.category == "In Progress");
  const review = tasks.filter(t=>t.category == "Review");
  const done = tasks.filter(t=>t.category == "Done");
  return (
    <>
      <Status />
      <ProjectsTab />
      <div className=' h-screen mt-4 px-2 pt-4 overflow-y-scroll scrollbar'>
        <div className='flex justify-between items-stretch'>
          <div className='bg-orange-100 px-3 rounded-3xl pb-4'>
            <div className='flex space-x-2 items-center mt-6'>
              <p className='w-4 h-4 rounded-md bg-accent'></p>
              <span className='text-lg font-medium text-accent'>To do</span>
              <PlusIcon className='w-6 h-6 text-accent' />
            </div>
            {/* each task */}
            <div className='flex flex-col space-y-4 mt-6 '>
              {toDo.map(item=>{
                const {title, endDate, userId,_id} = item;
                let taskOfUser = users.find(user=> user._id == userId);
                return (
                  <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' key={_id}>
                  <div className='flex justify-between items-center'>
                    <h5 className='font-medium text-lg capitalize'>{title}</h5>
                    <DotsVerticalIcon className='w-6 h-6' />
                  </div>
                  <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                      <CalendarIcon className='w-6 h-6 text-gray-400'/>
                      <span className='text-gray-400'>{format(new Date(endDate),'MM/dd/yyyy')}</span>
                    </div>
                      <img src={taskOfUser?.image} title={taskOfUser?.fullName} alt="" className='w-8 h-8 rounded-full cursor-pointer'/>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
          <div className='bg-yellow-100 px-3 rounded-3xl pb-4'>
            <div className='flex space-x-2 items-center mt-6'>
              <p className='w-4 h-4 rounded-md bg-sun'></p>
              <span className='text-lg font-medium text-sun'>In Progress</span>
              <PlusIcon className='w-6 h-6 text-sun' />
            </div>
            {/* each task */}
            <div className='flex flex-col space-y-4 mt-6 '>
              {
                inProgress.map(item=>{
                  const {title, endDate, userId,_id} = item;
                  let taskOfUser = users.find(user=> user._id == userId);
                  return(
                    <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' key={_id}>
                    <div className='flex justify-between items-center'>
                      <h5 className='font-medium text-lg capitalize'>{title}</h5>
                      <DotsVerticalIcon className='w-6 h-6' />
                    </div>
                    <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center space-x-2'>
                        <CalendarIcon className='w-6 h-6 text-gray-400'/>
                        <span className='text-gray-400'>{format(new Date(endDate),'MM/dd/yyyy')}</span>
                      </div>
                        <img src={taskOfUser?.image} title={taskOfUser?.fullName} alt="" className='w-8 h-8 rounded-full'/>
                    </div>
                  </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-sky-100 px-3 rounded-3xl pb-4'>
            <div className='flex space-x-2 items-center mt-6'>
              <p className='w-4 h-4 rounded-md bg-pool'></p>
              <span className='text-lg font-medium text-pool'>Review</span>
              <PlusIcon className='w-6 h-6 text-pool' />
            </div>
            {/* each task */}
            <div className='flex flex-col space-y-4 mt-6 '>
              {
                review.map(item=>{
                  const {title, endDate, userId,_id} = item;
                  let taskOfUser = users.find(user=> user._id == userId);
                  return(
                    <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' key={_id}>
                    <div className='flex justify-between items-center'>
                      <h5 className='font-medium text-lg capitalize'>{title}</h5>
                      <DotsVerticalIcon className='w-6 h-6' />
                    </div>
                    <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center space-x-2'>
                        <CalendarIcon className='w-6 h-6 text-gray-400'/>
                        <span className='text-gray-400'>{format(new Date(endDate),'MM/dd/yyyy')}</span>
                      </div>
                        <img src={taskOfUser?.image} title={taskOfUser?.fullName} alt="" className='w-8 h-8 rounded-full'/>
                    </div>
                  </div>
                  );
                })
              }
            </div>
          </div>
          <div className='bg-green-100 px-3 rounded-3xl pb-4'>
            <div className='flex space-x-2 items-center mt-6'>
              <p className='w-4 h-4 rounded-md bg-done'></p>
              <span className='text-lg font-medium text-done'>Done</span>
              <PlusIcon className='w-6 h-6 text-done' />
            </div>
            {/* each task */}
            <div className='flex flex-col space-y-4 mt-6 '>
              {done.map(item=>{
                const {title, endDate, userId,_id} = item;
                let taskOfUser = users.find(user=> user._id == userId);
                return(
                  <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' key={_id}>
                  <div className='flex justify-between items-center'>
                    <h5 className='font-medium text-lg capitalize'>{title}</h5>
                    <DotsVerticalIcon className='w-6 h-6' />
                  </div>
                  <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                      <CalendarIcon className='w-6 h-6 text-gray-400'/>
                      <span className='text-gray-400'>{format(new Date(endDate),'MM/dd/yyyy')}</span>
                    </div>
                      <img src={taskOfUser?.image} title={taskOfUser?.fullName} alt="" className='w-8 h-8 rounded-full'/>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Boards