import React from 'react';

const ProductCard = ({ product }) => {

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };


  const placeholderImage = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=2048x2048&w=is&k=20&c=ohMtddTt7BppCvEUNGqJ9FRDyJqAdkzonVQ7KmWbTrg=';

  const imageUrl = product.imageUrl ? product.imageUrl : placeholderImage;

  const handleImageError = (e) => {
      e.target.onerror = null; // Prevent infinite loop if placeholder also fails
      e.target.src = placeholderImage;
  };

  return (
    <div className="shop-product-card">
      <div className="product-image-container">
        <img
            src={imageUrl}
            alt={product.name || 'Product Image'}
            className="product-image"
            onError={handleImageError} // Handle broken image links
            loading="lazy" // Lazy load images
         />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{formatPrice(product.price)}</p>
         <button className="add-to-cart-btn">View</button>
      </div>
    </div>
  );
};

export default ProductCard;