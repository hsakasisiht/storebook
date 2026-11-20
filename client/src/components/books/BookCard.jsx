import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './BookCard.css';

export const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const isOutOfStock = (book.stock ?? 0) <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(book, 1);
    }
  };

  const defaultCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';

  return (
    <article className="book-card card">
      <Link to={`/books/${book._id}`} className="book-card-media">
        <img
          src={book.coverImage || defaultCover}
          alt={`Cover of ${book.title}`}
          className="book-card-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultCover;
          }}
        />
        {book.featured && <span className="book-badge-featured">Featured</span>}
        {isOutOfStock && <span className="book-badge-out">Out of Stock</span>}
      </Link>

      <div className="book-card-body">
        {book.categoryId?.name && (
          <span className="book-category-tag">{book.categoryId.name}</span>
        )}

        <h3 className="book-card-title">
          <Link to={`/books/${book._id}`} title={book.title}>
            {book.title}
          </Link>
        </h3>

        <p className="book-card-author">by {book.author}</p>

        <div className="book-card-footer">
          <div className="book-price-block">
            <span className="book-price">₹{book.price}</span>
            <span className={`book-stock-indicator ${isOutOfStock ? 'stock-out' : 'stock-in'}`}>
              {isOutOfStock ? 'Sold Out' : (book.stock <= 3 ? `Only ${book.stock} left` : 'In Stock')}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary book-add-btn"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
