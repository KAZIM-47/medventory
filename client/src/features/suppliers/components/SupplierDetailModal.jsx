import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  DollarSign,
  Pill,
  ShoppingBag,
  Edit3,
  Power,
  ShieldCheck,
} from 'lucide-react';

export function SupplierDetailModal({
  isOpen,
  onClose,
  supplier,
  onEditSupplier,
  onToggleStatus,
}) {
  if (!supplier) return null;

  const isActive = supplier.status === 'Active';

  // Calculate total purchase value from sample records
  const totalPurchaseValue = supplier.purchaseHistory
    ? supplier.purchaseHistory.reduce((sum, po) => sum + (Number(po.totalAmount) || 0), 0)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={supplier.name}
      subtitle={`Supplier Code: ${supplier.code || supplier.id}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Status and Terms Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2EBDD]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={isActive ? 'default' : 'neutral'} size="md" dot>
              {supplier.status}
            </Badge>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EEF6EC] text-[#183B32] border border-[#C7E4BB]">
              Terms: {supplier.paymentTerms}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F7FAF5] text-[#5A6F63] border border-[#E2EBDD]">
              Lead Time: {supplier.leadTimeDays || 3} business days
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5A6F63]">Tax Registration:</span>
            <span className="font-mono font-bold text-[#183B32]">{supplier.taxId || 'N/A'}</span>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Total Purchase Volume</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              ${totalPurchaseValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">Cumulative sample PO spend</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Outstanding Balance</p>
            <p
              className={`text-xl font-bold mt-1 ${
                supplier.outstandingBalance > 0 ? 'text-[#78350F]' : 'text-[#183B32]'
              }`}
            >
              ${Number(supplier.outstandingBalance || 0).toFixed(2)}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">Current payables due</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD] col-span-2 sm:col-span-1">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Active Formulations</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {supplier.associatedMedicines?.length || 0}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">Catalog medicines supplied</p>
          </div>
        </div>

        {/* Company & Contact Details Grid */}
        <div className="bg-white rounded-xl border border-[#E2EBDD] divide-y divide-[#E2EBDD] text-xs">
          {/* Row 1: Contact Person & Email */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Primary Representative</p>
              <p className="font-bold text-sm text-[#183B32]">{supplier.contactPerson}</p>
              <p className="text-[#5A6F63] text-xs mt-0.5">{supplier.role || 'Sales Representative'}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Direct Communications</p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#34423A]">
                  <Mail className="w-3.5 h-3.5 text-[#5A6F63]" />
                  <a href={`mailto:${supplier.email}`} className="text-[#183B32] hover:underline font-medium">
                    {supplier.email}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-[#5A6F63]">
                  <Phone className="w-3.5 h-3.5 text-[#5A6F63]" />
                  <span>{supplier.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Address & Categories */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Registered Facility Address</p>
              <div className="flex items-start gap-1.5 text-[#34423A]">
                <MapPin className="w-3.5 h-3.5 text-[#5A6F63] shrink-0 mt-0.5" />
                <span>
                  {supplier.address}, {supplier.city}, {supplier.state} {supplier.country}
                </span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Contracted Product Categories</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {supplier.categories.map((c) => (
                  <span
                    key={c}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Associated Medicines in Master Catalog */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#183B32] uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-[#183B32]" />
              <span>Associated Medicine Formulations (Sample Catalog)</span>
            </h4>
            <span className="text-xs text-[#5A6F63]">
              {supplier.associatedMedicines?.length || 0} linked products
            </span>
          </div>

          <div className="bg-[#F7FAF5] p-3 rounded-xl border border-[#E2EBDD]">
            {supplier.associatedMedicines && supplier.associatedMedicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {supplier.associatedMedicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-2.5 rounded-lg border border-[#E2EBDD] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-[#183B32] truncate">{med.name}</p>
                      <p className="font-mono text-[10px] text-[#5A6F63]">{med.sku}</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EEF6EC] text-[#183B32] shrink-0">
                      {med.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#5A6F63] italic">No catalog items directly mapped to this vendor.</p>
            )}
          </div>
        </div>

        {/* Purchase History Ledger */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#183B32] uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#183B32]" />
              <span>Sample Purchase Order History</span>
            </h4>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EEF6EC] text-[#183B32]">
              Fictional Sample Ledger
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F7FAF5] border-b border-[#E2EBDD] text-[#183B32] font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">PO Number</th>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5">Line Items Summary</th>
                  <th className="px-3 py-2.5">Order Total</th>
                  <th className="px-3 py-2.5">Payment</th>
                  <th className="px-3 py-2.5 text-right">Balance Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBDD]">
                {supplier.purchaseHistory && supplier.purchaseHistory.length > 0 ? (
                  supplier.purchaseHistory.map((po, i) => (
                    <tr key={i} className="hover:bg-[#F7FAF5]">
                      <td className="px-3 py-2.5 font-mono font-bold text-[#183B32] whitespace-nowrap">
                        {po.poNumber}
                      </td>
                      <td className="px-3 py-2.5 text-[#5A6F63] whitespace-nowrap">
                        {po.date}
                      </td>
                      <td className="px-3 py-2.5 text-[#34423A] max-w-[200px] truncate" title={po.itemsSummary}>
                        {po.itemsSummary}
                      </td>
                      <td className="px-3 py-2.5 font-bold text-[#183B32] whitespace-nowrap">
                        ${po.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            po.paymentStatus === 'Paid'
                              ? 'bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]'
                              : po.paymentStatus === 'Partial'
                              ? 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]'
                              : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                          }`}
                        >
                          {po.paymentStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold whitespace-nowrap text-[#78350F]">
                        ${po.balanceDue.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-4 text-center text-[#5A6F63] italic">
                      No purchase orders recorded yet for this supplier.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E2EBDD]">
          <Button
            variant="outline"
            size="sm"
            icon={Power}
            onClick={() => {
              onToggleStatus(supplier);
            }}
            className={isActive ? 'text-[#991B1B] hover:bg-[#FEE2E2]' : 'text-[#183B32]'}
          >
            {isActive ? 'Deactivate Supplier' : 'Activate Supplier'}
          </Button>

          <div className="flex items-center gap-2.5">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Edit3}
              onClick={() => {
                onClose();
                onEditSupplier(supplier);
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

