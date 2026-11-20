import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/orderService';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const { items, totalItems, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Redirect if not signed in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  }, [isAuthenticated, navigate]);

  // Prefill address if customer already has saved details
  useEffect(() => {
    if (user) {
      const defaultAddr = user.addresses?.[0] || {};
      setAddress({
        fullName: defaultAddr.fullName || user.name || '',
        phone: defaultAddr.phone || user.phone || '',
        street: defaultAddr.street || '',
        city: defaultAddr.city || '',
        state: defaultAddr.state || '',
        postalCode: defaultAddr.postalCode || '',
      });
    }
  }, [user]);

  const shippingFee = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Cannot checkout with an empty cart.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        shippingAddress: address,
        paymentMethod: 'COD',
        items: items.map((i) => ({
          bookId: i.bookId || i.book?._id,
          title: i.book?.title,
          quantity: i.quantity,
        })),
      };

      const res = await createOrder(orderPayload);
      if (res.success && res.order) {
        setConfirmedOrder(res.order);
        clearCart();
      } else {
        throw new Error(res.message || 'Order could not be confirmed.');
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please review stock or details.');
    } finally {
      setLoading(false);
    }
  };

  // If order was successfully placed, render Order Confirmation View
  if (confirmedOrder) {
    return (
      <div className="container checkout-confirmed-page">
        <div className="card confirmation-card">
          <div className="confirmation-icon">✨</div>
          <span className="confirmation-badge">Order Confirmed</span>
          <h1>Thank You for Your Order!</h1>
          <p className="confirmation-lead">
            We've received your order and are packing your books with care.
          </p>

          <div className="confirmed-details-box">
            <div className="detail-item">
              <span>Order Number:</span>
              <strong>{confirmedOrder.orderNumber}</strong>
            </div>
            <div className="detail-item">
              <span>Payment Mode:</span>
              <strong>Pay on Delivery (Cash / UPI at doorstep)</strong>
            </div>
            <div className="detail-item">
              <span>Delivery To:</span>
              <span>
                {confirmedOrder.shippingAddress?.fullName}, {confirmedOrder.shippingAddress?.street},{' '}
                {confirmedOrder.shippingAddress?.city} ({confirmedOrder.shippingAddress?.postalCode})
              </span>
            </div>
            <div className="detail-item">
              <span>Total Amount:</span>
              <strong className="confirmed-price">₹{confirmedOrder.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="btn btn-primary">
              View My Orders
            </Link>
            <Link to="/books" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">Where should we deliver your books?</p>
      </header>

      {error && (
        <div className="feedback-alert feedback-error" style={{ marginBottom: 'var(--space-6)' }}>
          ⚠️ {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <h3>Your cart is empty</h3>
          <p style={{ margin: 'var(--space-2) 0 var(--space-4)', color: 'var(--color-muted)' }}>
            Please select at least one book to proceed with checkout.
          </p>
          <Link to="/books" className="btn btn-primary">Browse Catalogue</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          {/* Left Form: Delivery Address */}
          <div className="card checkout-form-card">
            <h3 className="section-title">1. Delivery Address</h3>

            <form id="checkout-form" onSubmit={handleSubmitOrder}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="addr-name">Full Name *</label>
                  <input
                    id="addr-name"
                    type="text"
                    className="form-control"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="Recipient's full name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="addr-phone">Phone Number *</label>
                  <input
                    id="addr-phone"
                    type="tel"
                    className="form-control"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="addr-street">Street Address *</label>
                <input
                  id="addr-street"
                  type="text"
                  className="form-control"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="Flat / House No., Street, Landmark"
                />
              </div>

              <div className="form-row form-row-three">
                <div className="form-group">
                  <label className="form-label" htmlFor="addr-city">City *</label>
                  <input
                    id="addr-city"
                    type="text"
                    className="form-control"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="addr-state">State / Province</label>
                  <input
                    id="addr-state"
                    type="text"
                    className="form-control"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="State"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="addr-pin">Postal Code *</label>
                  <input
                    id="addr-pin"
                    type="text"
                    className="form-control"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="PIN Code"
                  />
                </div>
              </div>

              <h3 className="section-title" style={{ marginTop: 'var(--space-8)' }}>
                2. Payment Method
              </h3>
              <div className="payment-option-card">
                <label className="payment-label">
                  <input type="radio" name="payment" defaultChecked readOnly />
                  <div>
                    <strong>Pay on Delivery (Cash or UPI at doorstep)</strong>
                    <p className="payment-subtext">
                      Pay conveniently via cash or UPI when your books arrive at your doorstep.
                    </p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-confirm-order"
                disabled={loading}
              >
                {loading ? 'Placing your order...' : `Place Order (₹${grandTotal.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* Right Sidebar: Items Review */}
          <aside className="card checkout-summary-card">
            <h3>Order Review ({totalItems} items)</h3>

            <div className="review-items-list">
              {items.map((item) => {
                const book = item.book || {};
                const price = book.price || 0;
                return (
                  <div key={item.bookId || book._id} className="review-item">
                    <img
                      src={book.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                      alt=""
                      className="review-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="review-item-info">
                      <span className="review-title">{book.title || 'Book'}</span>
                      <span className="review-meta">Qty: {item.quantity} &bull; ₹{price}</span>
                    </div>
                    <span className="review-linetotal">
                      ₹{(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal:</span>
              <strong>₹{subtotal.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span style={{ color: shippingFee === 0 ? '#2F6F4E' : 'inherit', fontWeight: 600 }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Final Total:</span>
              <span className="total-amount">₹{grandTotal.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
