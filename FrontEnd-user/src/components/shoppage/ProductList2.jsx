import React from 'react';
import ProductCard from './ProductCard2';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <div className="status-message loading">Loading products...</div>;
  }

  // Error State
  if (error) {
    if (error.includes("No products found")) {
         return <div className="status-message info">No products found matching your criteria.</div>;
    }
    return <div className="status-message error">Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="status-message info">No products available.</div>;
  }

  // Success State - Render Product Cards
  return (
    <div className="shop-product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;