import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';

export default function ProductsView({ products, setProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStock, setSelectedStock] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add/Edit modal state
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Footwear',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60'
  });

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Form Validation
  const [errors, setErrors] = useState({});

  const categories = ['All', 'Footwear', 'Accessories', 'Electronics', 'Apparel', 'Home & Kitchen'];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    let matchesStock = true;
    if (selectedStock === 'In Stock') matchesStock = p.stock > 10;
    else if (selectedStock === 'Low Stock') matchesStock = p.stock > 0 && p.stock <= 10;
    else if (selectedStock === 'Out of Stock') matchesStock = p.stock === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentProduct({
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Footwear',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60'
    });
    setErrors({});
    setShowModal(true);
  };

  const handleOpenEditModal = (product) => {
    setIsEditMode(true);
    setCurrentProduct({ ...product });
    setErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentProduct.name.trim()) newErrors.name = 'Name is required';
    if (!currentProduct.description.trim()) newErrors.description = 'Description is required';
    if (!currentProduct.price || isNaN(currentProduct.price) || Number(currentProduct.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    if (currentProduct.stock === '' || isNaN(currentProduct.stock) || Number(currentProduct.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative integer';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedProduct = {
      ...currentProduct,
      price: parseFloat(currentProduct.price),
      stock: parseInt(currentProduct.stock),
      // Set status based on stock count
      status: parseInt(currentProduct.stock) === 0 ? 'Out of Stock' : currentProduct.status
    };

    if (isEditMode) {
      setProducts(prev => prev.map(p => p.id === currentProduct.id ? formattedProduct : p));
    } else {
      setProducts(prev => [formattedProduct, ...prev]);
    }
    setShowModal(false);
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
  };

  const getStatusBadge = (status, stock) => {
    if (stock === 0 || status === 'Out of Stock') {
      return <span className="badge-premium badge-premium-danger">Out of Stock</span>;
    }
    if (status === 'Draft') {
      return <span className="badge-premium badge-premium-muted">Draft</span>;
    }
    return <span className="badge-premium badge-premium-success">Active</span>;
  };

  return (
    <div className="fade-in-up">
      {/* Title */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-1">Products Management</h2>
          <p className="text-secondary-color mb-0" style={{ fontSize: '0.9rem' }}>
            Add, update, and manage your store products list.
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <button 
            className="btn btn-primary px-3 py-2 fw-medium d-inline-flex align-items-center gap-2"
            style={{ borderRadius: '10px', background: 'var(--grad-primary)', border: 'none' }}
            onClick={handleOpenAddModal}
          >
            <Plus size={18} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          {/* Search */}
          <div className="col-12 col-lg-4">
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                className="form-control form-control-custom ps-5" 
                placeholder="Search by ID, name, keyword..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-6 col-md-4 col-lg-3">
            <select 
              className="form-select form-control-custom"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            >
              <option disabled>Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="col-6 col-md-4 col-lg-3">
            <select 
              className="form-select form-control-custom"
              value={selectedStock}
              onChange={(e) => { setSelectedStock(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Stock Levels</option>
              <option value="In Stock">In Stock (&gt;10)</option>
              <option value="Low Stock">Low Stock (1-10)</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Clear Button */}
          <div className="col-12 col-md-4 col-lg-2 text-md-end">
            {(searchTerm || selectedCategory !== 'All' || selectedStock !== 'All') && (
              <button 
                className="btn btn-link text-muted p-0 text-decoration-none fw-medium"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStock('All');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="glass-card mb-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-premium mb-0">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th className="text-end">Price</th>
                <th className="text-center">Stock Level</th>
                <th className="text-center">Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="rounded border" 
                          style={{ width: '46px', height: '46px', objectFit: 'cover', flexShrink: 0 }} 
                        />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold text-primary-color" style={{ fontSize: '0.9rem' }}>{product.name}</span>
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>ID: {product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary">{product.category}</span>
                    </td>
                    <td className="text-end font-monospace fw-bold text-primary-color">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <div className="d-inline-block" style={{ width: '120px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.75rem' }}>
                          <span className={product.stock <= 10 ? 'text-warning fw-semibold' : 'text-muted'}>
                            {product.stock} left
                          </span>
                          <span className="text-muted">max 150</span>
                        </div>
                        <div className="progress" style={{ height: '5px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div 
                            className={`progress-bar rounded ${product.stock === 0 ? 'bg-danger' : product.stock <= 10 ? 'bg-warning' : 'bg-success'}`}
                            role="progressbar" 
                            style={{ width: `${Math.min((product.stock / 150) * 100, 100)}%` }}
                            aria-valuenow={product.stock} 
                            aria-valuemin="0" 
                            aria-valuemax="150"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1.5">
                        <button 
                          className="btn btn-link text-muted p-1.5 rounded hover-bg"
                          onClick={() => handleOpenEditModal(product)}
                          title="Edit Product"
                          style={{ border: 'none' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="btn btn-link text-danger p-1.5 rounded hover-bg"
                          onClick={() => handleOpenDeleteModal(product)}
                          title="Delete Product"
                          style={{ border: 'none' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No products found matching the criteria.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} items
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

      {/* ADD/EDIT MODAL OVERLAY */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card border-1">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-primary-color d-flex align-items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  {isEditMode ? 'Edit Product Details' : 'Add New Product'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-12">
                      <label className="form-label text-secondary-color fw-semibold small">Product Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className={`form-control form-control-custom ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="e.g. AeroGlide Running Shoes"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label className="form-label text-secondary-color fw-semibold small">Description</label>
                      <textarea 
                        name="description"
                        rows="3"
                        className={`form-control form-control-custom ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Detailed explanation of materials, warranty, uses..."
                        value={currentProduct.description}
                        onChange={handleInputChange}
                      ></textarea>
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>

                    {/* Price */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary-color fw-semibold small">Price ($ USD)</label>
                      <input 
                        type="text" 
                        name="price"
                        className={`form-control form-control-custom ${errors.price ? 'is-invalid' : ''}`}
                        placeholder="129.99"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                      />
                      {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>

                    {/* Stock */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary-color fw-semibold small">Available Stock</label>
                      <input 
                        type="number" 
                        name="stock"
                        className={`form-control form-control-custom ${errors.stock ? 'is-invalid' : ''}`}
                        placeholder="45"
                        value={currentProduct.stock}
                        onChange={handleInputChange}
                      />
                      {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                    </div>

                    {/* Category */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary-color fw-semibold small">Category</label>
                      <select 
                        name="category"
                        className="form-select form-control-custom"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                      >
                        {categories.filter(c => c !== 'All').map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary-color fw-semibold small">Publication Status</label>
                      <select 
                        name="status"
                        className="form-select form-control-custom"
                        value={currentProduct.status}
                        onChange={handleInputChange}
                        disabled={Number(currentProduct.stock) === 0}
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        {Number(currentProduct.stock) === 0 && <option value="Out of Stock">Out of Stock</option>}
                      </select>
                    </div>

                    {/* Image URL preview */}
                    <div className="col-12">
                      <label className="form-label text-secondary-color fw-semibold small">Product Image URL</label>
                      <input 
                        type="text" 
                        name="image"
                        className="form-control form-control-custom"
                        value={currentProduct.image}
                        onChange={handleInputChange}
                      />
                      <div className="mt-2 text-center">
                        <img 
                          src={currentProduct.image || 'https://via.placeholder.com/150'} 
                          alt="Preview" 
                          className="rounded border border-secondary p-1" 
                          style={{ height: '80px', objectFit: 'cover' }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ background: 'var(--grad-primary)', border: 'none' }}>
                    {isEditMode ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL OVERLAY */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
            <div className="modal-content glass-card border-1">
              <div className="modal-header border-0 pb-0">
                <h6 className="modal-title fw-bold text-danger">Confirm Delete</h6>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-0 text-primary-color" style={{ fontSize: '0.9rem' }}>
                  Are you sure you want to delete product <strong>{productToDelete?.name}</strong>? This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger btn-sm px-3" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
