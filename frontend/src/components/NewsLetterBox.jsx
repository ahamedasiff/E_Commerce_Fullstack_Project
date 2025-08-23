import React from 'react'

const NewsLetterBox = () => {

    const handleSubmit = (e) => {
        e.preventDefault(); // Handle form submission logic here
    }

  return (
    <div className='text-center'>
      <p className='text-xl font-medium text-gray-800'>Subscribe Now & get 20% OFF</p>
      <p className='text-gray-400 mt-3'>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" placeholder='Enter Your Email' className='w-fll sm:flex-1 outline-none' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 ml-2'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
