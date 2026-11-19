import React from 'react';
import './BookFilters.css';

export const BookFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
  onReset,
}) => {
  return (
    <aside className="filters-container card">
      <div className="filter-block">
        <label className="filter-label" htmlFor="search-input">
          Search Books
        </label>
        <div className="search-input-wrapper">
          <input
            id="search-input"
            type="search"
            className="form-control"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-block">
        <label className="filter-label" htmlFor="category-select">
          Category
        </label>
        <select
          id="category-select"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug || cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-block">
        <label className="filter-label" htmlFor="sort-select">
          Sort By
        </label>
        <select
          id="sort-select"
          className="form-control"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="title_asc">Title: A to Z</option>
        </select>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          className="btn btn-secondary btn-reset"
          onClick={onReset}
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default BookFilters;
