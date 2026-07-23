import { useState, useEffect, useMemo, useContext } from "react";
import { Pencil, Trash2 } from "lucide-react";

import UserContext from "../context/UserContext";
import UserIcon from "../components/UserIcon";
import LoginButton from "../components/LoginButton";
import UserContext from "../context/UserContext";
import UserIcon from "../components/UserIcon";
import LoginButton from "../components/LoginButton";
import Layout from "../components/Layout";
import "../css/theme.css";
import "../styles/MyChecklist.css";
import "../styles/MyChecklist.css";

// ---------------- Component ----------------

export default function MyChecklist() {
	const { LoggedIn } = useContext(UserContext);

	const { LoggedIn } = useContext(UserContext);

	const API = "http://localhost:8000";

	const [tasks, setTasks] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [taskItem, setTaskItem] = useState(null);
	const [notes, setNotes] = useState("");
	const [notes, setNotes] = useState("");
	const [filter, setFilter] = useState("all");
	const [isEditingNote, setIsEditingNote] = useState(false);

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
				throw new Error("Failed to save note");
			}

			// Update the page state so the new note appears immediately
			setUserTasks((prev) =>
				prev.map((ut) => (ut.id === taskItem.id ? { ...ut, note: notes } : ut)),
			);

			// Update the open task item and exit edit mode
			setTaskItem((prev) =>
				prev && prev.id === taskItem.id ? { ...prev, note: notes } : prev,
			);
			setIsEditingNote(false);
		} catch (error) {
			console.error(error);
		}
	};

	// ---------------- Delete Note ----------------

	const deleteNote = async () => {
		if (!taskItem) return;

		try {
			const response = await fetch(`${API}/user_tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: taskItem.id,
					note: "",
					is_complete: taskItem.is_complete,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to delete note");
			}

			setUserTasks((prev) =>
				prev.map((ut) => (ut.id === taskItem.id ? { ...ut, note: "" } : ut)),
			);

			setTaskItem((prev) =>
				prev && prev.id === taskItem.id ? { ...prev, note: "" } : prev,
			);
			setNotes("");
			setIsEditingNote(false);
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
			.then(([taskData, userTaskData]) => {
				setTasks(taskData.tasks || []);
				setUserTasks(userTaskData || []);
			})
					.catch(console.error);
			}, []);

		// ---------------- Visible Tasks ----------------

		const visibleTasks = useMemo(() => {
			if (!LoggedIn) return [];
			if (!LoggedIn) return [];

			let results = userTasks
				.filter(
					(ut) =>
						ut.first_name === LoggedIn.first_name &&
						ut.last_name === LoggedIn.last_name,
				)

				// .map((ut) => {
				// 	const task = tasks.find((t) => t.id === ut.task_id);
				// 	return { ...ut, ...task, note: ut.note };
				// })
				.filter((task) => task.id);
			let results = userTasks
				.filter(
					(ut) =>
						ut.first_name === LoggedIn.first_name &&
						ut.last_name === LoggedIn.last_name,
				)

				// .map((ut) => {
				// 	const task = tasks.find((t) => t.id === ut.task_id);
				// 	return { ...ut, ...task, note: ut.note };
				// })
				.filter((task) => task.id);

			if (filter === "complete") results = results.filter((t) => t.is_complete);
			if (filter === "incomplete")
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

					<div className="card" style={{ marginBottom: "var(--space-lg)" }}>
						<div className="card-header">
							<h2>Tasks</h2>
						</div>

						<div className="grid grid-3">
							{visibleTasks.map((task) => (
								<div
									className="card library-card"
									key={task.id}
									onClick={() => {
										setTaskItem(task);
										setNotes(task.note || "");
										setIsEditingNote(!task.note);
									}}
									style={{ cursor: "pointer" }}
								>
									<div className="task-title-cell">
										<input
											type="checkbox"
											checked={task.is_complete}
											onClick={(e) => e.stopPropagation()}
											onChange={(e) => {
												e.stopPropagation();
												toggleTask(task.id);
											}}
										/>
										<h3 className={task.is_complete ? "completed-task" : ""}>
											{task.title}
										</h3>
									</div>
									<div className="library-card-meta">
										Details: {task.action_item}
									</div>
									<div className="library-card-meta">
										Due Date: {formatDate(task.due_date)}
									</div>
									<h5>
										Priority:{".       "}
										<span
											className={`task-priority ${task.priority.toLowerCase()}`}
										>
											{task.priority}
										</span>
									</h5>
								</div>
							))}
						</div>
					</div>

					<>
						{taskItem && (
							<div className="modal-overlay" onClick={() => setTaskItem(null)}>
								<div className="modal" onClick={(e) => e.stopPropagation()}>
									<h2>{taskItem.title}</h2>
									<p>Details: {taskItem.action_item}</p>
									<p>Due Date: {formatDate(taskItem.due_date)}</p>

									<p>Due Date: {formatDate(taskItem.due_date)}</p>

									<div className="modal-notes-group">
										<label htmlFor="task-notes" className="modal-notes-label">
											Notes
										</label>

										{isEditingNote ? (
											<>
												<textarea
													id="task-notes"
													className="input"
													placeholder="Add any notes about this task..."
													rows={3}
													value={notes}
													onChange={(e) => setNotes(e.target.value)}
												/>
												<div className="modal-button-row">
													<button onClick={() => saveNotes()}>Save</button>
													{taskItem.note && (
														<button
															onClick={() => {
																setNotes(taskItem.note || "");
																setIsEditingNote(false);
															}}
														>
															Cancel
														</button>
													)}
												</div>
											</>
										) : (
											<>
												<p className="modal-notes-text">{taskItem.note}</p>
												<div className="modal-button-row">
													<button onClick={() => setIsEditingNote(true)}>
														<Pencil size={10} /> <span>Edit</span>
													</button>
													{taskItem.note && (
														<button onClick={() => deleteNote()}>
															<Trash2 size={10} /> <span>Remove</span>
														</button>
													)}
												</div>
											</>
										)}
									</div>
									<div className="modal-button-row">
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
											{taskItem.is_complete ? "Completed" : "Incomplete"}
										</button>
										<button onClick={() => setTaskItem(null)}>Close</button>
									</div>
								</div>
							</div>
						)}
					</>
				</div>
			</Layout>
		);
	}
