import React, { useState, useMemo } from 'react';
import { INITIAL_MEDICINES } from '../data/mockMedicinesData';
import { MedicineFilters } from '../components/MedicineFilters';
import { MedicineTable } from '../components/MedicineTable';
import { MedicinePagination } from '../components/MedicinePagination';
import { MedicineDetailModal } from '../components/MedicineDetailModal';
import { MedicineFormModal } from '../components/MedicineFormModal';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import {
  Pill,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';

export function MedicinesPage() {
  const [medicines, setMedicines] = useState(INITIAL_MEDICINES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal and interaction states
  const [detailMedicine, setDetailMedicine] = useState(null);
  const [formModalState, setFormModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirmMedicine, setDeleteConfirmMedicine] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // High-level summary metrics
  const stats = useMemo(() => {
    const total = medicines.length;
    const inStock = medicines.filter((m) => m.currentStock > m.reorderLevel).length;
    const lowStock = medicines.filter(
      (m) => m.currentStock > 0 && m.currentStock <= m.reorderLevel
    ).length;
    const outOfStock = medicines.filter((m) => m.currentStock === 0).length;

    return { total, inStock, lowStock, outOfStock };
  }, [medicines]);

  // Filtered dataset
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      // Search matching: name, generic name, sku, barcode
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        med.name.toLowerCase().includes(query) ||
        med.genericName.toLowerCase().includes(query) ||
        med.sku.toLowerCase().includes(query) ||
        (med.barcode && med.barcode.toLowerCase().includes(query));

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || med.category === selectedCategory;

      // Status matching
      let matchesStatus = true;
      if (selectedStatus === 'In Stock') {
        matchesStatus = med.currentStock > med.reorderLevel;
      } else if (selectedStatus === 'Low Stock') {
        matchesStatus = med.currentStock > 0 && med.currentStock <= med.reorderLevel;
      } else if (selectedStatus === 'Out of Stock') {
        matchesStatus = med.currentStock === 0;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [medicines, searchQuery, selectedCategory, selectedStatus]);

  // Reset pagination on filter change
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleCategoryChange = (c) => {
    setSelectedCategory(c);
    setCurrentPage(1);
  };

  const handleStatusChange = (s) => {
    setSelectedStatus(s);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalItems = filteredMedicines.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredMedicines.slice(startIndex, startIndex + pageSize);
  }, [filteredMedicines, currentPage, pageSize]);

  // Simulated Reload
  const handleReload = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Medicine catalog synchronized successfully.');
    }, 500);
  };

  // Add / Edit Handlers
  const handleSaveMedicine = (savedMedicine) => {
    const exists = medicines.some((m) => m.id === savedMedicine.id);
    if (exists) {
      setMedicines((prev) =>
        prev.map((m) => (m.id === savedMedicine.id ? savedMedicine : m))
      );
      showToast(`Updated "${savedMedicine.name}" in catalog.`);
    } else {
      setMedicines((prev) => [savedMedicine, ...prev]);
      showToast(`Added "${savedMedicine.name}" to catalog.`);
    }
  };

  // Delete Handlers
  const handleDeleteConfirm = () => {
    if (!deleteConfirmMedicine) return;
    setMedicines((prev) => prev.filter((m) => m.id !== deleteConfirmMedicine.id));
    showToast(`Removed "${deleteConfirmMedicine.name}" from catalog.`);
    setDeleteConfirmMedicine(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#183B32] text-white shadow-lg border border-[#235246] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#D7FCD4]" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2EBDD]">
        <div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">
            Medicines Master Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Pharmaceutical classification, SKU master, dosage formulations, and pricing parameters
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={handleReload}>
            Sync
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setFormModalState({ isOpen: true, data: null })}
          >
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Catalog SKUs</p>
              <h3 className="text-xl font-bold text-[#183B32] mt-1">{stats.total}</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1] flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-[#5A6F63] mt-2">Active pharmaceutical formulations</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">In Stock</p>
              <h3 className="text-xl font-bold text-[#183B32] mt-1">{stats.inStock}</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#C7E4BB] text-[#183B32] border border-[#BFD8AE] flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-[#5A6F63] mt-2">Adequate dispensary reserves</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Low Stock</p>
              <h3 className="text-xl font-bold text-[#78350F] mt-1">{stats.lowStock}</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-[#5A6F63] mt-2">At or below reorder threshold</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Out of Stock</p>
              <h3 className="text-xl font-bold text-[#991B1B] mt-1">{stats.outOfStock}</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-[#5A6F63] mt-2">Zero inventory balance</p>
        </Card>
      </div>

      {/* Filter and Search Controls */}
      <MedicineFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onResetFilters={handleResetFilters}
        onAddMedicine={() => setFormModalState({ isOpen: true, data: null })}
        totalResults={filteredMedicines.length}
      />

      {/* Main Table & Pagination */}
      <div className="space-y-0">
        <MedicineTable
          medicines={paginatedMedicines}
          isLoading={isLoading}
          error={error}
          onRetry={handleReload}
          onView={(med) => setDetailMedicine(med)}
          onEdit={(med) => setFormModalState({ isOpen: true, data: med })}
          onDelete={(med) => setDeleteConfirmMedicine(med)}
          onClearFilters={handleResetFilters}
        />

        {!isLoading && !error && filteredMedicines.length > 0 && (
          <MedicinePagination
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

      {/* Medicine Detail Modal */}
      <MedicineDetailModal
        isOpen={Boolean(detailMedicine)}
        onClose={() => setDetailMedicine(null)}
        medicine={detailMedicine}
        onEdit={(med) => {
          setFormModalState({ isOpen: true, data: med });
        }}
      />

      {/* Medicine Add / Edit Form Modal */}
      <MedicineFormModal
        isOpen={formModalState.isOpen}
        initialData={formModalState.data}
        onClose={() => setFormModalState({ isOpen: false, data: null })}
        onSave={handleSaveMedicine}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmMedicine)}
        onClose={() => setDeleteConfirmMedicine(null)}
        title="Confirm Catalog Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-[#5A6F63] leading-relaxed">
            Are you sure you want to remove{' '}
            <strong className="text-[#183B32]">
              {deleteConfirmMedicine?.name}
            </strong>{' '}
            ({deleteConfirmMedicine?.sku}) from the master medicine catalog? This will affect POS lookup and reorder tracking.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2EBDD]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmMedicine(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              icon={Trash2}
              onClick={handleDeleteConfirm}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

