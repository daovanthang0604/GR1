import React, {useEffect, useState} from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setTask } from '../features/task/taskDetailSlice';
import { openModal } from '../features/modal/modalSlice';
const Notification = () => {
  const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;
  const dispatch = useDispatch();
  const [myNotification, setMyNotification] = useState([]);
  const { users } = useSelector((store) => store.users);
  const { currentUser } = useSelector((store) => store.user);
  const { tasks } = useSelector((store) => store.task)
  const getNotification = async()=>{
    try {
      const res = await axios.get(`${serverURL}/api/notification/${currentUser._id}`, {
        withCredentials: true,
      });
      res.data.sort((a, b) =>  b.createAt - a.createAt);
      const newDataAfterSorting = res.data.sort((a, b) =>{
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB - dateA;
      } );
      console.log(newDataAfterSorting)
      setMyNotification(newDataAfterSorting);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
  useEffect(()=>{
    getNotification();
  },[])
  console.log(myNotification)
  return (
    <div>
        <div className='flex flex-col absolute top-6 left-[-8rem] bg-[rgb(252,252,252)] max-h-[50rem] p-4 rounded-lg w-[25rem] overflow-y-auto scrollbar z-50'>
                <div className='flex items-center justify-between'>
                        <span className='text-xl font-semibold'>Notifications</span>
                </div>
                <div className='flex gap-4 mt-2 items-center'>
                    <div className='font-medium p-1 border-b-2 border-ocean text-ocean cursor-pointer'>
                      View all
                    </div>
                    <div className='font-normal p-1 cursor-pointer'>
                      Mentions
                    </div>
                </div>
                {/* notification section */}
                <div className='mt-4 flex flex-col gap-y-4 w-full'>
                  {myNotification.map(noti=>{
                    const giver= users.find(u=>u._id === noti.giver);
                    // const myTask = tasks.find(task=> task?._id === noti?.taskId)
                    // console.log(myTask)
                    // console.log(giver)
                    return (
                      <div className='flex items-center gap-2 px-2 py-4 rounded-md hover:bg-gray-200 cursor-pointer' key={noti?._id}>
                      <img src={giver?.image} alt="" className='w-10 h-10 rounded-full'/>
                      <div className='flex flex-col text-sm w-full'>
                        <div>
                        <span className='font-medium'>{giver?.fullName}  </span>  
                        {noti.type === 'comment' && <span> commented on your task</span>}
                        {noti.type === 'mention' && <span> mentioned you</span>}
                        {noti.type === 'new task' && <span> assigned a new task to you</span>}
                        </div>
                       
                        <div className='flex justify-between text-xs font-light'>
                        <span>{format(new Date(noti.createAt), "EEEE hh:mm a")}</span>
                        <span>{format(new Date(noti.createAt), "MMM d, yyyy")}</span>
                        </div>
                       
                      </div>
                    </div>
                    );
                  })}
                  {/* See All */}
                  <div className='flex justify-center mb-2 mt-2'>
                    <button className='font-light text-ocean'>View all</button>
                  </div>
                </div>
        </div>
    </div>
  )
}

export default Notification