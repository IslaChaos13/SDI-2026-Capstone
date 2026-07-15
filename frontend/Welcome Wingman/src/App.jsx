<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Logon from './pages/Logon'
import Dashboard from './pages/Dashboard'
import MyChecklist from './pages/MyChecklist'
import Profile from './pages/Profile'
// import BaseDirectory from './pages/BaseDirectory'



import "./css/App.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <MyChecklist />,
  },
  {
    path: '/mychecklist',
    element: <MyChecklist />
  },
  {
    path: '/profile',
    element: <Profile />
  }
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  // },
  // {

  // },
]);
=======
import { useState } from 'react'
import Checklist from './pages/Checklist'
import './App.css'
>>>>>>> main

function App() {


  return (
    <>
<<<<<<< HEAD
     <RouterProvider router = {router}/>
    </>
=======
  <Checklist />
</>
>>>>>>> main
  )
}

export default App
