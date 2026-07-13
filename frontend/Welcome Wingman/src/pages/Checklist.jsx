import { useState } from "react";
import "../css/Checklist.css";

export default function Checklist() {
	const users = [
		{
			user_id: 1,
			rank: "E01",
			first_name: "Joe",
			last_name: "Smoe",
			email: "Joe.Smoe.1@test.com",
			phone: "555-555-5555",
			address: "123 ABC Lane",
		},
		{
			user_id: 2,
			rank: "E03",
			first_name: "Max",
			last_name: "Gold",
			email: "Max.Gold.1@test.com",
			phone: "555-555-7777",
			address: "456 ABC Lane",
		},
	];

	const [taskItem, setTaskItem] = useState(null);

	const [tasks, setTasks] = useState([
		{
			id: 1,
			action_item: "Add information to division recall roster.",
			description:
				"See CSS, they will add your contact information to the division recall roster",
			dueDate: "2026-07-31",
			is_complete: false,
			assignedTo: null,
		},
		{
			id: 2,
			action_item: "Assign AEF band.",
			description: "Speak to your division chief to assign you to the AEF band",
			dueDate: "2026-07-31",
			is_complete: false,
			assignedTo: null,
		},
		{
			id: 3,
			action_item: "Update AFPAAS information.",
			description: "Update your duty and home location in AFPAAS",
			dueDate: "2026-07-31",
			is_complete: false,
			assignedTo: null,
		},
		{
			id: 4,
			action_item: "Schedule meet and greet with division chief",
			description: "Reach out to the division chief via email or phone.",
			dueDate: "2026-07-31",
			is_complete: false,
			assignedTo: null,
		},
		{
			id: 5,
			action_item: "Contact your division security manager",
			description:
				"Members must accomplish security training before being gained in DISS",
			dueDate: "2026-07-31",
			is_complete: false,
			assignedTo: null,
		},
	]);

	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedTasks, setSelectedTasks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const getAssignedUser = (userId) => {
		return users.find((user) => user.user_id === userId);
	};

	const toggleTask = (taskId) => {
		setSelectedTasks((current) =>
			current.includes(taskId)
				? current.filter((id) => id !== taskId)
				: [...current, taskId],
		);
	};

	const assignTasks = () => {
		if (!selectedUser) {
			alert("Select a user first");
			return;
		}

		setTasks((currentTasks) =>
			currentTasks.map((task) =>
				selectedTasks.includes(task.id)
					? {
							...task,
							assignedTo: selectedUser,
						}
					: task,
			),
		);

		setSelectedTasks([]);
	};

	const toggleComplete = (id) => {
		setTasks((previousTasks) =>
			previousTasks.map((task) =>
				task.id === id
					? {
							...task,
							is_complete: !task.is_complete,
						}
					: task,
			),
		);
	};

	const filteredTasks = tasks.filter((task) => {
		const assignedUser = getAssignedUser(task.assignedTo);

		const searchValue = searchTerm.toLowerCase();

		return (
			task.action_item.toLowerCase().includes(searchValue) ||
			task.description.toLowerCase().includes(searchValue) ||
			task.dueDate.includes(searchValue) ||
			(assignedUser &&
				`${assignedUser.first_name} ${assignedUser.last_name}`
					.toLowerCase()
					.includes(searchValue))
		);
	});

	return (
		<>
			{/* <h2>Assign Tasks</h2>

			<select
				value={selectedUser || ""}
				onChange={(e) => setSelectedUser(Number(e.target.value))}
			>
				<option value="">-- Select User --</option>

				{users.map((user) => (
					<option key={user.user_id} value={user.user_id}>
						{user.rank} {user.first_name} {user.last_name}
					</option>
				))}
			</select>

			<h3>Select Tasks</h3>

			{filteredTasks.map((task) => (
				<div key={task.id}>
					<input
						type="checkbox"
						checked={selectedTasks.includes(task.id)}
						onChange={() => toggleTask(task.id)}
					/>

					{task.action_item}
				</div>
			))}

			<button onClick={assignTasks}>Assign Tasks</button>

			<div className="search-container">
				<input
					type="text"
					placeholder="Search tasks or users..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div> */}

			<div className="checklist-header">
				<h3>Status</h3>
				<h3>Action Item</h3>
				<h3>Assigned To</h3>
				<h3>Due Date</h3>
				<h3>Completion</h3>
			</div>

			<ul className="Checklist-Container">
				{filteredTasks.map((task) => {
					const assignedUser = getAssignedUser(task.assignedTo);

					return (
						<li
							className="checklist-item"
							key={task.id}
							onClick={() => setTaskItem(task)}
						>
							<input
								type="checkbox"
								checked={task.is_complete}
								onChange={() => toggleComplete(task.id)}
								onClick={(e) => e.stopPropagation()}
							/>

							<span>{task.action_item}</span>

							<span className="assigned-user">
								{assignedUser
									? `${assignedUser.first_name} ${assignedUser.last_name}`
									: "Unassigned"}
							</span>

							<span>{task.dueDate}</span>

							<span className={task.is_complete ? "complete" : "incomplete"}>
								{task.is_complete ? "Complete" : "Incomplete"}
							</span>
						</li>
					);
				})}
			</ul>

			{taskItem && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>{taskItem.action_item}</h2>

						<p>
							Assigned To:{" "}
							{getAssignedUser(taskItem.assignedTo)
								? `${getAssignedUser(taskItem.assignedTo).first_name} ${getAssignedUser(taskItem.assignedTo).last_name}`
								: "Unassigned"}
						</p>

						<p>Due: {taskItem.dueDate}</p>

						<p>Details: {taskItem.description}</p>

						<button onClick={() => setTaskItem(null)}>Close</button>
					</div>
				</div>
			)}
		</>
	);
}
