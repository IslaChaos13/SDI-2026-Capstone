import Logon from "./pages/Logon";
import AdminDashboard from "./pages/AdminDashboard";
import MyChecklist from "./pages/MyChecklist";
import Profile from "./pages/Profile";
import PersonnelDashboard from "./pages/PersonnelDashboard";
import Dashboard from "./pages/Dashboard";
import BaseDirectory from "./pages/BaseDirectory";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskManagement from "./pages/TaskManagement";
import UserContext from "./context/UserContext";
import NotificationContext, {
	NotificationProvider,
} from "./context/NotificationContext";
// const SESSION_DURATION_MS = 30 * 60 * 1000;
// const SESSION_DURATION_MS = 10 * 1000; // 10 seconds, for testing
function App() {
	const [LoggedIn, setLoggedIn] = useState(null)

	useEffect(() => {
		fetch("http://localhost:8000/userAuth", {credentials: "include"})
		.then((res) => res.json())
		.then((data) => data.user && setLoggedIn(data.user))
		.catch(() => {})
	}, [])

	const logout = () => {
		fetch("http://localhost:8000/logout", {
			method: "POST",
			credentials: "include",
		}).finally(() => setLoggedIn(null))
	};
	const value = { LoggedIn, setLoggedIn, logout};


	// 	try {
	// 		const saved = localStorage.getItem("user");
	// 		if (!saved) return null;

	// 		const session = JSON.parse(saved);
	// 		if (!session.expiresAt || Date.now() > session.expiresAt) {
	// 			localStorage.removeItem("user");
	// 			return null;
	// 		}
	// 		return session.user;
	// 		// return saved ? JSON.parse(saved) : null
	// 	} catch {
	// 		localStorage.removeItem("user");
	// 		return null;
	// 	}
	// });

	// const loginWithSession = (userData) => {
	// 	const session = {
	// 		user: userData,
	// 		expiresAt: Date.now() + SESSION_DURATION_MS,
	// 	};
	// 	localStorage.setItem("user", JSON.stringify(session));
	// 	setLoggedIn(userData);
	// };



	return (
		<UserContext.Provider value={value}>
			<NotificationProvider>
				<div>
					<Routes>
						<Route path="/" element={<BaseDirectory LoggedIn={LoggedIn} />} />
						<Route
							path="/login"
							element={<Logon LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
						/>
						<Route path="/directory" element={<BaseDirectory />} />
						<Route path="/:UserID/tasks" element={<TaskManagement />} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/:UserID/Checklist" element={<MyChecklist />} />
						<Route path="/:UserID/profile" element={<Profile />} />
						<Route path="/:UserID/dashboard" element={<Dashboard />} />
						<Route
							path="/:UserID/pdashboard"
							element={<PersonnelDashboard />}
						/>
						<Route path="/*" element={<ErrorPage />} />
					</Routes>
				</div>
			</NotificationProvider>
		</UserContext.Provider>
	);
}
export default App;
