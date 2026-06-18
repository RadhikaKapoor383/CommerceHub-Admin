import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  PackageMinus, 
  RotateCcw,
  Sparkles,
  Plus,
  ArrowDown
} from 'lucide-react';

export default function InventoryView({ products, setProducts }) {
  const [restockAmount, setRestockAmount] = useState({});

  // Compute statistics
  const totalProducts = products.length;
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10);
  const inStockProducts = products.filter(p => p.stock > 10);

  const handleRestock = (productId) => {
    const amount = parseInt(restockAmount[productId]);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive number to restock.');
      return;
    }

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = p.stock + amount;
        return {
          ...p,
          stock: newStock,
          status: (p.status === 'Out of Stock' || p.status === 'Draft') && newStock > 0 ? 'Active' : p.status
        };
      }
      return p;
    }));

    // Clear input
    setRestockAmount(prev => ({
      ...prev,
      [productId]: ''
    }));
  };

  const handleInputChange = (productId, val) => {
    setRestockAmount(prev => ({
      ...prev,
      [productId]: val
    }));
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="fw-bold mb-1">Inventory Management</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Monitor stock levels, manage restocks, and handle warnings.
          </p>
        </div>
      </div>

      {/* Inventory Overview Cards */}
      <div className="row g-4 mb-4">
        {/* In Stock */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="glass-card p-3.5 h-100 d-flex align-items-center gap-3">
            <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--accent-success)' }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <span className="text-secondary-color fw-medium d-block mb-0.5" style={{ fontSize: '0.8rem' }}>In Stock</span>
              <h4 className="fw-bold mb-0.5 font-monospace">{inStockProducts.length}</h4>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Healthy status</span>
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="glass-card p-3.5 h-100 d-flex align-items-center gap-3">
            <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--accent-warning)' }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <span className="text-secondary-color fw-medium d-block mb-0.5" style={{ fontSize: '0.8rem' }}>Low Stock</span>
              <h4 className="fw-bold mb-0.5 text-warning font-monospace">{lowStockProducts.length}</h4>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Need restock soon</span>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="glass-card p-3.5 h-100 d-flex align-items-center gap-3">
            <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--accent-danger)' }}>
              <PackageMinus size={22} />
            </div>
            <div>
              <span className="text-secondary-color fw-medium d-block mb-0.5" style={{ fontSize: '0.8rem' }}>Out of Stock</span>
              <h4 className="fw-bold mb-0.5 text-danger font-monospace">{outOfStockProducts.length}</h4>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Immediate action</span>
            </div>
          </div>
        </div>

        {/* Total Stock Items */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="glass-card p-3.5 h-100 d-flex align-items-center gap-3">
            <div className="kpi-icon-wrapper" style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <span className="text-secondary-color fw-medium d-block mb-0.5" style={{ fontSize: '0.8rem' }}>Catalog SKU</span>
              <h4 className="fw-bold mb-0.5 font-monospace">{totalProducts}</h4>
              <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Total trackable SKUs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Stock Alerts / Notification Banner */}
      {(outOfStockProducts.length > 0 || lowStockProducts.length > 0) && (
        <div className="alert alert-warning border border-warning-subtle glass-card p-3 mb-4 d-flex align-items-start gap-2.5 text-warning-emphasis" style={{ background: 'rgba(245,158,11,0.06)', borderRadius: '12px' }}>
          <AlertTriangle size={20} className="text-warning mt-0.5" style={{ flexShrink: 0 }} />
          <div>
            <h6 className="fw-bold mb-1">Stock Replenishment Needed</h6>
            <p className="mb-0 small" style={{ opacity: 0.85 }}>
              You have <strong>{outOfStockProducts.length}</strong> items completely out of stock and <strong>{lowStockProducts.length}</strong> items running critically low. Use the quick-restock triggers below to update levels instantly.
            </p>
          </div>
        </div>
      )}

      {/* Stock Levels List */}
      <div className="glass-card p-4 overflow-hidden">
        <h5 className="fw-bold mb-3">Warehouse Inventory Status</h5>
        <div className="table-responsive">
          <table className="table table-premium mb-0">
            <thead>
              <tr>
                <th>Product Information</th>
                <th className="text-center" style={{ width: '220px' }}>Stock Bar</th>
                <th className="text-center">Current Count</th>
                <th className="text-center">Status Badge</th>
                <th className="text-end" style={{ width: '220px' }}>Quick Restock Input</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= 10;
                
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="rounded border" 
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                        />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold text-primary-color" style={{ fontSize: '0.85rem' }}>{p.name}</span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>SKU: {p.id} • {p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <div className="progress" style={{ height: '6px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div 
                            className={`progress-bar rounded ${isOutOfStock ? 'bg-danger' : isLowStock ? 'bg-warning' : 'bg-success'}`}
                            role="progressbar" 
                            style={{ width: `${Math.min((p.stock / 150) * 100, 100)}%` }}
                            aria-valuenow={p.stock} 
                            aria-valuemin="0" 
                            aria-valuemax="150"
                          ></div>
                        </div>
                        <span className="text-muted mt-1 small" style={{ fontSize: '0.7rem' }}>
                          {Math.round(Math.min((p.stock / 150) * 100, 100))}% of max capacity (150)
                        </span>
                      </div>
                    </td>
                    <td className="text-center font-monospace fw-bold" style={{ fontSize: '0.95rem' }}>
                      <span className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : 'text-primary-color'}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="text-center">
                      {isOutOfStock ? (
                        <span className="badge-premium badge-premium-danger">Out of Stock</span>
                      ) : isLowStock ? (
                        <span className="badge-premium badge-premium-warning">Low Stock</span>
                      ) : (
                        <span className="badge-premium badge-premium-success">In Stock</span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="input-group input-group-sm ms-auto" style={{ maxWidth: '180px' }}>
                        <input 
                          type="number" 
                          className="form-control form-control-custom" 
                          placeholder="+ Qty"
                          value={restockAmount[p.id] || ''}
                          onChange={(e) => handleInputChange(p.id, e.target.value)}
                          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        />
                        <button 
                          className="btn btn-primary d-flex align-items-center justify-content-center px-2.5" 
                          type="button"
                          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, background: 'var(--grad-primary)', border: 'none' }}
                          onClick={() => handleRestock(p.id)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
