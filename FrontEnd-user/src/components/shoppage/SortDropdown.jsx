import React from 'react';

const SortDropdown = ({ activeSort, onSortChange }) => {
    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <div className="sort-dropdown">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" value={activeSort} onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                
            </select>
        </div>
    );
};
export default SortDropdown;