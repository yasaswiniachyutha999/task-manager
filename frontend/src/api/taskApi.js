const API_BASE_URL = import.meta.env.PROD
    ? 'https://task-manager-api-2mzu.onrender.com/api'  // Replace with your Render URL after deployment
    : '/api';

// Helper function for API requests
async function request(url, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'An error occurred' }));
        throw new Error(error.error || 'An error occurred');
    }

    return response.json();
}

// Get all tasks
export async function getTasks() {
    return request('/tasks');
}

// Get a single task by ID
export async function getTask(id) {
    return request(`/tasks/${id}`);
}

// Create a new task
export async function createTask(taskData) {
    return request('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
    });
}

// Update an existing task
export async function updateTask(id, taskData) {
    return request(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
    });
}

// Delete a task
export async function deleteTask(id) {
    return request(`/tasks/${id}`, {
        method: 'DELETE',
    });
}
