import { 
  DollarSign, 
  Users, 
  Boxes,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Package,
  ShoppingCart
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-lg border-0" style={{ background: 'var(--bg-sidebar)', borderRadius: '12px' }}>
        <p className="fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} className="mb-0 font-monospace" style={{ color: p.color, fontSize: '0.8rem' }}>
            {p.name}: {p.name.includes('Revenue') ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function DashboardView({ 
  products, 
  orders, 
  customers, 
  activities,
  analyticsData,
  setActiveTab,
  adminName = 'Radhika Kapoor'
}) {
  // Compute KPI values dynamically based on current lists
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0) + 128000; // base + dynamic orders

  const totalOrdersCount = orders.length + 1937; // base + dynamic list
  const totalCustomersCount = customers.length + 2244; // base + dynamic list
  const activeProductsCount = products.filter(p => p.status === 'Active').length;

  const kpis = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "+14.3%",
      isPositive: true,
      icon: DollarSign,
      color: "rgba(99, 102, 241, 0.12)",
      textColor: "var(--accent-primary)",
      desc: "vs. previous month"
    },
    {
      title: "Total Orders",
      value: totalOrdersCount.toLocaleString(),
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "rgba(16, 185, 129, 0.12)",
      textColor: "var(--accent-success)",
      desc: "vs. previous month"
    },
    {
      title: "Total Customers",
      value: totalCustomersCount.toLocaleString(),
      change: "+18.3%",
      isPositive: true,
      icon: Users,
      color: "rgba(6, 182, 212, 0.12)",
      textColor: "var(--accent-info)",
      desc: "vs. previous month"
    },
    {
      title: "Active Products",
      value: `${activeProductsCount} / ${products.length}`,
      change: "+2 new",
      isPositive: true,
      icon: Boxes,
      color: "rgba(245, 158, 11, 0.12)",
      textColor: "var(--accent-warning)",
      desc: "updated this week"
    }
  ];

  // Pie chart data for Order Statuses
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = {
    Pending: '#f59e0b',    // Amber
    Processing: '#06b6d4', // Cyan
    Shipped: '#6366f1',    // Indigo
    Delivered: '#10b981',  // Emerald
    Cancelled: '#ef4444'   // Rose
  };

  // Top products calculation
  const topProducts = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 4);

  // Helper for rendering badges
  const getStatusBadgeClass = (status) => {
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
      {/* Welcome Section */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-8">
          <h2 className="fw-bold mb-1">Welcome back, {adminName}!</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Here is what's happening with your store today.
          </p>
        </div>
        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
          <button 
            className="btn btn-primary px-3 py-2 fw-medium d-flex align-items-center gap-2 ms-md-auto"
            style={{ borderRadius: '10px', background: 'var(--grad-primary)', border: 'none' }}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={16} />
            View Advanced Reports
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="row g-4 mb-4">
        {kpis.map((kpi, idx) => {
          const IconComp = kpi.icon;
          return (
            <div key={idx} className="col-12 col-sm-6 col-xl-3">
              <div className="glass-card kpi-card h-100 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-secondary-color fw-medium d-block mb-1" style={{ fontSize: '0.85rem' }}>{kpi.title}</span>
                    <h3 className="fw-bold mb-0 font-monospace" style={{ fontSize: '1.65rem' }}>{kpi.value}</h3>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ backgroundColor: kpi.color, color: kpi.textColor }}>
                    <IconComp size={22} />
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge px-2 py-1 font-monospace d-flex align-items-center gap-0.5 ${kpi.isPositive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ borderRadius: '6px', fontSize: '0.75rem' }}>
                    {kpi.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.change}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>{kpi.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="row g-4 mb-4">
        {/* Revenue Analytics (Area Chart) */}
        <div className="col-12 col-xl-8">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-1">Revenue Analytics</h5>
                <span className="text-secondary-color" style={{ fontSize: '0.8rem' }}>Monthly earnings performance</span>
              </div>
              <div className="badge bg-primary-subtle text-primary px-3 py-2 fw-medium" style={{ borderRadius: '8px', fontSize: '0.75rem' }}>
                USD ($)
              </div>
            </div>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Order Statistics (Pie Chart) */}
        <div className="col-12 col-xl-4">
          <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold mb-1">Order Statistics</h5>
              <span className="text-secondary-color" style={{ fontSize: '0.8rem' }}>Breakdown of order statuses</span>
            </div>
            
            <div className="position-relative d-flex justify-content-center align-items-center my-4" style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="position-absolute text-center">
                <span className="d-block text-muted" style={{ fontSize: '0.75rem' }}>Total Orders</span>
                <span className="fw-bold font-monospace" style={{ fontSize: '1.4rem' }}>{orders.length}</span>
              </div>
            </div>

            {/* Pie Legends */}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {pieData.map((entry, idx) => (
                <div key={idx} className="d-flex align-items-center gap-1.5 px-2 py-1 bg-black-10 rounded" style={{ fontSize: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[entry.name] }}></div>
                  <span className="text-secondary-color">{entry.name}</span>
                  <span className="fw-bold font-monospace text-primary-color ms-1">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity & Products Section */}
      <div className="row g-4 mb-4">
        {/* Top Selling Products */}
        <div className="col-12 col-lg-6 col-xl-7">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Top Performing Products</h5>
            <div className="table-responsive">
              <table className="table table-premium mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th className="text-end">Units Sold</th>
                    <th className="text-end">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex align-items-center" style={{ gap: '0.85rem' }}>
                          <img src={p.image} alt={p.name} className="rounded" style={{ width: '36px', height: '36px', objectFit: 'cover', flexShrink: 0 }} />
                          <div className="d-flex flex-column">
                            <span className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{p.name}</span>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>{p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '0.75rem' }}>{p.category}</span>
                      </td>
                      <td className="text-end font-monospace">{p.soldCount}</td>
                      <td className="text-end font-monospace fw-semibold text-primary-color">
                        ${(p.soldCount * p.price).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="col-12 col-lg-6 col-xl-5">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Store Activity</h5>
            <div className="d-flex flex-column gap-3.5">
              {activities.map((act) => {
                let ActIcon = Activity;
                if (act.type === 'order') ActIcon = ShoppingCart;
                if (act.type === 'product') ActIcon = Package;
                if (act.type === 'customer') ActIcon = Users;

                return (
                  <div key={act.id} className="d-flex gap-3 align-items-start">
                    <div className={`p-2 rounded-3 text-${act.color} bg-${act.color}-subtle`} style={{ flexShrink: 0 }}>
                      <ActIcon size={18} />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0 text-primary-color fw-medium" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>
                        {act.title}
                      </p>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-card p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-1">Recent Transactions</h5>
            <span className="text-secondary-color" style={{ fontSize: '0.8rem' }}>Latest sales transactions</span>
          </div>
          <button 
            className="btn btn-outline-secondary px-3 py-1.5 btn-sm"
            style={{ borderRadius: '8px' }}
            onClick={() => setActiveTab('orders')}
          >
            Manage Orders
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-premium mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment</th>
                <th className="text-end">Total</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 4).map((order) => (
                <tr key={order.id}>
                  <td className="font-monospace fw-semibold">{order.id}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-medium text-primary-color" style={{ fontSize: '0.85rem' }}>{order.customerName}</span>
                      <span className="text-muted" style={{ fontSize: '0.7rem' }}>{order.email}</span>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.paymentMethod}</td>
                  <td className="text-end font-monospace fw-bold text-primary-color">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <span className={`badge-premium ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
