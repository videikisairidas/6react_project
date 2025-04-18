// src/components/products/ProductList.js
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';
import Button from '../aCommon//Button';
import LoadingSpinner from '../aCommon/LoadingSpinner';
import ErrorMessage from '../aCommon/errorMessage';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_BASE_URL = 'https://localhost:8081/api/dashboard/Products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://localhost:8081/api/dashboard/Products/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchProducts(); // Refresh the list
      } catch (err) {
        setError(err.message || 'Failed to delete product.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the list after submit
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2>Products</h2>
      <Button onClick={handleCreateProduct}>Create New Product</Button>

      {showForm && (
        <div className="form-container">
          <ProductForm
            initialProduct={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;