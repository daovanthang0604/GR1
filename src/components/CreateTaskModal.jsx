import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { KeyboardDatePicker } from "@material-ui/pickers";
const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate);
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
              type="text"
              className="outline-none border-b border-slate-200 focus:border-b focus:border-ocean w-full pr-4"
            />
            <XIcon className="w-3 h-3 absolute right-7" />
          </div>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <span className="font-medium">Choose Project</span>
          <input
            type="text"
            className="outline-none border border-slate-200 focus:border-ocean rounded-md p-2"
          />
        </div>
        {/* pick start and end time for task */}
        <div className="flex flex-col">
          <span className="font-medium">Estimate time</span>
          <div className="flex items-center justify-between">
            <span className="">Start time</span>
            <KeyboardDatePicker
              disableToolbar
              InputAdornmentProps={{ position: "end" }}
              value={startDate}
              onChange={setStartDate}
              label="Select date"
              inputVariant="outlined"
              format="MM/dd/yyyy"
            />
          </div>
        </div>
        <div>
          <span className="font-medium">Description</span>
          <textarea
            name="description"
            id="description"
            className="w-full h-24 outline-none border-2 border-slate-200 focus:border-ocean rounded-md p-2"
          ></textarea>
        </div>
        {/* assign to member */}
        <div className="flex flex-col">
          <span className="font-medium">Assign to</span>
          <input
            type="text"
            className="outline-none border border-slate-200 focus:border-ocean rounded-md p-2"
            placeholder="Search member"
          />
        </div>

        <div className="text-center">
          <button className="w-full bg-slate-200 rounded-lg p-2 text-white hover:bg-ocean">
            Create task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
