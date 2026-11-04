import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { ADJUSTMENT_REASONS } from '../../../data/batchData';
import { Plus, Minus, Check, AlertTriangle, ArrowRight } from 'lucide-react';

export function StockAdjustmentModal({
  isOpen,
  onClose,
  initialBatch = null,
  allBatches = [],
  onConfirmAdjustment,
}) {
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('add'); // 'add' or 'deduct'
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialBatch) {
      setSelectedBatchId(initialBatch.id);
    } else if (allBatches.length > 0 && !selectedBatchId) {
      setSelectedBatchId(allBatches[0].id);
    }
    setAdjustmentType('add');
    setQuantity('');
    setReason(ADJUSTMENT_REASONS.add[0]);
    setNotes('');
    setErrors({});
  }, [initialBatch, isOpen, allBatches]);

  // Update default reason when adjustment type changes
  const handleTypeChange = (newType) => {
    setAdjustmentType(newType);
    setReason(ADJUSTMENT_REASONS[newType][0]);
    if (errors.quantity) {
      setErrors((prev) => ({ ...prev, quantity: undefined }));
    }
  };

  const selectedBatch = allBatches.find((b) => b.id === selectedBatchId) || initialBatch;
  const currentQty = selectedBatch ? Number(selectedBatch.quantity) : 0;
  const adjQty = parseInt(quantity, 10) || 0;

  const resultingQty =
    adjustmentType === 'add'
      ? currentQty + adjQty
      : Math.max(0, currentQty - adjQty);

  const isDeductionTooHigh = adjustmentType === 'deduct' && adjQty > currentQty;

  const validate = () => {
    const errs = {};
    if (!selectedBatchId) errs.batch = 'Please select a batch';
    if (!adjQty || adjQty <= 0) errs.quantity = 'Quantity must be a positive integer greater than 0';
    if (!reason.trim()) errs.reason = 'Reason is required for inventory audit tracking';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onConfirmAdjustment({
      batchId: selectedBatchId,
      type: adjustmentType,
      quantity: adjQty,
      reason,
      notes,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Stock Level Adjustment"
      subtitle="Modify physical inventory quantity and record audit movement"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Batch Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1">
            Target Batch & Medicine <span className="text-[#991B1B]">*</span>
          </label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
          >
            {allBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.batchNumber} — {b.medicineName} ({b.quantity} {b.unit} in stock)
              </option>
            ))}
          </select>
          {errors.batch && <p className="text-[11px] text-[#991B1B] mt-1">{errors.batch}</p>}
        </div>

        {/* Adjustment Type Toggle Buttons */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1.5">
            Adjustment Operation <span className="text-[#991B1B]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleTypeChange('add')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                adjustmentType === 'add'
                  ? 'bg-[#183B32] text-white border-[#183B32] shadow-xs'
                  : 'bg-[#F7FAF5] text-[#34423A] border-[#E2EBDD] hover:bg-[#EEF6EC]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Stock Addition (+)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTypeChange('deduct')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                adjustmentType === 'deduct'
                  ? 'bg-[#991B1B] text-white border-[#991B1B] shadow-xs'
                  : 'bg-[#F7FAF5] text-[#34423A] border-[#E2EBDD] hover:bg-[#FEE2E2]/40'
              }`}
            >
              <Minus className="w-4 h-4" />
              <span>Stock Deduction (-)</span>
            </button>
          </div>
        </div>

        {/* Quantity Input & Real-Time Calculation Card */}
        <div className="p-4 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD] space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#183B32] mb-1">
              Quantity to {adjustmentType === 'add' ? 'Add' : 'Deduct'}{' '}
              <span className="text-[#991B1B]">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter units (e.g. 10)"
              className={`w-full px-3 py-2 text-xs rounded-lg border bg-white text-[#34423A] focus:outline-none focus:border-[#183B32] ${
                errors.quantity ? 'border-[#FECACA] bg-[#FEE2E2]/30' : 'border-[#E2EBDD]'
              }`}
            />
            {errors.quantity && <p className="text-[11px] text-[#991B1B] mt-1">{errors.quantity}</p>}
          </div>

          {/* Real-time Calculation Indicator */}
          {selectedBatch && (
            <div className="pt-2 border-t border-[#E2EBDD] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#5A6F63]">Current Stock: </span>
                <strong className="text-[#34423A]">{currentQty} {selectedBatch.unit}</strong>
              </div>
              <ArrowRight className="w-4 h-4 text-[#5A6F63]" />
              <div>
                <span className="text-[#5A6F63]">New Projected Stock: </span>
                <strong
                  className={`font-bold ${
                    isDeductionTooHigh ? 'text-[#991B1B]' : 'text-[#183B32]'
                  }`}
                >
                  {resultingQty} {selectedBatch.unit}
                </strong>
              </div>
            </div>
          )}

          {isDeductionTooHigh && (
            <div className="flex items-start gap-1.5 text-[11px] text-[#991B1B] pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Requested deduction exceeds current on-hand units. Stock will be set to 0.
              </span>
            </div>
          )}
        </div>

        {/* Reason Dropdown (Required) */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1">
            Reason for Adjustment <span className="text-[#991B1B]">*</span>
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
          >
            {ADJUSTMENT_REASONS[adjustmentType].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.reason && <p className="text-[11px] text-[#991B1B] mt-1">{errors.reason}</p>}
        </div>

        {/* Additional Reference / Notes */}
        <div>
          <label className="block text-xs font-semibold text-[#183B32] mb-1">
            Reference / Audit Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. PO-88301, damaged seal, physical count discrepancy..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-[#34423A] focus:outline-none focus:bg-white focus:border-[#183B32]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2EBDD]">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={adjustmentType === 'deduct' ? 'destructive' : 'primary'}
            size="sm"
            type="submit"
            icon={Check}
          >
            Confirm Adjustment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

