import React from 'react'
import { useNavigate } from 'react-router-dom'

const MemorySuggestion = ({memory}) => {
  const navigate = useNavigate()
  return (
    <div className='w-full sm:max-w-[14rem] space-y-1'>
        <p className='uppercase font-medium'>{memory.title}</p>
        <p className='text-xs text-gray-500  font-semibold'>{memory.username}</p>
        <p className='text-xs'>{memory.message}</p>
        <p className='text-xs text-gray-500 '>Like {memory.likes.length}</p>
        <img onClick={()=> navigate(`/memory/${memory._id}`)} src={memory.img} alt=""  className='w-full h-[10rem] object-cover cursor-pointer object-center rounded' />
    </div>
  )
}

export default MemorySuggestion