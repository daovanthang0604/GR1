import React from 'react'

const SignIn = () => {
    return (
        <div className='flex flex-col space-y-8'>
            <h3 className='text-3xl font-semibold'>Sign in</h3>
            <p className='font-medium'>Sign in to your account below</p>
            <form className=''>
                <div className='mb-8 relative'>
                    <input type="email" name="email" id="email" placeholder='email' className='peer py-3 px-6 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean' />
                    <label htmlFor="email" className='block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-6'>Email Address</label>
                </div>
                <div className='mb-2 relative'>
                    <input type="password" name='password' id='password' placeholder='password' className='peer py-3 px-6 border border-gray-300 border-solid rounded-md text-lg w-2/3 placeholder-transparent focus:outline-ocean' />
                    <label htmlFor="password" className='block absolute left-0 -top-6 text-md peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-6'>Password</label>
                </div>
                <span className='block mb-6 text-gray-400 font-medium'>Forgot password?</span>
                <button type='submit' className='px-10 py-2 text-lg bg-ocean rounded-lg text-white'>Sign in</button>
            </form>
            <span className='text-lg'>Dont have an account? <a href="" className='text-ocean'>Register</a> </span>
        </div>
    )
}

export default SignIn