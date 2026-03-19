import { useState } from "react";

function FilterGroup({
  title,
  items,
  limit = 5,
  selectedValue,
  onSelect,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!items || items.length === 0) return null;

  const visibleItems = isExpanded ? items : items.slice(0, limit);

  return (
    <div className="filter-group">
      <h3 className="filter-title">{title}</h3>

      <ul className="filter-list">
        {visibleItems.map((item) => {
          const isActive =
  Array.isArray(selectedValue) && selectedValue.includes(item.name);

          return (
            <li
              key={item.name}
              className={`filter-item ${isActive ? "active" : ""}`}
             onClick={() => onSelect(item.name)}
            >
              <span className="filter-name">{item.name}</span>
              <span className="filter-count">({item.count})</span>
            </li>
          );
        })}
      </ul>

      {items.length > limit && (
        <button
          type="button"
          className="show-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Daha Az Göster" : "Daha Fazla Göster"}
        </button>
      )}
    </div>
  );
}

export default FilterGroup;