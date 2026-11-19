import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/bookService';
import { createCategory } from '../../services/adminService';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState(null);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory({ name, slug, description });
      setFeedback({ type: 'success', text: `Category "${name}" created successfully!` });
      setName('');
      setSlug('');
      setDescription('');
      fetchCats();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to create category' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1>Book Categories</h1>
        <p style={{ color: 'var(--color-muted)' }}>Manage book categories so readers can easily find what they are looking for.</p>
      </div>

      {feedback && (
        <div className={`feedback-alert feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      <div className="admin-categories-layout">
        <div className="card admin-table-card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id || c.slug}>
                  <td><strong>{c.name}</strong></td>
                  <td><code>{c.slug}</code></td>
                  <td style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                    {c.description || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ padding: 'var(--space-6)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Add New Category</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label" htmlFor="cat-name">Category Name *</label>
              <input
                id="cat-name"
                type="text"
                className="form-control"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                placeholder="e.g. Science Fiction"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cat-slug">URL Slug</label>
              <input
                id="cat-slug"
                type="text"
                className="form-control"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. sci-fi"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cat-desc">Description</label>
              <textarea
                id="cat-desc"
                rows="3"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this genre..."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
