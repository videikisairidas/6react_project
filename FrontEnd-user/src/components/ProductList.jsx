import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ title, products }) => {
    if (!products || products.length === 0) {
        return (
             <div className="product-list-section">
                <h2>{title}</h2>
                <p>No products to display.</p>
            </div>
        );
    }

    return (
        <section className="product-list-section">
            <h2>{title}</h2>
            <div className="product-list-container">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;