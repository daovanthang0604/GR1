import React, { useState,useEffect, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { categories } from "../data";
import { fetchSuccess, fetchFailure } from "../features/task/taskSlice";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createTheme } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import {toast} from "react-hot-toast"
import emailjs from '@emailjs/browser';
const CreateTaskModal = () => {
  const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;
  const modalId = 'createTaskModal';
  const form = useRef();
  const dispatch = useDispatch();
  const { projects } = useSelector((store) => store.project);
  const { tasks } = useSelector((store) => store.task)
  const [title, setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [projectId,setProjectId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [userId,setUserId] = useState([]);
  const [users,setUsers] = useState('');
  const { currentUser } = useSelector((store) => store.user);
  // get the member of the project so that we only assign to the member of that projecct
  const project = projects.find(p => p._id === projectId);
  const usersInProject = project?.members.flatMap(p=>{
    return users.filter(user=> user._id === p)
  }) || '';
  console.log(usersInProject)
  //render all users
  const getAllUsers = async()=>{
    const res = await axios.get(`${serverURL}/api/users/`, { withCredentials: true });
    await setUsers(res.data);
  }
  const getAllTasks = async()=>{
    try {
      const res = await axios.get(`${serverURL}/api/tasks/`, { withCredentials: true });
      dispatch(fetchSuccess(res.data))  
    } catch (error) {
      dispatch(fetchFailure())      
    }
  }
  const createNotification = async(notification)=>{
    try {
      await axios.post(`${serverURL}/api/notification`, notification, { withCredentials: true });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
  useEffect(() => {
    getAllUsers()
  }, []);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const tasksInProject = tasks.filter(task=>task.projectId === project._id);
    const taskType = tasksInProject.filter(t => t.category === category);
    const priority = taskType.length;
    console.log(taskType.length)
    try {
      const res = await axios.post(
        `${serverURL}/api/tasks`,
        {
          title,
          category,
          projectId,
          startDate,
          endDate,
          description,
          userId,
          priority
        },
        { withCredentials: true }
      );
      // console.log(form.current)
      userId.forEach(uId=>{
        const member = users.find(user=> user._id === uId);
        const templateParams = {
          title: title,
          project: project.name,
          description: description,
          member: member.email 
      };
      emailjs.send('service_s2xj7d1', 'template_urpi7zr', templateParams, 's8Y1Wa4KaD86XYQGe')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      })
      await getAllTasks();
      //new notification
      const newNotification = {
        recipient: userId,
        giver: currentUser._id,
        type: "new task",
      }
      console.log(newNotification)
      await createNotification(newNotification);
      dispatch(closeModal({ modalId: "createTaskModal" }));
      toast.success("Create task succesfully!");
    } catch (err) {
      console.log(err);
    }
  }

  // create theme for mui calendar
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1d5cfc'
      }
    },
  })

  const addMember = (value) =>{
    const v = value.map(val => val._id);
    setUserId(v);
  }
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white lg:w-1/3 w-96 rounded-md">
      <form className="flex flex-col p-8 space-y-4 mb-4" ref={form}>
        {/* modal title */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Create a new task</span>
          <XIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(closeModal({ modalId: "createTaskModal" }))}
          />
        </div>
        {/* Task name */}
        <div className="flex flex-col w-full space-y-2">
          <span className="font-medium">Title</span>
          <div className="flex items-center">
            <input
              type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} value={title}
              className="outline-none border-b border-slate-200 focus:border-b focus:border-ocean w-full pr-4"
            />
            {title && <XIcon className="w-3 h-3 absolute right-[1.875rem] cursor-pointer" onClick={() => setTitle('')} />}
          </div>
        </div>
        <div className={`flex flex-col w-full space-y-2`}>
          <span className="font-medium">Choose Type</span>
          <Autocomplete
            disablePortal
            id="category"
            options={categories}
            getOptionLabel={(option) => option.name || ""}
            onChange={(e,v)=>{ console.log(v); setCategory(v.name)}}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1d5cfc"
                }
              }
            }}
            renderInput={(params) => <TextField {...params} label="type" />}
          />
        </div>
        <div className={`flex flex-col w-full space-y-2`}>
          <span className="font-medium">Choose Project</span>
          <Autocomplete
            disablePortal
            id="project"
            options={projects}
            getOptionLabel={(option) => option.name || ""}
            onChange={(e,v)=>setProjectId(v._id)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1d5cfc"
                }
              }
            }}
            renderInput={(params) => <TextField {...params} label="project" name="project"/>}
          />
        </div>
        {/* pick start and end time for task */}
        <div className="flex flex-col space-y-2">
          <span className="font-medium">Estimate time</span>
          <div className="flex items-center justify-between">
            <span className="">Start time</span>
            <ThemeProvider theme={theme}> <KeyboardDatePicker
              disableToolbar
              InputAdornmentProps={{ position: "end" }}
              value={startDate}
              onChange={setStartDate}
              label="Select date"
              inputVariant="outlined"
              format="MM/dd/yyyy"
            /></ThemeProvider>
          </div>
          <div className="flex items-center justify-between">
            <span className="">End time</span>
            <ThemeProvider theme={theme}> <KeyboardDatePicker
              disableToolbar
              InputAdornmentProps={{ position: "end" }}
              value={endDate}
              onChange={setEndDate}
              label="Select date"
              inputVariant="outlined"
              format="MM/dd/yyyy"
            /></ThemeProvider>
          </div>
        </div>
        <div>
          <span className="font-medium">Description</span>
          <textarea
            name="description"
            id="description"
            className="w-full h-24 outline-none border-2 border-gray-200 focus:border-ocean rounded-md p-2"
            onChange={(e)=>setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* assign to member */}
        <div className="flex flex-col">
          <span className="font-medium">Assign to</span>
          <Autocomplete
            multiple
            id="user"
            options={usersInProject || []}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1d5cfc"
                }
              }
            }}
            getOptionLabel={(option) => option.fullName || ""}
            onChange={(event, value) => addMember(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Member"
                name="member"
                placeholder="Search member"
              />
            )}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="w-full bg-slate-200 rounded-lg p-2 text-white hover:bg-ocean" onClick={handleSubmit}>
            Create task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
