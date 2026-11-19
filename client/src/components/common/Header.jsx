import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <span className="brand-name">FREE BOOK STORE</span>
          <span className="brand-tagline">Online Book Store</span>
        </Link>

        {/* Mobile controls (Quick Theme Toggle + Menu Hamburger) */}
        <div className="mobile-header-actions">
          <ThemeToggle compact className="header-mobile-theme" />
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-icon">☰</span>
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Books
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link cart-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="user-nav-group">
              {isAdmin ? (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => `nav-link admin-pill ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Admin Portal
                </NavLink>
              ) : (
                <NavLink
                  to="/orders"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  My Orders
                </NavLink>
              )}
              <span className="user-greeting">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              <button onClick={handleLogout} className="btn-logout" title="Log out">
                Log Out
              </button>
            </div>
          ) : (
            <div className="auth-nav-group">
              <Link to="/login" className="btn-nav-login" onClick={closeMenu}>
                Log In
              </Link>
              <Link to="/register" className="btn-nav-register" onClick={closeMenu}>
                Register
              </Link>
            </div>
          )}

          {/* Desktop Theme Toggle */}
          <div className="desktop-theme-wrapper">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
