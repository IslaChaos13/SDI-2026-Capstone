import Logon from "./pages/Logon";
import AdminDashboard from "./pages/AdminDashboard";
import MyChecklist from "./pages/MyChecklist";
import Profile from "./pages/Profile";
import PersonnelDashboard from "./pages/PersonnelDashboard";
import Dashboard from "./pages/Dashboard";
import BaseDirectory from "./pages/BaseDirectory";
import ErrorPage from "./pages/ErrorPage";
import ReportsPage from "./pages/ReportsPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskManagement from "./pages/TaskManagement";
import UserContext from "./context/UserContext";
import RequireAuth from "./components/RequireAuth"

function App() {
	const [LoggedIn, setLoggedIn] = useState(null);
	const [authChecked, setAuthChecked] = useState(false)

	useEffect(() => {
		fetch("http://localhost:8000/userAuth", { credentials: "include" })
			.then((res) => res.json())
			.then((data) => data.user && setLoggedIn(data.user))
			.catch(() => { })
			.finally(() => setAuthChecked(true))
	}, []);

	const logout = () => {
		fetch("http://localhost:8000/logout", {
			method: "POST",
			credentials: "include",
		}).finally(() => setLoggedIn(null));
	};
	const value = { LoggedIn, setLoggedIn, logout, authChecked };

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
					<Route
						path="/:UserID/tasks"
						element={
							<RequireAuth>
								<TaskManagement />
							</RequireAuth>
						}
					/>
					<Route path="/admin" element={<AdminDashboard />} />
					<Route
						path="/:UserID/Checklist"
						element={
							<RequireAuth>
								<MyChecklist />
							</RequireAuth>
						}
					/>
					<Route
						path="/:UserID/profile"
						element={
							<RequireAuth>
								<Profile LoggedIn={LoggedIn} />
							</RequireAuth>
						}
					/>
					<Route
						path="/:UserID/dashboard"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="/:UserID/pdashboard"
						element={<PersonnelDashboard LoggedI={LoggedIn} />}
					/>
					<Route path="/*" element={<ErrorPage />} />
					<Route path="/reports" element={<ReportsPage />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}
export default App;
