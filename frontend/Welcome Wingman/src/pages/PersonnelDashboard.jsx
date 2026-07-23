import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
import "../css/PersonnelDashboard.css";
import "../styles/Profile.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";

export default function PersonnelDashboard() {
	const { LoggedIn } = useContext(UserContext);
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
	});
	const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success'
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		setError(null);

		try {
			const res = await fetch("http://localhost:8000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Could not create your account.");
			}

			setForm({ first_name: "", last_name: "", email: "", password: "" });
			setStatus("success");
		} catch (err) {
			setStatus("idle");
			setError(err.message);
		}
	}

	useEffect(() => {
		fetch("http://localhost:8000/users")
			.then((r) => r.json())
			.then((userData) => {
				setUsers(userData.users || []);
			})
			.catch(console.error);
	}, []);

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
						<h1>Personnel Management</h1>
						<p>Your personal in-processing overview.</p>
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
								Welcome back,{" "}
								{LoggedIn?.first_name && LoggedIn.last_name
									? `${LoggedIn.first_name} ${LoggedIn.last_name}`
									: ""}
							</h1>
							<span className="rank-tag">{LoggedIn.rank} · Unit</span>
							<p>You have 4 tasks remaining.</p>
							<div className="hero-actions">
								<button className="btn btn-primary" type="button">
									Continue Checklist
								</button>
								<button className="btn btn-outline" type="button">
									View Profile
								</button>
							</div>
						</div>
						<div className="hero-snapshot">
							<span className="snapshot-value">60%</span>
							<span className="snapshot-label">Complete</span>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Create Personnel</h2>
						</div>
						<form onSubmit={handleSubmit} className="form-group">
							<div className="form-row">
								<div className="form-field">
									<label htmlFor="first_name">First Name</label>
									<input
										type="text"
										name="first_name"
										placeholder="First name"
										value={form.first_name}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="form-field">
									<label htmlFor="last_name">Last Name</label>
									<input
										type="text"
										name="last_name"
										placeholder="Last name"
										value={form.last_name}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className="form-field">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={form.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="form-field">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={form.password}
									onChange={handleChange}
									required
								/>
							</div>
							{error && <div className="error-text">{error}</div>}
							{status === "success" && (
								<div className="success-text">
									Personnel created successfully.
								</div>
							)}
							<button
								type="submit"
								className="btn btn-primary"
								disabled={status === "submitting"}
							>
								{status === "submitting" ? "Creating..." : "Create Personnel"}
							</button>
						</form>
					</div>

					<div className="dashboard-row row-1-1"></div>

					<div className="card">
						<div className="card-header">
							<h1>All Personnel</h1>
						</div>
						<div className="personnel-info-header">
							<h3>Avatar</h3>
							<h3>Rank</h3>
							<h3>Name</h3>
							<h3>Contact Information</h3>
						</div>
						<ul className="personnel-info-card">
							{users.map((usr) => (
								<li key={usr.id ?? usr.email} className="personnel-item">
									<img
										src={usr.avatar || "/default-avatar.png"}
										alt={`${usr.first_name} ${usr.last_name}`}
									/>
									<span>{usr.rank}</span>
									<span>
										{usr.first_name} {usr.last_name}
									</span>
									<span>{usr.phone}</span>
									<button>Assign Manager</button>
								</li>
							))}
						</ul>
					</div>

					<div className="card">
						<div className="card-header">
							<h2>Sponsor Information</h2>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "var(--space-md)",
								marginBottom: "var(--space-md)",
							}}
						>
							<div className="avatar avatar-md">C</div>
							<div>
								<div style={{ fontWeight: 600 }}>Contact</div>
								<div
									style={{ fontSize: "12px", color: "var(--text-secondary)" }}
								>
									Assigned Sponsor
								</div>
							</div>
						</div>
						<div className="info-row">
							<span className="label">Unit</span>
							<span className="value">Unit</span>
						</div>
						<div className="info-row">
							<span className="label">Phone</span>
							<span className="value">Phone</span>
						</div>
						<div className="info-row">
							<span className="label">Email</span>
							<span className="value">Email</span>
						</div>
					</div>

					<div className="dashboard-row row-1-1">
						<div className="card">
							<div className="card-header">
								<h2>Important Contacts</h2>
							</div>
							<div className="contact-row">
								<div>
									<div className="contact-name">Contact</div>
									<div className="contact-role">Sponsor</div>
								</div>
								<button className="btn btn-outline btn-sm" type="button">
									Call
								</button>
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
						</div>

						<div className="card">
							<div className="card-header">
								<h2>Announcements</h2>
							</div>
							<div className="announcement-item"></div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
