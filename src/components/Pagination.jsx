import React from 'react'

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='flex gap-2'>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className='w-6 h-6 bg-gray-300 rounded  text-sm '>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};


export default Pagination