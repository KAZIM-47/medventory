import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BatchPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 bg-white border-t border-[#E2EBDD] text-xs text-[#5A6F63]">
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-[#183B32]">{startItem}</strong> to{' '}
          <strong className="text-[#183B32]">{endItem}</strong> of{' '}
          <strong className="text-[#183B32]">{totalItems}</strong> batch records
        </span>

        <div className="flex items-center gap-1.5 pl-3 border-l border-[#E2EBDD]">
          <span>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="py-1 px-2 border border-[#E2EBDD] rounded-md bg-[#F7FAF5] text-[#34423A] font-medium focus:outline-none focus:border-[#183B32]"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1 self-center sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-[#E2EBDD] text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-[#183B32] text-white shadow-xs'
                  : 'text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32]'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-[#E2EBDD] text-[#34423A] hover:bg-[#EEF6EC] hover:text-[#183B32] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

