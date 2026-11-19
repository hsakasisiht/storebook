import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-ornament" aria-hidden="true">
          📖
        </div>
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          We couldn't find the page you were looking for. It might have been moved, renamed,
          or never existed in the first place.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary not-found-btn">
            &larr; Back to Home
          </Link>
          <Link to="/books" className="btn btn-secondary not-found-btn">
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
