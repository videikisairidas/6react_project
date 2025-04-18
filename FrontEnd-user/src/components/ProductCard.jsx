import React from 'react';
import { Link } from 'react-router-dom'; 


const ProductCard = ({ product }) => {
    if (!product) {
        return null; 
    }

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}> 
                <img
                    src={product.imageUrl || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=2048x2048&w=is&k=20&c=ohMtddTt7BppCvEUNGqJ9FRDyJqAdkzonVQ7KmWbTrg='} // Placeholder image
                    alt={product.name}
                    className="product-card-image"
                />
                <h3 className="product-card-name">{product.name || 'Product Name'}</h3>
            </Link>
            <p className="product-card-price">${product.price?.toFixed(2) || '0.00'}</p>
            <button>View</button>
        </div>
    );
};

export default ProductCard;