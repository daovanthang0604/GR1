import React, { useState, useEffect } from 'react'
import Barchart from '../components/dashboard/Barchart'
import { useSelector, useDispatch } from 'react-redux';
import { setTask } from '../features/task/taskDetailSlice';
import { openModal } from '../features/modal/modalSlice';
import { fetchSuccess, fetchFailure } from "../features/task/taskSlice";
import axios from 'axios';
import { PencilIcon, CodeIcon, DesktopComputerIcon, CheckIcon, PresentationChartLineIcon } from '@heroicons/react/outline';
const Dashboard = () => {
    const serverURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_SERVER_URL
      : process.env.REACT_APP_PROD_SERVER_URL;
    const dispatch = useDispatch();
    const getAllTasks = async()=>{
        try {
          const res = await axios.get(`${serverURL}/api/tasks/`, { withCredentials: true });
          dispatch(fetchSuccess(res.data))  
        } catch (error) {
          dispatch(fetchFailure())      
        }
      }
      useEffect(() => {
        getAllTasks();
      }, []);
    const { projects } = useSelector((store) => store.project);
    const { tasks } = useSelector((store) => store.task);
    const firstSelectedTask = tasks.filter(task=>task.projectId === projects[0]?._id)
    console.log(firstSelectedTask)
    const firstTodo = firstSelectedTask.filter(t => t.category === "To Do");
    const firstInProgress = firstSelectedTask.filter(t => t.category === "In Progress");
    const firstReview = firstSelectedTask.filter(t => t.category === "Review");
    const firstDone = firstSelectedTask.filter(t => t.category === "Done");
    const [stats, setStats] = useState();
    const [toDo,setToDo] = useState(firstTodo.length);
    const [inProgress, setInProgress] = useState(firstInProgress.length);
    const [review, setReview] = useState(firstReview.length);
    const [done, setDone] = useState(firstDone.length);
    // today task
    const { currentUser } = useSelector((store) => store.user);
    const currentUserTask = tasks.filter(task=> task?.userId.includes(currentUser._id))
    //only filter out the to do and in progress task
    const todayCurrentUserTask = currentUserTask.filter(task=> task?.category === "In Progress");
    console.log(todayCurrentUserTask)
    // activity
    const [activity, setActivity] = useState();
    const [selectedActivityProject, setSelectedActivityProject] = useState(projects[0]);
    const handleChangeActivity = (e) => {
        setActivity(e.target.value)
        const selectedProject = projects.find(project=> project?.name === e.target.value);
        setSelectedActivityProject(selectedProject)
    }
    const handleChangeStats = (e) =>{
        setStats(e.target.value)
        const selectedProject = projects.find(project=> project?.name === e.target.value);
        console.log(selectedProject)
        const tasksInProject = tasks.filter(task=>task.projectId === selectedProject._id);
        console.log(tasksInProject)
        // sort the board based on the priority
        const toDoTask = tasksInProject.filter(t => t.category === "To Do");
        setToDo(toDoTask.length);
        const inProgressTask = tasksInProject.filter(t => t.category === "In Progress");
        setInProgress(inProgressTask.length)
        const reviewTask = tasksInProject.filter(t => t.category === "Review");
        setReview(reviewTask.length)
        const doneTask = tasksInProject.filter(t => t.category === "Done");
        setDone(doneTask.length)
    }
    return (
        <div className='mt-4 overflow-x-auto scrollbar'>
            <div className='flex flex-col gap-2 h-[650px] xl:h-[700px] 2xl:h-[750px]'>
                <div className='flex gap-2'>
                    <div className='w-[60%] bg-[#0A4D68] rounded-3xl p-8 relative'>
                        <Barchart selectedActivityProject={selectedActivityProject}/>
                        <div className='absolute top-8 right-8'>
                            <select value={activity} onChange={handleChangeActivity} className='bg-[#106c90] text-pool p-2 rounded-xl'>
                            {projects.map(project=>{
                                return (
                                    <option value={project?.name}>{project?.name}</option>
                                )
                            })}
                            </select>
                        </div>
                    </div>
                    <div className='bg-[#088395] rounded-3xl p-8 flex flex-col w-full relative'>
                        <span className='text-pool text-2xl'>Meeting(Coming soon)</span>
                        <span className='text-white text-sm xl:text-base'>You have 1 meeting today at 3.00pm</span>
                        <div className='cursor-pointer absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] rounded-full p-8 w-12 h-12 lg:w-24 lg:h-24 xl:w-36 xl:h-36 bg-[#05BFDB] text-[#106c90]'>
                            <div className='flex justify-center items-center w-full h-full'>
                                <div className='font-bold text-base xl:text-lg text-center'>Join meet!</div>

                            </div>
                        </div>
                        <span className='absolute right-8 bottom-8 text-pool'> <span className='text-4xl'>7</span> participants</span>
                    </div>
                </div>
                <div className='magazina grow flex gap-2'>
                    <div className='bg-[#088395] w-[30%] rounded-3xl p-8 grow'>
                        <div className='text-pool font-bold text-2xl'>
                            Today Task
                        </div>
                        <div className='flex flex-col justify-center space-y-2 mt-4'>
                            {todayCurrentUserTask.map(task=>{
                                return (
                                    <div className='flex space-x-4 cursor-pointer'  onClick={() => {
                                        dispatch(
                                          openModal({ modalId: "taskDetails" })
                                        );
                                        dispatch(setTask(task));
                                      }}> 
                                    <PencilIcon className='w-4 h-4 rounded-full' />
                                    <span>{task.title}</span>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-[70%] rounded-3xl p-8 grow relative bg-[#0A4D68]'>
                        <div className='text-pool text-2xl'>
                            Stats
                        </div>
                        <div className='absolute top-8 right-8'>
                            <select value={stats} onChange={handleChangeStats} className='bg-[#106c90] text-pool p-2 rounded-xl'>
                            {projects.map(project=>{
                                return (
                                    <option value={project?.name}>{project?.name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className='flex gap-6 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'>
                            <div className='flex flex-col rounded-3xl p-4 relative w-12 h-12 lg:w-24 lg:h-24  xl:w-36 xl:h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                                <CodeIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-xs lg:text-xl xl:text-3xl font-semibold text-[#106c90]'>{toDo}</span>
                                <span className='text-[#106c90] text-xs lg:text-sm xl:text-base'>To Do</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-12 h-12 lg:w-24 lg:h-24  xl:w-36 xl:h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                            <PresentationChartLineIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-xs lg:text-xl xl:text-3xl font-semibold text-[#106c90]'>{inProgress}</span>
                                <span className='text-[#106c90] text-xs lg:text-sm xl:text-base'>In Progress</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-12 h-12 lg:w-24 lg:h-24  xl:w-36 xl:h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                            <DesktopComputerIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-xs lg:text-xl xl:text-3xl font-semibold text-[#106c90]'>{review}</span>
                                <span className='text-[#106c90] text-xs lg:text-sm xl:text-base'>Review</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-12 h-12 lg:w-24 lg:h-24  xl:w-36 xl:h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                               <CheckIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-xs lg:text-xl xl:text-3xl font-semibold text-[#106c90]'>{done}</span>
                                <span className='text-[#106c90] text-xs lg:text-sm xl:text-base'>Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard