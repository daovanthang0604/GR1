import React from 'react'
import {
    DocumentTextIcon,
    PhotographIcon,
    ArchiveIcon,
    VideoCameraIcon,
    PlusSmIcon,
    ViewGridIcon,
    SwitchVerticalIcon,
    PencilIcon,
    DotsVerticalIcon,
    XIcon
  } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { format } from "date-fns";
const Folder = () => {
    const { users } = useSelector((store) => store.users);
    const { currentUser } = useSelector((store) => store.user);
    const {file,filecategory} = useSelector(store=> store.folder)
    console.log(file)
    const dispatch = useDispatch();
  return (
    <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white max-h-[85%] lg:w-2/3 rounded-md">
        <div className='flex flex-col p-8'>
        <div className="flex justify-between items-center mb-2">
          <span className='text-xl font-semibold'>{filecategory}</span>
          <div className="flex space-x-2">
            <PencilIcon className="w-8 h-8 p-2 cursor-pointer border rounded-lg text-stone-500 border-stone-200" />
            <XIcon
              className="w-8 h-8 p-2 cursor-pointer border rounded-lg text-stone-500 border-stone-200 transform hover:rotate-90 transition duration-200 hover:text-ocean"
              onClick={() => dispatch(closeModal({ modalId: "folder" }))}
            />
          </div>
        </div>
        <div className="grid folder-grid mt-2 content-center items-center justify-between">
          <div className="flex items-center gap-2 font-light">
            Name
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer"/>
          </div>
          <div className="flex items-center gap-2 font-light">
            Size
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 font-light">
            Shared
          </div>
          <div className="flex items-center gap-2 font-light">
            Last Modified
            <SwitchVerticalIcon className="w-4 h-4 cursor-pointer"/>
          </div>
          <hr className="col-span-4 mt-4 text-neutral-400" />
        </div>
        <div className="container overflow-y-auto max-h-[350px] scrollbar pb-4">
        <div className="grid folder-grid content-center items-center justify-between gap-y-4">
          {file.map((f) => {
            const uploader = users.find(user=> user?._id === f?.uploader)
            return (
              <>
                <div className="flex items-center space-x-1">
                {(filecategory === 'Documents') && (<DocumentTextIcon className="w-4 h-4"/>)}
                {(filecategory === 'Pictures')  && <PhotographIcon className="w-4 h-4"/>}
                  <a href={f.link} target="_blank" rel="noopener noreferrer">
                     {f.fileName}
                  </a>
                </div>
                <div>{Math.round((f.size / 1000000) * 100) / 100} MB</div>
                {currentUser?._id === uploader?._id ? <div>Me</div> : <div>{uploader?.fullName}</div>} 
                <div>
                  {format(new Date(f.uploadTime), "MM/dd/yyyy - HH:mm")}
                </div>
                <div className='relative'>
                  {/* onClick this */}
                <DotsVerticalIcon className='w-4 h-4 cursor-pointer' /> 
                {/* toggle height this */}
                {/* <div className='absolute right-4 top-4 bg-slate-700 p-1 rounded-sm'> 
                    <span>Delete</span>
                </div> */}
                </div>
              </>
            );
          })}
        </div>
        </div>
        </div>
    </div>
  )
}

export default Folder