import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
import "../styles/Profile.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

//TODO REWORK PAGE

function Profile() {
	const { LoggedIn, setLoggedIn } = useContext(UserContext);

	// const API = "http://localhost:8000";
	// // const [user, setUser] = useState(null)
	// const { userID } = useParams()
	// useEffect(() => {
	//   fetch(`${API}/users`)
	//     .then((r) => r.json())
	//     .then((userData) => {
	//       const users = userData.users || [];
	//       const matched = users.find((u) => String(u.id) === String(userID));
	//       setUser(matched || users[0] || null);
	//     })
	//     .catch(console.error);
	// }, [userID]);

	// if(!user) {return null;}

	return (
		<Layout LoggedIn={LoggedIn}>
			<div className="page">
				<div className="page-header">
					<h1>Profile</h1>
					<p>Your personal, contact, and account information.</p>
				</div>

				<div className="card profile-header-card">
					<div className="avatar avatar-xl">AJ</div>
					<div className="profile-header-info">
						<h1>
							{LoggedIn?.first_name && LoggedIn?.last_name
								? `${LoggedIn.first_name} ${LoggedIn.last_name}`
								: "Guest"}
						</h1>
						<p>Senior Airman · 2nd Bomb Wing · Systems Analyst</p>
						<div className="profile-header-tags">
							<span className="tag">E-4</span>
							<span className="badge badge-complete">Active</span>
						</div>
					</div>
					<button
						className="btn btn-outline"
						type="button"
						style={{ marginLeft: "auto" }}
					>
						Edit Profile
					</button>
				</div>

				<div className="profile-grid">
					<div className="card">
						<div className="card-header">
							<h2>User Information</h2>
						</div>
						<div className="info-row">
							<span className="label">First Name</span>
							<span className="value">{user?.first_name}</span>
						</div>
						<div className="info-row">
							<span className="label">Last Name</span>
							<span className="value">{user?.last_name}</span>
						</div>
						<div className="info-row">
							<span className="label">Duty Title</span>
							<span className="value">Systems Analyst</span>
						</div>
						<div className="info-row">
							<span className="label">Email</span>
							<span className="value">{user?.email}</span>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Contact Information</h2>
						</div>
						<div className="info-row">
							<span className="label">Phone</span>
							<span className="value">{user?.phone}</span>
						</div>
						<div className="info-row">
							<span className="label">Office</span>
							<span className="value">Bldg 245, Room 12</span>
						</div>
						<div className="info-row">
							<span className="label">Address</span>
							<span className="value">{user?.address}</span>
						</div>
						<div className="info-row">
							<span className="label">Emergency Contact</span>
							<span className="value">Marcus Johnson · (318) 555-0199</span>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Rank</h2>
						</div>
						<span className="rank-badge-large">E-4 · Senior Airman</span>
						<div className="info-row">
							<span className="label">Unit</span>
							<span className="value">2nd Bomb Wing</span>
						</div>
						<div className="info-row">
							<span className="label">Supervisor</span>
							<span className="value">TSgt. R. Martinez</span>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Account Information</h2>
						</div>
						<div className="info-row">
							<span className="label">Role</span>
							<span className="value">Standard User</span>
						</div>
						<div className="info-row">
							<span className="label">Account Created</span>
							<span className="value">Jul 10, 2026</span>
						</div>
						<div className="info-row">
							<span className="label">Last Login</span>
							<span className="value">Jul 14, 2026 · 8:02 AM</span>
						</div>
					</div>
				</div>

				<div className="profile-grid">
					<div className="card">
						<div className="card-header">
							<h2>Security Settings</h2>
						</div>
						<div className="security-row">
							<div>
								<h3>Password</h3>
								<p>Last changed 42 days ago</p>
							</div>
							<button className="btn btn-outline btn-sm" type="button">
								Change
							</button>
						</div>
						<div className="security-row">
							<div>
								<h3>Two-Factor Authentication</h3>
								<p>Adds an extra layer of security</p>
							</div>
							<div className="toggle-static on">
								<span className="toggle-knob"></span>
							</div>
						</div>
						<div className="security-row">
							<div>
								<h3>Login Alerts</h3>
								<p>Email me on new device sign-in</p>
							</div>
							<div className="toggle-static">
								<span className="toggle-knob"></span>
							</div>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Recent Activity</h2>
						</div>
						<div className="activity-item">
							<span className="dot"></span>
							<div>
								<p>Signed in from a new device</p>
								<span>Jul 14, 2026 · 8:02 AM</span>
							</div>
						</div>
						<div className="activity-item">
							<span className="dot"></span>
							<div>
								<p>Updated contact information</p>
								<span>Jul 13, 2026 · 3:45 PM</span>
							</div>
						</div>
						<div className="activity-item">
							<span className="dot"></span>
							<div>
								<p>Changed account password</p>
								<span>Jun 2, 2026 · 11:20 AM</span>
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="card-header">
						<h2>Achievements</h2>
					</div>
					<div className="achievement-row">
						<div className="achievement-chip">
							<span className="achievement-icon">🏅</span>
							<div>
								<span className="achievement-name">Fast Processor</span>
								<span className="achievement-date">Earned Jul 12, 2026</span>
							</div>
						</div>
						<div className="achievement-chip">
							<span className="achievement-icon">🎯</span>
							<div>
								<span className="achievement-name">Perfect Attendance</span>
								<span className="achievement-date">Earned Jul 8, 2026</span>
							</div>
						</div>
						<div className="achievement-chip">
							<span className="achievement-icon">🌅</span>
							<div>
								<span className="achievement-name">Early Bird</span>
								<span className="achievement-date">Earned Jul 5, 2026</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Profile;
