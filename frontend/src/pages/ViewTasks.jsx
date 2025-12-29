import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../api/taskApi';

function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    if (loading) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">View Tasks</h1>
                    <p className="page-subtitle">Manage and track all your tasks in one place</p>
                </div>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">View Tasks</h1>
                    <p className="page-subtitle">Manage and track all your tasks in one place</p>
                </div>
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    <span>{error}</span>
                </div>
                <button className="btn btn-primary" onClick={fetchTasks}>
                    Try Again
                </button>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">View Tasks</h1>
                    <p className="page-subtitle">Manage and track all your tasks in one place</p>
                </div>
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                                <rect x="9" y="3" width="6" height="4" rx="1" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="9" y1="16" x2="13" y2="16" />
                            </svg>
                        </div>
                        <h2 className="empty-title">No tasks yet</h2>
                        <p className="empty-description">
                            Get started by creating your first task. Stay organized and track your progress!
                        </p>
                        <Link to="/add" className="btn btn-primary btn-lg">
                            <span>➕</span>
                            Create Your First Task
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <div className="page-header-row">
                    <div>
                        <h1 className="page-title">View Tasks</h1>
                        <p className="page-subtitle">
                            <strong>{tasks.length}</strong> task{tasks.length !== 1 ? 's' : ''} total
                            {pendingCount > 0 && <> • <span style={{ color: '#f59e0b' }}>{pendingCount} pending</span></>}
                            {completedCount > 0 && <> • <span style={{ color: '#10b981' }}>{completedCount} completed</span></>}
                        </p>
                    </div>
                    <Link to="/add" className="btn btn-primary">
                        <span>➕</span>
                        Add New Task
                    </Link>
                </div>
            </div>

            <div className="card-grid">
                {tasks.map((task) => (
                    <div key={task.id} className="card task-card">
                        <div className="task-card-header">
                            <div style={{ flex: 1 }}>
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-date">
                                    📅 {formatDate(task.createdAt)}
                                </p>
                            </div>
                            <span className={`status-badge ${task.status}`}>
                                <span className="status-dot"></span>
                                {task.status}
                            </span>
                        </div>

                        {task.description ? (
                            <p className="task-description">{task.description}</p>
                        ) : (
                            <p className="task-description" style={{ fontStyle: 'italic', opacity: 0.6 }}>
                                No description provided
                            </p>
                        )}

                        <div className="task-footer">
                            <div className="task-actions">
                                <Link to={`/edit/${task.id}`} className="btn btn-secondary btn-icon" title="Edit task">
                                    ✏️
                                </Link>
                                <Link to={`/delete/${task.id}`} className="btn btn-ghost btn-icon" title="Delete task" style={{ color: '#ef4444' }}>
                                    🗑️
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewTasks;
