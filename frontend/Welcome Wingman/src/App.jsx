import Logon from "./Pages/Logon";
import AdminDashboard from "./Pages/AdminDashboard";
import MyChecklist from "./Pages/MyChecklist";
import Profile from "./Pages/Profile";
import PersonnelDashboard from "./Pages/PersonnelDashboard";
import Dashboard from "./Pages/Dashboard";
import BaseDirectory from "./Pages/BaseDirectory";
import ErrorPage from "./Pages/ErrorPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import TaskManagement from "./Pages/TaskManagement";
import UserContext from "./context/UserContext";

// const SESSION_DURATION_MS = 30 * 60 * 1000;
const SESSION_DURATION_MS = 10 * 1000; // 10 seconds, for testing
function App() {
	const [LoggedIn, setLoggedIn] = useState(() => {
		try {
			const saved = localStorage.getItem("user");
			if (!saved) return null;

			const session = JSON.parse(saved);
			if (!session.expiresAt || Date.now() > session.expiresAt) {
				localStorage.removeItem("user");
				return null;
			}
			return session.user;
			// return saved ? JSON.parse(saved) : null
		} catch {
			localStorage.removeItem("user");
			return null;
		}
	});

	const loginWithSession = (userData) => {
		const session = {
			user: userData,
			expiresAt: Date.now() + SESSION_DURATION_MS,
		};
		localStorage.setItem("user", JSON.stringify(session));
		setLoggedIn(userData);
	};

	const logout = () => {
		localStorage.removeItem("user");
		setLoggedIn(null);
	};
	const value = { LoggedIn, setLoggedIn: loginWithSession, logout };

	return (
		<UserContext.Provider value={value}>
			<div>
				<Routes>
					<Route path="/" element={<BaseDirectory LoggedIn={LoggedIn} />} />
					<Route
						path="/login"
						element={<Logon LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
					/>
					<Route
						path="/directory"
						element={<BaseDirectory LoggedIn={LoggedIn} />}
					/>
					<Route path="/:UserID/tasks" element={<TaskManagement />} />
					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/:UserID/Checklist" element={<MyChecklist />} />
					<Route
						path="/:UserID/profile"
						element={<Profile LoggedIn={LoggedIn} />}
					/>
					<Route path="/:UserID/dashboard" element={<Dashboard />} />
					<Route
						path="/:UserID/pdashboard"
						element={<PersonnelDashboard LoggedI={LoggedIn} />}
					/>
					<Route path="/*" element={<ErrorPage />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}
export default App;
