import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-name">FREE BOOK STORE</div>
          <p className="brand-quote">Great stories made accessible to everyone.</p>
          <p className="project-note">Free Online Book Store &bull; Read, Learn, Grow</p>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/books">All Books</Link>
          <Link to="/cart">My Cart</Link>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Account</h4>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">About Us</h4>
          <p className="footer-about-text">
            A friendly online bookstore built to make reading easy, enjoyable, and accessible for everyone.
          </p>
          <p className="footer-palette-hint">Made with care for book lovers everywhere.</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Free Book Store. All rights reserved.</p>
      </div>
    </footer>
  );
};
