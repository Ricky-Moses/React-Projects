import React from 'react'
// Components
import Home from './Home'
// Small Projects
import Weather from './Small_Projects/weather'
import TodoList from './Small_Projects/Todolist'
import Calorie from './Small_Projects/Calorie'
import Quote from './Small_Projects/Quote'
import Calculator from './Small_Projects/Calculator'
// React Router
import { HashRouter, Routes, Route } from 'react-router-dom';


const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/todolist" element={<TodoList />} />
      <Route path="/calorie" element={<Calorie />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  </HashRouter>
);

export default App