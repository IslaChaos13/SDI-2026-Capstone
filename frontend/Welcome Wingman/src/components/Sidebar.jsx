import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import "../styles/theme.css";
import "./Sidebar.css";

function Sidebar() {
	const navigate = useNavigate();
	const { LoggedIn, logout } = useContext(UserContext);
	const userId = LoggedIn?.id;
	const isAdmin = LoggedIn?.is_admin;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<aside className="app-sidebar">
			<div
				className="nav-item active"
				onClick={() => navigate(`/${userId}/dashboard`)}
			>
				<span className="nav-icon">🏠</span>
				<span className="nav-label">Dashboard</span>
			</div>
			<div
				className="nav-item"
				onClick={() => navigate(`/${userId}/checklist`)}
			>
				<span className="nav-icon">✅</span>
				<span className="nav-label">In-Processing Checklist</span>
			</div>
			<div className="nav-item" onClick={() => navigate(`/`)}>
				<span className="nav-icon">📇</span>
				<span className="nav-label">Base Directory</span>
			</div>
			<div className="nav-item" onClick={() => navigate(`/${userId}/profile`)}>
				<span className="nav-icon">👤</span>
				<span className="nav-label">Profile</span>
			</div>

			{isAdmin && (
				<>
					<hr className="sidebar-divider" />
					<div className="sidebar-section-label">Admin</div>

					<div
						className="nav-item"
						onClick={() => navigate(`/${userId}/pdashboard`)}
					>
						<span className="nav-icon">👥</span>
						<span className="nav-label">Personnel</span>
					</div>
					<div
						className="nav-item"
						onClick={() => navigate(`/${userId}/tasks`)}
					>
						<span className="nav-icon">📋</span>
						<span className="nav-label">Tasks</span>
					</div>
					<div className="nav-item">
						<span className="nav-icon">📊</span>
						<span className="nav-label">Reports</span>
					</div>
					<div className="nav-item">
						<span className="nav-icon">⚙</span>
						<span className="nav-label">Settings</span>
					</div>
				</>
			)}

			<div className="sidebar-footer">
				<hr className="sidebar-divider" />
				<div className="nav-item" onClick={handleLogout}>
					<span className="nav-icon">🚪</span>
					<span className="nav-label">Logout</span>

					{/* onClick={()=>setLoggedIn(null)} */}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
