import Logon from './Pages/Logon'
import AdminDashboard from "./Pages/AdminDashboard"
import MyChecklist from "./Pages/MyChecklist"
import Profile from "./Pages/Profile"
import PersonnelDashboard from "./Pages/PersonnelDashboard"
import Dashboard from "./Pages/Dashboard"
import BaseDirectory from "./Pages/BaseDirectory"
import ErrorPage from "./Pages/ErrorPage"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import {useState} from 'react'


function App() {

  const [LoggedIn, setLoggedIn] = useState(null)

  return (
    <>
      <div>


        <Routes>

          <Route path="/" element={<BaseDirectory LoggedIn={LoggedIn}/>}/>
          <Route path="/login" element={<Logon LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/Admin" element={<AdminDashboard />}/>
          <Route path="/:UserID/Checklist" element={<MyChecklist />}/>
          <Route path="/:UserID/Profile" element={<Profile />}/>
          <Route path="/:UserID/Dashboard" element={<Dashboard LoggedIn={LoggedIn} />}/>
          <Route path="/*" element={<ErrorPage />}/>

        </Routes>

      </div>
    </>
  )
}
export default App
