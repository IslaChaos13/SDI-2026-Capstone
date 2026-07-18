import { useEffect, useState, useContext } from "react";
import UserContext from '../context/UserContext'

export default function UserIcon() {

	const { LoggedIn } = useContext(UserContext)

	if (!LoggedIn) {
		return null;
	}
	return (
		<div className="header-user">
			<div className="avatar avatar-sm">U</div>
			<div className="header-user-info">
				<div className="user-name">
					<div className="user-name-1">
						{LoggedIn?.first_name && LoggedIn?.last_name
							? `${LoggedIn.first_name} ${LoggedIn.last_name}`
							: "Guest"}
					</div>
				</div>{" "}
				{/*TJF*/}
				<div className="user-rank">{LoggedIn.rank ?? ""}</div> {/*TJF*/}
			</div>
		</div>
	);
}
