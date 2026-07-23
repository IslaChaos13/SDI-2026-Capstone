export const DEFAULT_DUE_SOON_DAYS = 2;

/**
 * Compares a due_date against "now" and classifies it as:
 *   - "overdue"    -> due date has already passed
 *   - "due-soon"   -> due date is within `dueSoonDays` days from now
 *   - "upcoming"   -> due date is further out than `dueSoonDays`
 *
 * @param {string|Date} dueDate - e.g. "2026-07-25" or "2026-07-25T14:00:00"
 * @param {number} dueSoonDays - threshold for "coming due" (default DEFAULT_DUE_SOON_DAYS)
 */
export function getDueStatus(dueDate, dueSoonDays = DEFAULT_DUE_SOON_DAYS) {
	const due = new Date(dueDate);
	if (isNaN(due.getTime())) {
		return { status: "invalid", daysRemaining: null };
	}

	const now = new Date();
	const startOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	);
	const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());

	const msPerDay = 1000 * 60 * 60 * 24;
	const daysRemaining = Math.round((startOfDue - startOfToday) / msPerDay);

	let status;
	if (daysRemaining < 0) status = "overdue";
	else if (daysRemaining <= dueSoonDays) status = "due-soon";
	else status = "upcoming";

	return { status, daysRemaining };
}

export function formatDueMessage(
	label,
	dueDate,
	dueSoonDays = DEFAULT_DUE_SOON_DAYS,
) {
	const { status, daysRemaining } = getDueStatus(dueDate, dueSoonDays);

	switch (status) {
		case "overdue": {
			const daysLate = Math.abs(daysRemaining);
			return `${label} is overdue by ${daysLate} day${daysLate === 1 ? "" : "s"}.`;
		}
		case "due-soon":
			return daysRemaining === 0
				? `${label} is due today.`
				: `${label} is due in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}.`;
		case "upcoming":
			return `${label} is due in ${daysRemaining} days.`;
		default:
			return `${label} has an invalid due date.`;
	}
}
