import { createContext, useContext, useState } from "react";

const API = "http://localhost:8000";

const EditUserContext = createContext(null);

export function EditUserProvider({ children, onUserUpdated }) {
	const [editUser, setEditUser] = useState(null);
	const [editStatus, setEditStatus] = useState("idle");
	const [editError, setEditError] = useState(null);

	function openEditModal(usr) {
		console.log("openEditModal");
		setEditError(null);
		setEditUser({ ...usr });
	}

	function closeEditModal() {
		console.log("CloseEditModal");

		setEditUser(null);
		setEditError(null);
	}

	function handleEditChange(e) {
		const { name, value } = e.target;
		setEditUser((prev) => ({ ...prev, [name]: value }));
	}

	async function handleEditSubmit(e) {
		e.preventDefault();
		if (!editUser) return;

		setEditStatus("submitting");
		setEditError(null);

		try {
			const res = await fetch(`${API}/users/${editUser.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editUser),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok) {
				throw new Error(data.error || "Could not update this user.");
			}

			const updated = data.user || editUser;
			onUserUpdated?.(updated);
			setEditUser(null);
		} catch (err) {
			setEditError(err.message);
		} finally {
			setEditStatus("idle");
		}
	}

	return (
		<EditUserContext.Provider
			value={{
				editUser,
				editStatus,
				editError,
				openEditModal,
				closeEditModal,
				handleEditChange,
				handleEditSubmit,
			}}
		>
			{children}
		</EditUserContext.Provider>
	);
}

export function useEditUser() {
	const ctx = useContext(EditUserContext);
	if (!ctx) {
		throw new Error("useEditUser must be used within an EditUserProvider");
	}
	return ctx;
}
