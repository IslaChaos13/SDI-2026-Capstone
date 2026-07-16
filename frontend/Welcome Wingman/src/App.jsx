import Logon from './Pages/Logon'
import AdminDashboard from "./Pages/AdminDashboard"
import MyChecklist from "./Pages/MyChecklist"
import Profile from "./Pages/Profile"
import PersonnelDashboard from "./Pages/PersonnelDashboard"
import BaseDirectory from "./Pages/BaseDirectory"
import ErrorPage from "./Pages/ErrorPage"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <div>


        <Routes>

          <Route path="/" element={<BaseDirectory />}/>
          <Route path="/login" element={<Logon />} />
          <Route path="/Admin" element={<AdminDashboard />}/>
          <Route path="/:UserID/Checklist" element={<MyChecklist />}/>
          <Route path="/:UserID/Profile" element={<Profile />}/>
          <Route path="/:UserID/Dashboard" element={<PersonnelDashboard />}/>
          <Route path="/*" element={<ErrorPage />}/>

        </Routes>

      </div>
    </>
  )
}
export default App
