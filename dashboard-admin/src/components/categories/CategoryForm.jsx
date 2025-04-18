import React, { useState, useEffect } from 'react';
import Button from '../aCommon/Button';

const CategoryForm = ({ initialCategory, onSubmit, onCancel, fetchCategories }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const API_BASE_URL = 'https://localhost:8081/api/dashboard/Categories';

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setDescription(initialCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    const method = initialCategory ? 'PUT' : 'POST';
    const url = initialCategory ? `${API_BASE_URL}/${initialCategory.id}` : API_BASE_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData?.message || 'Failed to save category.'}`);
      }

      onSubmit(); 
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialCategory ? 'Edit Category' : 'Create New Category'}</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="actions">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default CategoryForm;