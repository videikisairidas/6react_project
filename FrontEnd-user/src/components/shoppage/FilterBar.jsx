import React from 'react';

const FilterBar = ({
  categories,
  searchTerm,
  selectedCategory,
  minPrice,
  maxPrice,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters
}) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="filter-input"
        aria-label="Search by product name"
      />

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-select"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="filter-price-range">
         <label htmlFor="minPrice">Min Price:</label>
         <input
            id="minPrice"
            type="number"
            placeholder="Min $"
            min="0"
            step="1" // Adjust step as needed (e.g., 0.01 for cents)
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="filter-input price-input"
            aria-label="Minimum price"
         />
         <label htmlFor="maxPrice">Max Price:</label>
         <input
            id="maxPrice"
            type="number"
            placeholder="Max $"
            min="0"
            step="1"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="filter-input price-input"
            aria-label="Maximum price"
         />
      </div>
       <button onClick={onResetFilters} className="filter-reset-button">
         Reset Filters
       </button>
    </div>
  );
};

export default FilterBar;