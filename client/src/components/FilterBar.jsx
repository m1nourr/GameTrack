function FilterBar({ filters, onFilterChange }) {
  return (
    <section className="card">
      <h2>Filter Games</h2>
      <div className="filter-form">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={onFilterChange}
        />

        <select
          name="status"
          value={filters.status}
          onChange={onFilterChange}
        >
          <option value="">All statuses</option>
          <option value="wishlist">Wishlist</option>
          <option value="backlog">Backlog</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>

        <select
          name="platform"
          value={filters.platform}
          onChange={onFilterChange}
        >
          <option value="">All platforms</option>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
      </div>
    </section>
  );
}

export default FilterBar;