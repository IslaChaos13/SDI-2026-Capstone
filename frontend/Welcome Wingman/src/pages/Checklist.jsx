import { useState, useEffect } from "react";
import "../css/Checklist.css";

export default function Checklist() {
	const API = "http://localhost:8000";

	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [taskItem, setTaskItem] = useState(null);

	useEffect(() => {
		fetch(`${API}/tasks`)
			.then((res) => res.json())
			.then((json) => setTasks(json.tasks))
			.catch((err) => console.error(err));

		fetch(`${API}/user_tasks`)
			.then((res) => res.json())
			.then((json) => setUserTasks(json.user_tasks))
			.catch((err) => console.error(err));

		fetch(`${API}/users`)
			.then((res) => res.json())
			.then((json) => setUsers(json.users))
			.catch((err) => console.error(err));
	}, []);

	// Task IDs assigned to the selected user, via the join table
	const assignedTaskIds = selectedUser
		? userTasks
				.filter((ut) => ut.user_id === selectedUser)
				.map((ut) => ut.task_id)
		: [];

	// Full task objects for those IDs
	const visibleTasks = selectedUser
		? tasks.filter((task) => assignedTaskIds.includes(task.id))
		: tasks;

	return (
		<>
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

						<p>{task.due_date}</p>
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

						<p>Due: {taskItem.due_date}</p>
						<p>Details: {taskItem.action_item}</p>

						<button onClick={() => setTaskItem(null)}>Close</button>
					</div>
				</div>
			)}
		</>
	);
}