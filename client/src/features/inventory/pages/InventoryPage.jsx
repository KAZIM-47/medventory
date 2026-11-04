import React, { useState, useMemo } from 'react';
import { useMedicines } from '../../../context/MedicineContext';
import { InventoryOverview } from '../components/InventoryOverview';
import { BatchFilters } from '../components/BatchFilters';
import { BatchTable } from '../components/BatchTable';
import { BatchPagination } from '../components/BatchPagination';
import { BatchDetailModal } from '../components/BatchDetailModal';
import { StockAdjustmentModal } from '../components/StockAdjustmentModal';
import { InventoryMovementHistory } from '../components/InventoryMovementHistory';
import { Button } from '../../../components/ui/Button';
import {
  Boxes,
  History,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  PackageCheck,
} from 'lucide-react';
import { getExpiryStatus, getBatchStockStatus } from '../../../data/batchData';

export function InventoryPage() {
  const {
    batches,
    batchMetrics,
    movements,
    adjustBatchStock,
    resetSampleData,
  } = useMedicines();

  // Tab State: 'batches' or 'movements'
  const [activeTab, setActiveTab] = useState('batches');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');
  const [selectedExpiryStatus, setSelectedExpiryStatus] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Modal & Toast States
  const [selectedBatchForDetail, setSelectedBatchForDetail] = useState(null);
  const [adjustmentModalState, setAdjustmentModalState] = useState({
    isOpen: false,
    batch: null,
  });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered Batches
  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        batch.medicineName.toLowerCase().includes(q) ||
        batch.genericName.toLowerCase().includes(q) ||
        batch.sku.toLowerCase().includes(q) ||
        batch.batchNumber.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || batch.category === selectedCategory;

      const stockStatus = getBatchStockStatus(batch.quantity, batch.reorderLevel);
      const matchesStock =
        selectedStockStatus === 'All' || stockStatus === selectedStockStatus;

      const expiryStatus = getExpiryStatus(batch.expiryDate);
      const matchesExpiry =
        selectedExpiryStatus === 'All' || expiryStatus === selectedExpiryStatus;

      return matchesSearch && matchesCategory && matchesStock && matchesExpiry;
    });
  }, [batches, searchQuery, selectedCategory, selectedStockStatus, selectedExpiryStatus]);

  // Pagination
  const totalItems = filteredBatches.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedBatches = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBatches.slice(startIndex, startIndex + pageSize);
  }, [filteredBatches, currentPage, pageSize]);

  // Filter change handlers
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleCategoryChange = (c) => {
    setSelectedCategory(c);
    setCurrentPage(1);
  };

  const handleStockStatusChange = (s) => {
    setSelectedStockStatus(s);
    setCurrentPage(1);
  };

  const handleExpiryStatusChange = (e) => {
    setSelectedExpiryStatus(e);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStockStatus('All');
    setSelectedExpiryStatus('All');
    setCurrentPage(1);
  };

  // Stock Adjustment Handler
  const handleConfirmAdjustment = ({ batchId, type, quantity, reason, notes }) => {
    const res = adjustBatchStock({
      batchId,
      type,
      quantity,
      reason,
      notes,
    });

    if (res) {
      const changeStr = type === 'add' ? `+${quantity}` : `-${quantity}`;
      showToast(
        `Adjusted stock for ${res.batch.medicineName} (${res.batch.batchNumber}): ${changeStr} ${res.batch.unit || 'units'} (New: ${res.newStock})`
      );
    }
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#183B32] text-white shadow-xl border border-[#235246] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#D7FCD4]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2EBDD]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]">
              Sample Data Mode
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">
            Inventory & Batch Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Batch-level tracking, expiration surveillance, and audited stock adjustments
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={() => {
              resetSampleData();
              handleResetFilters();
              showToast('Sample inventory and movement history restored.');
            }}
            title="Reset sample inventory data"
          >
            Reset Sample Data
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={SlidersHorizontal}
            onClick={() => setAdjustmentModalState({ isOpen: true, batch: null })}
          >
            Adjust Stock
          </Button>
        </div>
      </div>

      {/* 1. Inventory Overview (5 KPI Cards) */}
      <InventoryOverview batchMetrics={batchMetrics} />

      {/* Tab Switcher: Batches vs Movement History */}
      <div className="flex items-center gap-2 border-b border-[#E2EBDD] pt-2">
        <button
          type="button"
          onClick={() => setActiveTab('batches')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'batches'
              ? 'border-[#183B32] text-[#183B32]'
              : 'border-transparent text-[#5A6F63] hover:text-[#183B32]'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Batch Inventory</span>
          <span className="text-xs px-2 py-0.2 rounded-full bg-[#EEF6EC] text-[#183B32] font-mono">
            {batches.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('movements')}
          className={`flex items-center gap-2 pb-3 px-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'movements'
              ? 'border-[#183B32] text-[#183B32]'
              : 'border-transparent text-[#5A6F63] hover:text-[#183B32]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Movement History</span>
          <span className="text-xs px-2 py-0.2 rounded-full bg-[#EEF6EC] text-[#183B32] font-mono">
            {movements.length}
          </span>
        </button>
      </div>

      {/* Tab Content 1: Batch Inventory */}
      {activeTab === 'batches' && (
        <div className="space-y-4">
          {/* 3. Search and Filtering */}
          <BatchFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedStockStatus={selectedStockStatus}
            onStockStatusChange={handleStockStatusChange}
            selectedExpiryStatus={selectedExpiryStatus}
            onExpiryStatusChange={handleExpiryStatusChange}
            onResetFilters={handleResetFilters}
            onOpenAdjustment={() => setAdjustmentModalState({ isOpen: true, batch: null })}
            totalResults={filteredBatches.length}
          />

          {/* 2. Batch Inventory Table */}
          <div className="space-y-0 min-w-0">
            <BatchTable
              batches={paginatedBatches}
              onViewBatch={(batch) => setSelectedBatchForDetail(batch)}
              onAdjustBatch={(batch) => setAdjustmentModalState({ isOpen: true, batch })}
              onClearFilters={handleResetFilters}
            />

            {filteredBatches.length > 0 && (
              <BatchPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Tab Content 2: Movement History */}
      {activeTab === 'movements' && (
        <InventoryMovementHistory movements={movements} />
      )}

      {/* 4. Batch Details Modal */}
      <BatchDetailModal
        isOpen={Boolean(selectedBatchForDetail)}
        onClose={() => setSelectedBatchForDetail(null)}
        batch={selectedBatchForDetail}
        onOpenAdjustment={(batch) => setAdjustmentModalState({ isOpen: true, batch })}
      />

      {/* 5. Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={adjustmentModalState.isOpen}
        initialBatch={adjustmentModalState.batch}
        allBatches={batches}
        onClose={() => setAdjustmentModalState({ isOpen: false, batch: null })}
        onConfirmAdjustment={handleConfirmAdjustment}
      />
    </div>
  );
}

