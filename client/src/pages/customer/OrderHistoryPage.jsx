import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import './OrderHistoryPage.css';

export const OrderHistoryPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await getMyOrders();
        setOrders(res.orders || []);
      } catch (err) {
        setError(err.message || 'Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge badge-confirmed">Confirmed</span>;
      case 'Shipped':
        return <span className="badge badge-shipped">Shipped</span>;
      case 'Delivered':
        return <span className="badge badge-delivered">Delivered</span>;
      case 'Cancelled':
        return <span className="badge badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge badge-pending">Pending Dispatch</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
        <div className="card" style={{ padding: 'var(--space-8)', maxWidth: '500px', margin: '0 auto' }}>
          <h2>Sign In Required</h2>
          <p style={{ margin: 'var(--space-2) 0 var(--space-6)', color: 'var(--color-muted)' }}>
            Please sign in to view your orders.
          </p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container orders-page">
      <header className="orders-header">
        <div>
          <span className="section-eyebrow">My Account</span>
          <h1>My Orders</h1>
          <p className="orders-subtitle">
            Track your book deliveries and past orders.
          </p>
        </div>
        <div className="orders-user-badge">
          <span>Signed in as <strong>{user?.name}</strong></span>
        </div>
      </header>

      {error && (
        <div className="feedback-alert feedback-error" style={{ marginBottom: 'var(--space-6)' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="card orders-empty-card">
          <span className="orders-empty-icon">📦</span>
          <h2>No orders yet</h2>
          <p>You haven't ordered any books yet. Find your first favorite book today!</p>
          <Link to="/books" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
            Start Browsing Books
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <article key={order._id} className="card order-card">
                <div className="order-card-header">
                  <div className="order-main-meta">
                    <span className="order-number">{order.orderNumber}</span>
                    <span className="order-date">Placed on {dateStr}</span>
                  </div>

                  <div className="order-status-block">
                    {getStatusBadge(order.status)}
                    <span className="order-total-pill">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-items-snapshots">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="order-snapshot-row">
                        <img
                          src={item.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                          alt=""
                          className="snapshot-thumb"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div className="snapshot-details">
                          <strong className="snapshot-title">{item.titleSnapshot}</strong>
                          <span className="snapshot-author">by {item.authorSnapshot}</span>
                          <span className="snapshot-meta">
                            {item.quantity} copy &times; ₹{item.unitPrice}
                          </span>
                        </div>
                        <div className="snapshot-linetotal">
                          ₹{(item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-shipping-summary">
                    <div className="shipping-box">
                      <strong>Delivery Address:</strong>
                      <p>
                        {order.shippingAddress?.fullName} &bull; {order.shippingAddress?.phone}
                      </p>
                      <p>
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}{' '}
                        {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                      </p>
                    </div>

                    <div className="payment-box">
                      <strong>Payment Mode:</strong>
                      <p>Pay on Delivery ({order.paymentStatus})</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
