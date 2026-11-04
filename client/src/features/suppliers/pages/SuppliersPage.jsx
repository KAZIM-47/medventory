import React, { useState, useMemo } from 'react';
import { INITIAL_SUPPLIERS, calculateSupplierMetrics } from '../../../data/supplierData';
import { SupplierOverview } from '../components/SupplierOverview';
import { SupplierFilters } from '../components/SupplierFilters';
import { SupplierTable } from '../components/SupplierTable';
import { SupplierPagination } from '../components/SupplierPagination';
import { SupplierDetailModal } from '../components/SupplierDetailModal';
import { SupplierFormModal } from '../components/SupplierFormModal';
import { Button } from '../../../components/ui/Button';
import { Plus, RotateCcw, CheckCircle2 } from 'lucide-react';

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modal and Toast States
  const [detailSupplier, setDetailSupplier] = useState(null);
  const [formModalState, setFormModalState] = useState({ isOpen: false, supplier: null });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Derived Overview Metrics
  const metrics = useMemo(() => {
    return calculateSupplierMetrics(suppliers);
  }, [suppliers]);

  // Filtered Suppliers List
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((sup) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        sup.name.toLowerCase().includes(q) ||
        sup.contactPerson.toLowerCase().includes(q) ||
        sup.email.toLowerCase().includes(q) ||
        (sup.code && sup.code.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === 'All' || sup.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'All' ||
        (sup.categories && sup.categories.includes(selectedCategory));

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [suppliers, searchQuery, selectedStatus, selectedCategory]);

  // Pagination calculation
  const totalItems = filteredSuppliers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSuppliers.slice(startIndex, startIndex + pageSize);
  }, [filteredSuppliers, currentPage, pageSize]);

  // Filter Change Handlers
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleStatusChange = (s) => {
    setSelectedStatus(s);
    setCurrentPage(1);
  };

  const handleCategoryChange = (c) => {
    setSelectedCategory(c);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  // Reset Sample Data
  const handleResetSampleData = () => {
    setSuppliers(INITIAL_SUPPLIERS);
    handleResetFilters();
    showToast('Sample supplier directory restored to initial state.');
  };

  // Add / Edit Supplier Save
  const handleSaveSupplier = (savedSupplier) => {
    const exists = suppliers.some((s) => s.id === savedSupplier.id);
    if (exists) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === savedSupplier.id ? savedSupplier : s))
      );
      showToast(`Updated contract for "${savedSupplier.name}".`);
      if (detailSupplier && detailSupplier.id === savedSupplier.id) {
        setDetailSupplier(savedSupplier);
      }
    } else {
      setSuppliers((prev) => [savedSupplier, ...prev]);
      showToast(`Enrolled "${savedSupplier.name}" as an authorized supplier.`);
    }
  };

  // Toggle Supplier Status (Active <-> Inactive)
  const handleToggleStatus = (supplier) => {
    const newStatus = supplier.status === 'Active' ? 'Inactive' : 'Active';
    const updated = { ...supplier, status: newStatus };
    setSuppliers((prev) =>
      prev.map((s) => (s.id === supplier.id ? updated : s))
    );
    showToast(
      `${newStatus === 'Active' ? 'Activated' : 'Suspended'} supplier contract for "${supplier.name}".`
    );
    if (detailSupplier && detailSupplier.id === supplier.id) {
      setDetailSupplier(updated);
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2EBDD]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]">
              Sample Directory
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">
            Supplier & Distributor Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Authorized pharmaceutical procurement channels, commercial terms, and payables
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={handleResetSampleData}
            title="Reset sample supplier data"
          >
            Reset Sample Data
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setFormModalState({ isOpen: true, supplier: null })}
          >
            Add Supplier
          </Button>
        </div>
      </div>

      {/* 1. Supplier Overview (4 KPI Cards) */}
      <SupplierOverview metrics={metrics} />

      {/* 3. Search and Filters Toolbar */}
      <SupplierFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onResetFilters={handleResetFilters}
        onAddSupplier={() => setFormModalState({ isOpen: true, supplier: null })}
        totalResults={filteredSuppliers.length}
      />

      {/* 2. Supplier Directory Table */}
      <div className="space-y-0 min-w-0">
        <SupplierTable
          suppliers={paginatedSuppliers}
          onViewSupplier={(sup) => setDetailSupplier(sup)}
          onEditSupplier={(sup) => setFormModalState({ isOpen: true, supplier: sup })}
          onToggleStatus={handleToggleStatus}
          onClearFilters={handleResetFilters}
        />

        {filteredSuppliers.length > 0 && (
          <SupplierPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={(p) => setCurrentPage(p)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* 5. Supplier Details Modal */}
      <SupplierDetailModal
        isOpen={Boolean(detailSupplier)}
        onClose={() => setDetailSupplier(null)}
        supplier={detailSupplier}
        onEditSupplier={(sup) => setFormModalState({ isOpen: true, supplier: sup })}
        onToggleStatus={handleToggleStatus}
      />

      {/* 4. Supplier Add / Edit Form Modal */}
      <SupplierFormModal
        isOpen={formModalState.isOpen}
        initialData={formModalState.supplier}
        onClose={() => setFormModalState({ isOpen: false, supplier: null })}
        onSave={handleSaveSupplier}
      />
    </div>
  );
}

