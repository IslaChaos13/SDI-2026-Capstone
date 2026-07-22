import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	useCallback,
} from "react";
import UserContext from "./UserContext";
import {
	useDueDateNotifications,
	requestNotificationPermission,
	DEFAULT_DUE_SOON_DAYS,
} from "../components/Notifications.jsx";

const API = "http://localhost:8000";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
	const { LoggedIn } = useContext(UserContext);

	const [tasks, setTasks] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [pings, setPings] = useState([]);

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

	const notifiableTasks = useMemo(() => {
		if (!LoggedIn) return [];

		return userTasks
			.filter(
				(ut) =>
					ut.first_name === LoggedIn.first_name &&
					ut.last_name === LoggedIn.last_name &&
					ut.id &&
					!ut.is_complete &&
					ut.due_date,
			)
			.map((ut) => ({ id: ut.id, label: ut.title, due_date: ut.due_date }));
	}, [userTasks, LoggedIn]);

	const onNotify = useCallback((item, status, message) => {
		setPings((prev) => [
			...prev,
			{ toastId: `${item.id}-${Date.now()}`, status, message },
		]);
	}, []);

	const dueStatuses = useDueDateNotifications(notifiableTasks, {
		dueSoonDays: DEFAULT_DUE_SOON_DAYS,
		checkInterval: 60 * 60 * 1000, // re-check hourly
		onNotify,
	});

	const dismissPings = (toastId) => {
		setPings((prev) => prev.filter((t) => t.toastId !== toastId));
	};

	const alertCount = Object.values(dueStatuses).filter(
		(s) => s.status === "overdue" || s.status === "due-soon",
	).length;

	const value = {
		tasks,
		userTasks,
		setUserTasks,
		dueStatuses,
		pings,
		dismissPings,
		alertCount,
		requestNotificationPermission,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
