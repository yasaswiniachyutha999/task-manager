import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => setIsOpen(!isOpen);
    const closeNav = () => setIsOpen(false);

    const navItems = [
        { path: '/tasks', label: 'View Tasks', icon: '📋', description: 'Browse all tasks' },
        { path: '/add', label: 'Add Task', icon: '➕', description: 'Create new task' },
    ];

    return (
        <>
            {/* Mobile toggle button */}
            <button className="mobile-nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isOpen ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                </svg>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Menu</span>
            </button>

            {/* Overlay for mobile */}
            <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={closeNav} />

            {/* Sidebar */}
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <div className="navbar-brand">
                    <div className="navbar-logo">✓</div>
                    <div>
                        <span className="navbar-title">TaskFlow</span>
                    </div>
                </div>

                <p className="nav-section-title">Navigation</p>

                <ul className="nav-links">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={closeNav}
                            >
                                <span className="nav-link-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="navbar-footer">
                    <p>Professional Task Management</p>
                    <p>Built for demonstration</p>
                    <span className="version-badge">
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                        v1.0.0 • Stable
                    </span>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
