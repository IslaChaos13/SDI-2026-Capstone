import { useState, useEffect } from "react"
import Layout from '../components/Layout.jsx'
import '../styles/theme.css'
import '../css/ReportsPage.css'


function ReportsPage() {

    const [users, setUsers] = useState([]);
    const [userTasks, setUserTasks] = useState([]);
    const [unitFilter, setUnitFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/users')
            .then((r) => r.json())
            .then((data) => setUsers(data.users || []))
            .catch(console.error)

        fetch('http://localhost:8000/user_tasks')
            .then((r) => r.json())
            .then((data) => setUserTasks(data || []))
            .catch(console.error)
    }, [])

    const units = [];
    for (const u of users) {
        if (u.unit && !units.includes(u.unit)) {
            units.push(u.unit)
        }
    }
    units.sort();


    const unitFilteredUsers = users.filter((u) => unitFilter === "" || u.unit === unitFilter,);

    const unitFilteredReports = unitFilteredUsers.map((u) => {
        const tasks = userTasks.filter((t) => t.first_name === u.first_name && t.last_name === u.last_name,)
        const completedCount = tasks.filter((t) => t.is_complete).length
        const totalCount = tasks.length
        const isComplete = totalCount > 0 && completedCount === totalCount;
        const status = totalCount === 0 ? "not started" : isComplete ? "complete" : "in progress"
        const completionPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0
        const notes = tasks.filter((t) => t.note).map((t) => t.note)
        return { ...u, totalCount, completedCount, status, completionPercent, notes };
    })

    const userReports = unitFilteredReports.filter((u) => statusFilter === "" || u.status === statusFilter);

    const statusLabel = {
        complete: "Complete",
        "in progress": "In-Processing",
        "not started": "Not Started",
    };

    const statusBadgeClass = {
        complete: "badge-complete",
        "in progress": "badge-pending",
        "not started": "badge-overdue",
    };

    return (
        <Layout>
            <div className="page">
                <div className="page-header">
                    <h1>In Processing Report</h1>
                    <p>Filter Personnel by Organization and Completion Status.</p>
                </div>

                <div className="card">
                    <div className="grid grid-2">
                        <div className="form-group">
                            <label>Organization</label>
                            <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)}>
                                <option value="">All Units</option>
                                {units.map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">All Statuses</option>
                                <option value="complete">Complete</option>
                                <option value="in progress">In-Processing</option>
                                <option value="not started">Not Started</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Personnel Progress: {userReports.length}</h2>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rank</th>
                                    <th>Unit</th>
                                    <th>Duty Title</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userReports.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.first_name} {u.last_name}</td>
                                        <td>{u.rank}</td>
                                        <td>{u.unit}</td>
                                        <td>{u.duty_title}</td>
                                        <td>
                                            <div className="progress-track">
                                                <div className="progress-fill" style={{ width: `${u.completionPercent}%` }}></div>
                                            </div>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{u.completionPercent}%</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${statusBadgeClass[u.status]}`}>
                                                {statusLabel[u.status]}
                                            </span>
                                        </td>
                                        <td>{u.notes.length === 0 ? "—" : u.notes.join(", ")}</td>
                                    </tr>
                                ))}
                                {userReports.length === 0 && (
                                    <tr>
                                        <td>
                                            No personnel match this filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ReportsPage