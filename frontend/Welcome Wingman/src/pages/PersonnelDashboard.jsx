import Layout from "../components/Layout.jsx";
import "../styles/theme.css";
import "../css/PersonnelDashboard.css";
import "../styles/Profile.css";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { EditUserProvider } from "../context/EditUserContext";
import EditUserModal from "../components/EditUserModal";
import { useEditUser } from "../context/EditUserContext";
import MW from "../assets/MW.png";

const EMPTY_FORM = {
	rank: "",
	first_name: "",
	last_name: "",
	unit: "",
	address: "",
	email: "",
	password: "",
};
const API = "http://localhost:8000";

export default function PersonnelDashboard() {
	const nav = useNavigate();
	const { LoggedIn } = useContext(UserContext);
	const [form, setForm] = useState(EMPTY_FORM);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [loadingDirectory, setLoadingDirectory] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredUsers = users.filter((usr) => {
		const fullName =
			`${usr.first_name ?? ""} ${usr.last_name ?? ""}`.toLowerCase();
		const term = searchTerm.trim().toLowerCase();
		return (
			term === "" ||
			fullName.includes(term) ||
			(usr.email ?? "").toLowerCase().includes(term)
		);
	});

	// ------ DELETE USER ------- //
	const [deleteId, setDeleteId] = useState(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	function handleChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		setError(null);

		try {
			const res = await fetch(`${API}/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Could not create your account.");
			}

			setForm(EMPTY_FORM);
			setStatus("success");
		} catch (err) {
			setStatus("idle");
			setError(err.message);
		}
	}

	useEffect(() => {
		async function loadDirectory() {
			try {
				const [usersRes, dirRes] = await Promise.all([
					fetch(`${API}/users`),
					fetch(`${API}/directory`),
				]);

				if (!usersRes.ok || !dirRes.ok) {
					throw new Error("Failed to load personnel directory.");
				}

				const [userData, dir] = await Promise.all([
					usersRes.json(),
					dirRes.json(),
				]);

				setUsers(userData.users || []);
				setFacilities(dir.directory || []);
			} catch (err) {
				console.error(err);
			} finally {
				setLoadingDirectory(false);
			}
		}

		loadDirectory();
	}, []);

	function handleUserUpdated(updated) {
		setUsers((prev) =>
			prev.map((usr) => (usr.id === updated.id ? { ...usr, ...updated } : usr)),
		);
	}

	//---- Delete User ----//
	function requestDelete(usr) {
		setDeleteError(null);
		setConfirmDeleteId(usr);
	}

	async function confirmDelete() {
		if (!confirmDeleteId) return;
		const id = confirmDeleteId.id;

		setDeleteId(id);
		setDeleteError(null);

		try {
			const res = await fetch(`${API}/users/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error || "Could not delete this user.");
			}

			setUsers((prev) => prev.filter((usr) => usr.id !== id));
			setConfirmDeleteId(null);
		} catch (err) {
			setDeleteError(err.message);
		} finally {
			setDeleteId(null);
		}
	}

	return (
		<EditUserProvider onUserUpdated={handleUserUpdated}>
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
								<h2>
									Welcome back, {LoggedIn.rank}{" "}
									{LoggedIn?.first_name && LoggedIn?.last_name
										? `${LoggedIn.first_name} ${LoggedIn.last_name}`
										: ""}
								</h2>
								<span className="rank-tag">
									{LoggedIn?.rank} · {LoggedIn?.unit}
								</span>
								<p>You have 4 member in-processing today</p>
								<div className="hero-actions">
									<button
										className="btn btn-outline"
										type="button"
										onClick={() => nav(`/:UserId/profile`)}
									>
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
										<label htmlFor="rank">Rank</label>
										<input
											type="text"
											id="rank"
											name="rank"
											placeholder="Rank"
											value={form.rank}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="form-field">
										<label htmlFor="first_name">First Name</label>
										<input
											type="text"
											id="first_name"
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
											id="last_name"
											name="last_name"
											placeholder="Last name"
											value={form.last_name}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-field">
										<label htmlFor="unit">Unit</label>
										<input
											type="text"
											id="unit"
											name="unit"
											placeholder="Unit"
											value={form.unit}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="form-field">
										<label htmlFor="address">Address</label>
										<input
											type="text"
											id="address"
											name="address"
											placeholder="Address"
											value={form.address}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="form-field">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
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
										id="password"
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

						<div className="card">
							<div className="card-header">
								<h2>All Personnel</h2>
							</div>

							<div
								className="search-bar"
								style={{ marginBottom: "var(--space-md)" }}
							>
								<span className="search-icon">⌕</span>
								<input
									type="text"
									placeholder="Search personnel..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>

							<div className="personnel-info-header">
								<h3>Avatar</h3>
								<h3>Rank</h3>
								<h3>Name</h3>
								<h3>Contact Information</h3>
							</div>
							<ul className="personnel-info-card">
								{filteredUsers.map((usr) => (
									<PersonnelRow
										key={usr.id ?? usr.email}
										usr={usr}
										deleteId={deleteId}
										onDelete={requestDelete}
									/>
								))}
							</ul>
						</div>

						<div className="dashboard-row row-1-1-1">
							<div className="card">
								<div className="card-header">
									<h2>Sponsor Information</h2>
								</div>
								<div className="sponsor-info-row">
									<div className="avatar avatar-sm">
										<img
											src={MW}
											alt="MW"
											style={{
												width: "40px",
												height: "40px",
												borderRadius: "50%",
												padding: "5px",
											}}
										/>
									</div>
									<div style={{ fontWeight: 500 }}>Matthew Wegenke</div>
									<div>
										<div
											style={{
												fontSize: "12px",
												color: "var(--text-secondary)",
											}}
										>
											Assigned Sponsor
										</div>
									</div>
								</div>
								<div className="info-row">
									<span className="label">Unit</span>
									<span className="value">Galvanize</span>
								</div>
								<div className="info-row">
									<span className="label">Phone</span>
									<span className="value">1-800-DEVIL-DOG</span>
								</div>
								<div className="info-row">
									<span className="label">Email</span>
									<span className="value">mathew.wegenke@galvanize.com</span>
								</div>
							</div>

							<div className="card">
								<div className="card-header">
									<h2>Important Contacts</h2>
								</div>
								{!loadingDirectory &&
									users.length > 1 &&
									facilities.length > 2 && (
										<div className="contact-row">
											<div>
												<div className="contact-name">
													{users[1].rank} {users[1].first_name}{" "}
													{users[1].last_name}
												</div>
												<div className="contact-role">Sponsor</div>
											</div>
											<button className="btn btn-outline btn-sm" type="button">
												{facilities[2].phone}
											</button>
										</div>
									)}
								{!loadingDirectory &&
									facilities.length > 0 &&
									users.length > 0 && (
										<div className="contact-row">
											<div>
												<div className="contact-name">
													{facilities[0].title}
												</div>
												<div className="contact-role">
													{users[0].rank} {users[0].first_name}{" "}
													{users[0].last_name}
												</div>
											</div>
											<button className="btn btn-outline btn-sm" type="button">
												{facilities[0].phone}
											</button>
										</div>
									)}
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

				<EditUserModal />

				{confirmDeleteId && (
					<div
						className="modal-overlay"
						onClick={() => setConfirmDeleteId(null)}
					>
						<div className="modal" onClick={(e) => e.stopPropagation()}>
							<h2>Delete Personnel</h2>
							<p>
								Are you sure you want to delete{" "}
								<strong>
									{confirmDeleteId.first_name} {confirmDeleteId.last_name}
								</strong>{" "}
								? This action cannot be undone.
							</p>
							{deleteError && <div className="error-text">{deleteError}</div>}
							<div style={{ display: "flex", gap: "8px" }}>
								<button
									type="button"
									className="btn btn-primary"
									style={{ backgroundColor: "#dc2626", borderColor: "#dc2626" }}
									onClick={confirmDelete}
									disabled={deleteId === confirmDeleteId.id}
								>
									{deleteId === confirmDeleteId.id
										? "Deleting..."
										: "Confirm Delete"}
								</button>
								<button
									type="button"
									className="btn btn-outline"
									onClick={() => setConfirmDeleteId(null)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</Layout>
		</EditUserProvider>
	);
}

function PersonnelRow({ usr, deleteId, onDelete }) {
	const { openEditModal } = useEditUser();

	return (
		<li className="personnel-item">
			<img
				src={usr.avatar || "/default-avatar.png"}
				alt={`${usr.first_name} ${usr.last_name}`}
			/>
			<span>{usr.rank}</span>
			<span>
				{usr.first_name} {usr.last_name}
			</span>
			<span>{usr.phone}</span>
			<button
				type="button"
				className="btn btn-outline btn-sm"
				onClick={() => openEditModal(usr)}
			>
				Edit
			</button>
			<button
				type="button"
				className="btn btn-outline btn-sm"
				style={{ color: "#dc2626", borderColor: "#dc2626" }}
				onClick={() => onDelete(usr)}
				disabled={deleteId === usr.id}
			>
				{deleteId === usr.id ? "Deleting..." : "Delete"}
			</button>
			<button type="button">Assign Manager</button>
		</li>
	);
}
