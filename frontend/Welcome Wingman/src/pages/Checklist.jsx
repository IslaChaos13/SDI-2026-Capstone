import { useState } from "react";
import '../css/Checklist.css'
export default function Checklist() {
	const [taskItem, setTaskItem] = useState(null);

	const [onboardingTasks, setOnboardingTasks] = useState([
		{
			id: 1,
			action_item: "Add information to division recall roster.",
            description: "See CSS, they will add your contact information to the division recall roster",
			dueDate: "2026-07-31",
			is_complete: true,
		},
		{
			id: 2,
			action_item: "Assign AEF band.",
			description: "Speak to your division chief to assign you to the AEF banc",
            dueDate: "2026-07-31",
			is_complete: true,
		},
		{
			id: 3,
			action_item: "Update AFPAAS information.",
			description: " Update your duty and home location in AFPAAS",
            dueDate: "2026-07-31",
			is_complete: false,
		},
		{
			id: 4,
			action_item: "Schedule meet and greet with division chief",
			description: "Reach out to the division chief via email or phone.",
            dueDate: "2026-07-31",
			is_complete: false,
		},
		{
			id: 5,
			action_item: "Contact your division security manager",
            description: "Members must accomplish NATO, Derivative, RD  & FRD, CUI, Escort, and Information Security Training before members be gained in DISS",
			dueDate: "2026-07-31",
			is_complete: false,
		},
	]);

	const openModal = (task) => setTaskItem(task);
	const closeModal = () => setTaskItem(null);

    const toggleComplete = (id) => {
  setOnboardingTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === id
        ? { ...task, is_complete: !task.is_complete }
        : task
    )
  );
};

	return (
        <>
        < div className='checklist-header'>
         <h3>Status</h3>
        <h3>Action Item</h3>
        <h3>Due Date</h3>

                </div>

		<ul className="Checklist-Container">
			{onboardingTasks.map((task) => (
                <li className="checklist-item" key={task.id}	onClick={() => openModal(task)} >
                        <input type="checkbox"
                            checked={task.is_complete}
                            onChange={()=> toggleComplete(task.id)}
                            onClick={(e)=>e.stopPropagation()}
                        />
						<span >{task.action_item}</span>
						<span> {task.dueDate}</span>
						<span>{task.is_complete ? "Complete" : "Incomplete"}</span>

				</li>
			))}

			{taskItem && (
                <div className="modal-overlay">

                <div className="modal">
					<h2>{taskItem.action_item}</h2>
					<p>Due: {taskItem.dueDate}</p>
					<p>Details: {taskItem.description}</p>

                    <p>Status: {taskItem.is_complete ? "Complete" : "Incomplete"}</p>

					<button onClick={closeModal}>Close</button>
				</div>
            </div>
			)}
		</ul>
            </>
        );
}
