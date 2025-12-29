import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ViewTasks from './pages/ViewTasks';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import DeleteTask from './pages/DeleteTask';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/tasks" replace />} />
                    <Route path="/tasks" element={<ViewTasks />} />
                    <Route path="/add" element={<AddTask />} />
                    <Route path="/edit/:id" element={<EditTask />} />
                    <Route path="/delete/:id" element={<DeleteTask />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
