import React, { useState } from "react";
import axios from "axios";
import { jobs } from "../../data";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/user/userSlice";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon } from "@heroicons/react/outline";
const Register = () => {
  const serverURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [job,setJob] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(
        `${serverURL}/api/auth/register`,
        {
          fullName,
          email,
          password,
          job
        },
        { withCredentials: true }
      );
      navigate("/main");
      toast.success("Registered succesfully!");
    }catch(err){
      console.log("Register failed! ",err);
      toast.error("You are not authorized!");
    }
  };
  return (
    <div className="flex flex-col  space-y-4">
      <Link to="/main"><ArrowLeftIcon className="w-6 h-6 hover:text-ocean cursor-pointer"/></Link>
      <h3 className="text-3xl font-semibold">Register (Only for Admin)</h3>
      <p className="font-medium">Fill out the information below</p>
      <form>
        <div className="mb-8 relative">
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            onChange={(e)=>setFullName(e.target.value)}
            className="peer py-3 px-6 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean"
          />
          <label
            htmlFor="fullName"
            className="block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-6"
          >
            Full Name
          </label>
        </div>
        <div className="mb-8 relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}
            className="peer py-3 px-6 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean"
          />
          <label
            htmlFor="email"
            className="block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-6"
          >
            Email Address
          </label>
        </div>
        <div className="mb-8 relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            className="peer py-3 px-6 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean"
          />
          <label
            htmlFor="password"
            className="block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-6"
          >
            Password
          </label>
        </div>
        <Autocomplete
          disablePortal
          id="job"
          options={jobs}
          onChange={(e,v)=>setJob(v)}
          // getOptionLabel={(option) => option.name || ""}
          sx={{
            width: "66.7%",
            borderRadius: "0.375rem",
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "#1d5cfc",
              },
            },
          }}
          renderInput={(params) => (
            <TextField {...params} label="Choose jobs" />
          )}
        />
        {/* <div className="mt-4">
          <label htmlFor="image" className="block">
            Select image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="cursor-pointer"
            onChange={handleImage}
          />
        </div> */}
        <button
          type="submit"
          className="mt-4 px-10 py-2 text-lg bg-ocean rounded-lg text-white hover:text-tertiary"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
