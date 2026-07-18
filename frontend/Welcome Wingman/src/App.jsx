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
import TaskManagement from './Pages/TaskManagement'
import UserContext from './context/UserContext'

function App() {

const [LoggedIn, setLoggedIn] = useState(() => {
    try {
        const saved = localStorage.getItem('user')
        return saved ? JSON.parse(saved) : null
    } catch {
        localStorage.removeItem('user')
        return null
    }
})
  const value = {LoggedIn, setLoggedIn}

  return (
    <UserContext.Provider value={value}>
      <div>


        <Routes>

          <Route path="/" element={<BaseDirectory LoggedIn={LoggedIn}/>}/>
          <Route path="/login" element={<Logon LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/Directory" element={<BaseDirectory LoggedIn={LoggedIn}/>}/>
          <Route path='/tasks' element={<TaskManagement />} />
          <Route path="/Admin" element={<AdminDashboard />}/>
          <Route path="/:UserID/Checklist" element={<MyChecklist LoggedIn={LoggedIn}/>}/>
          <Route path="/:UserID/Profile" element={<Profile LoggedIn={LoggedIn}/>}/>
          <Route path="/:UserID/Dashboard" element={<Dashboard LoggedIn={LoggedIn} />}/>
          <Route path="/*" element={<ErrorPage />}/>

        </Routes>

      </div>
    </UserContext.Provider>
  )
}
export default App
