import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, deleteTask } from '../api/taskApi';

function DeleteTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            const data = await getTask(id);
            setTask(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            setError(null);
            await deleteTask(id);
            navigate('/tasks');
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">Delete Task</h1>
                    <p className="page-subtitle">Remove task permanently</p>
                </div>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            </div>
        );
    }

    if (error && !task) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">Delete Task</h1>
                    <p className="page-subtitle">Remove task permanently</p>
                </div>
                <div className="card">
                    <div className="alert alert-error" style={{ margin: 0 }}>
                        <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                        <Link to="/tasks" className="btn btn-secondary">
                            Back to Tasks
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <h1 className="page-title">Delete Task</h1>
                <p className="page-subtitle">This action cannot be undone</p>
            </div>

            <div className="delete-container">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="delete-warning">
                        <div className="delete-warning-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 9v4M12 17h.01" />
                                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                        </div>
                        <h3 className="delete-warning-title">Delete this task?</h3>
                        <p className="delete-warning-text">
                            This will permanently remove the task and all its data.
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-error" style={{ margin: 'var(--spacing-lg)', marginTop: 0 }}>
                            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v4M12 16h.01" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {task && (
                        <div style={{ padding: '0 var(--spacing-lg) var(--spacing-lg)' }}>
                            <div className="delete-task-preview">
                                <h4 className="delete-task-title">{task.title}</h4>
                                {task.description ? (
                                    <p className="delete-task-description">{task.description}</p>
                                ) : (
                                    <p className="delete-task-description" style={{ fontStyle: 'italic', opacity: 0.5 }}>
                                        No description
                                    </p>
                                )}
                                <div className="delete-task-meta">
                                    <span>Created: {formatDate(task.createdAt)}</span>
                                    <span className={`status-badge ${task.status}`}>
                                        <span className="status-dot"></span>
                                        {task.status}
                                    </span>
                                </div>
                            </div>

                            <div className="form-actions" style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                                <button
                                    className="btn btn-danger btn-lg"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {deleting ? (
                                        <>
                                            <span className="spinner" style={{ width: '16px', height: '16px', margin: 0, borderWidth: '2px', borderTopColor: 'white' }}></span>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                            Delete Task
                                        </>
                                    )}
                                </button>
                                <Link to="/tasks" className="btn btn-secondary btn-lg">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeleteTask;
