// src/pages/CategoriesPage.js
import React from 'react';
import CategoryList from '../components/categories/CategoryList';
// import CategoryList from '../components/categories/CategoryList';


const CategoriesPage = () => {
  return (
    <div>
      <h1>Category Management</h1>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;