import React, { useEffect, useState } from 'react'
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";
import UserImg from "./../assets/user.jpg";
import { format } from "date-fns";
import { PlusIcon, DotsVerticalIcon, CalendarIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, fetchFailure, updateTasks } from "../features/task/taskSlice";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const Boards = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.task)
  const { users } = useSelector((store) => store.users);
  const {project} = useSelector((store)=> store.projectDetail)
  const tasksInProject = tasks.filter(task=>task.projectId === project._id);
  // sort the board based on the priority
  const toDo = tasksInProject.filter(t => t.category == "To Do");
  toDo.sort((a, b) => a.priority - b.priority);
  const inProgress = tasksInProject.filter(t => t.category == "In Progress");
  inProgress.sort((a, b) => a.priority - b.priority);
  const review = tasksInProject.filter(t => t.category == "Review");
  review.sort((a, b) => a.priority - b.priority);
  const done = tasksInProject.filter(t => t.category == "Done");
  done.sort((a, b) => a.priority - b.priority);
  //update task when user drop
  const updateTaskOnServer = async (task) => {
    try {
      await axios.patch(`http://localhost:8800/api/tasks/${task._id}`, task, { withCredentials: true });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Logic when user drag and drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    // Ignore the drag if the item is dropped outside of any droppable area
    if (!destination) {
      return;
    }

    // Ignore the drag if the item is dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a new array from the existing tasks
    const newTasks = [...tasks];

    // Find the dragged task
    const draggedTaskIndex = newTasks.findIndex((task) => task._id === draggableId);
    const draggedTask = newTasks[draggedTaskIndex];

    const start = source.droppableId;
    const finish = destination.droppableId;
    newTasks.splice(draggedTaskIndex, 1);
    // Create a shallow copy of the draggedTask and update the properties
    const updatedTask = {
      ...draggedTask,
      category: finish,
      priority: destination.index,
    };
    const tasksToUpdate = [];
    // if task is moved within the same category
    if (start === finish) {
      const removeTaskIndex = [];
      const filteredTasks = newTasks.filter(task => task.category === finish);
      filteredTasks.sort((a, b) => a.priority - b.priority);
      for (let i = Math.min(source.index, destination.index); i < Math.max(source.index, destination.index); i++) {
        removeTaskIndex.push(newTasks.findIndex((task) => task._id === filteredTasks[i]._id));
        const task = filteredTasks[i];
        if (filteredTasks[i].priority != i) {
          tasksToUpdate.push({
            ...task,
            priority: i,
          });
        }
        else tasksToUpdate.push({
          ...task,
          priority: i + 1,
        });
      }
      removeTaskIndex.sort((a, b) => b - a);
      removeTaskIndex.map(index => {
        newTasks.splice(index, 1)
      })
      newTasks.push(...tasksToUpdate);
      tasksToUpdate.push(updatedTask);
    } else {
      const removeTaskIndex = [];
      const filteredTasks = newTasks.filter(task => task.category === finish);
      filteredTasks.sort((a, b) => a.priority - b.priority);
      for(let i=destination.index;i<filteredTasks.length;i++){
        removeTaskIndex.push(newTasks.findIndex((task) => task._id === filteredTasks[i]._id));
        const task = filteredTasks[i];
        tasksToUpdate.push({
          ...task,
          priority: i + 1,
      })
      
    }
    // in source, we need to update the tasks with the priority 
    const filteredTasksSource = newTasks.filter(task => task.category === start);
    filteredTasksSource.sort((a, b) => a.priority - b.priority);
    for(let i=0;i<filteredTasksSource.length;i++){
      removeTaskIndex.push(newTasks.findIndex((task) => task._id === filteredTasksSource[i]._id));
      const task = filteredTasksSource[i];
      tasksToUpdate.push({
        ...task,
        priority: i,
    })
    }
    removeTaskIndex.sort((a, b) => b - a);
      removeTaskIndex.map(index => {
        newTasks.splice(index, 1)
      })
      newTasks.push(...tasksToUpdate);
      tasksToUpdate.push(updatedTask);
  }
    // Insert the updatedTask at the destination position
    newTasks.splice(destination.index, 0, updatedTask);
    tasksToUpdate.forEach(async (task) => {
      await updateTaskOnServer(task);
    });
    // Dispatch the updateTasks action to update the tasks in the Redux store
    dispatch(updateTasks(newTasks));
  };

  return (
    <>
      <Status />
      <ProjectsTab />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=' h-screen mt-4 px-2 pt-4 overflow-y-scroll scrollbar'>
          <div className='flex justify-between items-stretch gap-4'>
            <Droppable droppableId='To Do'>
              {
                (provided) => (
                  <div className={`bg-orange-100 px-3 rounded-3xl pb-4 w-1/4`} ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='flex space-x-2 items-center mt-6'>
                      <p className='w-4 h-4 rounded-md bg-accent'></p>
                      <span className='text-lg font-medium text-accent'>To do</span>
                      <PlusIcon className='w-6 h-6 text-accent' />
                    </div>
                    {/* each task */}
                    <div className='flex flex-col space-y-4 mt-6 '>
                      {toDo.map((item, index) => {
                        const { title, endDate, userId, _id } = item;
                        let taskOfUser = userId.flatMap(id => {
                          return users.find(user=>user._id === id)
                        });
                        console.log(taskOfUser)
                        return (
                          <Draggable draggableId={_id} index={index} key={_id}>
                            {
                              (provided,snapshot) => (
                                <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={{
                                  ...provided.draggableProps.style,
                                  boxShadow: snapshot.isDragging ? '0px 2px 10px rgba(0, 0, 0, 0.2)' : '',
                                }}>
                                  <div className='flex justify-between items-center'>
                                    <h5 className='font-medium text-lg capitalize'>{title}</h5>
                                    <DotsVerticalIcon className='w-6 h-6' />
                                  </div>
                                  <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                                  <div className='flex justify-between items-center'>
                                    <div className='flex items-center space-x-2'>
                                      <CalendarIcon className='w-6 h-6 text-gray-400' />
                                      <span className='text-gray-400'>{format(new Date(endDate), 'MM/dd/yyyy')}</span>
                                    </div>
                                    <div className='flex'>
                                    {taskOfUser.map((item,index)=>{
                                      return (
                                        <img src={item?.image} title={item?.fullName} alt="" className={`w-8 h-8 rounded-full cursor-pointer`} />
                                      );
                                    })}
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </Draggable>

                        )
                      })}
                    </div>
                    {provided.placeholder}
                  </div>)
              }

            </Droppable>
            <Droppable droppableId='In Progress'>
              {
                (provided) => (
                  <div className='bg-yellow-100 px-3 rounded-3xl pb-4 w-1/4' ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='flex space-x-2 items-center mt-6'>
                      <p className='w-4 h-4 rounded-md bg-sun'></p>
                      <span className='text-lg font-medium text-sun'>In Progress</span>
                      <PlusIcon className='w-6 h-6 text-sun' />
                    </div>
                    {/* each task */}
                    <div className='flex flex-col space-y-4 mt-6 '>
                      {
                        inProgress.map((item, index) => {
                          const { title, endDate, userId, _id } = item;
                          let taskOfUser = userId.flatMap(id => {
                            return users.find(user=>user._id === id)
                          });
                          return (
                            <Draggable draggableId={_id} index={index} key={_id}>
                              {
                                (provided) => (
                                  <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                    <div className='flex justify-between items-center'>
                                      <h5 className='font-medium text-lg capitalize'>{title}</h5>
                                      <DotsVerticalIcon className='w-6 h-6' />
                                    </div>
                                    <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                                    <div className='flex justify-between items-center'>
                                      <div className='flex items-center space-x-2'>
                                        <CalendarIcon className='w-6 h-6 text-gray-400' />
                                        <span className='text-gray-400'>{format(new Date(endDate), 'MM/dd/yyyy')}</span>
                                      </div>
                                      <div className='flex'>
                                    {taskOfUser.map((item,index)=>{
                                      return (
                                        <img src={item?.image} title={item?.fullName} alt="" className={`w-8 h-8 rounded-full cursor-pointer`} />
                                      );
                                    })}
                                    </div>
                                    </div>
                                  </div>
                                )
                              }
                            </Draggable>

                          )
                        })
                      }
                    </div>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>

            <Droppable droppableId='Review'>
              {
                (provided) => (
                  <div className='bg-sky-100 px-3 rounded-3xl pb-4 w-1/4' ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='flex space-x-2 items-center mt-6'>
                      <p className='w-4 h-4 rounded-md bg-pool'></p>
                      <span className='text-lg font-medium text-pool'>Review</span>
                      <PlusIcon className='w-6 h-6 text-pool' />
                    </div>
                    {/* each task */}
                    <div className='flex flex-col space-y-4 mt-6 '>
                      {
                        review.map((item, index) => {
                          const { title, endDate, userId, _id } = item;
                          let taskOfUser = userId.flatMap(id => {
                            return users.find(user=>user._id === id)
                          });
                          return (
                            <Draggable draggableId={_id} index={index} key={_id}>
                              {
                                (provided,snapshot) => (
                                  <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={{
                                    ...provided.draggableProps.style,
                                    boxShadow: snapshot.isDragging ? '0px 2px 10px rgba(0, 0, 0, 0.2)' : '',
                                  }}>
                                    <div className='flex justify-between items-center'>
                                      <h5 className='font-medium text-lg capitalize'>{title}</h5>
                                      <DotsVerticalIcon className='w-6 h-6' />
                                    </div>
                                    <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                                    <div className='flex justify-between items-center'>
                                      <div className='flex items-center space-x-2'>
                                        <CalendarIcon className='w-6 h-6 text-gray-400' />
                                        <span className='text-gray-400'>{format(new Date(endDate), 'MM/dd/yyyy')}</span>
                                      </div>
                                      <div className='flex'>
                                    {taskOfUser.map((item,index)=>{
                                      return (
                                        <img src={item?.image} title={item?.fullName} alt="" className={`w-8 h-8 rounded-full cursor-pointer`} />
                                      );
                                    })}
                                    </div>
                                    </div>
                                  </div>
                                )
                              }
                            </Draggable>
                          );
                        })
                      }
                    </div>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
            <Droppable droppableId='Done'>
              {
                (provided) => (
                  <div className='bg-green-100 px-3 rounded-3xl pb-4 w-1/4' ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='flex space-x-2 items-center mt-6'>
                      <p className='w-4 h-4 rounded-md bg-done'></p>
                      <span className='text-lg font-medium text-done'>Done</span>
                      <PlusIcon className='w-6 h-6 text-done' />
                    </div>
                    {/* each task */}
                    <div className='flex flex-col space-y-4 mt-6 '>
                      {done.map((item, index) => {
                        const { title, endDate, userId, _id } = item;
                        let taskOfUser = userId.flatMap(id => {
                          return users.find(user=>user._id === id)
                        });
                        return (
                          <Draggable draggableId={_id} index={index} key={_id}>
                            {
                              (provided,snapshot) => (
                                <div className='bg-white flex flex-col space-y-2 p-4 rounded-xl' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} style={{
                                  ...provided.draggableProps.style,
                                  boxShadow: snapshot.isDragging ? '0px 2px 10px rgba(0, 0, 0, 0.2)' : '',
                                }}>
                                  <div className='flex justify-between items-center'>
                                    <h5 className='font-medium text-lg capitalize'>{title}</h5>
                                    <DotsVerticalIcon className='w-6 h-6' />
                                  </div>
                                  <p className='text-sm w-56 h-16 pr-8 text-ellipsis--3'>Determination of the general goals and objectives of the company. Determination of target values of many products from now on to many others later</p>
                                  <div className='flex justify-between items-center'>
                                    <div className='flex items-center space-x-2'>
                                      <CalendarIcon className='w-6 h-6 text-gray-400' />
                                      <span className='text-gray-400'>{format(new Date(endDate), 'MM/dd/yyyy')}</span>
                                    </div>
                                    <div className='flex'>
                                    {taskOfUser.map((item,index)=>{
                                      return (
                                        <img src={item?.image} title={item?.fullName} alt="" className={`w-8 h-8 rounded-full cursor-pointer`} />
                                      );
                                    })}
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </Draggable>
                        )
                      })}
                    </div>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </>
  )
}

export default Boards