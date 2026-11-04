import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  Package,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Building2,
  Pill,
  SlidersHorizontal,
  Barcode,
} from 'lucide-react';
import { getExpiryStatus, getDaysUntilExpiry, getBatchStockStatus } from '../../../data/batchData';

export function BatchDetailModal({
  isOpen,
  onClose,
  batch,
  onOpenAdjustment,
}) {
  if (!batch) return null;

  const stockStatus = getBatchStockStatus(batch.quantity, batch.reorderLevel);
  const expiryStatus = getExpiryStatus(batch.expiryDate);
  const daysRemaining = getDaysUntilExpiry(batch.expiryDate);

  const stockBadgeVariant =
    stockStatus === 'Out of Stock'
      ? 'danger'
      : stockStatus === 'Low Stock'
      ? 'warning'
      : 'default';

  const expiryBadgeVariant =
    expiryStatus === 'Expired'
      ? 'danger'
      : expiryStatus === 'Expiring Soon'
      ? 'warning'
      : 'celadon';

  const totalCostValuation = batch.quantity * (batch.purchasePrice || 0);
  const totalSalesRevenue = batch.quantity * (batch.sellingPrice || 0);
  const unitMargin = (batch.sellingPrice || 0) - (batch.purchasePrice || 0);
  const marginPercent =
    batch.sellingPrice > 0 ? ((unitMargin / batch.sellingPrice) * 100).toFixed(1) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Batch ${batch.batchNumber}`}
      subtitle={`${batch.medicineName} (${batch.genericName})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E2EBDD]">
          <Badge variant="celadon" size="md">
            {batch.category}
          </Badge>
          <Badge variant={stockBadgeVariant} size="md" dot>
            {stockStatus}
          </Badge>
          <Badge variant={expiryBadgeVariant} size="md">
            {expiryStatus === 'Expired'
              ? 'Expired'
              : expiryStatus === 'Expiring Soon'
              ? `Expiring Soon (${daysRemaining} days left)`
              : `Valid (${daysRemaining} days left)`}
          </Badge>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Current Quantity</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {batch.quantity}{' '}
              <span className="text-xs font-normal text-[#5A6F63]">{batch.unit || 'units'}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Batch Valuation</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              ${totalCostValuation.toFixed(2)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Selling Price</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              ${Number(batch.sellingPrice).toFixed(2)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Unit Margin</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {marginPercent}%
            </p>
          </div>
        </div>

        {/* Detailed Attributes */}
        <div className="bg-white rounded-xl border border-[#E2EBDD] divide-y divide-[#E2EBDD] text-xs">
          {/* Row 1: SKU & Batch */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">SKU Code:</span>
              <span className="font-mono font-bold text-[#183B32]">{batch.sku}</span>
            </div>
            <div className="flex items-center gap-2">
              <Barcode className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Batch Lot:</span>
              <span className="font-mono font-bold text-[#183B32]">{batch.batchNumber}</span>
            </div>
          </div>

          {/* Row 2: Dates */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Manufacturing Date:</span>
              <span className="font-medium text-[#34423A]">{batch.mfgDate || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Expiration Date:</span>
              <span className="font-bold text-[#183B32]">{batch.expiryDate}</span>
            </div>
          </div>

          {/* Row 3: Medicine details */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Dosage & Strength:</span>
              <span className="font-medium text-[#34423A]">
                {batch.dosageForm} — {batch.strength}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Manufacturer:</span>
              <span className="font-medium text-[#34423A]">{batch.manufacturer}</span>
            </div>
          </div>

          {/* Row 4: Pricing & Location */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Wholesale Purchase Cost:</span>
              <span className="font-medium text-[#34423A]">
                ${Number(batch.purchasePrice).toFixed(2)} / unit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Storage Location:</span>
              <span className="font-semibold text-[#183B32]">
                {batch.shelfLocation || 'Main Warehouse'}
              </span>
            </div>
          </div>
        </div>

        {/* Expiry Risk Surveillance Advisory */}
        {daysRemaining <= 60 && (
          <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#78350F]">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <Clock className="w-4 h-4" />
              <span>Surveillance Protocol Notice</span>
            </p>
            <p className="leading-relaxed">
              This batch reaches expiration within {daysRemaining} days. Prioritize dispensing via FIFO (First-In, First-Out) protocol or initiate vendor return/credit procedures.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2EBDD]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={SlidersHorizontal}
            onClick={() => {
              onClose();
              onOpenAdjustment(batch);
            }}
          >
            Adjust Stock
          </Button>
        </div>
      </div>
    </Modal>
  );
}

