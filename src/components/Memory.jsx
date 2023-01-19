import React from 'react'
import {AiOutlineLike} from 'react-icons/ai'
import {AiFillLike} from 'react-icons/ai'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { setview } from '../features/memory/viewSlice'
import { useState } from 'react';
import { deleteMemory, likeMemory } from '../features/memory/memorySlice';
import { useEffect } from 'react';

const Memory = ({memory}) => {
  const {user} = useSelector(state => state.auth )
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [active, setActive] = useState(false);
  useEffect(()=>{
    setActive(false);
  },[dispatch])

  const handleUpdate = ()=> {
    setActive(false);
    dispatch(setview(memory));
    
  }

  const handleDelete = () => {
    setActive(false);
    dispatch(deleteMemory(memory._id))
  }

  const handleLike = () =>{
    if(!user) return navigate('/signin');
    dispatch(likeMemory({
      id: memory._id,
      userId: user?._id
    }))
  }

  return (
    <div  className='w-full  sm:w-[16rem] h-[20rem] rounded-lg space-y-3 shadow-md bg-white relative '>
        <img onClick={()=> navigate(`/memory/${memory._id}`)} src={memory.img} alt=""  className='w-full h-[10rem] object-fit rounded-t-lg cursor-pointer' />
        <div className='w-full px-4 absolute top-0'> 
            <div className='w-full flex items-center justify-between '>
               <div>
                <p className='text-lg text-white font-semibold'>{memory.username}</p>
                <p className='text-xs text-white'>{moment(memory.createdAt).fromNow()}</p>
               </div>
               <div className='relative'>
               {user?._id === memory.creator && <BiDotsVerticalRounded onClick={()=> active ? setActive(false) : setActive(true)} fontSize={24} className='text-white cursor-pointer hover:text-gray-400' />}
                {
                  active && <div className='absolute right-2 bg-white rounded-sm shadow-sm p-2 transition-all ease-out duration-200'>
                      <p onClick={handleUpdate} className='text-xs text-gray-500 px-3 py-1 font-light hover:bg-gray-300 rounded-sm cursor-pointer'>update</p>
                      <p onClick={handleDelete} className='text-xs text-gray-500  px-3 py-1 font-light hover:bg-gray-300 rounded-sm cursor-pointer'>delete</p>
                    </div>

                  
                }
               </div>
            </div>
            
        </div>
        <div className='flex flex-col gap-2 px-4'>
            <div className='flex items-center gap-1'>
            {
                memory.tags.map(tag => <p key={tag} className='text-xs text-gray-400'>{tag}</p>)
            }
            </div>
            <p onClick={()=> navigate(`/memory/${memory._id}`)} className='text-lg uppercase font-semibold'>{memory.title}</p>
            <p className='text-xs text-gray-400 h-10'>{memory.message.length > 70 ? memory.message.slice(0, 80)+'...' : memory.message }</p>
            <div className='flex items-center gap-1'>
              {
                memory?.likes.includes(user?._id)
                ? <AiFillLike onClick={handleLike} className='text-blue-500 cursor-pointer' fontSize={24} />
                : <AiOutlineLike onClick={handleLike} className='text-blue-500 cursor-pointer' fontSize={24} />
              }
                <p className='text-xs text-gray-500 '>{memory?.likes.length} Like</p>
            </div>
        </div>
    </div>
  )
}

export default Memory