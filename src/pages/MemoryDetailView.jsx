import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MemorySuggestion from '../components/MemorySuggestion'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import { API_URl } from '../features/memory/memoryService'
import {API} from '../api'

const MemoryDetailView = () => {
  const [memory, setMemory] = useState();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const param = useParams();
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    const getmemory = async() =>{
        try{
            const res = await API.get(`/api/memory/${param?.id}`)
            setMemory(res.data)
            setLoading(false)
        }
        catch(error){
            console.log(error.message)
        }
    }
    getmemory();
    
    
    
},[param])
 
     useEffect( ()=>{
        const getSuggestions = async() =>{
          
          try{
             const response = await API.get(`/api/memory?new=${memory?.creator}`)
             setMemories(response?.data.filter(
                (sug) => sug._id !== memory._id));
         }
         catch(error){
             console.log(error)
         } 
        }
        if(memory?.creator) getSuggestions(); 
        
        
    },[memory])

    // if(loading) return <Spinner message='Loading' />

  return (
    <div className="min-h-screen w-full   flex flex-col  items-center relative">
        <Navbar />
        <div className='flex-1 w-10/12 shadow-md flex flex-col gap-4 bg-white rounded-md p-4'>
            
            {
                loading ? <Spinner message='Loading' />
                : <div className='w-full flex lg:flex-row flex-col justify-between gap-2'>
                
                <div className='flex-1 flex flex-col gap-2'>
                        <p className='text-2xl capitalize'>{memory?.title}</p>
                        <div className='flex items-center gap-2'>
                       <p className='text-xs  text-gray-500'>{memory?.tags[0]}</p>
                        
                        </div>
                        <p className='text-sm font-light'>{memory?.message}</p>
                        <p className='text-xs  text-gray-500'>Created by: <span className='capitalize '>{memory?.username}</span>  </p>
                        <p className='text-xs text-white'>{moment(memory?.createdAt).fromNow()}</p>
                        <div className='w-full'>
                            <input type="text" className='w-full bg-transparent border outline-none text-gray-500 font-light border-gray-400 text-sm rounded p-2' readOnly placeholder='write a comment...' />
                        </div>

                </div>
                <div className='flex-1 h-[20rem]'>
                    <img src={memory?.img} className="rounded-lg h-full w-full object-contain" />
                </div>
                
            </div>
            }

            <div>
            </div>
            <div>
                {
                    memories.length > 0 && <>
                    <p className='text-gray-900'>You might also like:</p>
                    <div className='w-full flex justify-center border-t gap-4 flex-wrap p-4'>
                        
                        
                        {
                            memories?.map(memory => (
                                <MemorySuggestion key={memory._id} memory={memory} />
                            ))
                        }
                        
                    </div>
                    </>
                }
            </div>
        </div> 
        
    </div>
  )
}

export default MemoryDetailView