import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => setIsOpen(!isOpen);
    const closeNav = () => setIsOpen(false);

    return (
        <>
            {/* Mobile toggle button */}
            <button className="mobile-nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isOpen ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    )}
                </svg>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Menu</span>
            </button>

            {/* Overlay for mobile */}
            <div className={`nav-overlay ${isOpen ? 'open' : ''}`} onClick={closeNav} />

            {/* Sidebar */}
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <div className="navbar-brand">
                    <div className="navbar-logo">T</div>
                    <span className="navbar-title">TaskFlow</span>
                </div>

                <p className="nav-section-title">Menu</p>

                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/tasks"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            <span className="nav-link-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                            </span>
                            <span>View Tasks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/add"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            <span className="nav-link-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v8M8 12h8" />
                                </svg>
                            </span>
                            <span>Add Task</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-footer">
                    <p>Task Management System</p>
                    <span className="version-badge">
                        <span style={{ width: '5px', height: '5px', background: 'currentColor', borderRadius: '50%' }}></span>
                        v1.0.0
                    </span>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
