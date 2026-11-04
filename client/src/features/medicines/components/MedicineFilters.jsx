import React from 'react';
import { Search, Filter, X, Plus } from 'lucide-react';
import { MEDICINE_CATEGORIES, STOCK_STATUS_OPTIONS } from '../data/mockMedicinesData';
import { Button } from '../../../components/ui/Button';

export function MedicineFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  onAddMedicine,
  totalResults,
}) {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="bg-white p-4 rounded-xl border border-[#E2EBDD] shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6F63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by brand name, generic, SKU or barcode..."
            className="w-full pl-9 pr-9 py-2 rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-xs text-[#34423A] placeholder-[#5A6F63] focus:outline-none focus:bg-white focus:border-[#183B32] focus:ring-1 focus:ring-[#183B32] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6F63] hover:text-[#183B32]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Select */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="text-xs py-2 px-3 pr-8 rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] font-medium focus:outline-none focus:border-[#183B32] focus:bg-white transition-colors cursor-pointer appearance-none"
              aria-label="Filter by Category"
            >
              {MEDICINE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6F63] pointer-events-none" />
          </div>

          {/* Stock Status Select */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="text-xs py-2 px-3 pr-8 rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] font-medium focus:outline-none focus:border-[#183B32] focus:bg-white transition-colors cursor-pointer appearance-none"
              aria-label="Filter by Stock Status"
            >
              {STOCK_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
            <div className="w-2 h-2 rounded-full bg-[#183B32] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              icon={X}
              className="text-xs"
            >
              Reset
            </Button>
          )}

          {/* Add Medicine Primary Action */}
          <Button
            variant="primary"
            size="sm"
            onClick={onAddMedicine}
            icon={Plus}
          >
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Filter Summary & Result Count */}
      <div className="flex items-center justify-between text-xs text-[#5A6F63] pt-2 border-t border-[#E2EBDD]">
        <span>
          Showing <strong className="text-[#183B32] font-semibold">{totalResults}</strong> medicine catalog entries
        </span>
        {isFiltered && (
          <span className="text-[11px] bg-[#D7FCD4] text-[#183B32] font-medium px-2 py-0.5 rounded-full border border-[#B6CCA1]">
            Active filters applied
          </span>
        )}
      </div>
    </div>
  );
}

