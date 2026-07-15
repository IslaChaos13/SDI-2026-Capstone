import '../styles/theme.css'
import './Layout.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">{children}</main>
      </div>
    </div>
  )
}

export default Layout
