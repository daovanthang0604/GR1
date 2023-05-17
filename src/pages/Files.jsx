import React from 'react'
import ProjectsTab from "../components/ProjectsTab";
import Status from "../components/Status";
import {DocumentTextIcon, PhotographIcon, MicrophoneIcon, VideoCameraIcon}  from "@heroicons/react/outline";
const Files = () => {
  return (
    <>
     <Status />
    <ProjectsTab />
    <div className='pt-4'>
        <div className='font-bold text-xl'>
            Folders
        </div>
        <div className='flex items-center justify-around mt-4'>
            <div className='flex gap-2 p-4 bg-yellow-100 rounded-lg w-48 items-center'>
            <DocumentTextIcon className='w-12 h-12 rounded-lg bg-sun p-2 text-white'/>
                <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Document</span>
                <span className='text-gray-400 font-light'>102 Files</span>
                </div>
           
               
            </div>
            <div className='flex gap-2 p-4 bg-orange-100 rounded-lg w-48 items-center'>
            <PhotographIcon className='w-12 h-12 rounded-lg bg-accent p-2 text-white'/>
            <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Pictures</span>
                <span className='text-gray-400 font-light'>22 Files</span>
                </div>
           
                
            </div>
            <div className='flex gap-2 p-4 bg-sky-100 rounded-lg w-48 items-center'>
            <MicrophoneIcon className='w-12 h-12 rounded-lg bg-pool p-2 text-white'/>
            <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Audio</span>
                <span className='text-gray-400 font-light'>5 Files</span>
                </div>
           
                
            </div>
            <div className='flex gap-2 p-4 bg-green-100 rounded-lg w-48 items-center'>
            <VideoCameraIcon className='w-12 h-12 rounded-lg bg-done p-2 text-white'/>
            <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Videos</span>
                <span className='text-gray-400 font-light'>12 Files</span>
                </div>
           
            </div>
        </div>
    </div>
    </>
  )
}

export default Files