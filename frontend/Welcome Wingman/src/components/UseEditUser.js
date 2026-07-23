import { useState } from "react";

const API = "http://localhost:8000";

/**
 * Local (non-context) hook for managing the edit-user modal.
 * Each page that needs the modal calls this independently — no shared
 * provider, no context. State lives entirely inside whichever component
 * calls this hook.
 *
 * onUserUpdated: optional callback invoked with the updated user after a
 * successful save (e.g. to update a list, or the logged-in user object).
 */
export function useEditUser(onUserUpdated) {
	const [editUser, setEditUser] = useState(null);
	const [editStatus, setEditStatus] = useState("idle");
	const [editError, setEditError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	function openEditModal(usr) {
		setEditError(null);
		setIsEditing(false); // always open in read-only view first
		setEditUser({ ...usr });
	}

	function closeEditModal() {
		setEditUser(null);
		setEditError(null);
		setIsEditing(false);
	}

	function startEditing() {
		setIsEditing(true);
	}

	function cancelEditing() {
		setIsEditing(false);
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
			setEditUser(updated);
			setIsEditing(false);
		} catch (err) {
			setEditError(err.message);
		} finally {
			setEditStatus("idle");
		}
	}

	return {
		editUser,
		editStatus,
		editError,
		isEditing,
		openEditModal,
		closeEditModal,
		startEditing,
		cancelEditing,
		handleEditChange,
		handleEditSubmit,
	};
}
