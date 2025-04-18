import React from 'react';
import Button from '../aCommon/Button';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <li>
      {category.name} - {category.description}
      <div className="actions">
        <Button className="edit-button" onClick={() => onEdit(category)}>Edit</Button>
        <Button className="delete-button" onClick={() => onDelete(category.id)}>Delete</Button>
      </div>
    </li>
  );
};

export default CategoryItem;