import React from 'react';

interface FilterItem {
  label: string;
  active: boolean;
}

interface FilterBarProps {
  filters: FilterItem[];
  onFilterClick?: (index: number) => void;
}

const FilterBar = ({ filters, onFilterClick }: FilterBarProps) => (
  <div className="p-4 flex gap-2 overflow-x-auto">
    {filters.map((filter, index) => (
      <button
        key={index}
        onClick={() => onFilterClick?.(index)}
        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
          filter.active
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

export default FilterBar;
