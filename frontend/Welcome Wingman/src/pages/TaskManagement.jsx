import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
// import './Dashboard.css'
// import './AdminDashboard.css'
import '../css/TaskManagement.css'

function TaskManagement() {
  const [mode, setMode] = useState('existing')

  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <h1>Task Management</h1>
          <p>Assign tasks and monitor personnel progress</p>
        </div>

        <div className="dashboard-row row-4">
          <div className="card stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <div className="stat-value">10</div>
              <div className="stat-label">Total Tasks</div>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <div className="stat-value">6</div>
              <div className="stat-label">Assigned Tasks</div>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">🕒</div>
            <div>
              <div className="stat-value">4</div>
              <div className="stat-label">Unassigned Tasks</div>
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-icon">⚠</div>
            <div>
              <div className="stat-value">1</div>
              <div className="stat-label">Overdue Tasks</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">
            <h2>Assign Task</h2>
          </div>
          <div className="mode-tabs">
            <button
              className={mode === 'existing' ? 'mode-tab active' : 'mode-tab'}
              type="button"
              onClick={() => setMode('existing')}
            >
              Assign Existing Task
            </button>
            <button
              className={mode === 'custom' ? 'mode-tab active' : 'mode-tab'}
              type="button"
              onClick={() => setMode('custom')}
            >
              Create Custom Task
            </button>
          </div>

          {mode === 'existing' && (
            <div className="mode-panel">
              <div className="assign-panel-grid">
                <div className="form-group">
                  <label>Select Personnel</label>
                  <select>
                    <option>Select User</option>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Existing Task</label>
                  <select>
                    <option>Select Task</option>
                    <option>Task 1</option>
                    <option>Task 2</option>
                    <option>Task 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" />
                </div>
                <div className="form-group full">
                  <label>Notes</label>
                  <textarea rows="3" placeholder="Notes"></textarea>
                </div>
              </div>
              <button className="btn btn-primary" type="button">Assign Task</button>
            </div>
          )}

          {mode === 'custom' && (
            <div className="mode-panel">
              <div className="assign-panel-grid">
                <div className="form-group">
                  <label>Select Personnel</label>
                  <select>
                    <option>Select User</option>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Custom Task Title</label>
                  <input type="text" placeholder="Custom Task Title" />
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea rows="2" placeholder="Description"></textarea>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select>
                    <option>General</option>
                    <option>Training</option>
                    <option>Records</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" />
                </div>
                <div className="form-group full">
                  <label>Notes</label>
                  <textarea rows="3" placeholder="Notes"></textarea>
                </div>
              </div>
              <button className="btn btn-primary" type="button">Create &amp; Assign Task</button>
              <div className="task-preview">
                Preview: Custom Task Title · Category · Priority
                <span className="assigned-date">Created by Admin User · Created: Date</span>
              </div>
            </div>
          )}
        </div>

        <div className="filter-toolbar">
          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search assignments..." />
          </div>
          <select>
            <option>Status: All</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
          <select>
            <option>Priority: All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select>
            <option>Sort By: Due Date</option>
            <option>Sort By: Priority</option>
            <option>Sort By: Personnel</option>
          </select>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">
            <h2>Current Assignments</h2>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Personnel</th>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Assigned By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User 1</td>
                  <td>Task 1</td>
                  <td><span className="priority priority-high">High</span></td>
                  <td>Due Date</td>
                  <td><span className="badge badge-pending">In Progress</span></td>
                  <td>
                    <span className="assigned-name">Admin User</span>
                    <span className="assigned-date">Assigned: Date</span>
                  </td>
                  <td>
                    <div className="assignment-actions">
                      <button className="btn btn-outline btn-sm" type="button">View</button>
                      <button className="btn btn-outline btn-sm" type="button">Edit</button>
                      <button className="btn btn-outline btn-sm" type="button">Remove</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>User 2</td>
                  <td>Task 2</td>
                  <td><span className="priority priority-medium">Medium</span></td>
                  <td>Due Date</td>
                  <td><span className="badge badge-complete">Completed</span></td>
                  <td>
                    <span className="assigned-name">Admin User</span>
                    <span className="assigned-date">Assigned: Date</span>
                  </td>
                  <td>
                    <div className="assignment-actions">
                      <button className="btn btn-outline btn-sm" type="button">View</button>
                      <button className="btn btn-outline btn-sm" type="button">Edit</button>
                      <button className="btn btn-outline btn-sm" type="button">Remove</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>User 3</td>
                  <td>Task 3</td>
                  <td><span className="priority priority-low">Low</span></td>
                  <td>Due Date</td>
                  <td><span className="badge badge-overdue">Overdue</span></td>
                  <td>
                    <span className="assigned-name">Admin User</span>
                    <span className="assigned-date">Assigned: Date</span>
                  </td>
                  <td>
                    <div className="assignment-actions">
                      <button className="btn btn-outline btn-sm" type="button">View</button>
                      <button className="btn btn-outline btn-sm" type="button">Edit</button>
                      <button className="btn btn-outline btn-sm" type="button">Remove</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">
            <h2>Task Library</h2>
          </div>
          <div className="grid grid-3">
            <div className="card library-card">
              <div className="library-card-top">
                <h3>Task 1</h3>
                <span className="badge badge-complete">Active</span>
              </div>
              <div className="library-card-meta">
                <span className="tag">General</span>
                <span className="priority priority-high">High</span>
              </div>
              <div className="library-card-meta">Assigned to 4 users</div>
              <div className="library-card-meta">Created by Admin User · Created: Date</div>
              <div className="library-card-footer">
                <button className="btn btn-primary btn-sm" type="button">Assign</button>
                <button className="btn btn-outline btn-sm" type="button">Edit</button>
                <button className="btn btn-outline btn-sm" type="button">Archive</button>
              </div>
            </div>
            <div className="card library-card">
              <div className="library-card-top">
                <h3>Task 2</h3>
                <span className="badge badge-complete">Active</span>
              </div>
              <div className="library-card-meta">
                <span className="tag">Training</span>
                <span className="priority priority-medium">Medium</span>
              </div>
              <div className="library-card-meta">Assigned to 2 users</div>
              <div className="library-card-meta">Created by Admin User · Created: Date</div>
              <div className="library-card-footer">
                <button className="btn btn-primary btn-sm" type="button">Assign</button>
                <button className="btn btn-outline btn-sm" type="button">Edit</button>
                <button className="btn btn-outline btn-sm" type="button">Archive</button>
              </div>
            </div>
            <div className="card library-card">
              <div className="library-card-top">
                <h3>Task 3</h3>
                <span className="tag">Archived</span>
              </div>
              <div className="library-card-meta">
                <span className="tag">Records</span>
                <span className="priority priority-low">Low</span>
              </div>
              <div className="library-card-meta">Assigned to 1 user</div>
              <div className="library-card-meta">Created by Admin User · Created: Date</div>
              <div className="library-card-footer">
                <button className="btn btn-primary btn-sm" type="button">Assign</button>
                <button className="btn btn-outline btn-sm" type="button">Edit</button>
                <button className="btn btn-outline btn-sm" type="button">Archive</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>User Task Summary</h2>
          </div>
          <div className="user-summary-row">
            <span className="user-summary-name">User 1</span>
            <span className="user-summary-counts">6 done · 4 left</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            <span className="badge badge-pending">In Progress</span>
          </div>
          <div className="user-summary-row">
            <span className="user-summary-name">User 2</span>
            <span className="user-summary-counts">8 done · 2 left</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
            <span className="badge badge-complete">On Track</span>
          </div>
          <div className="user-summary-row">
            <span className="user-summary-name">User 3</span>
            <span className="user-summary-counts">3 done · 5 left</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '30%' }}></div>
            </div>
            <span className="badge badge-overdue">Behind</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TaskManagement