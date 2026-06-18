import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export default function CustomersView({ customers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');

  // Filter customers list
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Stats calculation
  const totalLTV = customers.reduce((sum, c) => sum + c.totalSpend, 0);
  const avgLTV = totalLTV / customers.length;
  const activeCustomersCount = customers.filter(c => c.status === 'Active').length;

  const stats = [
    { title: 'Total Members', value: customers.length, icon: User, color: 'rgba(99,102,241,0.1)', textColor: 'var(--accent-primary)', change: '+12.4% MoM' },
    { title: 'Active Members', value: activeCustomersCount, icon: TrendingUp, color: 'rgba(16,185,129,0.1)', textColor: 'var(--accent-success)', change: '+8.2% MoM' },
    { title: 'Avg Lifetime Value', value: `$${avgLTV.toFixed(2)}`, icon: DollarSign, color: 'rgba(6,182,212,0.1)', textColor: 'var(--accent-info)', change: '+4.5% MoM' }
  ];

  const getStatusBadge = (status) => {
    return status === 'Active' 
      ? <span className="badge-premium badge-premium-success">Active</span>
      : <span className="badge-premium badge-premium-muted">Inactive</span>;
  };

  const getOrderStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-premium-success';
      case 'Shipped': return 'badge-premium-info';
      case 'Processing': return 'badge-premium-primary';
      case 'Pending': return 'badge-premium-warning';
      case 'Cancelled': return 'badge-premium-danger';
      default: return 'badge-premium-muted';
    }
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Customers Management</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            View consumer insights, order history records, and lifetime value analytics.
          </p>
        </div>
      </div>

      {/* Customer Statistics Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="col-12 col-md-4">
              <div className="glass-card p-3.5 h-100 d-flex align-items-center gap-3">
                <div className="kpi-icon-wrapper" style={{ backgroundColor: stat.color, color: stat.textColor }}>
                  <IconComp size={22} />
                </div>
                <div>
                  <span className="text-secondary-color fw-medium d-block mb-0.5" style={{ fontSize: '0.8rem' }}>{stat.title}</span>
                  <h4 className="fw-bold mb-0.5 font-monospace">{stat.value}</h4>
                  <span className="text-success small d-flex align-items-center gap-0.5" style={{ fontSize: '0.75rem' }}>
                    <ArrowUpRight size={12} /> {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: List on Left, Profile Card on Right */}
      <div className="row g-4">
        {/* Customer Listing Section */}
        <div className="col-12 col-lg-7">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Customer Directory</h5>
              <div className="position-relative" style={{ width: '220px' }}>
                <span className="position-absolute top-50 start-0 translate-middle-y ps-2.5 text-muted">
                  <Search size={14} />
                </span>
                <input 
                  type="text" 
                  className="form-control form-control-custom form-control-sm ps-4.5" 
                  placeholder="Search by name, email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '0.75rem' }}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-premium mb-0">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    <th className="text-end">Orders</th>
                    <th className="text-end">Spend</th>
                    <th className="text-center">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((c) => (
                      <tr 
                        key={c.id} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedCustomerId(c.id)}
                        className={selectedCustomerId === c.id ? 'bg-primary-subtle-2' : ''}
                      >
                        <td>
                          <div className="d-flex align-items-center gap-2.5">
                            <img src={c.avatar} alt={c.name} className="rounded-circle" style={{ width: '32px', height: '32px', objectFit: 'cover', flexShrink: 0 }} />
                            <div className="d-flex flex-column">
                              <span className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{c.name}</span>
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{c.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{getStatusBadge(c.status)}</td>
                        <td className="text-end font-monospace">{c.totalOrders}</td>
                        <td className="text-end font-monospace fw-semibold text-primary-color">${c.totalSpend.toFixed(2)}</td>
                        <td className="text-center text-muted">
                          <ChevronRight size={14} className={selectedCustomerId === c.id ? 'text-primary' : ''} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Profile Card & Details on Right */}
        <div className="col-12 col-lg-5">
          {selectedCustomer ? (
            <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                {/* Header profile info */}
                <div className="text-center pb-3 border-bottom mb-3">
                  <img 
                    src={selectedCustomer.avatar} 
                    alt={selectedCustomer.name} 
                    className="rounded-circle border border-3 border-secondary mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5 className="fw-bold mb-0.5 text-primary-color">{selectedCustomer.name}</h5>
                  <span className="text-muted font-monospace small">{selectedCustomer.id}</span>
                  <div className="mt-2">{getStatusBadge(selectedCustomer.status)}</div>
                </div>

                {/* Contact details */}
                <div className="d-flex flex-column gap-2.5 mb-4 small">
                  <div className="d-flex align-items-center gap-2.5 text-secondary-color">
                    <Mail size={16} className="text-muted" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2.5 text-secondary-color">
                    <Phone size={16} className="text-muted" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2.5 text-secondary-color">
                    <MapPin size={16} className="text-muted" />
                    <span>{selectedCustomer.location}</span>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <div className="p-2.5 rounded text-center" style={{ background: 'rgba(0,0,0,0.1)' }}>
                      <span className="d-block text-muted mb-0.5" style={{ fontSize: '0.75rem' }}>Total Orders</span>
                      <span className="fw-bold text-primary-color font-monospace" style={{ fontSize: '1.1rem' }}>{selectedCustomer.totalOrders}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2.5 rounded text-center" style={{ background: 'rgba(0,0,0,0.1)' }}>
                      <span className="d-block text-muted mb-0.5" style={{ fontSize: '0.75rem' }}>Total Spent</span>
                      <span className="fw-bold text-primary-color font-monospace" style={{ fontSize: '1.1rem' }}>${selectedCustomer.totalSpend.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Order History Timeline */}
                <div>
                  <h6 className="fw-bold mb-2 text-primary-color" style={{ fontSize: '0.85rem' }}>Recent Order Logs</h6>
                  <div className="d-flex flex-column gap-2" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    {selectedCustomer.orderHistory && selectedCustomer.orderHistory.length > 0 ? (
                      selectedCustomer.orderHistory.map((order, index) => (
                        <div key={index} className="p-2 border rounded d-flex justify-content-between align-items-center bg-black-10">
                          <div>
                            <span className="d-block fw-semibold font-monospace" style={{ fontSize: '0.75rem' }}>{order.orderId}</span>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>{order.date}</span>
                          </div>
                          <div className="text-end">
                            <span className="fw-bold text-primary-color d-block font-monospace mb-0.5" style={{ fontSize: '0.8rem' }}>
                              ${order.total.toFixed(2)}
                            </span>
                            <span className={`badge-premium ${getOrderStatusBadgeClass(order.status)}`} style={{ fontSize: '0.65rem', padding: '0.2em 0.5em' }}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted small">No order history available.</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-center text-muted">
              Select a customer to view their detailed profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
