import {useNavigate, useParams } from 'react-router-dom'

import '../styles/theme.css'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate();
  const { userID } = useParams();

  return (
    <aside className="app-sidebar">
      <div className="nav-item active">
        <span className="nav-icon">🏠</span>
        <span className="nav-label"onClick={() => navigate('/dashboard')}>Dashboard</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">✅</span>
        <span className="nav-label" onClick={() => navigate(`${userId}/checklist`)}>My Checklist</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">📇</span>
        <span className="nav-label">Base Directory</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">👤</span>
        <span className="nav-label" onClick={() => navigate('/profile')}>Profile</span>
      </div>

      <hr className="sidebar-divider" />
      <div className="sidebar-section-label">Admin</div>

      <div className="nav-item">
        <span className="nav-icon">👥</span>
        <span className="nav-label">Personnel</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">📋</span>
        <span className="nav-label">Tasks</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">📊</span>
        <span className="nav-label">Reports</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">⚙</span>
        <span className="nav-label">Settings</span>
      </div>

      <div className="sidebar-footer">
        <hr className="sidebar-divider" />
        <div className="nav-item">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
