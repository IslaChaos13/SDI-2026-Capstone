import "../styles/theme.css";
import "./Header.css";
import { useState, useContext } from "react";
import UserIcon from "../components/UserIcon";
import LoginButton from "./LoginButton";
import UserContext from "../context/UserContext";
import NotificationContext from "../context/NotificationContext";

function Header() {
	const { LoggedIn, logout } = useContext(UserContext);

	const { pings, dismissPings, alertCount } = useContext(NotificationContext);
	const [showAlertModal, setShowAlertModal] = useState(false);

	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="app-header">
			<div className="header-brand">
				<div className="af-logo-placeholder">★</div>
				<div className="header-brand-text">
					<div className="brand-title">Welcome Wingman</div>
					<div className="brand-subtitle">In-Processing Portal</div>
				</div>
			</div>

			<div className="header-spacer"></div>
			<span className="header-date">{today}</span>
			<div className="header-actions">
				<button
					className="btn-icon"
					type="button"
					onClick={() => setShowAlertModal(true)}
				>
					🔔
					{alertCount > 0 && <span className="icon-badge">{alertCount}</span>}
				</button>

				<button className="btn-icon" type="button">
					⚙
				</button>
			</div>
			<div className="conditional-rendering">
				{LoggedIn ? <UserIcon /> : <LoginButton />}
			</div>

			{showAlertModal && (
				<div className="modal-overlay" onClick={() => setShowAlertModal(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="modal-header">
							<h3>Notifications</h3>
							<button
								type="button"
								className="modal-close"
								onClick={() => setShowAlertModal(false)}
							>
								✕
							</button>
						</div>

						{pings.length === 0 ? (
							<p style={{ color: "#6b7280", margin: 0, fontSize: "0.875rem" }}>
								No due-date alerts right now.
							</p>
						) : (
							<div className="pings">
								{pings.map((ping) => (
									<div
										className="pings-map"
										key={ping.toastId}
										style={{
											backgroundColor:
												ping.status === "overdue" ? "#fee2e2" : "#fef3c7",
											color: ping.status === "overdue" ? "#991b1b" : "#92400e",
										}}
									>
										<span>{ping.message}</span>
										<button
											type="button"
											onClick={() => dismissPings(ping.toastId)}
											style={{
												background: "none",
												border: "none",
												cursor: "pointer",
												lineHeight: 1,
											}}
										>
											✕
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
