import { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
// import './Dashboard.css'
// import './AdminDashboard.css'
import "../css/TaskManagement.css";
import "../styles/MyChecklist.css";
import UserContext from "../context/UserContext";

function TaskManagement() {
	const { LoggedIn } = useContext(UserContext);

	const [mode, setMode] = useState("existing");

	const [users, setUsers] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [priorityFilter, setPriorityFilter] = useState("All");
	const [sortBy, setSortBy] = useState("Due Date");
	const [viewingTask, setViewingTask] = useState(null);
	const [editingTask, setEditingTask] = useState(null);

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
			.then(() => {
				setAssignUserId("");
				setAssignTaskId("");
				setAssignPriority("Medium");
				setAssignDueDate("");
				setAssignNotes("");
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
			.then(() => fetch("http://localhost:8000/tasks"))
			.then((r) => r.json())
			.then((data) => {
				const freshTasks = data.tasks || [];
				setTasks(freshTasks);
				// the new task has no id in the create response, so find it
				// by title in the refreshed list (highest id = most recent)
				const newTask = freshTasks
					.filter((t) => t.title === customTitle)
					.sort((a, b) => b.id - a.id)[0];
				if (!newTask || !assignUserId) return null;
				return fetch("http://localhost:8000/user_tasks", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_id: assignUserId,
						task_id: newTask.id,
						priority: assignPriority,
						due_date: assignDueDate,
						note: assignNotes,
					}),
				});
			})
			.then(() => fetch("http://localhost:8000/user_tasks"))
			.then((r) => r.json())
			.then((data) => {
				setUserTasks(data || []);
				setCustomTitle("");
				setCustomDescription("");
				setAssignUserId("");
				setAssignTaskId("");
				setAssignPriority("Medium");
				setAssignDueDate("");
				setAssignNotes("");
			})
			.catch(console.error);
	}

	function handleSaveEdit() {
		fetch("http://localhost:8000/user_tasks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: editingTask.id,
				note: editingTask.note,
				is_complete: editingTask.is_complete,
			}),
		})
			.then(() => {
				setUserTasks((prev) =>
					prev.map((ut) => (ut.id === editingTask.id ? { ...ut, ...editingTask } : ut)),
				);
				setEditingTask(null);
			})
			.catch(console.error);
	}

	function getStatus(ut) {
		if (ut.is_complete) return "Completed";
		if (ut.due_date && new Date(ut.due_date) < new Date()) return "Overdue";
		return "Pending";
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

	const formatDate = (isoString) =>
		new Date(isoString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
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
						<input
							type="text"
							placeholder="Search assignments..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value="All">Status: All</option>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
						<option value="Overdue">Overdue</option>
					</select>
					<select
						value={priorityFilter}
						onChange={(e) => setPriorityFilter(e.target.value)}
					>
						<option value="All">Priority: All</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
					<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="Due Date">Sort By: Due Date</option>
						<option value="Priority">Sort By: Priority</option>
						<option value="Personnel">Sort By: Personnel</option>
					</select>
				</div>

				<div className="card" style={{ marginBottom: "var(--space-lg)" }}>
					<div className="card-header">
						<h2>Current Assignments</h2>
					</div>
					<div className="table-wrapper assignments-scroll">
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
								{userTasks
									.filter((ut) =>
										`${ut.first_name} ${ut.last_name}`
											.toLowerCase()
											.includes(searchTerm.toLowerCase()),
									)
									.filter(
										(ut) => priorityFilter === "All" || ut.priority === priorityFilter,
									)
									.filter(
										(ut) => statusFilter === "All" || getStatus(ut) === statusFilter,
									)
									.sort((a, b) => {
										if (sortBy === "Due Date") return new Date(a.due_date) - new Date(b.due_date);
										if (sortBy === "Priority") {
											const rank = { High: 3, Medium: 2, Low: 1 };
											return rank[b.priority] - rank[a.priority];
										}
										return `${a.first_name} ${a.last_name}`.localeCompare(
											`${b.first_name} ${b.last_name}`,
										);
									})
									.map((ut) => (
									<tr key={ut.id}>
										<td>
											{ut.first_name} {ut.last_name}
										</td>
										<td>{ut.title}</td>
										<td>
											<span className={`priority priority-${ut.priority.toLowerCase()}`}>
												{ut.priority}
											</span>
										</td>
										<td>{formatDate(ut.due_date)}</td>
										<td>
											{getStatus(ut) === "Completed" && (
												<span className="badge badge-complete">Completed</span>
											)}
											{getStatus(ut) === "Overdue" && (
												<span className="badge badge-overdue">Overdue</span>
											)}
											{getStatus(ut) === "Pending" && (
												<span className="badge badge-pending">Pending</span>
											)}
										</td>
										<td>
											<span className="assigned-name">Admin User</span>
											<span className="assigned-date">Assigned: Date</span>
										</td>
										<td>
											<div className="assignment-actions">
												<button
													className="btn btn-outline btn-sm"
													type="button"
													onClick={() => setViewingTask(ut)}
												>
													View
												</button>
												<button
													className="btn btn-outline btn-sm"
													type="button"
													onClick={() => setEditingTask({ ...ut })}
												>
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
					<div className="library-scroll">
						{tasks.map((t) => (
							<div className="card library-card" key={t.id}>
								<div className="library-card-top">
									<h3>{t.title}</h3>
								</div>
								<div className="library-card-meta">{t.action_item}</div>
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
						))}
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

				{viewingTask && (
					<div className="modal-overlay" onClick={() => setViewingTask(null)}>
						<div className="modal" onClick={(e) => e.stopPropagation()}>
							<h2>{viewingTask.title}</h2>
							<p>Assigned to: {viewingTask.first_name} {viewingTask.last_name}</p>
							<p>Description: {viewingTask.action_item}</p>
							<p>Priority: {viewingTask.priority}</p>
							<p>Status: {getStatus(viewingTask)}</p>
							<p>Due Date: {formatDate(viewingTask.due_date)}</p>
							<p>Notes: {viewingTask.note || "None"}</p>
							<p>Assigned By: Admin User</p>
							<button onClick={() => setViewingTask(null)}>Close</button>
						</div>
					</div>
				)}

				{editingTask && (
					<div className="modal-overlay" onClick={() => setEditingTask(null)}>
						<div className="modal" onClick={(e) => e.stopPropagation()}>
							<h2>Edit Assignment</h2>
							<div className="form-group">
								<label>Priority</label>
								<select
									value={editingTask.priority}
									onChange={(e) =>
										setEditingTask({ ...editingTask, priority: e.target.value })
									}
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
									value={editingTask.due_date ? editingTask.due_date.slice(0, 10) : ""}
									onChange={(e) =>
										setEditingTask({ ...editingTask, due_date: e.target.value })
									}
								/>
							</div>
							<div className="form-group">
								<label>Completed</label>
								<select
									value={editingTask.is_complete ? "yes" : "no"}
									onChange={(e) =>
										setEditingTask({
											...editingTask,
											is_complete: e.target.value === "yes",
										})
									}
								>
									<option value="no">Not Complete</option>
									<option value="yes">Complete</option>
								</select>
							</div>
							<div className="form-group">
								<label>Notes</label>
								<textarea
									rows="3"
									value={editingTask.note || ""}
									onChange={(e) =>
										setEditingTask({ ...editingTask, note: e.target.value })
									}
								></textarea>
							</div>
							<button className="btn btn-primary" type="button" onClick={handleSaveEdit}>
								Save
							</button>
							<button
								className="btn btn-outline"
								type="button"
								onClick={() => setEditingTask(null)}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default TaskManagement;
