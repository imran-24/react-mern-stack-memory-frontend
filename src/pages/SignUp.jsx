import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { signup } from '../features/auth/authSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
      first: '',
      second: '',
      email: '',
      password: '',
      retype:''
    })

    const onchange = (e) =>{
      setUser((prevState) => ({
          ...prevState,[e.target.name]: e.target.value
      }))
      
  }

  const {first, second, email, password, retype} = user;
    useEffect(()=>{
     
      
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      if(password !== retype) return console.log("password doesn't match")
      
      dispatch(signup({
        name: first + ' '+ second,
        email,
        password
      }))
      
      navigate('/');
      setUser({
        first: '',
        second: '',
        email: '',
        password: '',
        retype:''
      })
    }
  return (
    <div className="h-screen w-full   flex flex-col items-center  relative">
        <Navbar />
        <div className='flex-1 w-full flex items-center justify-center'>
            <div className='w-[20rem] p-3 font-light bg-white rounded-md shadow-md flex flex-col gap-3 '>
                <p className='text-lg m-auto capitalize'>sing up</p>
                <div className='flex flex-col gap-3 '>
                    <div className='flex justify-between gap-2'>
                        <input value={first} onChange={onchange} name='first' type="text"  className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2' placeholder='first name' />
                        <input value={second} onChange={onchange} name='second' type="text"  className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2' placeholder='last name'/>
                    </div>
                    <input value={email} onChange={onchange} name='email' type="text" className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2' placeholder='email address' />
                    <input value={password} onChange={onchange} name='password' type="text" className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2 placeholder:text-sm' placeholder='password' />
                    <input value={retype} onChange={onchange} name='retype' type="text" className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2 placeholder:text-sm' placeholder='retype password' />
                    <button onClick={handleSubmit} type='submit' className='bg-rose-600 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>sign up</button>
                    <button className='bg-blue-500 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>sign in with google</button>
                    <p className='text-sm text-gray-500 '>Already have an account! 
                    <Link to={'/signin'}>
                    <span className='font-semibold  cursor-pointer capitalize ml-1'>Sign in</span>
                    </Link>
                    </p>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default SignUp