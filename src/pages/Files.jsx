import React, { useState, useEffect } from "react";
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import {
  fetchFilesSuccess,
  fetchFilesFailure,
} from "../features/file/filesSlice";
import { format } from "date-fns";
import axios from "axios";
import {
  DocumentTextIcon,
  PhotographIcon,
  ArchiveIcon,
  VideoCameraIcon,
  PlusSmIcon,
  ViewGridIcon,
  SwitchVerticalIcon
} from "@heroicons/react/outline";
const Files = () => {
  const { project } = useSelector((store) => store.projectDetail);
  const { files, newUpdate } = useSelector((store) => store.files);
  const dispatch = useDispatch();
  const [nameIncrease, setNameIncrease] = useState(false);
  const [modifiedTime, setModifiedTime] = useState(true);
  const getAllFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/upload/", {
        withCredentials: true,
      });
      dispatch(fetchFilesSuccess(res.data));
    } catch (error) {
      dispatch(fetchFilesFailure());
    }
  };
  useEffect(() => {
    getAllFiles();
  }, [newUpdate]);
  const filesInProject = files.filter((file) => file.projectId === project?._id);
//   filesInProject.sort((a, b) => {
//     const dateA = new Date(a.uploadTime);
//     const dateB = new Date(b.uploadTime);
//     return dateB - dateA;
//   });
    const orderByName = (nameIncrease) =>{
        setNameIncrease((prevNameIncrease) => !prevNameIncrease);
        if(nameIncrease === false) filesInProject.sort((a, b) => a.fileName.localeCompare(b.fileName));
        else filesInProject.sort((a, b) => b.fileName.localeCompare(a.fileName));
    }
      
        if(modifiedTime === true){
            filesInProject.sort((a, b) => {
                const dateA = new Date(a.uploadTime);
                const dateB = new Date(b.uploadTime);
                return dateB - dateA;
              });
          }
          else filesInProject.sort((a, b) => {
            const dateA = new Date(a.uploadTime);
            const dateB = new Date(b.uploadTime);
            return dateA - dateB;
          });
    
    // useEffect(()=>{
    //     orderByTime();
    //     console.log(modifiedTime)
    // },[modifiedTime])
  return (
    <>
      <Status />
      <ProjectsTab />
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <span className="flex font-semibold items-center gap-1">
            <ViewGridIcon className="w-6 h-6" />
            Overview Files
          </span>
          <button
            className="flex items-center mr-12 bg-ocean py-2 px-4 text-white rounded-md gap-2"
            onClick={() => dispatch(openModal({ modalId: "uploadFiles" }))}
          >
            <PlusSmIcon className="w-4 h-4" />
            Upload
          </button>
        </div>
        <div className="font-bold text-xl mt-4">Folders</div>
        <div className="flex items-center justify-around mt-4">
          <div className="flex gap-2 p-4 bg-yellow-100 rounded-lg w-48 items-center">
            <DocumentTextIcon className="w-12 h-12 rounded-lg bg-sun p-2 text-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Document</span>
              <span className="text-gray-400 font-light">102 Files</span>
            </div>
          </div>
          <div className="flex gap-2 p-4 bg-orange-100 rounded-lg w-48 items-center">
            <PhotographIcon className="w-12 h-12 rounded-lg bg-accent p-2 text-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Pictures</span>
              <span className="text-gray-400 font-light">22 Files</span>
            </div>
          </div>
          <div className="flex gap-2 p-4 bg-green-100 rounded-lg w-48 items-center">
            <VideoCameraIcon className="w-12 h-12 rounded-lg bg-done p-2 text-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Videos</span>
              <span className="text-gray-400 font-light">12 Files</span>
            </div>
          </div>
          <div className="flex gap-2 p-4 bg-sky-100 rounded-lg w-48 items-center">
            <ArchiveIcon className="w-12 h-12 rounded-lg bg-pool p-2 text-white" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Others</span>
              <span className="text-gray-400 font-light">5 Files</span>
            </div>
          </div>
        </div>
        <div className="font-bold text-xl mt-8">Recent files</div>
        <div className="grid files-grid mt-2 content-center items-center justify-between">
          <div className="flex items-center gap-2 font-light">
            Name
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer" onClick={orderByName}/>
          </div>
          <div className="flex items-center gap-2 font-light translate-x-[-5px]">
            Size
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 font-light  translate-x-[-10px]">
            Shared
          </div>
          <div className="flex items-center gap-2 font-light  translate-x-[-15px]">
            Last Modified
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer" onClick={()=>setModifiedTime(!modifiedTime)}/>
          </div>
          <hr className="col-span-4 mt-4 text-neutral-400" />
        </div>
        <div className="container overflow-y-auto max-h-[320px] scrollbar pb-4">
        <div className="grid files-grid content-center items-center justify-between gap-y-4">
          {filesInProject.map((file) => {
            return (
              <>
                <div className="flex items-center space-x-1">
                {file.type.includes('pdf') && (<DocumentTextIcon className="w-4 h-4"/>)}
                {file.type.includes('image') && <PhotographIcon className="w-4 h-4"/>}
                {file.type.includes('sheet') && (<DocumentTextIcon className="w-4 h-4"/>)}
                  <a href={file.link} target="_blank" rel="noopener noreferrer">
                     {file.fileName}
                  </a>
                </div>
                <div>{Math.round((file.size / 1000000) * 100) / 100} MB</div>
                <div>Me</div>
                <div>
                  {format(new Date(file.uploadTime), "MM/dd/yyyy - HH:mm")}
                </div>
              </>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Files;
