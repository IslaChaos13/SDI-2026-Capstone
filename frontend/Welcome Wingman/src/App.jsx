import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard'
// import BaseDirectory from './pages/BaseDirectory'
// import Logon from './pages/Logon'
import Dashboard from './pages/Dashboard'
import MyChecklist from './pages/MyChecklist'
import PersonnelDashboard from './pages/PersonnelDashboard'
import Profile from './pages/Profile'


// import BaseDirectory from './pages/BaseDirectory'



import "./css/App.css"

const router = createBrowserRouter([
  // {
  //   path: '/logon',
  //   element: <Logon />,
  // },
  {
    path: '/mychecklist',
    element: <MyChecklist />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path:'/admin',
    element: <AdminDashboard />
  },
  // {
  //   path: '/directory',
  //   element: <BaseDirectory />
  // },
   {
    path: '/personneldashboard',
    element: <PersonnelDashboard />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }


]);

function App() {


  return (
    <>

     <RouterProvider router = {router}/>


    </>
  )
}

export default App
