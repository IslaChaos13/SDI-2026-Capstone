import '../styles/theme.css'
import './Layout.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import {useParams} from 'react-router-dom'
import { useState} from 'react'

function Layout({LoggedIn, children }) {
  const API = "http://localhost:8000";
  const [user, setUser] = useState(null)
  const { userID } = useParams()



  return (
    <div className="app-shell">
      <Header LoggedIn={LoggedIn} />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">{children}</main>
      </div>
    </div>
  )
}

export default Layout
