import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';
import StoreLayout from './StoreLayout';
import NotFoundPage from '../pages/public/NotFoundPage';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  // While auth session is being restored/verified, display a graceful loader
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--color-page)' }}>
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
          Loading admin panel...
        </p>
      </div>
    );
  }

  // Security & Privacy Guard:
  // Customers and guests cannot access the admin desk.
  // Mask the admin panel completely by rendering the customer 404 Not Found page within StoreLayout.
  if (!isAdmin) {
    return (
      <StoreLayout>
        <NotFoundPage />
      </StoreLayout>
    );
  }

  return (
    <div className="admin-wrapper">
      {/* Mobile Top Header (<= 768px) */}
      <div className="admin-mobile-header">
        <Link to="/" className="admin-brand-link" onClick={closeMobileNav}>
          <span className="admin-brand-title">FREE BOOK STORE</span>
          <span className="admin-badge">Admin Desk</span>
        </Link>
        <div className="admin-mobile-actions">
          <ThemeToggle compact />
          <button
            className="admin-menu-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle admin navigation menu"
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <aside className={`admin-sidebar ${mobileNavOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="admin-brand desktop-only">
          <Link to="/" className="admin-brand-link">
            <h2>FREE BOOK STORE</h2>
            <span className="admin-badge">Admin Desk</span>
          </Link>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobileNav}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/books" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobileNav}>
            📚 Manage Books
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobileNav}>
            🏷️ Categories
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobileNav}>
            📦 Customer Orders
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="btn-store-return" onClick={closeMobileNav}>
            &larr; Back to Bookstore
          </Link>
          <button onClick={handleLogout} className="btn-admin-logout">
            Log Out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-title">Admin Dashboard</div>
          <div className="topbar-user">
            <span>Logged in as: <strong>{user?.name || 'Admin'}</strong></span>
            <ThemeToggle className="admin-theme-toggle" />
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
