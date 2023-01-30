import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { setMemory, updateMemory } from '../features/memory/memorySlice';
import { useEffect } from 'react';
import { resetview, selectview } from '../features/memory/viewSlice';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import Pagination from './Pagination';

const Form = ({qSearch, setQSearch, totalPosts, setCurrentPage, postsPerPage}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth);
  const view = useSelector(selectview);
  const [memory, setmemory] = useState({
    title:'',
    message:'',
    tags:'',
    img:''

  })

  useEffect(()=>{
    if(view){
      setmemory({
        title:view.title,
        message: view.message,
        tags: view.tags,
        img: view.img
      })
    }
    // return () => {
    //   dispatch(resetview());
    // }
  },[view])
  const {title, message, tags, img} = memory;
  const onchange = (e) =>{
    setmemory((prevState) => ({
        ...prevState,[e.target.name]: e.target.value
    }))   
}

// submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user) return navigate('/signin')
    dispatch(setMemory ({
      creator: user?._id,
      username: user?.name,
      title,
      message,
      tags,
      img
    }))

    setmemory({
        title:'',
        message:'',
        tags:'',
        img:''
    })
    
}

// search

const handleKeyPress = (e)=>{
  e.preventDefault();

}

// update
const handleUpdate = (e) => {
  e.preventDefault();
  
  
  dispatch(updateMemory ({
    id: view?._id,
    creator: user?._id,
    username: user?.name,
    title,
    message,
    tags,
    img
  }))

  setmemory({
      title:'',
      message:'',
      tags:'',
      img:''
  })
  dispatch(resetview())

  
}

const handleClear = ()=>{
  setmemory({
    title:'',
    message:'',
    tags:'',
    img:''
})
dispatch(resetview())
}
  return (
    <div className='flex flex-col gap-4'>
    <div className='w-full  md:w-[20rem]  p-3 font-light bg-white rounded-md shadow-md flex flex-col gap-3 '>
        <div className='flex items-center gap-3 '>
            <input onChange={(e) => setQSearch(e.target.value)} value={qSearch}  name='search'   type="text" className='w-full bg-transparent border-none outline-none  text-sm' placeholder='search memories' />
            <BiSearch fontSize={20} className='text-gray-300' />
        </div>
    </div>
    <div className='w-full  md:w-[20rem] h-[25rem]  p-3 font-light bg-white rounded-md shadow-md flex flex-col gap-3 '>
        <p className='text-lg m-auto'>Creating a memory</p>
        <div className='flex flex-col gap-3 '>
            <input value={title} name='title'  onChange={onchange}  type="text" className='w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2 lowercase' placeholder='title' />
            <textarea name='message' onChange={onchange}  rows={4}  type="text" className='w-full resize-none bg-transparent border outline-none border-gray-400 text-sm rounded p-2 lowercase' value={message} placeholder='say something about your memory'></textarea>
            <input value={tags} name='tags' onChange={onchange}  type="text" className=' w-full bg-transparent border outline-none border-gray-400 text-sm rounded p-2' placeholder='tags'/>
            <div className='text-xs w-full '>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setmemory({ ...memory, img: base64.toString() })
              }
            />
        </div>
            {
              view ? <button onClick={handleUpdate} className='bg-rose-600 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>update</button>
              :<button onClick={handleSubmit} className='bg-rose-600 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>submit</button>
            }
            <button onClick={handleClear} className='bg-blue-500 hover:bg-opacity-80 p-1 rounded text-white text-sm capitalize'>clear</button>
        </div>
    </div>
    <div className='w-full  md:w-[20rem]  p-3 font-light bg-white rounded-md shadow-md flex flex-col gap-3 '>
        <Pagination totalPosts={totalPosts} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} />
    </div>
    
    </div>
  )
}

export default Form