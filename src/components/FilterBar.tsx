import { Icon } from "./Icon";
import { audienceFilters } from "../data/product";
import type { Product } from "../types/product";

type FilterBarProps = {
  audience: string;
  setAudience: (audience: string) => void;
  products: Product[];
  sort: string;
  setSort: (sort: string) => void;
};

export function FilterBar({
  audience,
  setAudience,
  products,
  sort,
  setSort,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-chips" role="group" aria-label="Filter by audience">
        {audienceFilters.map((filter) => {
          const count =
            filter === "All"
              ? products.length
              : products.filter((product) => product.audience.startsWith(filter)).length;

          return (
            <button
              key={filter}
              className={audience === filter ? "filter-chip selected" : "filter-chip"}
              onClick={() => setAudience(filter)}
            >
              {filter} ({count})
            </button>
          );
        })}
      </div>
      <label className="sort-control">
        <span>Sort by:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price low to high</option>
          <option value="price-high">Price high to low</option>
        </select>
        <Icon name="chevron" size={16} />
      </label>
    </div>
  );
}