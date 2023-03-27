import React from 'react'
import { XIcon, TagIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
const TaskDetails = () => {
    const dispatch = useDispatch();
    return (
        <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-30 bg-white lg:w-1/3 w-96 rounded-md h-40">
            <div className='flex flex-col py-4 px-8'>
                <div className='flex justify-between'>
                    <span>Project Name</span>
                    <XIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => dispatch(closeModal({ modalId: "taskDetails" }))}
                    />
                </div>
                <div className='mt-2'>
                    <span className='font-medium text-xl'>Task title</span>
                </div>
                <div className='flex flex-col space-y-4 mt-8'>
                    <div className='flex space-x-16 items-center'>
                        <div className='flex space-x-1'>
                        <TagIcon className='w-6 h-6 rounded-full text-neutral-400 text-md'/>
                        <span className='text-md text-neutral-400'>Status</span>
                        </div>
                        <div className='bg-orange-100 py-1 px-8 rounded-xl'>
                            <span className='text-accent text-md font-medium'>To Do</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails