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

function App() {


  return (
    <>
     <RouterProvider router = {router}/>
    </>
  )
}

export default App
