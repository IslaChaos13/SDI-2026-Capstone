import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import './Dashboard.css'
import './AdminDashboard.css'

function AdminDashboard() {
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
            <h1>Admin Dashboard</h1>
            <p>Organization-wide in-processing overview.</p>
          </div>

          <div className="admin-stats-row">
            <div className="card stat-card">
              <div className="stat-icon">👥</div>
              <div>
                <div className="stat-value">10</div>
                <div className="stat-label">Total Personnel</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon">📥</div>
              <div>
                <div className="stat-value">2</div>
                <div className="stat-label">Checked In Today</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon">⏳</div>
              <div>
                <div className="stat-value">4</div>
                <div className="stat-label">In-Processing</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon">✅</div>
              <div>
                <div className="stat-value">6</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon">⚠</div>
              <div>
                <div className="stat-value">1</div>
                <div className="stat-label">Overdue Tasks</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon">🕒</div>
              <div>
                <div className="stat-value">3</div>
                <div className="stat-label">Pending Approvals</div>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-2-1">
            <div className="card">
              <div className="card-header">
                <h2>Overall In-Processing Status</h2>
              </div>
              <div className="readiness-card-body">
                <div
                  className="donut-chart"
                  style={{
                    width: '150px',
                    height: '150px',
                    background: 'conic-gradient(var(--accent) 0% 60%, rgba(184, 199, 217, 0.18) 60% 100%)',
                  }}
                >
                  <div className="donut-chart-inner" style={{ width: '106px', height: '106px' }}>
                    <span className="value">60%</span>
                    <span className="label">Complete</span>
                  </div>
                </div>
                <div className="readiness-figures">
                  <div className="readiness-figure">
                    <span className="figure-value">10</span>
                    <span className="figure-label">Total Personnel</span>
                  </div>
                  <div className="readiness-figure">
                    <span className="figure-value">6</span>
                    <span className="figure-label">Completed</span>
                  </div>
                  <div className="readiness-figure">
                    <span className="figure-value">4</span>
                    <span className="figure-label">In-Processing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Weekly Processing</h2>
              </div>
              <div className="bar-chart">
                <div className="bar-chart-col">
                  <span className="bar-chart-value">3</span>
                  <div className="bar-chart-bar" style={{ height: '30%' }}></div>
                  <span className="bar-chart-label">Mon</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">5</span>
                  <div className="bar-chart-bar" style={{ height: '50%' }}></div>
                  <span className="bar-chart-label">Tue</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">2</span>
                  <div className="bar-chart-bar" style={{ height: '20%' }}></div>
                  <span className="bar-chart-label">Wed</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">7</span>
                  <div className="bar-chart-bar" style={{ height: '70%' }}></div>
                  <span className="bar-chart-label">Thu</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">4</span>
                  <div className="bar-chart-bar" style={{ height: '40%' }}></div>
                  <span className="bar-chart-label">Fri</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">1</span>
                  <div className="bar-chart-bar" style={{ height: '10%' }}></div>
                  <span className="bar-chart-label">Sat</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">1</span>
                  <div className="bar-chart-bar" style={{ height: '10%' }}></div>
                  <span className="bar-chart-label">Sun</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-1-1">
            <div className="card">
              <div className="card-header">
                <h2>Personnel by Rank</h2>
              </div>
              <div className="bar-chart">
                <div className="bar-chart-col">
                  <span className="bar-chart-value">6</span>
                  <div className="bar-chart-bar" style={{ height: '60%' }}></div>
                  <span className="bar-chart-label">Rank 1</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">8</span>
                  <div className="bar-chart-bar" style={{ height: '80%' }}></div>
                  <span className="bar-chart-label">Rank 2</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">5</span>
                  <div className="bar-chart-bar" style={{ height: '50%' }}></div>
                  <span className="bar-chart-label">Rank 3</span>
                </div>
                <div className="bar-chart-col">
                  <span className="bar-chart-value">2</span>
                  <div className="bar-chart-bar" style={{ height: '20%' }}></div>
                  <span className="bar-chart-label">Rank 4</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Personnel by Unit</h2>
              </div>
              <div className="hbar-row">
                <span className="hbar-label">Unit A</span>
                <div className="hbar-track"><div className="hbar-fill" style={{ width: '80%' }}></div></div>
                <span className="hbar-value">8</span>
              </div>
              <div className="hbar-row">
                <span className="hbar-label">Unit B</span>
                <div className="hbar-track"><div className="hbar-fill" style={{ width: '60%' }}></div></div>
                <span className="hbar-value">6</span>
              </div>
              <div className="hbar-row">
                <span className="hbar-label">Unit C</span>
                <div className="hbar-track"><div className="hbar-fill" style={{ width: '40%' }}></div></div>
                <span className="hbar-value">4</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <div className="card-header">
              <h2>Personnel Progress</h2>
              <span className="link">View All</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    <th>Unit</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User 1</td>
                    <td>Rank</td>
                    <td>Unit A</td>
                    <td>
                      <div className="table-progress">
                        <div className="track"><div className="fill" style={{ width: '60%' }}></div></div>
                        <span>60%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-pending">In-Processing</span></td>
                  </tr>
                  <tr>
                    <td>User 2</td>
                    <td>Rank</td>
                    <td>Unit B</td>
                    <td>
                      <div className="table-progress">
                        <div className="track"><div className="fill" style={{ width: '30%' }}></div></div>
                        <span>30%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-overdue">Overdue</span></td>
                  </tr>
                  <tr>
                    <td>User 3</td>
                    <td>Rank</td>
                    <td>Unit C</td>
                    <td>
                      <div className="table-progress">
                        <div className="track"><div className="fill" style={{ width: '100%' }}></div></div>
                        <span>100%</span>
                      </div>
                    </td>
                    <td><span className="badge badge-complete">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-row row-3">
            <div className="card">
              <div className="card-header">
                <h2>Users Requiring Attention</h2>
              </div>
              <div className="list-row">
                <div>
                  <h3>User Name</h3>
                  <div className="meta">1 overdue task · Unit A</div>
                </div>
                <button className="btn btn-outline btn-sm" type="button">Review</button>
              </div>
              <div className="list-row">
                <div>
                  <h3>User Name</h3>
                  <div className="meta">Missing training · Unit B</div>
                </div>
                <button className="btn btn-outline btn-sm" type="button">Review</button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Pending Approvals</h2>
              </div>
              <div className="list-row">
                <div>
                  <h3>Request</h3>
                  <div className="meta">Contact · Due Date</div>
                </div>
                <div className="approval-actions">
                  <button className="btn btn-outline btn-sm" type="button">Approve</button>
                </div>
              </div>
              <div className="list-row">
                <div>
                  <h3>Request</h3>
                  <div className="meta">Contact · Due Date</div>
                </div>
                <div className="approval-actions">
                  <button className="btn btn-outline btn-sm" type="button">Approve</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Recently Added Personnel</h2>
              </div>
              <div className="list-row">
                <div>
                  <h3>User Name</h3>
                  <div className="meta">Unit A</div>
                </div>
                <span className="tag">Date Added</span>
              </div>
              <div className="list-row">
                <div>
                  <h3>User Name</h3>
                  <div className="meta">Unit B</div>
                </div>
                <span className="tag">Date Added</span>
              </div>
            </div>
          </div>

          <div className="dashboard-row row-3">
            <div className="card">
              <div className="card-header">
                <h2>Base-Wide Announcements</h2>
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

            <div className="card">
              <div className="card-header">
                <h2>Recent System Activity</h2>
              </div>
              <div className="activity-item">
                <span className="dot"></span>
                <div>
                  <p>New user account created</p>
                  <span>Recently</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="dot"></span>
                <div>
                  <p>Task list updated</p>
                  <span>Recently</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Admin Quick Actions</h2>
              </div>
              <div className="quick-actions-grid">
                <div className="quick-action-tile">
                  <span className="icon">🕒</span>
                  Review Approvals
                </div>
                <div className="quick-action-tile">
                  <span className="icon">👥</span>
                  View Personnel
                </div>
                <div className="quick-action-tile">
                  <span className="icon">📊</span>
                  Generate Report
                </div>
                <div className="quick-action-tile">
                  <span className="icon">📋</span>
                  Manage Tasks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
