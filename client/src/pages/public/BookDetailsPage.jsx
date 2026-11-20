import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../../services/bookService';
import { useCart } from '../../context/CartContext';
import './BookDetailsPage.css';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookById(id);
        if (isMounted) {
          setBook(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Book details could not be retrieved.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchBook();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAdd = () => {
    if (book && (book.stock ?? 0) > 0) {
      addToCart(book, quantity);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container book-details-loading">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container book-details-error">
        <div className="card" style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
          <h2>Book Not Found</h2>
          <p style={{ margin: 'var(--space-2) 0 var(--space-6)', color: 'var(--color-muted)' }}>
            {error || "We couldn't find this book. It might have been moved or is no longer available."}
          </p>
          <Link to="/books" className="btn btn-primary">
            &larr; Browse All Books
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = (book.stock ?? 0) <= 0;
  const maxAllowedQty = Math.max(1, Math.min(book.stock || 1, 10));

  return (
    <div className="container book-details-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> &rsaquo; <Link to="/books">Books</Link> &rsaquo;{' '}
        <span>{book.title}</span>
      </nav>

      <div className="book-details-layout card">
        {/* Cover Column */}
        <div className="book-details-cover-col">
          <div className="details-cover-wrapper">
            <img
              src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
              alt={`Cover of ${book.title}`}
              className="details-cover-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
              }}
            />
            {book.featured && <span className="details-featured-badge">Featured</span>}
          </div>
        </div>

        {/* Info Column */}
        <div className="book-details-info-col">
          {book.categoryId?.name && (
            <span className="details-category-pill">{book.categoryId.name}</span>
          )}

          <h1 className="details-title">{book.title}</h1>
          <p className="details-author">by <strong>{book.author}</strong></p>

          <div className="details-price-row">
            <span className="details-price">₹{book.price}</span>
            <span className={`details-stock-status ${isOutOfStock ? 'status-out' : 'status-in'}`}>
              {isOutOfStock ? 'Currently Out of Stock' : `In Stock (${book.stock} copies)`}
            </span>
          </div>

          <div className="details-desc-block">
            <h3>About This Book</h3>
            <p>{book.description}</p>
          </div>

          {/* Action Row */}
          {!isOutOfStock ? (
            <div className="details-action-box">
              <div className="quantity-picker">
                <label htmlFor="qty-select">Quantity:</label>
                <select
                  id="qty-select"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[...Array(maxAllowedQty)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-add-cart-large"
                onClick={handleAdd}
              >
                Add {quantity} to Cart &bull; ₹{(book.price * quantity).toFixed(2)}
              </button>

              {addedMessage && (
                <div className="added-notification">
                  ✓ Added to cart! <Link to="/cart">View Cart &rarr;</Link>
                </div>
              )}
            </div>
          ) : (
            <div className="details-out-notice">
              <p>Sorry, this book is currently out of stock. Please check back soon or explore our other titles!</p>
              <Link to="/books" className="btn btn-secondary">Browse Other Books</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
