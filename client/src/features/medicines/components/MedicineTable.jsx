import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Eye, Edit3, Trash2, AlertCircle, Inbox, RefreshCw, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function MedicineTable({
  medicines,
  isLoading,
  error,
  onRetry,
  onView,
  onEdit,
  onDelete,
  onClearFilters,
}) {
  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-[#FECACA] p-8 text-center max-w-lg mx-auto my-6 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#183B32]">Unable to Load Medicines Catalog</h3>
        <p className="text-xs text-[#5A6F63] mt-1.5 leading-relaxed">{error}</p>
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onRetry} icon={RefreshCw}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#183B32] py-8">
          <RefreshCw className="w-4 h-4 animate-spin text-[#183B32]" />
          <span>Loading master medicine catalog...</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-[#F7FAF5] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (!medicines || medicines.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-12 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center mx-auto mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#183B32]">No Medicines Found</h3>
        <p className="text-xs text-[#5A6F63] mt-1 max-w-sm mx-auto">
          No pharmaceutical records match your active search terms or category/stock filters.
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
      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Medicine Name</TableHead>
            <TableHead>SKU & Location</TableHead>
            <TableHead>Category & Form</TableHead>
            <TableHead>Stock Level</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((med) => {
            const isOutOfStock = med.currentStock === 0;
            const isLowStock = !isOutOfStock && med.currentStock <= med.reorderLevel;
            const stockBadgeVariant = isOutOfStock
              ? 'danger'
              : isLowStock
              ? 'warning'
              : 'default';

            const stockRatio = Math.min(
              100,
              Math.round((med.currentStock / Math.max(med.reorderLevel, 1)) * 100)
            );

            return (
              <TableRow key={med.id}>
                {/* Medicine & Generic Name */}
                <TableCell className="max-w-[240px]">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      Rx
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onView(med)}
                          className="font-bold text-sm text-[#183B32] hover:underline text-left"
                        >
                          {med.name}
                        </button>
                        {med.requiresPrescription && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#EEF6EC] text-[#183B32] border border-[#C7E4BB]">
                            Rx Only
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5A6F63] truncate mt-0.5">
                        {med.genericName}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* SKU & Shelf Location */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#183B32]">
                      {med.sku}
                    </span>
                    <p className="text-[11px] text-[#5A6F63] mt-0.5">
                      {med.shelfLocation || 'Unassigned'}
                    </p>
                  </div>
                </TableCell>

                {/* Category & Form */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <Badge variant="celadon" size="sm">
                      {med.category}
                    </Badge>
                    <p className="text-[11px] text-[#5A6F63] mt-1 font-medium">
                      {med.dosageForm} {med.strength && `• ${med.strength}`}
                    </p>
                  </div>
                </TableCell>

                {/* Stock Level & Status */}
                <TableCell className="min-w-[150px]">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#183B32]">
                        {med.currentStock} {med.unit || 'units'}
                      </span>
                      <Badge variant={stockBadgeVariant} size="sm" dot>
                        {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                      </Badge>
                    </div>
                    {/* Visual Threshold Bar */}
                    <div className="h-1.5 w-full bg-[#E2EBDD] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOutOfStock
                            ? 'bg-[#DC2626]'
                            : isLowStock
                            ? 'bg-[#D97706]'
                            : 'bg-[#183B32]'
                        }`}
                        style={{ width: `${Math.max(stockRatio, 5)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#5A6F63] mt-0.5">
                      Reorder alert: {med.reorderLevel}
                    </p>
                  </div>
                </TableCell>

                {/* Selling Price */}
                <TableCell className="whitespace-nowrap font-bold text-sm text-[#183B32]">
                  ${Number(med.unitPrice).toFixed(2)}
                </TableCell>

                {/* Action Buttons */}
                <TableCell className="text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <button
                      type="button"
                      onClick={() => onView(med)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="View Medicine Details"
                      aria-label={`View details for ${med.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(med)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="Edit Medicine"
                      aria-label={`Edit ${med.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(med)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#991B1B] hover:bg-[#FEE2E2] transition-colors"
                      title="Delete Record"
                      aria-label={`Delete ${med.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
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

