import React from 'react'
import LoginImage from './../assets/login.svg'
import SignIn from '../components/login/SignIn'
import Register from '../components/login/Register'
const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen  bg-[#E7E9F8]'>
            <div className='flex justify-center items-center w-2/3 h-4/5 border border-solid border-gray-200 rounded-sm bg-white'>
                {/* left content */}
                <div className='w-3/5 p-8 flex flex-col'>
                    <Register/>
                    {/* <SignIn/> */}
                </div>
                {/* right content */}
                <div className='w-2/5 bg-ocean h-full relative'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <img src={LoginImage} alt="" className='w-64 h-64' />
                    </div>
                    <span className=' absolute top-2/4 left-2/4  transform translate-y-[-10rem] translate-x-[-50%] text-white text-3xl font-medium text-center'>Welcome to <br /> PJ</span>
                </div>
            </div>
        </div>
    )
}

export default Login