import '../styles/theme.css'
import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="af-logo-placeholder">★</div>
        <div className="header-brand-text">
          <div className="brand-title">Welcome Wingman</div>
          <div className="brand-subtitle">In-Processing Portal</div>
        </div>
      </div>

      <div className="header-search search-bar">
        <span className="search-icon">⌕</span>
        <input type="text" placeholder="Search the portal..." readOnly />
      </div>

      <div className="header-spacer"></div>

      <span className="header-date">Tuesday, July 14, 2026</span>

      <div className="header-actions">
        <button className="btn-icon" type="button">
          🔔
          <span className="icon-badge">3</span>
        </button>
        <button className="btn-icon" type="button">⚙</button>
      </div>

      <div className="header-user">
        <div className="avatar avatar-sm">U</div>
        <div className="header-user-info">
          <div className="user-name">User Name</div>
          <div className="user-rank">Rank</div>
        </div>
      </div>
    </header>
  )
}

export default Header
