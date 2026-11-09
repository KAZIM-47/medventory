import React, { useState, useMemo } from 'react';
import { INITIAL_CUSTOMERS, calculateCustomerMetrics } from '../../../data/customerData';
import { CustomerOverview } from '../components/CustomerOverview';
import { CustomerFilters } from '../components/CustomerFilters';
import { CustomerTable } from '../components/CustomerTable';
import { CustomerPagination } from '../components/CustomerPagination';
import { CustomerDetailModal } from '../components/CustomerDetailModal';
import { CustomerFormModal } from '../components/CustomerFormModal';
import { Button } from '../../../components/ui/Button';
import { Plus, RotateCcw, CheckCircle2 } from 'lucide-react';

export function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Modals & Feedback
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [formModalState, setFormModalState] = useState({ isOpen: false, customer: null });
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Dynamically calculated overview metrics
  const metrics = useMemo(() => {
    return calculateCustomerMetrics(customers);
  }, [customers]);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        cust.name.toLowerCase().includes(q) ||
        cust.contactPerson.toLowerCase().includes(q) ||
        cust.email.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        (cust.gstin && cust.gstin.toLowerCase().includes(q)) ||
        (cust.code && cust.code.toLowerCase().includes(q));

      const matchesType =
        selectedType === 'All' || cust.type === selectedType;

      const matchesStatus =
        selectedStatus === 'All' || cust.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [customers, searchQuery, selectedType, selectedStatus]);

  // Pagination calculation
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(startIndex, startIndex + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  // Handlers for Filters
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleTypeChange = (t) => {
    setSelectedType(t);
    setCurrentPage(1);
  };

  const handleStatusChange = (s) => {
    setSelectedStatus(s);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  // Reset Sample Data
  const handleResetSampleData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    handleResetFilters();
    showToast('Customer directory restored to initial sample dataset.');
  };

  // Save Customer (Add or Edit)
  const handleSaveCustomer = (savedCustomer) => {
    const exists = customers.some((c) => c.id === savedCustomer.id);
    if (exists) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === savedCustomer.id ? savedCustomer : c))
      );
      showToast(`Updated profile for "${savedCustomer.name}".`);
      if (detailCustomer && detailCustomer.id === savedCustomer.id) {
        setDetailCustomer(savedCustomer);
      }
    } else {
      const newCustomer = {
        ...savedCustomer,
        id: `CUST-${Date.now().toString().slice(-4)}`,
        code: `CUST-REG-${Math.floor(100 + Math.random() * 900)}`,
        orderCount: 0,
        totalPurchases: 0,
        outstandingBalance: savedCustomer.outstandingBalance || 0,
        recentOrders: [],
        paymentHistory: [],
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      showToast(`Registered new customer "${savedCustomer.name}".`);
    }
    setFormModalState({ isOpen: false, customer: null });
  };

  // Toggle Customer Status
  const handleToggleStatus = (customer) => {
    const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
    const updated = { ...customer, status: newStatus };
    setCustomers((prev) =>
      prev.map((c) => (c.id === customer.id ? updated : c))
    );
    showToast(
      `${newStatus === 'Active' ? 'Activated' : 'Suspended'} customer account for "${customer.name}".`
    );
    if (detailCustomer && detailCustomer.id === customer.id) {
      setDetailCustomer(updated);
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
            Customers & Institutional Clients
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Wholesale buyers, clinics, hospitals, pharmacies, and independent practitioners across Tricity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={handleResetSampleData}
            title="Reset sample customer data"
          >
            Reset Sample Data
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setFormModalState({ isOpen: true, customer: null })}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* 1. Customer Overview (5 KPI Cards) */}
      <CustomerOverview metrics={metrics} />

      {/* 2. Customer Search & Filters */}
      <CustomerFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onResetFilters={handleResetFilters}
        onAddCustomer={() => setFormModalState({ isOpen: true, customer: null })}
        totalResults={filteredCustomers.length}
      />

      {/* 3. Customer Directory Table & Pagination */}
      <div className="space-y-0">
        <CustomerTable
          customers={paginatedCustomers}
          onViewCustomer={(cust) => setDetailCustomer(cust)}
          onEditCustomer={(cust) => setFormModalState({ isOpen: true, customer: cust })}
          onToggleStatus={handleToggleStatus}
          onClearFilters={handleResetFilters}
        />

        <CustomerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 4. Customer Details Profile Modal */}
      <CustomerDetailModal
        isOpen={Boolean(detailCustomer)}
        customer={detailCustomer}
        onClose={() => setDetailCustomer(null)}
        onEditCustomer={(cust) => {
          const toEdit = cust || detailCustomer;
          setDetailCustomer(null);
          setFormModalState({ isOpen: true, customer: toEdit });
        }}
        onToggleStatus={() => handleToggleStatus(detailCustomer)}
      />

      {/* 5. Customer Add / Edit Modal */}
      <CustomerFormModal
        isOpen={formModalState.isOpen}
        initialData={formModalState.customer}
        onClose={() => setFormModalState({ isOpen: false, customer: null })}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
export default CustomersPage;

