import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import './Dashboard.css'
import './MyChecklist.css'
import './Profile.css'
import '../styles/PersonnelDashboard.css'

function PersonnelDashboard() {
  return (
    <Layout>
      <div className="page dashboard-page">
        <div className="dashboard-bg">
          <div className="dashboard-bg-grid"></div>
          <div className="radar-rings">
            <div className="radar-ring"></div>
            <div className="radar-ring r2"></div>
            <div className="radar-ring r3"></div>
            <div className="radar-ring r4"></div>
            <div className="radar-crosshair"></div>
            <div className="radar-crosshair vertical"></div>
          </div>
          <svg className="dashboard-bg-jet" viewBox="0 0 240 240">
            <polygon points="120,0 128,70 230,130 230,145 135,118 128,160 165,210 165,222 122,190 120,240 118,190 75,222 75,210 112,160 105,118 10,145 10,130 112,70" />
          </svg>
        </div>

        <div className="dashboard-content">
          <div className="page-header">
            <h1>My Dashboard</h1>
            <p>Your personal in-processing overview.</p>
          </div>

          <div className="card hero-panel" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="hero-logo">★</div>
            <div className="hero-body">
              <div className="hero-brand">
                <span className="hero-brand-title">Welcome Wingman</span>
              </div>
              <h1>Welcome back, User Name</h1>
              <span className="rank-tag">Rank · Unit</span>
              <p>You have 4 tasks remaining.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" type="button">Continue Checklist</button>
                <button className="btn btn-outline" type="button">View Profile</button>
              </div>
            </div>
            <div className="hero-snapshot">
              <span className="snapshot-value">60%</span>
              <span className="snapshot-label">Complete</span>
            </div>
          </div>

          <div className="dashboard-row row-3">
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-header" style={{ justifyContent: 'center' }}>
                <h2>Your Progress</h2>
              </div>
              <div className="donut-chart">
                <div className="donut-chart-inner">
                  <span className="value">60%</span>
                  <span className="label">Complete</span>
                </div>
              </div>
              <p className="progress-caption">6 of 10 tasks complete</p>
            </div>

            <div className="card stat-card">
              <div className="stat-icon">✅</div>
              <div>
                <div className="stat-value">6</div>
                <div className="stat-label">Tasks Completed</div>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon">📋</div>
              <div>
                <div className="stat-value">4</div>
                <div className="stat-label">Tasks Remaining</div>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-1-1">
            <div className="card next-task-card">
              <span className="next-task-label">Next Up</span>
              <h3>Task Name</h3>
              <p>Complete this task at the assigned office.</p>
              <div className="next-task-footer">
                <span className="tag">Due Date</span>
                <button className="btn btn-primary btn-sm" type="button">Mark In Progress</button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Upcoming Deadlines</h2>
              </div>
              <div className="schedule-row">
                <span className="schedule-time">Day 1</span>
                <div>
                  <p>Task Name</p>
                  <span>Office Name</span>
                </div>
              </div>
              <div className="schedule-row">
                <span className="schedule-time">Day 2</span>
                <div>
                  <p>Task Name</p>
                  <span>Office Name</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h2>My Checklist Preview</h2>
              <span className="link">View Full Checklist</span>
            </div>
            <div className="grid grid-3">
              <div className="card task-card">
                <div className="task-card-top">
                  <h3>Task Name</h3>
                  <span className="badge badge-pending">Pending</span>
                </div>
                <p>Task description goes here.</p>
                <div className="task-card-meta">
                  <span className="priority priority-high">High</span>
                </div>
                <div className="task-card-footer">
                  <span className="task-due">Due Date</span>
                </div>
              </div>

              <div className="card task-card">
                <div className="task-card-top">
                  <h3>Task Name</h3>
                  <span className="badge badge-pending">Pending</span>
                </div>
                <p>Task description goes here.</p>
                <div className="task-card-meta">
                  <span className="priority priority-medium">Medium</span>
                </div>
                <div className="task-card-footer">
                  <span className="task-due">Due Date</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-1-1">
            <div className="card">
              <div className="card-header">
                <h2>Profile Summary</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div className="avatar avatar-md">U</div>
                <div>
                  <div style={{ fontWeight: 600 }}>User Name</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Unit</div>
                </div>
              </div>
              <div className="info-row">
                <span className="label">Duty Title</span>
                <span className="value">Duty Title</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">Email</span>
              </div>
              <div className="info-row">
                <span className="label">Phone</span>
                <span className="value">Phone</span>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Sponsor Information</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <div className="avatar avatar-md">C</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Contact</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Sponsor</div>
                </div>
              </div>
              <div className="info-row">
                <span className="label">Unit</span>
                <span className="value">Unit</span>
              </div>
              <div className="info-row">
                <span className="label">Phone</span>
                <span className="value">Phone</span>
              </div>
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">Email</span>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-1-1">
            <div className="card">
              <div className="card-header">
                <h2>Important Contacts</h2>
              </div>
              <div className="contact-row">
                <div>
                  <div className="contact-name">Contact</div>
                  <div className="contact-role">Sponsor</div>
                </div>
                <button className="btn btn-outline btn-sm" type="button">Call</button>
              </div>
              <div className="contact-row">
                <div>
                  <div className="contact-name">Contact</div>
                  <div className="contact-role">Supervisor</div>
                </div>
                <button className="btn btn-outline btn-sm" type="button">Call</button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Announcements</h2>
              </div>
              <div className="announcement-item">
                <span className="tag">General</span>
                <h3>Announcement</h3>
                <span className="date">Date</span>
              </div>
              <div className="announcement-item">
                <span className="tag">General</span>
                <h3>Announcement</h3>
                <span className="date">Date</span>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-1-1">
            <div className="card">
              <div className="card-header">
                <h2>Recent Activity</h2>
              </div>
              <div className="activity-item">
                <span className="dot"></span>
                <div>
                  <p>Task Name marked complete</p>
                  <span>Recently</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="dot"></span>
                <div>
                  <p>Profile updated</p>
                  <span>Recently</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-actions-grid">
                <div className="quick-action-tile">
                  <span className="icon">✅</span>
                  View Checklist
                </div>
                <div className="quick-action-tile">
                  <span className="icon">📇</span>
                  Find Office
                </div>
                <div className="quick-action-tile">
                  <span className="icon">👤</span>
                  Update Profile
                </div>
                <div className="quick-action-tile">
                  <span className="icon">💬</span>
                  Contact Sponsor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PersonnelDashboard
