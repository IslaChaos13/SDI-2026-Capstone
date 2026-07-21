import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Dashboard() {
	const { LoggedIn } = useContext(UserContext);
	const navigate = useNavigate();
	const [userTasks, setUserTasks] = useState([]);
	const [weather, setWeather] = useState(null);
	let latitude = 32.50283298104374;
	let longitude = -93.66312248601946;
	const [showSupport, setShowSupport] = useState(false);

	useEffect(() => {
		fetch("http://localhost:8000/user_tasks")
			.then((r) => r.json())
			.then((data) => {
				setUserTasks(data || []);
			})
			.catch(console.error);
	}, []);

	useEffect(() => {
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=precipitation_probability_max&forecast_days=1&temperature_unit=fahrenheit&wind_speed_unit=mph`,
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setWeather(data);
			})
			.catch(console.error);
	}, []);

	const myTasks = userTasks.filter(
		(ut) =>
			LoggedIn &&
			ut.first_name === LoggedIn.first_name &&
			ut.last_name === LoggedIn.last_name,
	);
	const tasksCompleted = myTasks.filter((t) => t.is_complete).length;
	const tasksRemaining = myTasks.filter((t) => !t.is_complete).length;
	const completionPercent = myTasks.length
		? Math.round((tasksCompleted / myTasks.length) * 100)
		: 0;

	if (!LoggedIn) {
		return null;
	}

	return (
		<Layout>
			<div className="page dashboard-page">
				<div className="dashboard-bg">
					<div className="dashboard-bg-grid"></div>
					<div className="radar-rings">
						<div className="radar-ring"></div>
						<div className="radar-ring r2"></div>
						<div className="radar-ring r3"></div>
						<div className="radar-ring r4"></div>
						<div className="radar-crosshair"></div>
						<div className="radar-crosshair vertical"></div>
					</div>
					<svg className="dashboard-bg-jet" viewBox="0 0 240 240">
						<polygon points="120,0 128,70 230,130 230,145 135,118 128,160 165,210 165,222 122,190 120,240 118,190 75,222 75,210 112,160 105,118 10,145 10,130 112,70" />
					</svg>
				</div>

				<div className="dashboard-content">
					<div className="page-header">
						<h1>Dashboard</h1>
						<p>Overview of current status.</p>
					</div>

					<div
						className="card hero-panel"
						style={{ marginBottom: "var(--space-lg)" }}
					>
						<div className="hero-logo">★</div>
						<div className="hero-body">
							<div className="hero-brand">
								<span className="hero-brand-title">Welcome Wingman</span>
							</div>
							<h1>
								Welcome back, {LoggedIn?.rank}{" "}
								{LoggedIn?.first_name && LoggedIn?.last_name
									? `${LoggedIn.first_name} ${LoggedIn.last_name}`
									: ""}
							</h1>
							<span className="rank-tag">{LoggedIn.rank} · 2FSS</span>
							<p>You have 4 members schedule to arrive today.</p>
							{isAdmin && (
								<button
									className="btn btn-primary"
									type="button"
									onClick={() => navigate(`/${LoggedIn.id}/pdashboard`)}
									onClick={() => nav(`/${userId}/pdashboard`)}
								>
									Go to Personnel
								</button>
							)}
							<div className="hero-actions">
								<button
									className="btn btn-outline"
									type="button"
									onClick={() =>
										document
											.getElementById("schedule")
											?.scrollIntoView({ behavior: "smooth", block: "start" })
									}
								>
									View Schedule
								</button>
							</div>
						</div>
						<div className="hero-snapshot">
							<span className="snapshot-value">{completionPercent}%</span>
							<span className="snapshot-label">Complete</span>
						</div>
					</div>

					<div className="dashboard-row row-6">
						<div className="card stat-card">
							<div className="stat-icon">👥</div>
							<div>
								<div className="stat-value">8</div>
								<div className="stat-label">Checked In</div>
							</div>
						</div>
						<div className="card stat-card">
							<div className="stat-icon">📋</div>
							<div>
								<div className="stat-value">{tasksRemaining}</div>
								<div className="stat-label">Tasks Remaining</div>
							</div>
						</div>
						<div className="card stat-card">
							<div className="stat-icon">✅</div>
							<div>
								<div className="stat-value">{tasksCompleted}</div>
								<div className="stat-label">Completed</div>
							</div>
						</div>
						<div className="card stat-card">
							<div className="stat-icon">🕒</div>
							<div>
								<div className="stat-value">3</div>
								<div className="stat-label">Pending</div>
							</div>
						</div>
						<div className="card stat-card">
							<div className="stat-icon">📇</div>
							<div>
								<div className="stat-value">5</div>
								<div className="stat-label">Directory Visits</div>
							</div>
						</div>
						<div className="card stat-card">
							<div className="stat-icon">📈</div>
							<div>
								<div className="stat-value">{completionPercent}%</div>
								<div className="stat-label">Avg. Completion</div>
							</div>
						</div>
					</div>

					<div className="dashboard-row row-3">
						<div className="card" style={{ textAlign: "center" }}>
							<div className="card-header" style={{ justifyContent: "center" }}>
								<h2>Readiness</h2>
							</div>
							<div className="donut-chart">
								<div className="donut-chart-inner">
									<span className="value">70%</span>
									<span className="label">Ready</span>
								</div>
							</div>
							<div className="chart-legend">
								<div className="chart-legend-item">
									<span className="swatch-label">
										<span className="swatch accent"></span>Ready
									</span>
									<span>70%</span>
								</div>
								<div className="chart-legend-item">
									<span className="swatch-label">
										<span className="swatch primary"></span>In Progress
									</span>
									<span>20%</span>
								</div>
								<div className="chart-legend-item">
									<span className="swatch-label">
										<span className="swatch muted"></span>Not Started
									</span>
									<span>10%</span>
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Progress</h2>
							</div>
							<div className="progress-track progress-track-lg">
								<div
									className="progress-fill"
									style={{ width: `${completionPercent}%` }}
								></div>
							</div>
							<p className="progress-caption">
								{tasksCompleted} of {myTasks.length} tasks complete
							</p>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Weekly Processing</h2>
							</div>
							<div className="bar-chart">
								<div className="bar-chart-col">
									<span className="bar-chart-value">3</span>
									<div
										className="bar-chart-bar"
										style={{ height: "30%" }}
									></div>
									<span className="bar-chart-label">Mon</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">5</span>
									<div
										className="bar-chart-bar"
										style={{ height: "50%" }}
									></div>
									<span className="bar-chart-label">Tue</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">2</span>
									<div
										className="bar-chart-bar"
										style={{ height: "20%" }}
									></div>
									<span className="bar-chart-label">Wed</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">7</span>
									<div
										className="bar-chart-bar"
										style={{ height: "70%" }}
									></div>
									<span className="bar-chart-label">Thu</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">4</span>
									<div
										className="bar-chart-bar"
										style={{ height: "40%" }}
									></div>
									<span className="bar-chart-label">Fri</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">1</span>
									<div
										className="bar-chart-bar"
										style={{ height: "10%" }}
									></div>
									<span className="bar-chart-label">Sat</span>
								</div>
								<div className="bar-chart-col">
									<span className="bar-chart-value">1</span>
									<div
										className="bar-chart-bar"
										style={{ height: "10%" }}
									></div>
									<span className="bar-chart-label">Sun</span>
								</div>
							</div>
						</div>
					</div>

					<div className="dashboard-row row-1-2">
						<div className="card">
							<div className="card-header">
								<h2 id="schedule">Today's Schedule</h2>
							</div>
							<div className="schedule-row">
								<span className="schedule-time">0900</span>
								<div>
									<p>Morning Standup</p>
									<span>Commander's Conference Room</span>
								</div>
							</div>
							<div className="schedule-row">
								<span className="schedule-time">1300</span>
								<div>
									<p>Mass In-Processing</p>
									<span>In-Processing Classroom</span>
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Monthly Activity</h2>
							</div>
							<div className="line-chart-wrapper">
								<svg
									className="line-chart"
									viewBox="0 0 420 150"
									preserveAspectRatio="none"
								>
									<line
										className="line-chart-grid"
										x1="0"
										y1="30"
										x2="420"
										y2="30"
									/>
									<line
										className="line-chart-grid"
										x1="0"
										y1="65"
										x2="420"
										y2="65"
									/>
									<line
										className="line-chart-grid"
										x1="0"
										y1="100"
										x2="420"
										y2="100"
									/>
									<polygon
										className="line-chart-fill"
										points="10,110 130,90 250,70 370,50 370,120 10,120"
									/>
									<polyline
										className="line-chart-line"
										points="10,110 130,90 250,70 370,50"
									/>
									<circle className="line-chart-dot" cx="10" cy="110" r="3" />
									<circle className="line-chart-dot" cx="130" cy="90" r="3" />
									<circle className="line-chart-dot" cx="250" cy="70" r="3" />
									<circle className="line-chart-dot" cx="370" cy="50" r="3" />
									<text className="line-chart-axis" x="10" y="138">
										1
									</text>
									<text className="line-chart-axis" x="126" y="138">
										2
									</text>
									<text className="line-chart-axis" x="246" y="138">
										3
									</text>
									<text className="line-chart-axis" x="362" y="138">
										4
									</text>
								</svg>
							</div>
						</div>
					</div>

					<div className="dashboard-row row-2-1">
						<div className="card">
							<div className="card-header">
								<h2>Upcoming Tasks</h2>
								<span
									className="link"
									onClick={() => nav(`/${userId}/Checklist`)}
								>
									View All
								</span>
							</div>
							{myTasks
								.filter((t) => !t.is_complete)
								.map((t) => (
									<div className="list-row" key={t.id}>
										<div>
											<h3>{t.title}</h3>
											<div className="meta">
												<span className="priority priority-medium">
													{t.priority}
												</span>
												<span>{formatDate(t.due_date)}</span>
											</div>
										</div>
										<span className="badge badge-pending">Pending</span>
									</div>
								))}
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Quick Actions</h2>
							</div>
							<div className="quick-actions-grid">
								<div
									className="quick-action-tile"
									onClick={() => navigate(`/${LoggedIn.id}/Checklist`)}
								>
									<span className="icon">✅</span>
									View Checklist
								</div>
								<div
									className="quick-action-tile"
									onClick={() => navigate("/")}
								>
									<span className="icon">📇</span>
									Find Office
								</div>
								<div
									className="quick-action-tile"
									onClick={() => navigate(`/${LoggedIn.id}/profile`)}
								>
									<span className="icon">👤</span>
									Update Profile
								</div>
								<div
									className="quick-action-tile"
									onClick={() => setShowSupport((prev) => !prev)}
								>
									<span className="icon">💬</span>
									{showSupport ? "Close" : "Contact Support"}
								</div>
								{showSupport && (
									<div>
										<p>Support Contact:</p>
										<p>WelcomeWingman@us.af.mil</p>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="dashboard-row row-3">
						<div className="card">
							<div className="card-header">
								<h2>Recent Activity</h2>
							</div>
							<div className="activity-item">
								<span className="dot"></span>
								<div>
									<p>Task Name marked complete</p>
									<span>Recently</span>
								</div>
							</div>
							<div className="activity-item">
								<span className="dot"></span>
								<div>
									<p>Profile updated</p>
									<span>Recently</span>
								</div>
							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Announcements</h2>
							</div>
							<div className="announcement-item">
								<span className="tag">General</span>
								<h3>Announcement</h3>
								<span className="date">Date</span>
							</div>
							<div className="announcement-item">
								<span className="tag">General</span>
								<h3>Announcement</h3>
								<span className="date">Date</span>
							</div>
						</div>

						<div className="card weather-panel">
							<div className="card-header" style={{ justifyContent: "center" }}>
								<h2>Weather</h2>
							</div>
							<div className="weather-icon">Current Temperature</div>
							<div className="weather-temp">
								{weather
									? `${weather.current.temperature_2m} °F`
									: "Loading..."}
							</div>
							<div className="weather-forecast">
								<div className="weather-day">
									<span className="day-icon">Rain</span>
									{weather
										? `${weather.daily.precipitation_probability_max[0]}%`
										: "Loading..."}
								</div>
								<div className="weather-day">
									<span className="day-icon">Wind</span>
									{weather
										? `${weather.current.wind_speed_10m} mph`
										: "Loading..."}
								</div>
							</div>
						</div>
					</div>

					<div className="dashboard-row row-1-2">
						<div className="card">
							<div className="card-header">
								<h2>Important Contacts</h2>
							</div>
							<div className="contact-row">
								<div>
									<div className="contact-name">Contact</div>
									<div className="contact-role">Supervisor</div>
								</div>
								<button className="btn btn-outline btn-sm" type="button">
									Call
								</button>
							</div>
							<div className="contact-row">
								<div>
									<div className="contact-name">Contact</div>
									<div className="contact-role">Office Name</div>
								</div>
								<button className="btn btn-outline btn-sm" type="button">
									Call
								</button>
							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Notifications</h2>
							</div>
							<div className="notification-item unread">
								<div className="notification-icon">📄</div>
								<div>
									<p>Notification message</p>
									<span>Recently</span>
								</div>
							</div>
							<div className="notification-item">
								<div className="notification-icon">✅</div>
								<div>
									<p>Task Name marked complete</p>
									<span>Recently</span>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="card">
						<div className="card-header">
							<h2>Quick Links</h2>
						</div>
						<div className="quick-links-strip">
							<span
								className="quick-link-pill"
								onClick={() => navigate(`/${userId}/dashboard`)}
							>
								🏠 Dashboard
							</span>
							<span
								className="quick-link-pill"
								onClick={() => navigate(`/${userId}/checklist`)}
							>
								✅ My Checklist
							</span>
							<span className="quick-link-pill" onClick={() => navigate(`/`)}>
								📇 Base Directory
							</span>
							<span
								className="quick-link-pill"
								onClick={() => navigate(`/${userId}/profile`)}
							>
								👤 Profile
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</Layout>
	);
}

export default Dashboard;
