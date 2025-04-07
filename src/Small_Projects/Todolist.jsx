import React from 'react'
import { BsMenuDown } from 'react-icons/bs'

const TodoList = () => {

  const formSubmit = (e)=>{
    e.preventDefault();
  }

  return (
    <>
        <section className="todo-list h-screen flex items-center justify-center">
            <main className='w-9/12 sm:w-8/12 md:w-11/12 lg:w-3/4 xl:w-3/4 h-3/4 relative md:grid grid-cols-2 gap-1 p-2 rounded-3xl shadow-2xl'>
              <form onSubmit={formSubmit} className='todo-form md:gap-y-2 lg:gap-y-3 rounded-3xl bg-red-200 w-full h-full flex flex-col items-center justify-center p-1 gap-y-3 relative'>
                <span className="absolute top-5 right-5 text-white md:relative md:hidden"><BsMenuDown tabIndex={0}/></span>
                <h2 className='text-white underline underline-offset-2 tracking-widest'>Add Task</h2>

                {/* Task Name Input */}
                <div className="flex flex-col w-11/12">
                  <label htmlFor="" className='font-bold ms-1 text-white'>Task Name: </label>
                  <input 
                  type='text' 
                  className="border p-2 rounded text-white focus:outline-none focus:ring-2" 
                  placeholder='Enter the Name'
                  />
                </div>

                {/* Date Input */}
                <div className="flex flex-col w-11/12">
                  <label htmlFor="" className='font-bold ms-1 text-white'>Task Date: </label>
                  <input 
                  type='date' 
                  className="border p-2 rounded text-white focus:outline-none focus:ring-2" 
                  
                  />
                </div>

                {/* Description textarea */}
                <div className="flex flex-col w-11/12">
                  <label htmlFor="" className='font-bold ms-1 text-white'>Task Description: </label>
                  <textarea 
                  type='text' 
                  className="border p-2 rounded text-white focus:outline-none focus:ring-2 h-48 min-h-40 max-h-40 xl:max-h-48"
                  placeholder='Description'
                  ></textarea>
                </div>

                {/* Submit */}
                <button type='submit' className="form-btn font-bold text-white">Submit</button>
              </form>
              <div className='todo-form-list rounded-3xl bg-amber-100 absolute md:relative'>

              </div>
            </main>
        </section>
    </>
  )
}

export default TodoList