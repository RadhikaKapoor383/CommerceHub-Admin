import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  X,
  CreditCard,
  Mail,
  User,
  Calendar,
  Truck,
  CheckCircle,
  MapPin,
  Clock
} from 'lucide-react';

export default function OrdersView({ orders, setOrders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Selected Order for detail modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return <span className="badge-premium badge-premium-success">Delivered</span>;
      case 'Shipped': return <span className="badge-premium badge-premium-info">Shipped</span>;
      case 'Processing': return <span className="badge-premium badge-premium-primary" style={{ color: 'var(--accent-primary)', border: '1px solid rgba(99,102,241,0.2)', backgroundColor: 'rgba(99,102,241,0.08)' }}>Processing</span>;
      case 'Pending': return <span className="badge-premium badge-premium-warning">Pending</span>;
      case 'Cancelled': return <span className="badge-premium badge-premium-danger">Cancelled</span>;
      default: return <span className="badge-premium badge-premium-muted">{status}</span>;
    }
  };

  // Stepper timeline helper
  const getTimelineSteps = (status) => {
    if (status === 'Cancelled') {
      return [
        { label: 'Pending', status: 'completed' },
        { label: 'Cancelled', status: 'failed' }
      ];
    }
    
    const steps = [
      { label: 'Placed', status: 'pending' },
      { label: 'Processing', status: 'pending' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' }
    ];

    if (status === 'Pending') {
      steps[0].status = 'active';
    } else if (status === 'Processing') {
      steps[0].status = 'completed';
      steps[1].status = 'active';
    } else if (status === 'Shipped') {
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'active';
    } else if (status === 'Delivered') {
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'completed';
      steps[3].status = 'completed';
    }

    return steps;
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedOrder) return;
    
    const nowStr = new Date().toLocaleString('en-US', { hour12: true });
    const updatedHistory = [
      ...selectedOrder.statusHistory,
      { status: newStatus, date: `${new Date().toISOString().split('T')[0]} ${nowStr.split(', ')[1]}` }
    ];

    const updatedOrder = {
      ...selectedOrder,
      status: newStatus,
      statusHistory: updatedHistory
    };

    setSelectedOrder(updatedOrder);
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-1">Orders Management</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Track sales, manage status transitions, and review orders.
          </p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          {/* Search */}
          <div className="col-12 col-md-6 col-lg-5">
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                className="form-control form-control-custom ps-5" 
                placeholder="Search by Order ID, customer, email..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-12 col-md-4 col-lg-4">
            <select 
              className="form-select form-control-custom"
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            >
              <option disabled>Select Status</option>
              {statuses.map((s, idx) => (
                <option key={idx} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
              ))}
            </select>
          </div>

          {/* Clear Button */}
          <div className="col-12 col-md-2 col-lg-3 text-md-end">
            {(searchTerm || selectedStatus !== 'All') && (
              <button 
                className="btn btn-link text-muted p-0 text-decoration-none fw-medium"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('All');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card mb-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-premium mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Details</th>
                <th>Date</th>
                <th>Payment</th>
                <th className="text-end">Total</th>
                <th className="text-center">Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((order) => (
                  <tr key={order.id}>
                    <td className="font-monospace fw-semibold">{order.id}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="fw-semibold text-primary-color" style={{ fontSize: '0.9rem' }}>{order.customerName}</span>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{order.email}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{order.paymentMethod}</td>
                    <td className="text-end font-monospace fw-bold text-primary-color">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="text-center">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="text-end">
                      <button 
                        className="btn btn-link text-muted p-1.5 rounded hover-bg"
                        onClick={() => setSelectedOrder(order)}
                        title="View Order Details"
                        style={{ border: 'none' }}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Panel */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex justify-content-between align-items-center">
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} items
            </span>
            <nav>
              <ul className="pagination mb-0 pagination-sm gap-1">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link rounded" onClick={() => handlePageChange(currentPage - 1)}>
                    <ChevronLeft size={14} />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p} className={`page-item ${currentPage === p ? 'active' : ''}`}>
                    <button 
                      className="page-link rounded" 
                      onClick={() => handlePageChange(p)}
                      style={currentPage === p ? { background: 'var(--grad-primary)', border: 'none' } : {}}
                    >
                      {p}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link rounded" onClick={() => handlePageChange(currentPage + 1)}>
                    <ChevronRight size={14} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* ORDER DETAIL MODAL OVERLAY */}
      {selectedOrder && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card border-1">
              {/* Header */}
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-primary-color d-flex align-items-center gap-2">
                  <span>Order Details</span>
                  <span className="font-monospace text-muted" style={{ fontSize: '0.9rem' }}>({selectedOrder.id})</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                {/* Stepper timeline */}
                <div className="mb-4">
                  <h6 className="fw-semibold text-secondary-color small mb-3">Fulfillment Progress</h6>
                  <div className="stepper-timeline">
                    {getTimelineSteps(selectedOrder.status).map((step, idx) => (
                      <div 
                        key={idx} 
                        className={`stepper-step ${step.status === 'completed' ? 'completed' : step.status === 'active' ? 'active' : step.status === 'failed' ? 'failed text-danger' : ''}`}
                      >
                        <div className="stepper-bubble">
                          {step.status === 'completed' ? '✓' : step.status === 'failed' ? '✗' : idx + 1}
                        </div>
                        <span className="stepper-title">{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row g-4">
                  {/* Left Column: Customer & Items */}
                  <div className="col-12 col-md-7">
                    {/* Items table */}
                    <div className="glass-card p-3 mb-3 border-light-subtle" style={{ background: 'rgba(0,0,0,0.1)' }}>
                      <h6 className="fw-semibold text-primary-color mb-2">Order Items</h6>
                      <div className="table-responsive">
                        <table className="table table-sm table-borderless align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                          <thead>
                            <tr className="border-bottom border-secondary" style={{ opacity: 0.5 }}>
                              <th>Product</th>
                              <th className="text-center">Qty</th>
                              <th className="text-end">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item, idx) => (
                              <tr key={idx}>
                                <td className="py-2 fw-medium text-primary-color">{item.name}</td>
                                <td className="text-center py-2 font-monospace">{item.quantity}</td>
                                <td className="text-end py-2 font-monospace">${item.price.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr className="border-top border-secondary" style={{ borderStyle: 'dashed' }}>
                              <td colSpan="2" className="fw-bold py-2">Total Amount</td>
                              <td className="text-end fw-bold font-monospace text-primary-color" style={{ fontSize: '0.95rem' }}>
                                ${selectedOrder.total.toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Change Status Actions */}
                    <div className="glass-card p-3">
                      <h6 className="fw-semibold text-secondary-color small mb-2">Quick Actions (Update Status)</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                          <>
                            {selectedOrder.status === 'Pending' && (
                              <button 
                                className="btn btn-sm btn-info text-white" 
                                onClick={() => handleUpdateStatus('Processing')}
                              >
                                Accept & Process
                              </button>
                            )}
                            {selectedOrder.status === 'Processing' && (
                              <button 
                                className="btn btn-sm btn-primary" 
                                style={{ background: 'var(--grad-primary)', border: 'none' }}
                                onClick={() => handleUpdateStatus('Shipped')}
                              >
                                Mark as Shipped
                              </button>
                            )}
                            {selectedOrder.status === 'Shipped' && (
                              <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => handleUpdateStatus('Delivered')}
                              >
                                Mark as Delivered
                              </button>
                            )}
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => handleUpdateStatus('Cancelled')}
                            >
                              Cancel Order
                            </button>
                          </>
                        )}
                        {(selectedOrder.status === 'Delivered' || selectedOrder.status === 'Cancelled') && (
                          <span className="text-muted small">No actions available. Order status is finalized.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Order Meta & Status History */}
                  <div className="col-12 col-md-5">
                    {/* Metadata details */}
                    <div className="d-flex flex-column gap-3 mb-4">
                      {/* Customer info */}
                      <div className="d-flex gap-2.5 align-items-start">
                        <User size={18} className="text-muted mt-0.5" />
                        <div>
                          <span className="d-block fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{selectedOrder.customerName}</span>
                          <span className="d-block text-secondary-color" style={{ fontSize: '0.8rem' }}>{selectedOrder.email}</span>
                        </div>
                      </div>

                      {/* Date placed */}
                      <div className="d-flex gap-2.5 align-items-center">
                        <Calendar size={18} className="text-muted" />
                        <span className="text-secondary-color" style={{ fontSize: '0.8rem' }}>
                          Placed on: <strong className="text-primary-color">{selectedOrder.date}</strong>
                        </span>
                      </div>

                      {/* Payment method */}
                      <div className="d-flex gap-2.5 align-items-center">
                        <CreditCard size={18} className="text-muted" />
                        <span className="text-secondary-color" style={{ fontSize: '0.8rem' }}>
                          Method: <strong className="text-primary-color">{selectedOrder.paymentMethod}</strong>
                        </span>
                      </div>
                    </div>

                    {/* History Timestamps */}
                    <div>
                      <h6 className="fw-semibold text-secondary-color small mb-2.5">Status History Timeline</h6>
                      <div className="d-flex flex-column gap-2" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                        {selectedOrder.statusHistory.map((history, idx) => (
                          <div key={idx} className="d-flex gap-2 align-items-start border-start border-secondary ps-2.5 ms-1.5 position-relative">
                            <div className="position-absolute bg-secondary" style={{ width: '6px', height: '6px', borderRadius: '50%', left: '-4.5px', top: '6px' }}></div>
                            <div className="flex-grow-1">
                              <span className="fw-medium text-primary-color" style={{ fontSize: '0.8rem' }}>{history.status}</span>
                              <span className="d-block text-muted" style={{ fontSize: '0.7rem' }}>{history.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
