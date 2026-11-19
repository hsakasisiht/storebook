import React, { useState, useEffect } from 'react';
import { getAdminBooks, createBook, updateBook, deleteBook } from '../../services/adminService';
import { getCategories } from '../../services/bookService';
import './BooksPage.css';

export const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    categoryId: '',
    price: '',
    stock: '',
    description: '',
    coverImage: '',
    featured: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookRes, catList] = await Promise.all([
        getAdminBooks({ limit: 50 }),
        getCategories(),
      ]);
      setBooks(bookRes.books || []);
      setCategories(catList || []);
      if (catList.length > 0 && !formData.categoryId) {
        setFormData((prev) => ({ ...prev, categoryId: catList[0]._id }));
      }
    } catch (err) {
      setFeedback({ type: 'error', text: 'Error loading inventory data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      categoryId: categories[0]?._id || '',
      price: '',
      stock: '',
      description: '',
      coverImage: '',
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      author: book.author || '',
      categoryId: book.categoryId?._id || book.categoryId || categories[0]?._id || '',
      price: book.price || '',
      stock: book.stock || 0,
      description: book.description || '',
      coverImage: book.coverImage || '',
      featured: !!book.featured,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBook(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await updateBook(editingBook._id, formData);
        setFeedback({ type: 'success', text: `"${formData.title}" updated successfully.` });
      } else {
        await createBook(formData);
        setFeedback({ type: 'success', text: `"${formData.title}" added to store.` });
      }
      closeModal();
      loadData();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Action failed.' });
    }
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to remove "${book.title}" from the store?`)) {
      try {
        await deleteBook(book._id);
        setFeedback({ type: 'success', text: `"${book.title}" has been deleted.` });
        loadData();
        setTimeout(() => setFeedback(null), 4000);
      } catch (err) {
        setFeedback({ type: 'error', text: err.message || 'Delete failed.' });
      }
    }
  };

  return (
    <div className="admin-books-page">
      <div className="admin-books-header">
        <div>
          <h1>Manage Books</h1>
          <p className="subtitle">Add, edit, or remove books in your store collection.</p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          + Add New Book
        </button>
      </div>

      {feedback && (
        <div className={`feedback-alert feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {loading ? (
        <div className="card admin-loading-card">
          <p>Loading books...</p>
        </div>
      ) : (
        <div className="card admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title &amp; Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img
                      src={b.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                      alt=""
                      className="table-thumb"
                    />
                  </td>
                  <td>
                    <strong>{b.title}</strong>
                    <div className="table-subtext">{b.author}</div>
                  </td>
                  <td>
                    <span className="table-category-tag">
                      {b.categoryId?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td><strong>₹{b.price}</strong></td>
                  <td>
                    <span className={`stock-badge ${(b.stock ?? 0) <= 0 ? 'stock-badge-out' : 'stock-badge-in'}`}>
                      {b.stock} units
                    </span>
                  </td>
                  <td>
                    {b.featured ? (
                      <span className="badge badge-confirmed">Yes</span>
                    ) : (
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>No</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => openEditModal(b)}
                        className="btn btn-secondary btn-sm"
                        title="Edit Book"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b)}
                        className="btn btn-sm btn-delete"
                        title="Delete Book"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingBook ? 'Edit Book Details' : 'Add New Book'}</h2>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="b-title">Book Title *</label>
                <input
                  id="b-title"
                  type="text"
                  className="form-control"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Picture of Dorian Gray"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="b-author">Author *</label>
                  <input
                    id="b-author"
                    type="text"
                    className="form-control"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Oscar Wilde"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="b-category">Category *</label>
                  <select
                    id="b-category"
                    className="form-control"
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="b-price">Price (₹ INR) *</label>
                  <input
                    id="b-price"
                    type="number"
                    min="0"
                    step="1"
                    className="form-control"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 450"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="b-stock">Available Stock *</label>
                  <input
                    id="b-stock"
                    type="number"
                    min="0"
                    step="1"
                    className="form-control"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g. 15"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="b-cover">Cover Image URL</label>
                <input
                  id="b-cover"
                  type="url"
                  className="form-control"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="b-desc">Description / Synopsis *</label>
                <textarea
                  id="b-desc"
                  rows="4"
                  className="form-control"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Editorial review or storyline overview..."
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  {' '}Mark as Featured Title (shown on Home page)
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingBook ? 'Save Changes' : 'Create Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
