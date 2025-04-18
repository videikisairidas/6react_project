// src/components/categories/CategoryList.js
import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import CategoryForm from './CategoryForm';
import Button from '../aCommon/Button';
import LoadingSpinner from '../aCommon/LoadingSpinner';
import ErrorMessage from '../aCommon/errorMessage';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const API_BASE_URL = 'https://localhost:8081/api/dashboard/Categories';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`API_BASE_URL/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchCategories(); // Refresh the list
      } catch (err) {
        setError(err.message || 'Failed to delete category.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories(); // Refresh the list after submit
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2>Categories</h2>
      <Button onClick={handleCreateCategory}>Create New Category</Button>

      {showForm && (
        <div className="form-container">
          <CategoryForm
            initialCategory={editingCategory}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            fetchCategories={fetchCategories} // Pass fetchCategories to the form for updates
          />
        </div>
      )}

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;