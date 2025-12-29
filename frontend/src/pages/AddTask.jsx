import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTask } from '../api/taskApi';

function AddTask() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

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
            setLoading(true);
            setError(null);
            await createTask(formData);
            navigate('/tasks');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <div className="page-header">
                <h1 className="page-title">Create Task</h1>
                <p className="page-subtitle">Add a new task to your workspace</p>
            </div>

            {error && (
                <div className="alert alert-error">
                    <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className="card">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={handleChange}
                            disabled={loading}
                            autoFocus
                        />
                        {errors.title ? (
                            <p className="form-error">{errors.title}</p>
                        ) : (
                            <p className="form-hint">A clear, descriptive title for your task</p>
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
                            placeholder="Add details about this task (optional)"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {errors.description ? (
                            <p className="form-error">{errors.description}</p>
                        ) : (
                            <p className="form-hint">{formData.description.length}/500</p>
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
                            disabled={loading}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <p className="form-hint">Set the initial status</p>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner" style={{ width: '16px', height: '16px', margin: 0, borderWidth: '2px' }}></span>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                    Create Task
                                </>
                            )}
                        </button>
                        <Link to="/tasks" className="btn btn-secondary btn-lg">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
