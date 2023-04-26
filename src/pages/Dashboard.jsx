import React, { useState } from 'react'
import Barchart from '../components/dashboard/Barchart'
import { PencilIcon, CodeIcon, DesktopComputerIcon, CheckIcon, PresentationChartLineIcon } from '@heroicons/react/outline';
const Dashboard = () => {
    const [select, setSelect] = useState();
    const handleChange = (e) => {
        setSelect(e.target.value)
    }
    return (
        <div className='mt-4'>
            <div className='flex flex-col gap-2 h-[750px] 2xl:h-[850px]'>
                <div className='flex gap-2'>
                    <div className='w-[60%] bg-[#0A4D68] rounded-3xl p-8 relative'>
                        <Barchart />
                        <div className='absolute top-8 right-8'>
                            <select value={select} onChange={handleChange} className='bg-[#106c90] text-pool p-2 rounded-xl'>
                                <option value="Project 1">Project 1</option>
                                <option value="Project 2">Project 2</option>
                                <option value="Project 3">Project 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='bg-[#088395] rounded-3xl p-8 flex flex-col w-full relative'>
                        <span className='text-pool text-2xl'>Meeting</span>
                        <span className='text-white'>You have 1 meeting today at 3.00pm</span>
                        <div className='cursor-pointer absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] rounded-full p-8 w-36 h-36 bg-[#05BFDB] text-[#106c90]'>
                            <div className='flex justify-center items-center w-full h-full'>
                                <div className='font-bold text-lg text-center'>Join meet!</div>

                            </div>
                        </div>
                        <span className='absolute right-8 bottom-8 text-pool'> <span className='text-4xl'>7</span> participants</span>
                    </div>
                </div>
                <div className='magazina grow flex gap-2'>
                    <div className='bg-[#088395] w-[30%] rounded-3xl p-8 grow'>
                        <div className='text-pool font-bold text-2xl'>
                            Today Task
                        </div>
                        <div className='flex flex-col justify-center space-y-2 mt-4'>
                            <div className='flex space-x-4 cursor-pointer'>
                                <PencilIcon className='w-4 h-4 rounded-full' />
                                <span className='line-through'>UI Design implementation</span>
                            </div>
                            <div className='flex space-x-4'>
                                <PencilIcon className='w-4 h-4 rounded-full' />
                                <span className='line-through '>Button design</span>
                            </div>
                            <div className='flex space-x-4'>
                                <PencilIcon className='w-4 h-4 rounded-full' />
                                <span>Lorem ipsum mo hamed mon</span>
                            </div>
                            <div className='flex space-x-4'>
                                <PencilIcon className='w-4 h-4 rounded-full' />
                                <span>Lorem ipsum mo hamed mon</span>
                            </div>
                            <div className='flex space-x-4'>
                                <PencilIcon className='w-4 h-4 rounded-full' />
                                <span>Lorem ipsum mo hamed mon</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[70%] rounded-3xl p-8 grow relative bg-[#0A4D68]'>
                        <div className='text-pool text-2xl'>
                            Stats
                        </div>
                        <div className='absolute top-8 right-8'>
                            <select value={select} onChange={handleChange} className='bg-[#106c90] text-pool p-2 rounded-xl'>
                                <option value="Project 1">Project 1</option>
                                <option value="Project 2">Project 2</option>
                                <option value="Project 3">Project 3</option>
                            </select>
                        </div>
                        <div className='flex gap-6 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'>
                            <div className='flex flex-col rounded-3xl p-4 relative w-36 h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                                <CodeIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-3xl font-semibold text-[#106c90]'>25</span>
                                <span className='text-[#106c90]'>To Do</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-36 h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                            <PresentationChartLineIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-3xl font-semibold text-[#106c90]'>14</span>
                                <span className='text-[#106c90]'>In Progress</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-36 h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                            <DesktopComputerIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-3xl font-semibold text-[#106c90]'>32</span>
                                <span className='text-[#106c90]'>Review</span>
                            </div>
                            <div className='flex flex-col rounded-3xl p-4 relative w-36 h-36 justify-center items-center bg-[#1bd3fc] shadow-md'>
                               <CheckIcon className='w-8 h-8 p-1 rounded-full absolute top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] border border-[#1bd3fc] text-[#106c90] z-10 bg-[#1bd3fc]'/>
                                <span className='text-3xl font-semibold text-[#106c90]'>16</span>
                                <span className='text-[#106c90]'>Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard