import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const {user} = useSelector(state => state.auth );

  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout());
  }
  return (
    <div className='h-[4rem] w-11/12 sticky top-0 bg-slate-100 m-auto rounded-lg shadow-lg flex items-center justify-between px-4 my-4 z-20'>
        <Link to={'/'}>
        <h1 className='text-3xl font-boldd cursor-pointer '>Memories</h1>
        </Link>
        <div>
            {
              !user 
              ?(<Link to={'/signin'}>
              <button className='font-light capitalize text-sm hover:bg-blue-500 px-3 py-1 hover:text-white hover:rounded-md transition-all ease-out duration-200'>sign in</button> 
            </Link>)
              :

              (
                <div className='flex items-center gap-3'>
                  <p className='text-sm '>{user.name}</p>
                  <button onClick={handleLogout} className='font-light capitalize text-sm hover:bg-rose-500 px-3 py-1 hover:text-white hover:rounded-md transition-all ease-out duration-200'>log out</button>
                </div>
           )
            }
        </div>
            
  
    </div>
  )
}

export default Navbar