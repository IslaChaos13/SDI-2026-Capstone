import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import './MyChecklist.css'

// Static mockup only — no data, no logic, no routing.
function MyChecklist() {
  return (
    <Layout>
      <div className="page">
        <div className="checklist-header">
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1>My Checklist</h1>
            <p>Track your in-processing tasks from start to finish.</p>
          </div>
        </div>

        <div className="card checklist-progress-card">
          <div className="progress-label">
            <span className="percent">64%</span>
            <span>7 of 11 tasks complete</span>
          </div>
          <div className="progress-track progress-track-lg">
            <div className="progress-fill" style={{ width: '64%' }}></div>
          </div>
        </div>

        <div className="filter-bar">
          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search tasks..." readOnly />
          </div>
          <button className="filter-chip active" type="button">All</button>
          <button className="filter-chip" type="button">Pending</button>
          <button className="filter-chip" type="button">Complete</button>
          <button className="filter-chip" type="button">Overdue</button>
          <button className="filter-chip" type="button">High Priority</button>
        </div>

        <div className="checklist-section-title">
          Pending <span className="count">4</span>
        </div>
        <div className="grid grid-3">
          <div className="card task-card">
            <div className="task-card-top">
              <h3>Update LeaveWeb Profile</h3>
              <span className="badge badge-pending">Pending</span>
            </div>
            <p>Update your location, unit, and supervisor information.</p>
            <div className="task-card-meta">
              <span className="priority priority-medium">Medium</span>
            </div>
            <div className="task-card-footer">
              <span className="task-due">Due Jul 17, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>

          <div className="card task-card">
            <div className="task-card-top">
              <h3>Update SOES (SGLI)</h3>
              <span className="badge badge-pending">Pending</span>
            </div>
            <p>Update and verify life insurance info via milConnect.</p>
            <div className="task-card-meta">
              <span className="priority priority-medium">Medium</span>
            </div>
            <div className="task-card-footer">
              <span className="task-due">Due Jul 20, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>

          <div className="card task-card">
            <div className="task-card-top">
              <h3>Update Government Travel Card</h3>
              <span className="badge badge-pending">Pending</span>
            </div>
            <p>Transfer GTC and report change of address to CITI bank.</p>
            <div className="task-card-meta">
              <span className="priority priority-low">Low</span>
            </div>
            <div className="task-card-footer">
              <span className="task-due">Due Jul 22, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>

          <div className="card task-card">
            <div className="task-card-top">
              <h3>Complete Initial Security Training</h3>
              <span className="badge badge-overdue">Overdue</span>
            </div>
            <p>Meet with the unit security manager to complete training.</p>
            <div className="task-card-meta">
              <span className="priority priority-high">High</span>
            </div>
            <div className="task-card-footer">
              <span className="task-due">Due Jul 20, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>
        </div>

        <div className="checklist-section-title">
          Completed <span className="count">7</span>
        </div>
        <div className="grid grid-3">
          <div className="card task-card is-complete">
            <div className="task-card-top">
              <h3>Visit the Welcome Center</h3>
              <span className="badge badge-complete">Complete</span>
            </div>
            <p>Schedule and attend the Welcome Center appointment.</p>
            <div className="task-card-footer">
              <span className="task-due">Completed Jul 12, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>

          <div className="card task-card is-complete">
            <div className="task-card-top">
              <h3>Update vMPF Information</h3>
              <span className="badge badge-complete">Complete</span>
            </div>
            <p>Verify home address, phone, and duty information.</p>
            <div className="task-card-footer">
              <span className="task-due">Completed Jul 11, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>

          <div className="card task-card is-complete">
            <div className="task-card-top">
              <h3>Division Chief Meet &amp; Greet</h3>
              <span className="badge badge-complete">Complete</span>
            </div>
            <p>Scheduled a meeting with the division chief.</p>
            <div className="task-card-footer">
              <span className="task-due">Completed Jul 10, 2026</span>
              <button className="btn btn-outline btn-sm" type="button">View</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyChecklist
