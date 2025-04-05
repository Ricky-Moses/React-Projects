import React from 'react'
// Components
import Home from './Home'
// Small Projects
import Weather from './Small_Projects/weather'
// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const routingProject = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/weather', element: <Weather /> }
  ],
  { basename: '/React-Projects/' }
)

export const App = () => (<RouterProvider router={routingProject} />)

export default App