import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Circle, ListChecks } from "lucide-react";

import UserIcon from "../components/UserIcon";
import LoginButton from "../components/LoginButton";
import Layout from "../components/Layout";
import "../css/theme.css";
import "../styles/MyChecklist.css";

// ---------------- Component ----------------

export default function MyChecklist({ LoggedIn }) {
	const API = "http://localhost:8000";

	const [tasks, setTasks] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [taskItem, setTaskItem] = useState(null);
	const [notes, setNotes] = useState("");
	const [filter, setFilter] = useState("all");
	//----------------Save Notes ---------------

	const saveNotes = async () => {
		if (!taskItem) return;

		try {
			const response = await fetch(`${API}/user_tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: taskItem.id,
					note: notes,
					is_complete: taskItem.is_complete,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save notes");
			}

			// Update the page state so the new note appears immediately
			setUserTasks((prev) =>
				prev.map((ut) => (ut.id === taskItem.id ? { ...ut, note: notes } : ut)),
			);

			// Clear modal
			setTaskItem(null);
			setNotes("");
		} catch (error) {
			console.error(error);
		}
	};

	// ---------------- Fetch ----------------

	useEffect(() => {
		Promise.all([
			fetch(`${API}/tasks`).then((r) => r.json()),
			fetch(`${API}/user_tasks`).then((r) => r.json()),
		])
			.then(([taskData, userTaskData]) => {
				setTasks(taskData.tasks || []);
				setUserTasks(userTaskData || []);
			})
			.catch(console.error);
	}, []);

	// ---------------- Visible Tasks ----------------

	const visibleTasks = useMemo(() => {
		if (!LoggedIn) return [];

		let results = userTasks
			.filter((ut) => ut.user_id === LoggedIn.id)
			.map((ut) => {
				const task = tasks.find((t) => t.id === ut.task_id);
				return { ...ut, ...task, note: ut.note };
			})
			.filter((task) => task.id);

		if (filter === "complete") results = results.filter((t) => t.is_complete);
		if (filter === "incomplete")
			results = results.filter((t) => !t.is_complete);

		return results;
	}, [userTasks, tasks, LoggedIn, filter]);

	// ---------------- Progress ----------------

	const completed = visibleTasks.filter((t) => t.is_complete).length;

	const completionRate = visibleTasks.length
		? Math.round((completed / visibleTasks.length) * 100)
		: 0;

	// ---------------- Toggle ----------------

	const toggleTask = async (taskId) => {
		const target = userTasks.find((ut) => ut.id === taskId);
		if (!target) return;

		const updated = { ...target, is_complete: !target.is_complete };

		setUserTasks((prev) =>
			prev.map((ut) =>
				ut.id === taskId ? { ...ut, is_complete: !ut.is_complete } : ut,
			),
		);

		setTaskItem((prev) =>
			prev && prev.id === taskId
				? { ...prev, is_complete: !prev.is_complete }
				: prev,
		);

		try {
			const response = await fetch(`${API}/user_tasks`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: updated.id,
					note: updated.note,
					is_complete: updated.is_complete,
				}),
			});
			if (!response.ok) throw new Error("Failed to update task status");
		} catch (error) {
			console.error(error);
			setUserTasks((prev) =>
				prev.map((ut) => (ut.id === taskId ? target : ut)),
			);
		}
	};
	// ------------------ Format Date --------

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
					<p>
						{LoggedIn?.first_name
							? `Track ${LoggedIn.first_name}'s in-processing tasks.`
							: "Track your in-processing tasks."}
					</p>
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

				<div className="checklist-table">
					<div className="task-row task-row-header">
						<h2>
							<ListChecks size={18} /> Tasks ({visibleTasks.length})
						</h2>
						<h3>Priority</h3>
						<h3>Due Date</h3>
					</div>

					<ul className="task-list">
						{visibleTasks.map((task) => (
							<li
								key={task.id}
								className="task-item task-row"
								onClick={() => {
									setTaskItem(task);
									setNotes(task.note || "");
								}}
							>
								<div className="task-title-cell">
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
									</span>
								</div>
								<span className="task-priority">{task.priority}</span>
								<span className="task-priority">
									{formatDate(task.due_date)}
								</span>
							</li>
						))}
					</ul>

					{taskItem && (
						<div className="modal-overlay" onClick={() => setTaskItem(null)}>
							<div className="modal" onClick={(e) => e.stopPropagation()}>
								<h2>{taskItem.title}</h2>
								<p>Details: {taskItem.action_item}</p>
								<p>Due Date: {formatDate(taskItem.due_date)}</p>

								<div className="modal-notes-group">
									<label htmlFor="tasks-notes" className="modal-notes-label">
										Notes
									</label>
									<textarea
										id="task-notes"
										className="input"
										placeholder="Add any notes about this task..."
										rows={3}
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									/>
								</div>
								<button onClick={() => saveNotes()}>Save</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										toggleTask(taskItem.id);
									}}
									style={{
										color: taskItem.is_complete ? "#ffffff" : "#333333",
										backgroundColor: taskItem.is_complete
											? "#22c55e"
											: "#e5e7eb",
									}}
								>
									{taskItem.is_complete ? (
										<>
											<CheckCircle2 size={10} /> <span>Completed</span>
										</>
									) : (
										<>
											<Circle size={10} /> <span>Incomplete</span>
										</>
									)}
								</button>
								<button onClick={() => setTaskItem(null)}>Close</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
