import { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
// import './Dashboard.css'
// import './AdminDashboard.css'
import "../css/TaskManagement.css";
import UserContext from "../context/UserContext";

function TaskManagement() {
	const { LoggedIn } = useContext(UserContext);

	const [mode, setMode] = useState("existing");

	const [users, setUsers] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [userTasks, setUserTasks] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/users")
			.then((r) => r.json())
			.then((data) => setUsers(data.users || []))
			.catch(console.error);

		fetch("http://localhost:8000/tasks")
			.then((r) => r.json())
			.then((data) => setTasks(data.tasks || []))
			.catch(console.error);

		fetch("http://localhost:8000/user_tasks")
			.then((r) => r.json())
			.then((data) => setUserTasks(data || []))
			.catch(console.error);
	}, []);

	const [assignUserId, setAssignUserId] = useState("");
	const [assignTaskId, setAssignTaskId] = useState("");
	const [assignPriority, setAssignPriority] = useState("Medium");
	const [assignDueDate, setAssignDueDate] = useState("");
	const [assignNotes, setAssignNotes] = useState("");

	function handleAssignTask() {
		fetch("http://localhost:8000/user_tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: assignUserId,
				task_id: assignTaskId,
				priority: assignPriority,
				due_date: assignDueDate,
				note: assignNotes,
			}),
		})
			.then((r) => r.json())
			.then(() => {
				return fetch("http://localhost:8000/user_tasks")
					.then((r) => r.json())
					.then((data) => setUserTasks(data || []));
			})
			.catch(console.error);
	}

	const [customTitle, setCustomTitle] = useState("");
	const [customDescription, setCustomDescription] = useState("");

	function handleCreateTask() {
		fetch("http://localhost:8000/tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: customTitle,
				action_item: customDescription,
			}),
		})
			.then((r) => r.json())
			.then(() => {
				return fetch("http://localhost:8000/tasks")
					.then((r) => r.json())
					.then((data) => setTasks(data.tasks || []));
			})
			.catch(console.error);
	}

	function handleRemoveAssignment(id) {
		fetch(`http://localhost:8000/user_tasks/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setUserTasks((prev) => prev.filter((ut) => ut.id !== id));
			})
			.catch(console.error);
	}

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

				<div className="card" style={{ marginBottom: "var(--space-lg)" }}>
					<div className="card-header">
						<h2>Assign Task</h2>
					</div>
					<div className="mode-tabs">
						<button
							className={mode === "existing" ? "mode-tab active" : "mode-tab"}
							type="button"
							onClick={() => setMode("existing")}
						>
							Assign Existing Task
						</button>
						<button
							className={mode === "custom" ? "mode-tab active" : "mode-tab"}
							type="button"
							onClick={() => setMode("custom")}
						>
							Create Custom Task
						</button>
					</div>

					{mode === "existing" && (
						<div className="mode-panel">
							<div className="assign-panel-grid">
								<div className="form-group">
									<label>Select Personnel</label>
									<select
										value={assignUserId}
										onChange={(e) => setAssignUserId(e.target.value)}
									>
										<option value="">Select User</option>
										{users.map((u) => (
											<option key={u.id} value={u.id}>
												{u.first_name} {u.last_name}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label>Select Existing Task</label>
									<select
										value={assignTaskId}
										onChange={(e) => setAssignTaskId(e.target.value)}
									>
										<option value="">Select Task</option>
										{tasks.map((t) => (
											<option key={t.id} value={t.id}>
												{t.title}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label>Priority</label>
									<select
										value={assignPriority}
										onChange={(e) => setAssignPriority(e.target.value)}
									>
										<option>Low</option>
										<option>Medium</option>
										<option>High</option>
									</select>
								</div>
								<div className="form-group">
									<label>Due Date</label>
									<input
										type="date"
										value={assignDueDate}
										onChange={(e) => setAssignDueDate(e.target.value)}
									/>
								</div>
								<div className="form-group full">
									<label>Notes</label>
									<textarea
										rows="3"
										placeholder="Notes"
										value={assignNotes}
										onChange={(e) => setAssignNotes(e.target.value)}
									></textarea>
								</div>
							</div>
							<button
								className="btn btn-primary"
								type="button"
								onClick={handleAssignTask}
							>
								Assign Task
							</button>
						</div>
					)}

					{mode === "custom" && (
						<div className="mode-panel">
							<div className="assign-panel-grid">
								<div className="form-group">
									<label>Select Personnel</label>
									<select>
										<option>Select User</option>
										{users.map((u) => (
											<option key={u.id} value={u.id}>
												{u.first_name} {u.last_name}
											</option>
										))}
									</select>
								</div>
								<div className="form-group">
									<label>Custom Task Title</label>
									<input
										type="text"
										placeholder="Custom Task Title"
										value={customTitle}
										onChange={(e) => setCustomTitle(e.target.value)}
									/>
								</div>
								<div className="form-group full">
									<label>Description</label>
									<textarea
										rows="2"
										placeholder="Description"
										value={customDescription}
										onChange={(e) => setCustomDescription(e.target.value)}
									></textarea>
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
							<button
								className="btn btn-primary"
								type="button"
								onClick={handleCreateTask}
							>
								Create &amp; Assign Task
							</button>
							<div className="task-preview">
								Preview: Custom Task Title · Category · Priority
								<span className="assigned-date">
									Created by Admin User · Created: Date
								</span>
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

				<div className="card" style={{ marginBottom: "var(--space-lg)" }}>
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
								{userTasks.map((ut) => (
									<tr key={ut.id}>
										<td>{ut.first_name} {ut.last_name}</td>
										<td>{ut.title}</td>
										<td>
											<span className="priority priority-medium">{ut.priority}</span>
										</td>
										<td>{ut.due_date}</td>
										<td>
											{ut.is_complete ? (
												<span className="badge badge-complete">Completed</span>
											) : (
												<span className="badge badge-pending">In Progress</span>
											)}
										</td>
										<td>
											<span className="assigned-name">Admin User</span>
											<span className="assigned-date">Assigned: Date</span>
										</td>
										<td>
											<div className="assignment-actions">
												<button className="btn btn-outline btn-sm" type="button">
													View
												</button>
												<button className="btn btn-outline btn-sm" type="button">
													Edit
												</button>
												<button
													className="btn btn-outline btn-sm"
													type="button"
													onClick={() => handleRemoveAssignment(ut.id)}
												>
													Remove
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="card" style={{ marginBottom: "var(--space-lg)" }}>
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
							<div className="library-card-meta">
								Created by Admin User · Created: Date
							</div>
							<div className="library-card-footer">
								<button className="btn btn-primary btn-sm" type="button">
									Assign
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Edit
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Archive
								</button>
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
							<div className="library-card-meta">
								Created by Admin User · Created: Date
							</div>
							<div className="library-card-footer">
								<button className="btn btn-primary btn-sm" type="button">
									Assign
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Edit
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Archive
								</button>
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
							<div className="library-card-meta">
								Created by Admin User · Created: Date
							</div>
							<div className="library-card-footer">
								<button className="btn btn-primary btn-sm" type="button">
									Assign
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Edit
								</button>
								<button className="btn btn-outline btn-sm" type="button">
									Archive
								</button>
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
							<div className="progress-fill" style={{ width: "60%" }}></div>
						</div>
						<span className="badge badge-pending">In Progress</span>
					</div>
					<div className="user-summary-row">
						<span className="user-summary-name">User 2</span>
						<span className="user-summary-counts">8 done · 2 left</span>
						<div className="progress-track">
							<div className="progress-fill" style={{ width: "80%" }}></div>
						</div>
						<span className="badge badge-complete">On Track</span>
					</div>
					<div className="user-summary-row">
						<span className="user-summary-name">User 3</span>
						<span className="user-summary-counts">3 done · 5 left</span>
						<div className="progress-track">
							<div className="progress-fill" style={{ width: "30%" }}></div>
						</div>
						<span className="badge badge-overdue">Behind</span>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default TaskManagement;
