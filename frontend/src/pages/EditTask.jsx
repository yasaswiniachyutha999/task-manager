import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, updateTask } from '../api/taskApi';

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [originalTask, setOriginalTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            const task = await getTask(id);
            setOriginalTask(task);
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
            });
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
        }
        if (formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setSaving(true);
            setError(null);
            await updateTask(id, formData);
            navigate('/tasks');
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const hasChanges = originalTask && (
        formData.title !== originalTask.title ||
        formData.description !== (originalTask.description || '') ||
        formData.status !== originalTask.status
    );

    if (loading) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">Edit Task</h1>
                    <p className="page-subtitle">Update your task details</p>
                </div>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading task details...</p>
                </div>
            </div>
        );
    }

    if (error && !originalTask) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <h1 className="page-title">Edit Task</h1>
                    <p className="page-subtitle">Update your task details</p>
                </div>
                <div className="card">
                    <div className="alert alert-error" style={{ margin: 0 }}>
                        <span className="alert-icon">⚠️</span>
                        <span>{error}</span>
                    </div>
                    <div style={{ marginTop: 'var(--spacing-lg)' }}>
                        <Link to="/tasks" className="btn btn-secondary">
                            ← Back to Tasks
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <h1 className="page-title">Edit Task</h1>
                <p className="page-subtitle">
                    Editing: <strong>{originalTask?.title}</strong>
                </p>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            <div className="card">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Task Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            placeholder="Enter task title..."
                            value={formData.title}
                            onChange={handleChange}
                            disabled={saving}
                        />
                        {errors.title ? (
                            <p className="form-error">⚠️ {errors.title}</p>
                        ) : (
                            <p className="form-hint">Give your task a clear, descriptive title</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-textarea"
                            placeholder="Add more details about this task (optional)..."
                            value={formData.description}
                            onChange={handleChange}
                            disabled={saving}
                        />
                        {errors.description ? (
                            <p className="form-error">⚠️ {errors.description}</p>
                        ) : (
                            <p className="form-hint">{formData.description.length}/500 characters</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="form-select"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={saving}
                        >
                            <option value="pending">🟡 Pending - Task not yet completed</option>
                            <option value="completed">🟢 Completed - Task is finished</option>
                        </select>
                        <p className="form-hint">Update the current status of your task</p>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={saving || !hasChanges}
                            title={!hasChanges ? 'No changes to save' : ''}
                        >
                            {saving ? (
                                <>
                                    <span className="spinner" style={{ width: '18px', height: '18px', margin: 0, borderWidth: '2px' }}></span>
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <span>💾</span>
                                    Save Changes
                                </>
                            )}
                        </button>
                        <Link to="/tasks" className="btn btn-secondary btn-lg">
                            ← Cancel
                        </Link>
                    </div>

                    {!hasChanges && originalTask && (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 'var(--spacing-md)' }}>
                            ℹ️ Make changes to enable the save button
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditTask;
