import React from 'react';
import Button from '../aCommon/Button';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <li>
      {product.name} - ${product.price}
      {product.category && ` (Category: ${product.category.name})`}
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} />}
      <Button onClick={() => onEdit(product)}>Edit</Button>
      <Button onClick={() => onDelete(product.id)}>Delete</Button>
    </li>
  );
};

export default ProductItem;