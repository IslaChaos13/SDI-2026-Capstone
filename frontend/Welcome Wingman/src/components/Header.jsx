import '../styles/theme.css'
import './Header.css'

function Header() {

  const user = {
    rank: 'Capt',
    first_name: 'John',
    last_name: 'Doe',
    email: 'John.Doe@test.com',
    phone: '671-333-4567',
    address: '255 Loy Via',
    avatar: null
  }

  const today = new Date ().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) /*TJF*/

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

      <span className="header-date">{today}</span> {/*TJF*/}

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
          <div className="user-name"><div className="user-name">{user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 'Guest'}</div></div> {/*TJF*/}
          <div className="user-rank">{user.rank ?? ''}</div> {/*TJF*/}
        </div>
      </div>
    </header>
  )
}

export default Header
