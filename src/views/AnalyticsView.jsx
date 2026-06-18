import React from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  DollarSign,
  ShoppingCart,
  Percent,
  TrendingDown
} from 'lucide-react';

export default function AnalyticsView({ 
  analyticsData, 
  productPerformance, 
  customerGrowth 
}) {
  
  const comparisonStats = [
    {
      title: "Gross Revenue",
      value: "$104,500.00",
      change: "+17.4%",
      isPositive: true,
      prevValue: "$89,000.00",
      icon: DollarSign,
      color: "rgba(99, 102, 241, 0.1)",
      textColor: "var(--accent-primary)"
    },
    {
      title: "Sales Orders",
      value: "812",
      change: "+19.4%",
      isPositive: true,
      prevValue: "680",
      icon: ShoppingCart,
      color: "rgba(16, 185, 129, 0.1)",
      textColor: "var(--accent-success)"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+15.7%",
      isPositive: true,
      prevValue: "2.80%",
      icon: Percent,
      color: "rgba(6, 182, 212, 0.1)",
      textColor: "var(--accent-info)"
    },
    {
      title: "AOV (Avg Order Value)",
      value: "$128.69",
      change: "-1.6%",
      isPositive: false,
      prevValue: "$130.88",
      icon: TrendingDown,
      color: "rgba(239, 68, 68, 0.1)",
      textColor: "var(--accent-danger)"
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 shadow-lg border-0" style={{ background: 'var(--bg-sidebar)', borderRadius: '12px' }}>
          <p className="fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="mb-0 font-monospace" style={{ color: p.color, fontSize: '0.8rem' }}>
              {p.name}: {typeof p.value === 'number' && p.name.includes('$') ? `$${p.value.toLocaleString()}` : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-1">Analytics Reports</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Analyze store metrics, performance, and customer trends.
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <div className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 small px-3 py-1.5" style={{ borderRadius: '10px' }}>
            <Calendar size={16} />
            Jan 1, 2026 - Jun 18, 2026
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="row g-4 mb-4">
        {comparisonStats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="col-12 col-sm-6 col-xl-3">
              <div className="glass-card p-3.5 h-100 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span className="text-secondary-color fw-medium d-block mb-1" style={{ fontSize: '0.8rem' }}>{stat.title}</span>
                    <h4 className="fw-bold mb-0 font-monospace text-primary-color">{stat.value}</h4>
                  </div>
                  <div className="kpi-icon-wrapper" style={{ backgroundColor: stat.color, color: stat.textColor, width: '40px', height: '40px' }}>
                    <IconComp size={18} />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2.5 pt-2.5 border-top" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Prev: {stat.prevValue}</span>
                  <span className={`badge px-2 py-0.5 font-monospace d-flex align-items-center gap-0.5 ${stat.isPositive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ borderRadius: '6px', fontSize: '0.7rem' }}>
                    {stat.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts: Revenue Area & Sales Bar */}
      <div className="row g-4 mb-4">
        {/* Revenue Growth Trend */}
        <div className="col-12 col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-1">Revenue Trend</h5>
            <span className="text-secondary-color d-block mb-4" style={{ fontSize: '0.8rem' }}>Monthly gross sales performance growth</span>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="var(--accent-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sales Volume Bar Chart */}
        <div className="col-12 col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-1">Orders Velocity</h5>
            <span className="text-secondary-color d-block mb-4" style={{ fontSize: '0.8rem' }}>Monthly checkout orders volume</span>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" name="Orders Volume" fill="var(--accent-success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts: Product Performance & Customer Growth */}
      <div className="row g-4 mb-4">
        {/* Product Performance Horizontal Bars */}
        <div className="col-12 col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-1">Product Revenue Performance</h5>
            <span className="text-secondary-color d-block mb-4" style={{ fontSize: '0.8rem' }}>Top selling items by sales volume value</span>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={productPerformance} 
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickFormatter={(val) => `$${val/1000}k`} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" name="Sales ($)" fill="var(--accent-info)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Customer Growth Line Chart */}
        <div className="col-12 col-lg-6">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-1">Customer Cohort Growth</h5>
            <span className="text-secondary-color d-block mb-4" style={{ fontSize: '0.8rem' }}>Comparison of active vs new customer signups</span>
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="active" name="Active Consumers" stroke="var(--accent-secondary)" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="new" name="New Registrants" stroke="var(--accent-warning)" strokeWidth={2} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
