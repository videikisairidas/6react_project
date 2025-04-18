import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/shoppage/ProductList2';
import FilterBar from '../components/shoppage/FilterBar';


const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState(''); // Use string for input compatibility
    const [maxPrice, setMaxPrice] = useState('');

    // Debounce Timer State
    const [debounceTimeout, setDebounceTimeout] = useState(null);


    // Fetch Categories using fetch
    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost:8081/api/dashboard/Categories`);

            if (!response.ok) {
                throw new Error(`HTTP error fetching categories! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setCategories(data);

        } catch (err) {
            console.error("Error fetching categories:", err);
            //setError('Failed to load categories.'); // Decide if you want to show this error
        }
    }, []);


    // Fetch Products based on filters using fetch
    const fetchProducts = useCallback(async (currentFilters) => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (currentFilters.search) params.append('search', currentFilters.search);
        if (currentFilters.category) params.append('category', currentFilters.category);
        const min = parseFloat(currentFilters.min);
        const max = parseFloat(currentFilters.max);
        if (!isNaN(min) && min >= 0) params.append('minPrice', min);
        if (!isNaN(max) && max >= 0) params.append('maxPrice', max);

        const url = `https://localhost:8081/api/dashboard/Products/list?${params.toString()}`;
        console.log("Fetching products from:", url); // Log the URL being fetched

        try {
            const response = await fetch(url);

            if (response.status === 404) {
                setProducts([]); // No products found for criteria
                setError(null);
                console.log("API returned 404 - No products found for criteria.");
            } else if (!response.ok) {
                 // Try reading error message from backend if available
                 let errorMsg = `HTTP error! Status: ${response.status}`;
                 try {
                     const errorData = await response.json(); // Or response.text()
                     errorMsg = errorData.message || errorData.title || errorMsg; // Adapt based on backend error format
                 } catch (e) { /* Ignore if response body isn't valid JSON */ }
                 throw new Error(errorMsg);
            } else {
                const data = await response.json();
                setProducts(data);
                setError(null);
            }

        } catch (err) {
            console.error("Error fetching products:", err);
            // Distinguish between network errors and HTTP errors
            const errorMessage = err instanceof TypeError // Network error
                ? 'Network error: Could not connect to API.'
                : err.message || 'Failed to load products. Please try again later.';
            setError(errorMessage);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);


    // Effect to fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);


    // Effect to fetch products when filters change (with debounce)
    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            const currentFilters = {
                search: searchTerm,
                category: selectedCategory,
                min: minPrice,
                max: maxPrice,
            };
            fetchProducts(currentFilters);
        }, 500); // 500ms debounce

        setDebounceTimeout(newTimeout);

        return () => clearTimeout(newTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedCategory, minPrice, maxPrice, fetchProducts]); // Dependencies


    // Reset Filters Handler
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        // Fetching will automatically trigger via useEffect
    };


    return (
        <div className="shop-page">
            <h1>Our Products</h1>
            <div className="shop-container">
                <FilterBar
                    categories={categories}
                    searchTerm={searchTerm}
                    selectedCategory={selectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onSearchChange={setSearchTerm}
                    onCategoryChange={setSelectedCategory}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                    onResetFilters={handleResetFilters}
                />
                <ProductList products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default ShopPage;