import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { singin } from '../features/auth/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    
    email: '',
    password: '',

  })

  const onchange = (e) =>{
    setUser((prevState) => ({
        ...prevState,[e.target.name]: e.target.value
    }))
    
}

const { email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(singin(user))
    
    navigate('/');
    setUser({ 
      email: '',
      password: '',
    })
  }
  return (
    <div className="h-screen w-full   flex flex-col items-center  relative">
        <Navbar />
        <div className='flex-1 w-full flex items-center justify-center'>
            <div className='w-[20rem] p-3 font-light bg-white rounded-md shadow-md flex flex-col gap-3 '>
                <p className='text-lg m-auto capitalize'>sing in</p>
                <div className='flex flex-col gap-3 '>
                    
                    <input onChange={onchange} value={email} type="text" name='email' className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2' placeholder='email address' />
                    <input onChange={onchange} value={password} name='password' type="password" className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2 placeholder:text-sm' placeholder='password' />

                    <button onClick={handleSubmit} type='submit' className='bg-rose-600 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>sign in</button>
                    <button className='bg-blue-500 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>sign in with google</button>
                    <p className='text-sm text-gray-500 '>Don't have an account! 
                    <Link to={'/signup'}>
                    <span className='font-semibold  cursor-pointer capitalize ml-1'>Sign up</span>
                    </Link>
                    </p>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default SignIn