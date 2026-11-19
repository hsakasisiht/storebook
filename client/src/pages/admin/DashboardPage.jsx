import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminBooks } from '../../services/adminService';
import { getCategories } from '../../services/bookService';

export const DashboardPage = () => {
  const [bookCount, setBookCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [bookRes, catList] = await Promise.all([
          getAdminBooks({ limit: 100 }),
          getCategories(),
        ]);
        const books = bookRes.books || [];
        setBookCount(books.length);
        setCategoryCount(catList.length);
        const low = books.filter((b) => (b.stock ?? 0) < 5).length;
        setLowStockCount(low);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-2)' }}>Store Overview</h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>
        Here is a quick snapshot of your books, categories, and inventory status.
      </p>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Books Listed
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: 'var(--space-2)' }}>{bookCount}</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
            Across {categoryCount} categories
          </span>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Orders
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: 'var(--space-2)' }}>1</h2>
          <span className="badge badge-pending">Active</span>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Stock Health
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: 'var(--space-2)', color: lowStockCount > 0 ? 'var(--color-signal-coral)' : 'var(--color-text-heading)' }}>
            {lowStockCount > 0 ? `${lowStockCount} Low` : 'Optimal'}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            {lowStockCount > 0 ? 'Titles need restocking' : 'All titles well stocked'}
          </span>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Link to="/admin/books" className="btn btn-primary">
            Manage Books
          </Link>
          <Link to="/admin/categories" className="btn btn-secondary">
            Manage Categories
          </Link>
          <Link to="/admin/orders" className="btn btn-secondary">
            View Orders
          </Link>
          <Link to="/books" className="btn btn-outline-coral">
            Visit Bookstore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
