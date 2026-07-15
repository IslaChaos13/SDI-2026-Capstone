import { useState, useEffect } from "react";
import "../css/Checklist.css";
export default function Checklist() {
	const API = "http://localhost:8000";
	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [taskItem, setTaskItem] = useState(null);
	// --- Original fetch
	useEffect(() => {
		fetch(`${API}/tasks`)
			.then((res) => res.json())
			.then((json) => {
				console.log(json.tasks); // check this in browser console
				setTasks(json.tasks);
			})
			.catch((err) => console.error(err));
		fetch(`${API}/user_tasks`)
			.then((res) => res.json())
			.then((json) => {
				setUserTasks(json ?? []);
			})
			.catch((err) => console.error(err));
		fetch(`${API}/users`)
			.then((res) => res.json())
			.then((json) => setUsers(json.users))
			.catch((err) => console.error(err));
	}, []);
	const selectedUserObj = selectedUser
		? users.find((u) => u.id === selectedUser)
		: null;
	const assignedTaskTitles = selectedUserObj
		? userTasks
				.filter(
					(ut) =>
						ut.first_name === selectedUserObj.first_name &&
						ut.last_name === selectedUserObj.last_name,
				)
				.map((ut) => ut.title)
		: null;
	const visibleTasks = selectedUserObj
		? tasks.filter((task) => assignedTaskTitles.includes(task.title))
		: tasks;
	const formatDate = (isoString) =>
		new Date(isoString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	return (
		<>
			<div className="page">
				<div className="page-header" style={{ marginBottom: 0 }}>
					<h1>My Checklist</h1>
					<p>Track your in-processing tasks from start to finish.</p>
				</div>
				<div className="card checklist-progress-card">
					<div className="progress-label">
						<span className="percent">65%</span>
						<span> 7 of 11 tasks complete</span>
					</div>
				</div>
				<div className="user-select-container">
					<label htmlFor="user-select">View tasks for:</label>
					<select
						id="user-select"
						value={selectedUser || ""}
						onChange={(e) =>
							setSelectedUser(e.target.value ? Number(e.target.value) : null)
						}
					>
						<option value="">-- All Users --</option>
						{users.map((user) => (
							<option key={user.id} value={user.id}>
								{user.first_name} {user.last_name}
							</option>
						))}
					</select>
				</div>
				<div className="checklist-header">
					<h3>Status</h3>
					<h3>Action Item</h3>
					<h3>Due Date</h3>
				</div>
				<ul className="checklist-container">
					{visibleTasks.map((task) => (
						<li
							className="checklist-item"
							key={task.id}
							onClick={() => setTaskItem(task)}
						>
							<span className={task.is_complete ? "complete" : "incomplete"}>
								{task.is_complete ? "Complete" : "Incomplete"}
							</span>
							<p>{task.action_item}</p>
							<p>{formatDate(task.due_date)}</p>
						</li>
					))}
					{visibleTasks.length === 0 && (
						<li className="checklist-empty">No tasks assigned to this user.</li>
					)}
				</ul>
				{taskItem && (
					<div className="modal-overlay" onClick={() => setTaskItem(null)}>
						<div className="modal" onClick={(e) => e.stopPropagation()}>
							<h2>{taskItem.action_item}</h2>
							<p>Due: {formatDate(taskItem.due_date)}</p>
							<p>Details: {taskItem.action_item}</p>
							<div className="modal-notes-group">
								<label htmlFor="tasks-notes" classname="modal-notes-label">
									Notes
								</label>
								<textarea
									id="task-notes"
									className="input"
									placehodler="Add any notes about this task..."
									rows={3}
								/>
							</div>

							<button onClick={() => setTaskItem(null)}>Close</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
