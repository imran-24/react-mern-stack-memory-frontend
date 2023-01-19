import React from 'react'
import { Circles } from 'react-loader-spinner';



function Spinner({message}) {
  return (
    <div className='w-full mt-4 flex justify-center'>
       <div>
        <Circles
            height="40"
            width="200"
            color="#00c3ff"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            className="mt-5"
            />
        <p className=' text-sm font-light text-center  '>{message}</p>
       </div>
    </div>
  )
}
  
export default Spinner