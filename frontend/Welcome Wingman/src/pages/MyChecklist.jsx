import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Circle, ListChecks } from "lucide-react";

import Layout from "../components/Layout";
import "../css/theme.css";
import "../styles/MyChecklist.css"

// ---------------- Permissions ----------------

const PERMISSIONS = {
	admin: ["manage_users", "assign_tasks", "manage_tasks", "view_own_tasks"],
	task_manager: ["manage_tasks", "assign_tasks", "view_own_tasks"],
	user: ["view_own_tasks"],
};

const hasPermission = (user, permission) =>
	user?.roles?.some((role) => PERMISSIONS[role]?.includes(permission));

// ---------------- Component ----------------

export default function MyChecklist() {
	const API = "http://localhost:8000";

	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [taskItem, setTaskItem] = useState(null);

  const [notes, setNotes] = useState("")

	const [currentUserId, setCurrentUserId] = useState("");
	const [filter, setFilter] = useState("all");
  //----------------Save Notes ---------------

  const saveNotes = async () => {
  try {
    const response = await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: taskItem.id,
        notes: notes,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save notes");
    }

    const data = await response.json();
    console.log("Saved:", data);

    setTaskItem(null);
    setNotes("");

  } catch (error) {
    console.error("Error saving notes:", error);
  }
};


	// ---------------- Fetch ----------------

	useEffect(() => {
		Promise.all([
			fetch(`${API}/tasks`).then((r) => r.json()),
			fetch(`${API}/users`).then((r) => r.json()),
			fetch(`${API}/user_tasks`).then((r) => r.json()),
		])
			.then(([taskData, userData, userTaskData]) => {
				setTasks(taskData.tasks || []);
				setUsers(userData.users || []);
				setUserTasks(userTaskData || []);

				if (userData.users?.length) {
					setCurrentUserId(userData.users[0].id);
				}
			})
			.catch(console.error);
	}, []);

	// ---------------- Current User ----------------

	const currentUser = users.find((u) => u.id === currentUserId);

	const isAdmin = hasPermission(currentUser, "manage_users");
	const canManage = hasPermission(currentUser, "manage_tasks");

	// ---------------- Visible Tasks ----------------

	const visibleTasks = useMemo(() => {
		if (!currentUser) return [];

		let results = tasks;

		// Normal users only see assigned tasks
		if (!isAdmin && !canManage) {
			const assignedTitles = userTasks
				.filter(
					(ut) =>
						ut.first_name === currentUser.first_name &&
						ut.last_name === currentUser.last_name,
				)
				.map((ut) => ut.title);

			results = tasks.filter((task) => assignedTitles.includes(task.title));
		}

		if (filter === "complete") {
			results = results.filter((t) => t.is_complete);
		}

		if (filter === "incomplete") {
			results = results.filter((t) => !t.is_complete);
		}

		return results;
	}, [tasks, currentUser, userTasks, filter, isAdmin, canManage]);

	// ---------------- Progress ----------------

	const completed = visibleTasks.filter((t) => t.is_complete).length;

	const completionRate = visibleTasks.length
		? Math.round((completed / visibleTasks.length) * 100)
		: 0;

	// ---------------- Toggle ----------------

	const toggleTask = (id) => {
		setTasks((prev) =>
			prev.map((t) =>
				t.id === id ? { ...t, is_complete: !t.is_complete } : t,
			),
		);
	};

	// ------------------- Format Date --------

	const formatDate = (isoString) =>
		new Date(isoString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

	// ---------------- UI ----------------

	return (
		<Layout>
			<div className="page">
				<div className="page-header">
					<h1>My Checklist</h1>
					<p>Track your in-processing tasks.</p>
				</div>

				<div className="card checklist-progress-card">
					<div className="progress-label">
						<span className="percent">{completionRate}%</span>
						<span>
							{completed} of {visibleTasks.length} tasks complete
						</span>
					</div>

					<div className="progress-track progress-track-lg">
						<div
							className="progress-fill"
							style={{ width: `${completionRate}%` }}
						/>
					</div>
				</div>

				<div className="filter-bar">
					<select
						value={currentUserId}
						onChange={(e) => setCurrentUserId(Number(e.target.value))}
					>
						{users.map((u) => (
							<option key={u.id} value={u.id}>
								{u.first_name} {u.last_name}
							</option>
						))}
					</select>

					<button
						className={filter === "all" ? "filter-chip active" : "filter-chip"}
						onClick={() => setFilter("all")}
					>
						All
					</button>

					<button
						className={
							filter === "incomplete" ? "filter-chip active" : "filter-chip"
						}
						onClick={() => setFilter("incomplete")}
					>
						Incomplete
					</button>

					<button
						className={
							filter === "complete" ? "filter-chip active" : "filter-chip"
						}
						onClick={() => setFilter("complete")}
					>
						Complete
					</button>
				</div>

				<div className="card">
					<h2>
						<ListChecks size={18} /> Tasks ({visibleTasks.length})
					</h2>

					<ul className="task-list">
						{visibleTasks.map((task) => (
							<li
								key={task.id}
								className="task-item"
								onClick={() => setTaskItem(task)}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										toggleTask(task.id);
									}}
								>
									{task.is_complete ? (
										<CheckCircle2 size={10} />
									) : (
										<Circle size={10} />
									)}
								</button>

								<span className={task.is_complete ? "completed-task" : ""}>
									{task.title}
									{formatDate(task.due_date)}
								</span>
							</li>
						))}
					</ul>

					{taskItem && (
						<div className="modal-overlay" onClick={() => setTaskItem(null)}>
							<div className="modal" onClick={(e) => e.stopPropagation()}>
								<h2>{taskItem.title}</h2>
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
                <button button onClick={() => {
                    setTaskItem(task);
                    setNotes(task.notes || "");
                    }}>Save </button>

								<button onClick={() => setTaskItem(null)}>Close</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
