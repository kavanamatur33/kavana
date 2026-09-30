'use client';

import React from 'react';
import { ItemCategory } from '@/types';
import { Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}

const CATEGORIES: ItemCategory[] = [
  'Electronics',
  'Keys',
  'Clothing & Accessories',
  'Bags & Backpacks',
  'Documents & IDs',
  'Books & Stationery',
  'Jewelry & Watches',
  'Sports Equipment',
  'Other',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) => {
  const hasActiveFilters =
    searchTerm || selectedCategory !== 'all' || selectedType !== 'all' || selectedStatus !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items by name, description, brand, location..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Type Selector (All / Lost / Found) */}
        <div className="md:col-span-3 flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['all', 'lost', 'found'].map((t) => (
            <button
              key={t}
              onClick={() => onTypeChange(t)}
              className={`flex-1 py-1.5 rounded-lg capitalize transition-all ${
                selectedType === t
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-2">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="md:col-span-2">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="matched">Matched</option>
            <option value="claimed">Claimed</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Active Filter Indicators & Reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Active filters applied</span>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 font-semibold text-xs text-rose-600 hover:text-rose-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
