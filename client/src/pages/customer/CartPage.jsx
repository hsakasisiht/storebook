import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './CartPage.css';

export const CartPage = () => {
  const { items, totalItems, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shippingFee = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const estimatedTotal = subtotal + shippingFee;

  const handleProceedCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container cart-page">
      <header className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p className="cart-subtitle">Review your books and proceed to checkout whenever you're ready.</p>
      </header>

      {items.length === 0 ? (
        <div className="card cart-empty-card">
          <span className="cart-empty-icon">📚</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any books to your cart yet. Discover something great today!</p>
          <Link to="/books" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
            Start Browsing Books
          </Link>
        </div>
      ) : (
        <div className="cart-grid-layout">
          {/* Items List */}
          <div className="card cart-items-card">
            <div className="cart-items-header">
              <h3>Items ({totalItems})</h3>
              <button onClick={clearCart} className="btn-clear-cart">
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {items.map((item) => {
                const book = item.book || {};
                const bookId = item.bookId || book._id;
                const price = book.price || 0;
                const lineTotal = price * (item.quantity || 1);

                return (
                  <div key={bookId} className="cart-item-row">
                    <img
                      src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                      alt=""
                      className="cart-item-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    <div className="cart-item-details">
                      <h4 className="cart-item-title">
                        <Link to={`/books/${bookId}`}>{book.title || 'Volume'}</Link>
                      </h4>
                      <p className="cart-item-author">by {book.author || 'Unknown'}</p>
                      <div className="cart-item-price-unit">₹{price} each</div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="qty-control-box">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(bookId, (item.quantity || 1) - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateQuantity(bookId, (item.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-linetotal">
                        ₹{lineTotal.toFixed(2)}
                      </div>

                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => removeFromCart(bookId)}
                        title="Remove book from cart"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-continue-bar">
              <Link to="/books" className="continue-link">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="card cart-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal ({totalItems} items):</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span className={shippingFee === 0 ? 'shipping-free' : ''}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>

            {shippingFee > 0 && (
              <div className="free-shipping-hint">
                Add <strong>₹{(1000 - subtotal).toFixed(2)}</strong> more for FREE delivery!
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Estimated Total:</span>
              <span className="total-amount">₹{estimatedTotal.toFixed(2)}</span>
            </div>

            <p className="summary-tax-note">All taxes included. Delivery fee calculated above.</p>

            <button
              type="button"
              className="btn btn-primary btn-checkout-large"
              onClick={handleProceedCheckout}
            >
              Proceed to Checkout &rarr;
            </button>

            {!isAuthenticated && (
              <p className="auth-checkout-hint">
                * Please sign in or create an account to complete your order.
              </p>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
