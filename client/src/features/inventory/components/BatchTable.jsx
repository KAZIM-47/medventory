import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Eye, SlidersHorizontal, Inbox, Clock, AlertTriangle } from 'lucide-react';
import { getExpiryStatus, getDaysUntilExpiry, getBatchStockStatus } from '../../../data/batchData';

export function BatchTable({
  batches = [],
  isLoading,
  onViewBatch,
  onAdjustBatch,
  onClearFilters,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-8 space-y-3">
        <div className="h-6 w-48 bg-[#F7FAF5] rounded animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-[#F7FAF5] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!batches || batches.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-12 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center mx-auto mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#183B32]">No Batches Found</h3>
        <p className="text-xs text-[#5A6F63] mt-1 max-w-sm mx-auto">
          No batch inventory records match your active search criteria or category/status filters.
        </p>
        {onClearFilters && (
          <div className="mt-4">
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden shadow-xs">
      <Table className="min-w-[850px]">
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Medicine Name</TableHead>
            <TableHead>SKU & Batch #</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Stock Level</TableHead>
            <TableHead>Cost / Unit</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.map((batch) => {
            const stockStatus = getBatchStockStatus(batch.quantity, batch.reorderLevel);
            const expiryStatus = getExpiryStatus(batch.expiryDate);
            const daysRemaining = getDaysUntilExpiry(batch.expiryDate);

            const isOutOfStock = stockStatus === 'Out of Stock';
            const isLowStock = stockStatus === 'Low Stock';
            const stockBadgeVariant = isOutOfStock
              ? 'danger'
              : isLowStock
              ? 'warning'
              : 'default';

            const expiryBadgeVariant =
              expiryStatus === 'Expired'
                ? 'danger'
                : expiryStatus === 'Expiring Soon'
                ? 'warning'
                : 'celadon';

            const stockRatio = Math.min(
              100,
              Math.round((batch.quantity / Math.max(batch.reorderLevel, 1)) * 100)
            );

            return (
              <TableRow key={batch.id}>
                {/* Medicine Name & Category */}
                <TableCell className="max-w-[220px]">
                  <div>
                    <button
                      type="button"
                      onClick={() => onViewBatch(batch)}
                      className="font-bold text-sm text-[#183B32] hover:underline text-left block truncate"
                    >
                      {batch.medicineName}
                    </button>
                    <p className="text-xs text-[#5A6F63] truncate mt-0.5">
                      {batch.genericName}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.2 rounded-full bg-[#F7FAF5] text-[#5A6F63] border border-[#E2EBDD]">
                      {batch.category}
                    </span>
                  </div>
                </TableCell>

                {/* SKU & Batch Number */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#183B32] px-1.5 py-0.5 rounded bg-[#EEF6EC] border border-[#C7E4BB]">
                      {batch.batchNumber}
                    </span>
                    <p className="font-mono text-[11px] text-[#5A6F63] mt-1">
                      SKU: {batch.sku}
                    </p>
                  </div>
                </TableCell>

                {/* Manufacturer & Location */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <p className="text-xs font-medium text-[#34423A]">
                      {batch.manufacturer}
                    </p>
                    <p className="text-[11px] text-[#5A6F63] mt-0.5">
                      {batch.shelfLocation || 'Main Warehouse'}
                    </p>
                  </div>
                </TableCell>

                {/* Quantity & Stock Status */}
                <TableCell className="min-w-[140px]">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#183B32]">
                        {batch.quantity} {batch.unit || 'units'}
                      </span>
                      <Badge variant={stockBadgeVariant} size="sm" dot>
                        {stockStatus}
                      </Badge>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 w-full bg-[#E2EBDD] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOutOfStock
                            ? 'bg-[#DC2626]'
                            : isLowStock
                            ? 'bg-[#D97706]'
                            : 'bg-[#183B32]'
                        }`}
                        style={{ width: `${Math.max(stockRatio, isOutOfStock ? 0 : 5)}%` }}
                      />
                    </div>
                  </div>
                </TableCell>

                {/* Cost Price */}
                <TableCell className="whitespace-nowrap text-xs text-[#5A6F63]">
                  ${Number(batch.purchasePrice).toFixed(2)}
                </TableCell>

                {/* Selling Price */}
                <TableCell className="whitespace-nowrap font-bold text-xs text-[#183B32]">
                  ${Number(batch.sellingPrice).toFixed(2)}
                </TableCell>

                {/* Expiry Date & Countdown */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={expiryBadgeVariant} size="sm">
                        {expiryStatus === 'Expired'
                          ? 'Expired'
                          : expiryStatus === 'Expiring Soon'
                          ? `Exp in ${daysRemaining}d`
                          : 'Valid'}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[#5A6F63] mt-1">
                      {batch.expiryDate}
                    </p>
                  </div>
                </TableCell>

                {/* Action Buttons */}
                <TableCell className="text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <button
                      type="button"
                      onClick={() => onViewBatch(batch)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="View Batch Details"
                      aria-label={`View details for batch ${batch.batchNumber}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onAdjustBatch(batch)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="Adjust Stock"
                      aria-label={`Adjust stock for batch ${batch.batchNumber}`}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

