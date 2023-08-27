import React, {useState} from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import User1 from "./../assets/Users/1.jpg";
import { toast } from "react-hot-toast";
import { fetchSuccess, fetchFailure } from "../features/project/projectSlice";
import axios from "axios";
const AddMember = () => {
  const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);
  const {project} = useSelector((store)=> store.projectDetail);
  const {membersInProject} = useSelector((store)=> store.projectDetail);
  const membersNotInProject = users.filter(user => !membersInProject.some(member => member._id === user._id));
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
  const [userId,setUserId] = useState([]);
  const addMember = (value) =>{
    const v = value.map(val => val._id);
    setUserId(v);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/api/projects/${project._id}/members`,{
        userId
      },{
        withCredentials: true,
      })
      dispatch(closeModal({ modalId: "addMember" }))
      await getAllProject();
      toast.success('Succesfully add member!');
    } catch (error) {
      console.log(error);
      toast.error("Failed to add member!");
    }
  }
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white max-h-[80%] lg:w-1/3 w-96 rounded-md">
      <div className="flex flex-col pt-4 pb-10 px-8 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Add Member</span>
          <XCircleIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => dispatch(closeModal({ modalId: "addMember" }))}
          />
        </div>
        <hr className="text-gray-300" />
        <form className="flex w-full items-end gap-4">
          <Autocomplete
            multiple
            id="tags-standard"
            options={membersNotInProject}
            sx={{ width: "100%" }}
            getOptionLabel={(option) => option.email}
            onChange={(event, value) => addMember(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Email"
                placeholder="Add Member"
              />
            )}
          />
          <button className="text-white py-2 px-4 bg-ocean rounded-lg" onClick={handleSubmit}>
            Add
          </button>
        </form>
        <div className="flex flex-col">
          <span className="text-gray-400 mt-4">Members ({membersInProject.length})</span>
          <div className="mt-4">
            <div className="flex flex-col space-y-2 overflow-y-auto scrollbar">
                {membersInProject.map(member=>{
                    return(
                        <div className="flex items-center justify-between">
                        <div className="flex items-center  gap-2">
                          <img src={member.image} alt="" className="w-10 h-10 rounded-full" />
                          <div className="flex flex-col">
                            <span className="text-md font-medium">{member.fullName}</span>
                            <span className="text-sm font-light text-gray-400">
                              {member.email}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 bg-gray-100 ${member.job === 'Developer' && 'text-sun'} ${member.job === 'Tester' && 'text-green-400'} ${member.job === 'UI Designer' && 'text-pool'} ${member.job === 'UX Designer' && 'text-violet-400'}    rounded-md`}>
                          {member.job}
                        </span>
                      </div>
                    )
                })}
            
            </div>
          </div>
        </div>
        <hr className="text-gray-300 mb-20"/>
      </div>
    </div>
  );
};

export default AddMember;
