import React, { useState, useEffect } from 'react';
import Button from '../aCommon/Button';
import LoadingSpinner from '../aCommon/LoadingSpinner';
import ErrorMessage from '../aCommon/errorMessage';

const ProductForm = ({ initialProduct, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setDescription(initialProduct.description || '');
      setPrice(initialProduct.price || '');
      setCategoryId(initialProduct.categoryId || '');
      setImageUrl(initialProduct.imageUrl || ''); 
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setImageUrl('');
    }
  }, [initialProduct]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://localhost:8081/api/dashboard/Categories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err.message || 'Failed to fetch categories.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'categoryId':
        setCategoryId(value);
        break;
      case 'imageUrl': // Handle image URL input
        setImageUrl(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && price !== '' && !isNaN(Number(price))) { 
      setLoading(true);
      setError(null);
      const url = initialProduct ? `https://localhost:8081/api/dashboard/Products/${initialProduct.id}` : 'https://localhost:8081/api/dashboard/Products';
      const method = initialProduct ? 'PUT' : 'POST';
      const body = JSON.stringify({ name, description, price: Number(price), categoryId, imageUrl }); // Ensure price is sent as a number
      const headers = { 'Content-Type': 'application/json' };
        console.log(initialProduct)
      try {
        const response = await fetch(url, { method, headers, body });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setLoading(false);
        onSubmit();
      } catch (err) {
        setError(err.message || 'An error occurred.');
        setLoading(false);
      }
    } else {
      setError('Product name and a valid price are required.');
    }
  };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialProduct ? 'Edit Product' : 'Create New Product'}</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="categoryId">Category:</label>
                <select
                id="categoryId"
                name="categoryId"
                value={categoryId}
                onChange={handleChange}
                >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                    {cat.name}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={handleChange}
                />
            </div>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            <Button type="submit">{initialProduct ? 'Update' : 'Create'}</Button>
            {onCancel && <Button type="button" onClick={onCancel}>Cancel</Button>}
        </form>
    );
};

export default ProductForm;