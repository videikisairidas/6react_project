// src/pages/ProductsPage.js
import React from 'react';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <div>
      <h1>Product Management</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;