import React from 'react'
import LoginImage from './../assets/login.svg'
const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen  bg-[#E7E9F8]'>
            <div className='flex justify-center items-center w-2/3 h-4/5 border border-solid border-gray-200 rounded-sm bg-white'>
                {/* left content */}
                <div className='w-3/5 p-8 flex flex-col space-y-8'>
                    <h3 className='text-3xl font-semibold'>Sign in</h3>
                    <p className='font-medium'>Sign in to your account below</p>
                    <form className=''>
                        <div className='mb-8 relative'>
                            <input type="email" name="email" id="email" placeholder='email' className='peer py-2 px-4 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean' />
                            <label htmlFor="email" className='block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4'>Email Address</label>
                        </div>
                        <div className='mb-2 relative'>
                            <input type="password" name='password' id='password' placeholder='password' className='peer py-2 px-4 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean' />
                            <label htmlFor="password" className='block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-4'>Password</label>
                        </div>
                        <span className='block mb-6 text-gray-400 font-medium'>Forgot password?</span>
                        <button className='px-10 py-2 text-lg bg-ocean rounded-lg text-white'>Sign in</button>
                    </form>
                    <span className='text-lg'>Dont have an account? <a href="" className='text-ocean'>Register</a> </span>
                </div>
                {/* right content */}
                <div className='w-2/5 bg-ocean h-full relative'>
                    <div className='flex justify-center items-center h-full w-full'>
                    <img src={LoginImage} alt="" className='w-64 h-64'/>
                    </div>
                    <span className=' absolute top-2/4 left-2/4  transform translate-y-[-10rem] translate-x-[-50%] text-white text-3xl font-medium text-center'>Welcome to <br /> PJ</span>
                </div>
            </div>
        </div>
    )
}

export default Login