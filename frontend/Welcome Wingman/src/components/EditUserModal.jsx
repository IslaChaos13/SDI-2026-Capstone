// components/EditUserModal.jsx
import { useEditUser } from "../context/EditUserContext";

export default function EditUserModal() {
	const {
		editUser,
		editStatus,
		editError,
		closeEditModal,
		handleEditChange,
		handleEditSubmit,
	} = useEditUser();

	if (!editUser) return null;

	return (
		<div className="modal-overlay" onClick={closeEditModal}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<h2>Edit Personnel</h2>
				<form onSubmit={handleEditSubmit} className="form-group">
					<div className="form-row">
						<div className="form-field">
							<label htmlFor="edit-rank">Rank</label>
							<input
								type="text"
								id="edit-rank"
								name="rank"
								value={editUser.rank || ""}
								onChange={handleEditChange}
								required
							/>
						</div>
						<div className="form-field">
							<label htmlFor="edit-first_name">First Name</label>
							<input
								type="text"
								id="edit-first_name"
								name="first_name"
								value={editUser.first_name || ""}
								onChange={handleEditChange}
								required
							/>
						</div>
						<div className="form-field">
							<label htmlFor="edit-last_name">Last Name</label>
							<input
								type="text"
								id="edit-last_name"
								name="last_name"
								value={editUser.last_name || ""}
								onChange={handleEditChange}
								required
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-field">
							<label htmlFor="edit-unit">Unit</label>
							<input
								type="text"
								id="edit-unit"
								name="unit"
								value={editUser.unit || ""}
								onChange={handleEditChange}
								required
							/>
						</div>
						<div className="form-field">
							<label htmlFor="edit-phone">Phone</label>
							<input
								type="text"
								id="edit-phone"
								name="phone"
								value={editUser.phone || ""}
								onChange={handleEditChange}
								required
							/>
						</div>
					</div>

					<div className="form-field">
						<label htmlFor="edit-email">Email</label>
						<input
							type="email"
							id="edit-email"
							name="email"
							value={editUser.email || ""}
							onChange={handleEditChange}
							required
						/>
					</div>
					{editError && <div className="error-text">{editError}</div>}
					<button
						type="submit"
						className="btn btn-primary"
						disabled={editStatus === "submitting"}
					>
						{editStatus === "submitting" ? "Saving..." : "Save Changes"}
					</button>
					<button
						type="button"
						className="btn btn-outline"
						onClick={closeEditModal}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
}
