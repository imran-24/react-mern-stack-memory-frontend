import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMemory } from '../features/memory/memorySlice';
import Form from './Form'
import Memories from './Memories'
import Spinner from './Spinner';

const Feed = () => {
  const [qSearch, setQSearch] = useState('');
  const {memories, isLoading, isError, message} = useSelector((state) => state.memory);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isError) console.log(message);
    
    dispatch(getMemory({search: qSearch}));

    // return () => {
    //   dispatch(reset());
    // }
  },[ navigate, qSearch])
  const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = memories.slice(firstPostIndex, lastPostIndex);
    
  
  return (
    <div className='h-full w-11/12  flex md:flex-row flex-col-reverse  gap-4 justify-between '>
        
        <Memories isLoading={isLoading} qSearch={qSearch} currentPosts={currentPosts} />
        <Form totalPosts={memories.length} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage}  qSearch={qSearch} setQSearch={setQSearch}/>

    </div>
  )
}

export default Feed