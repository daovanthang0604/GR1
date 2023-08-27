import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { closeModal } from '../features/modal/modalSlice'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createTheme } from "@material-ui/core";
import { fetchSuccess, fetchFailure } from '../features/project/projectSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const CreateProjectModal = () => {
  const serverURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_SERVER_URL
      : process.env.REACT_APP_PROD_SERVER_URL;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();
  // create theme for mui calendar
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1d5cfc'
      }
    },
  })
  const getAllProject = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/projects/`, {
        withCredentials: true,
      });
      dispatch(fetchSuccess(res.data));
    } catch (error) {
      dispatch(fetchFailure());
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, description, startDate, endDate)
    try {
      const res = await axios.post(`${serverURL}/api/projects`, {
        name,
        description,
        startDate,
        endDate,
        status: "Active"
      },
        { withCredentials: true })
        dispatch(closeModal({ modalId: "project" }));
        await getAllProject();
      toast.success("Create project succesfully!");
    } catch (err) {
      console.log(err);
      toast.error('Failed to create new project!');
    }
  }
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white max-h-[85%] lg:w-2/5 rounded-md">
      <form className='flex flex-col p-8 gap-4'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-semibold'>Create new project</span>
          <XIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(closeModal({ modalId: "project" }))}
          />
        </div>
        {/* project information */}
        <div className="flex flex-col w-full space-y-2">
          <span className="font-medium">Project Name</span>
          <div className="flex items-center">
            <input
              type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name}
              className="outline-none border-b border-slate-200 focus:border-b focus:border-ocean w-full pr-4"
            />
            {name && <XIcon className="w-3 h-3 absolute right-[1.875rem] cursor-pointer" onClick={() => setName('')} />}
          </div>
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
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`w-full rounded-lg p-2 text-white bg-ocean cursor-pointer ${(!name || !startDate || !endDate || !description) ? 'bg-slate-200 cursor-not-allowed' : ''}`}
            disabled={!name || !startDate || !endDate || !description}
            onClick={handleSubmit}
          >
            Create project
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectModal