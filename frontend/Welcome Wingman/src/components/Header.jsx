import "../styles/theme.css";
import "./Header.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  UserIcon from "../components/UserIcon";
import LoginButton from "./LoginButton"

function Header({ LoggedIn }) {
  console.log(LoggedIn)
	const API = "http://localhost:8000";
	const { userID } = useParams();
	const [user, setUser] = useState(null);

	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}); /*TJF*/

	useEffect(() => {
		fetch(`${API}/users`)
			.then((r) => r.json())
			.then((userData) => {
				console.log("USERS:", userData);

				const users = userData.users || [];
				const matched = users.find((u) => String(u.id) === String(userID));

				setUser(matched || users[0] || null);
			})
			.catch(console.error);
	}, [userID]);

	// if (!user) {
	// 	return null;
	// }



	return (
		<div className="app-header">
			<div className="header-brand">
				<div className="af-logo-placeholder">★</div>
				<div className="header-brand-text">
					<div className="brand-title">Welcome Wingman</div>
					<div className="brand-subtitle">In-Processing Portal</div>
				</div>
			</div>
			<div className="header-search search-bar">
				<span className="search-icon">⌕</span>
				<input type="text" placeholder="Search the portal..." readOnly />
			</div>
			<div className="header-spacer"></div>
			<span className="header-date">{today}</span> {/*TJF*/}
			<div className="header-actions">
				<button className="btn-icon" type="button">
					🔔
					<span className="icon-badge">3</span>
				</button>
				<button className="btn-icon" type="button">
					⚙
				</button>

			</div>
			<div className = "conditional-rendering">
				  {{LoggedIn} ? <LoginButton /> : <UserIcon />}
			</div>



		</div>
	);
}

export default Header;
