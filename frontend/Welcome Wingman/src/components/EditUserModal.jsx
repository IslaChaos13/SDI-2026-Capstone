import { useState, useEffect } from "react";
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

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (editUser) setIsEditing(false);
	}, [editUser]);

	if (!editUser) return null;

	const handleCancel = () => {
		if (isEditing) {
			setIsEditing(false);
		} else {
			closeEditModal();
		}
	};

	const handleSubmit = (e) => {
		handleEditSubmit(e);
		setIsEditing(false);
	};

	const Field = ({ label, id, name, type = "text", ...rest }) => (
		<div className="form-field-readonly-info">
			<label htmlFor={id}>{label}</label>
			{isEditing ? (
				<input
					type={type}
					id={id}
					name={name}
					value={editUser[name] || ""}
					onChange={handleEditChange}
					{...rest}
				/>
			) : (
				<div id={id} className="form-field-readonly">
					{name === "password" ? "••••••••" : editUser[name] || "—"}
				</div>
			)}
		</div>
	);

	return (
		<div className="modal-overlay" onClick={closeEditModal}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<h2>Edit Personnel</h2>
				<form onSubmit={handleSubmit} className="form-group">
					<div className="form-row">
						<Field label="Rank" id="edit-rank" name="rank" required />
						<Field
							label="First Name"
							id="edit-first_name"
							name="first_name"
							required
						/>
						<Field
							label="Last Name"
							id="edit-last_name"
							name="last_name"
							required
						/>
					</div>

					<div className="form-row">
						<Field label="Unit" id="edit-unit" name="unit" required />
						<Field label="Phone" id="edit-phone" name="phone" required />
					</div>

					<Field label="Address" id="edit-address" name="address" required />

					<Field
						label="Email"
						id="edit-email"
						name="email"
						type="email"
						required
					/>

					<Field
						label="Password"
						id="edit-password"
						name="password"
						type="password"
						required={isEditing}
					/>

					{editError && <div className="error-text">{editError}</div>}

					{isEditing ? (
						<>
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
								onClick={handleCancel}
							>
								Cancel
							</button>
						</>
					) : (
						<>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-outline"
								onClick={closeEditModal}
							>
								Close
							</button>
						</>
					)}
				</form>
			</div>
		</div>
	);
}
