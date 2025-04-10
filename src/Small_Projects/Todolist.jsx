import React, { useEffect, useRef, useState } from 'react'
import { BsMenuDown } from 'react-icons/bs'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { FaTrashArrowUp } from 'react-icons/fa6'
import { MdEditCalendar } from 'react-icons/md'

const TodoList = () => {

  // Task
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')
  const [task, setTask] = useState([])

  // Time
  const [time, setTime] = useState('')

  // Edit
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  // Menu
  const [menu, setMenu] = useState(false)

  // Name Tracking
  const inputName = useRef(null)

  // Localstorage
  useEffect(() => {
    const storedList = localStorage.getItem('tasks')
    if (storedList) {
      setTask(JSON.parse(storedList))
    }
  }, [])

  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(task))
    }
    console.log(`Stored Task: ${task}`);
  }, [task])

  // Time Interval
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatTime = now.toLocaleTimeString();
      setTime(formatTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  // 
  const formSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !desc) { return alert('Please fill out all fields') };

    if (isEditing) {
      const updateTasks = task.map((item) => {
        if (item.id === editId) {
          return { ...item, name, date, desc }
        }
        return item
      });
      setTask(updateTasks);
      setIsEditing(false)
      setEditId(null)
      setName('')
      setDate('')
      setDesc('')
    }
    else {
      const newTasks = {
        id: task.length + 1,
        name, date, desc
      }

      const updateTasks = [...task, newTasks]
      setTask(updateTasks)
      setName('')
      setDate('')
      setDesc('')
      console.log(updateTasks);
    }
  }

  // Editing List
  const listEdit = (id) => {
    console.log(`Editing List ${id}`);
    const currentEditList = task.find((list) => list.id === id);
    if (currentEditList) {
      setIsEditing(true)
      setEditId(id)
      setName(currentEditList.name)
      setDate(currentEditList.date)
      setDesc(currentEditList.desc)
      setMenu(false)
    }
  }

  // Deleting List
  const listDelete = (id) => {
    console.log(`Deleting List ${id}`);
    const remainTasks = task.filter((sorting) => sorting.id !== id)
    setTask(remainTasks)
  }

  return (
    <>
      <section className="todo-list h-screen flex items-center justify-center">
        <main className='w-11/12 h-3/4 sm:w-9/12 md:w-11/12 md:h-auto lg:w-10/12 xl:w-3/4 relative md:grid grid-cols-2 gap-1 p-2 rounded-3xl shadow-2xl overflow-hidden'>
          <form onSubmit={formSubmit} className='todo-form md:gap-y-2 lg:gap-y-3 rounded-3xl bg-red-200 w-full h-full flex flex-col items-center justify-center p-1 gap-y-3 relative'>
            <span className="absolute top-5 right-5 text-white md:relative md:hidden"><BsMenuDown
              tabIndex={0}
              onClick={() => setMenu(true)}
              className='outline-0' /></span>
            <h2 className='text-white underline underline-offset-2 tracking-widest'>Add Task</h2>

            {/* Task Name Input */}
            <div className="flex flex-col w-11/12">
              <label htmlFor="" className='font-bold ms-1 text-white'>Task Name: </label>
              <input
                type='text'
                className="border p-2 rounded text-white focus:outline-none focus:ring-2"
                placeholder='Enter the Name'
                ref={inputName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Date Input */}
            <div className="flex flex-col w-11/12">
              <label htmlFor="" className='font-bold ms-1 text-white'>Task Date: </label>
              <input
                type='date'
                className="border p-2 rounded text-white focus:outline-none focus:ring-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Description textarea */}
            <div className="flex flex-col w-11/12">
              <label htmlFor="" className='font-bold ms-1 text-white'>Task Description: </label>
              <textarea
                type='text'
                className="border p-2 rounded text-white focus:outline-none focus:ring-2 h-48 min-h-40 max-h-40 xl:max-h-48"
                placeholder='Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            {/* Submit */}
            <button type='submit' className="form-btn font-bold text-white">
              {isEditing ? 'Update Tasks' : 'Submit'}
            </button>
          </form>
          
          {/* List Area */}
          <div className={`todo-form-list flex flex-col md:h-auto rounded-3xl bg-amber-100 absolute md:relative ${menu ? 'active' : ''}`}>
            <div className="flex items-center justify-between p-3">
              <h4
                className='underline underline-offset-4 flex items-center gap-2'
                onClick={() => setMenu(false)}
              >
                Task Lists <span className="md:hidden text-red-900"><FaRegArrowAltCircleLeft /></span>
              </h4>
              <p className='text-gray-500'>{time}</p>
            </div>

            {/* Scrollable UL wrapper */}
            <div className="flex-1 overflow-y-auto px-2 pb-4">
              <ul className="flex flex-col gap-2">
                {task.map(({ id, name, date }) => (
                  <li key={id} className="text-white h-13 flex items-center justify-between gap-1">
                    <div className="bg-amber-300 rounded-l-2xl flex items-center justify-evenly h-full w-10/12 md:w-11/12">
                      <span>{id}</span>
                      <span>{name}</span>
                      <span className="icon">
                        <MdEditCalendar
                          tabIndex={0}
                          onClick={() => listEdit(id)}
                          className="hover:text-green-500 cursor-pointer outline-0"
                        />
                      </span>
                      <span className="icon">
                        <FaTrashArrowUp
                          tabIndex={0}
                          className="hover:text-red-500 cursor-pointer outline-0"
                          onClick={() => listDelete(id)}
                        />
                      </span>
                    </div>
                    <span className="list-date bg-amber-300 rounded-r-2xl w-4/12 md:w-3/12 h-full flex items-center justify-center">{date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </main>
      </section>
    </>
  )
}

export default TodoList