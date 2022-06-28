import React from 'react'

const ProjectsTab = () => {
  return (
    <div className='pt-4'>
        <ul className='flex space-x-8 text-lg items-center font-normal'>
            <li className='cursor-pointer'>Boards</li>
            <li className='tab cursor-pointer'>Calendar</li>
            <li className='cursor-pointer'>Files</li>
        </ul>
    </div>
  )
}

export default ProjectsTab