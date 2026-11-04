import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Edit3, Package, DollarSign, ShieldAlert, Barcode, MapPin, Building2, Pill } from 'lucide-react';

export function MedicineDetailModal({
  isOpen,
  onClose,
  medicine,
  onEdit,
}) {
  if (!medicine) return null;

  const isOutOfStock = medicine.currentStock === 0;
  const isLowStock = !isOutOfStock && medicine.currentStock <= medicine.reorderLevel;
  const stockBadgeVariant = isOutOfStock
    ? 'danger'
    : isLowStock
    ? 'warning'
    : 'default';

  const margin = medicine.unitPrice - (medicine.purchasePrice || 0);
  const marginPercent = medicine.unitPrice > 0 ? ((margin / medicine.unitPrice) * 100).toFixed(1) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={medicine.name}
      subtitle={`Generic: ${medicine.genericName}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E2EBDD]">
          <Badge variant="celadon" size="md">
            {medicine.category}
          </Badge>
          <Badge variant={stockBadgeVariant} size="md" dot>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock Threshold' : 'In Stock'}
          </Badge>
          {medicine.requiresPrescription ? (
            <Badge variant="neutral" size="md">
              Prescription Required (Rx)
            </Badge>
          ) : (
            <Badge variant="default" size="md">
              Over The Counter (OTC)
            </Badge>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Current Stock</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {medicine.currentStock}{' '}
              <span className="text-xs font-normal text-[#5A6F63]">{medicine.unit || 'units'}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Reorder Level</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {medicine.reorderLevel}{' '}
              <span className="text-xs font-normal text-[#5A6F63]">{medicine.unit || 'units'}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Selling Price</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              ${Number(medicine.unitPrice).toFixed(2)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Est. Gross Margin</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {marginPercent}%
            </p>
          </div>
        </div>

        {/* Detailed Attributes */}
        <div className="bg-white rounded-xl border border-[#E2EBDD] divide-y divide-[#E2EBDD] text-xs">
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">SKU Code:</span>
              <span className="font-mono font-bold text-[#183B32]">{medicine.sku}</span>
            </div>
            <div className="flex items-center gap-2">
              <Barcode className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Barcode:</span>
              <span className="font-mono text-[#34423A]">{medicine.barcode || 'N/A'}</span>
            </div>
          </div>

          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Form & Strength:</span>
              <span className="font-semibold text-[#183B32]">
                {medicine.dosageForm} — {medicine.strength || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Manufacturer:</span>
              <span className="font-medium text-[#34423A]">{medicine.manufacturer || 'Unspecified'}</span>
            </div>
          </div>

          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Storage Location:</span>
              <span className="font-semibold text-[#183B32]">
                {medicine.shelfLocation || 'Unassigned'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#5A6F63] shrink-0" />
              <span className="text-[#5A6F63]">Purchase Cost:</span>
              <span className="font-medium text-[#34423A]">
                ${Number(medicine.purchasePrice || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Clinical Notes / Description */}
        {medicine.description && (
          <div className="p-4 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-xs font-semibold text-[#183B32] mb-1">Clinical Indications & Storage Guidelines</p>
            <p className="text-xs text-[#5A6F63] leading-relaxed">{medicine.description}</p>
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
            icon={Edit3}
            onClick={() => {
              onClose();
              onEdit(medicine);
            }}
          >
            Edit Medicine
          </Button>
        </div>
      </div>
    </Modal>
  );
}

