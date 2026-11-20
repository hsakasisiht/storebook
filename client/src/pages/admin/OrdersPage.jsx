import React, { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus } from '../../services/orderService';
import './OrdersPage.css';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [feedback, setFeedback] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getAdminOrders({ status: statusFilter });
      setOrders(res.orders || []);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to load customer orders.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setFeedback({ type: 'success', text: `Order status updated to "${newStatus}".` });
        loadOrders();
        setTimeout(() => setFeedback(null), 3500);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Status update failed.' });
    }
  };

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
        return <span className="badge badge-pending">Pending</span>;
    }
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <div>
          <h1>Customer Orders</h1>
          <p className="subtitle">View and update customer book orders and delivery status.</p>
        </div>

        <div className="orders-filter-control">
          <label htmlFor="filter-status">Filter by Status:</label>
          <select
            id="filter-status"
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {feedback && (
        <div className={`feedback-alert feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {loading ? (
        <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <p>Loading customer orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="card" style={{ padding: 'var(--space-12)', textAlign: 'center' }}>
          <h3>No orders match this status filter</h3>
          <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-2)' }}>
            Customer orders placed on the storefront will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="card admin-orders-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items Summary</th>
                <th>Total</th>
                <th>Current Status</th>
                <th>Update Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalItemQty = order.items?.reduce((s, i) => s + i.quantity, 0) || 0;
                return (
                  <tr key={order._id}>
                    <td>
                      <strong className="order-code">{order.orderNumber}</strong>
                      <div className="table-subtext">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </td>
                    <td>
                      <strong>{order.userId?.name || order.shippingAddress?.fullName || 'Customer'}</strong>
                      <div className="table-subtext">{order.userId?.email || 'Guest'}</div>
                    </td>
                    <td>
                      <span>{totalItemQty} volumes</span>
                      <div className="table-subtext">
                        {order.items?.map((i) => i.titleSnapshot).slice(0, 2).join(', ')}
                        {order.items?.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-deep-teal)' }}>
                        ₹{order.total?.toFixed(2)}
                      </strong>
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      <select
                        className="form-control status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="btn btn-secondary btn-sm"
                      >
                        View Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order #{selectedOrder.orderNumber}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                &times;
              </button>
            </div>

            <div className="modal-body-order">
              <div className="order-meta-grid">
                <div>
                  <span className="meta-label">Customer Name:</span>
                  <strong>{selectedOrder.shippingAddress?.fullName}</strong>
                </div>
                <div>
                  <span className="meta-label">Customer Phone:</span>
                  <strong>{selectedOrder.shippingAddress?.phone}</strong>
                </div>
                <div>
                  <span className="meta-label">Payment Mode:</span>
                  <span>{selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</span>
                </div>
                <div>
                  <span className="meta-label">Delivery Address:</span>
                  <span>
                    {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}{' '}
                    ({selectedOrder.shippingAddress?.postalCode})
                  </span>
                </div>
              </div>

              <h4 style={{ margin: 'var(--space-6) 0 var(--space-3)' }}>Ordered Volumes</h4>
              <div className="modal-items-list">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="modal-item-row">
                    <img
                      src={item.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                      alt=""
                      className="modal-item-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{item.titleSnapshot}</strong>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-muted)' }}>
                        by {item.authorSnapshot} &bull; {item.quantity} copy &times; ₹{item.unitPrice}
                      </div>
                    </div>
                    <strong>₹{(item.unitPrice * item.quantity).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              <div className="modal-order-total-bar">
                <span>Total Amount:</span>
                <strong style={{ fontSize: '1.35rem', color: 'var(--color-deep-teal)' }}>
                  ₹{selectedOrder.total?.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
