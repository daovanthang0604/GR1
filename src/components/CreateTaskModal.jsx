import React, { useState,useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { projects,categories } from "../data";
import { fetchSuccess, fetchFailure } from "../features/task/taskSlice";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createTheme } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import {toast} from "react-hot-toast"
const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [projectId,setProjectId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [userId,setUserId] = useState('');
  const [users,setUsers] = useState(null);
  
  //render all users
  const getAllUsers = async()=>{
    const res = await axios.get("http://localhost:8800/api/users/", { withCredentials: true });
    await setUsers(res.data);
  }
  const getAllTasks = async()=>{
    try {
      const res = await axios.get("http://localhost:8800/api/tasks/", { withCredentials: true });
      dispatch(fetchSuccess(res.data))  
    } catch (error) {
      dispatch(fetchFailure())      
    }
  }
  useEffect(() => {
    getAllUsers()
  }, []);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log( title,
      projectId,
      startDate,
      endDate,
      description,
      userId);
    try {
      const res = await axios.post(
        "http://localhost:8800/api/tasks",
        {
          title,
          category,
          projectId,
          startDate,
          endDate,
          description,
          userId
        },
        { withCredentials: true }
      );
      await getAllTasks();
      dispatch(closeModal())
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
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white lg:w-1/3 w-96 rounded-md">
      <form className="flex flex-col p-8 space-y-4 mb-4">
        {/* modal title */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Create a new task</span>
          <XIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(closeModal())}
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
            onChange={(e,v)=>setProjectId(v.name)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1d5cfc"
                }
              }
            }}
            renderInput={(params) => <TextField {...params} label="project" />}
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
            disablePortal
            id="user"
            options={users}
            getOptionLabel={(option) => option.fullName || ""}
            onChange={(event, value) => setUserId(value._id)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1d5cfc"
                }
              }
            }}
            renderInput={(params) => <TextField {...params} label="Search member" />}
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
