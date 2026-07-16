import '../styles/theme.css'
import './Layout.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

function Layout({LoggedIn, children }) {
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
