/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const airmanTasks = [
  {
    id_directory: 1,
    title: "Visit the Welcome Center",
    action_item: "Schedule and attend the Welcome Center appointment.",
    due_date: "2026-07-16",
    is_complete: false,
  },
  {
    id_directory: 2,
    title: "Update LeaveWeb Profile",
    action_item: "Update your location, unit, and supervisor information in LeaveWeb.",
    due_date: "2026-07-17",
    is_complete: false,
  },
  {
    id_directory: 3,
    title: "Update SOES (SGLI)",
    action_item: "Update and verify information for life insurance.",
    due_date: "2026-07-20",
    is_complete: false,
  },
    {
    id_directory: 4,
    title: "Update Government Travel Card (GTC)",
    action_item: "Have GTC transferred and gained to AFGSC. Report change of address to CITI bank.",
    due_date: "2026-07-22",
    is_complete: false,
  },
    {
    id_directory: 5,
    title: "Update Defense Travel System (DTS) profile",
    action_item: "Report to Directorate DTS monitor to be gained into DTS and update record.",
    due_date: "2026-07-20",
    is_complete: false,
  },
    {
    id_directory: 6,
    title: "Update AFPAAS Information",
    action_item: "Log in to AFPAAS and verify that your personal and dependent information is accurate.",
    due_date: "2026-07-20",
    is_complete: false,
  },
    {
    id_directory: 7,
    title: "Meet With Division Chief",
    action_item: "Contact the division office and schedule an introductory meeting with the division chief.",
    due_date: "2026-07-20",
    is_complete: false,
  },
    {
    id_directory: 8,
    title: "Complete Initial Security Training",
    action_item: "Meet with the unit security manager and complete all required initial security training.",
    due_date: "2026-07-20",
    is_complete: false,
  },
    {
    id_directory: 9,
    title: "Update vMPF Information",
    action_item: "Verify and update your home address, phone number, duty information, and office symbol in vMPF.",
    due_date: "2026-07-20",
    is_complete: false,
  },
  {
    id_directory: 10,
    title: "Complete OPSEC Awareness Training",
    action_item:
      "Complete the required OPSEC awareness training and provide the completion certificate to the appropriate office.",
    due_date: "2026-07-27",
    is_complete: false,
  },
  {
    id_directory: 11,
    title: "Complete Initial Job Safety Training",
    action_item:
      "Review the workplace safety materials with your supervisor and complete the required documentation.",
    due_date: "2026-07-28",
    is_complete: false,
  }
];


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};


