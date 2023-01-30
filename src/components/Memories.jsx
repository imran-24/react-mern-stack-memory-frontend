import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMemory } from '../features/memory/memorySlice'
import Memory from './Memory'
import Spinner from './Spinner'
const Memories = ({qSearch, currentPosts, isLoading}) => {
 
  if(currentPosts.length === 0) return <Spinner message='Loading' />
  return (
    <div className='flex-1 flex justify-center gap-4 flex-wrap mb-4'>
        {
            currentPosts?.map(memory => (
                <Memory key={memory._id} memory={memory} />
            ))
        }
    </div>
  )
}

export default Memories