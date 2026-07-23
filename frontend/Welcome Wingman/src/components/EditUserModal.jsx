import React from "react";

function Field({
	label,
	id,
	name,
	type = "text",
	isEditing,
	editUser,
	handleEditChange,
	...rest
}) {
	return (
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
					{editUser[name] || "—"}
				</div>
			)}
		</div>
	);
}

export default function EditUserModal({
	editUser,
	isEditing,
	editStatus,
	editError,
	onClose,
	onStartEditing,
	onCancelEditing,
	onFieldChange,
	onSubmit,
}) {
	if (!editUser) return null;

	const handleCancel = () => {
		onCancelEditing();
	};

	// Shared props for every Field, so we don't repeat isEditing/editUser/onFieldChange each time
	const fieldProps = { isEditing, editUser, handleEditChange: onFieldChange };

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<h2>Edit Personnel</h2>
				<form onSubmit={onSubmit} className="form-group">
					<div className="form-row">
						<Field
							label="Rank"
							id="edit-rank"
							name="rank"
							required
							{...fieldProps}
						/>
						<Field
							label="First Name"
							id="edit-first_name"
							name="first_name"
							required
							{...fieldProps}
						/>
						<Field
							label="Last Name"
							id="edit-last_name"
							name="last_name"
							required
							{...fieldProps}
						/>
					</div>

					<div className="form-row">
						<Field
							label="Unit"
							id="edit-unit"
							name="unit"
							required
							{...fieldProps}
						/>
						<Field
							label="Address"
							id="edit-address"
							name="address"
							required
							{...fieldProps}
						/>
					</div>

					<div className="form-row">
						<Field
							label="Duty Title"
							id="edit-duty_title"
							name="duty_title"
							required
							{...fieldProps}
						/>
						<Field
							label="Supervisor"
							id="edit-supervisor"
							name="supervisor"
							required
							{...fieldProps}
						/>
					</div>
					<div className="form-row">
						<Field
							label="Phone"
							id="edit-phone"
							name="phone"
							required
							{...fieldProps}
						/>

						<Field
							label="Email"
							id="edit-email"
							name="email"
							type="email"
							required
							{...fieldProps}
						/>
					</div>

					{editError && <div className="error-text">{editError}</div>}

					{isEditing ? (
						<React.Fragment key="editing-buttons">
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
						</React.Fragment>
					) : (
						<React.Fragment key="view-buttons">
							<button
								type="button"
								className="btn btn-primary"
								onClick={onStartEditing}
							>
								Edit
							</button>

							<button
								type="button"
								className="btn btn-outline"
								onClick={onClose}
							>
								Close
							</button>
						</React.Fragment>
					)}
				</form>
			</div>
		</div>
	);
}
