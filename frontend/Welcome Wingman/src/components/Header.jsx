import "../styles/theme.css";
import "./Header.css";
import { useEffect, useState, useContext } from "react";
import  UserIcon from "../components/UserIcon";
import LoginButton from "./LoginButton"
import UserContext from '../context/UserContext'

function Header() {

	const {LoggedIn, setLoggedIn} = useContext(UserContext)

	const {user} = UserContext
	// const [user, setUser] = useState(null);

	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}); /*TJF*/




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
			<span className="header-date">{today}</span>
			<div className="header-actions">
				<button className="btn-icon" type="button">
					🔔
					<span className="icon-badge">3</span>
				</button>
				<button className="btn-icon" type="button">
					⚙
				</button>
				{/* <p>{user.first_name}</p> */}
			</div>
			<div className = "conditional-rendering">
				  {LoggedIn ? <UserIcon /> : <LoginButton /> }
			</div>



		</div>
	);
}

export default Header;
