import { useEffect, useState } from "react";

export default function UserIcon({userID}) {
    const API = "http://localhost:8000";

        const [user, setUser] = useState(null);

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

	if (!user) {
		return null;
	}
	return (
		<div className="header-user">
			<div className="avatar avatar-sm">U</div>
			<div className="header-user-info">
				<div className="user-name">
					<div className="user-name">
						{user?.first_name && user?.last_name
							? `${user.first_name} ${user.last_name}`
							: "Guest"}
					</div>
				</div>{" "}
				{/*TJF*/}
				<div className="user-rank">{user.rank ?? ""}</div> {/*TJF*/}
			</div>
		</div>
	);
}
