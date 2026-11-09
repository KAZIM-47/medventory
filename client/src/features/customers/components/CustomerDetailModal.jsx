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
  IndianRupee,
  ShoppingBag,
  CreditCard,
  Edit3,
  Power,
  ShieldCheck,
} from 'lucide-react';
import { formatINR } from '../../../data/customerData';

export function CustomerDetailModal({
  isOpen = true,
  onClose,
  customer,
  onEditCustomer,
  onEdit,
  onToggleStatus,
}) {
  if (!customer) return null;

  const handleEdit = onEditCustomer || onEdit;

  const isActive = customer.status === 'Active';

  // Calculate total purchase value
  const totalPurchaseValue = customer.purchaseHistory
    ? customer.purchaseHistory.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0)
    : 0;

  // Available credit calculation
  const creditLimit = Number(customer.creditLimit) || 0;
  const outstanding = Number(customer.outstandingBalance) || 0;
  const remainingCredit = Math.max(0, creditLimit - outstanding);

  // Type badge variant
  let typeBadgeVariant = 'default';
  if (customer.type === 'Hospital') typeBadgeVariant = 'forest';
  else if (customer.type === 'Clinic') typeBadgeVariant = 'celadon';
  else if (customer.type === 'Doctor') typeBadgeVariant = 'neutral';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={customer.name}
      subtitle={`Customer Account: ${customer.code || customer.id} • ${customer.type}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Status and Terms Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2EBDD]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={typeBadgeVariant} size="md">
              {customer.type}
            </Badge>
            <Badge variant={isActive ? 'default' : 'neutral'} size="md" dot>
              {customer.status}
            </Badge>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EEF6EC] text-[#183B32] border border-[#C7E4BB]">
              Terms: {customer.paymentTerms}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5A6F63]">GSTIN:</span>
            {customer.gstin ? (
              <span className="font-mono font-bold text-[#183B32]">{customer.gstin}</span>
            ) : (
              <span className="italic text-[#5A6F63]">Unregistered / Exempt</span>
            )}
          </div>
        </div>

        {/* Financial Highlights (In INR ₹) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Cumulative Purchases</p>
            <p className="text-xl font-bold text-[#183B32] mt-1">
              {formatINR(totalPurchaseValue)}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">Sample order volume to date</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD]">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Outstanding Balance</p>
            <p
              className={`text-xl font-bold mt-1 ${
                outstanding > 0 ? 'text-[#78350F]' : 'text-[#183B32]'
              }`}
            >
              {formatINR(outstanding)}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">Unsettled receivables</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD] col-span-2 sm:col-span-1">
            <p className="text-[11px] font-semibold text-[#5A6F63] uppercase">Credit Limit / Available</p>
            <p className="text-base font-bold text-[#183B32] mt-1">
              {formatINR(creditLimit)}
            </p>
            <p className="text-[10px] text-[#5A6F63] mt-0.5">
              Available: <strong className="text-[#183B32]">{formatINR(remainingCredit)}</strong>
            </p>
          </div>
        </div>

        {/* Contact & Address Grid */}
        <div className="bg-white rounded-xl border border-[#E2EBDD] divide-y divide-[#E2EBDD] text-xs">
          {/* Row 1: Contact Details */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Primary Contact</p>
              <p className="font-bold text-sm text-[#183B32]">{customer.contactPerson}</p>
              <div className="flex items-center gap-1.5 text-[#34423A] mt-1">
                <Phone className="w-3.5 h-3.5 text-[#5A6F63]" />
                <span className="font-medium">{customer.phone}</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Digital Correspondence</p>
              <div className="flex items-center gap-1.5 text-[#34423A]">
                <Mail className="w-3.5 h-3.5 text-[#5A6F63]" />
                <a href={`mailto:${customer.email}`} className="text-[#183B32] hover:underline font-medium">
                  {customer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Row 2: Billing & Shipping Address */}
          <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Billing Address</p>
              <div className="flex items-start gap-1.5 text-[#34423A]">
                <MapPin className="w-3.5 h-3.5 text-[#5A6F63] shrink-0 mt-0.5" />
                <span>
                  {customer.billingAddress}, {customer.city}, {customer.state} - {customer.postalCode}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Shipping & Delivery Depot</p>
              <div className="flex items-start gap-1.5 text-[#34423A]">
                <MapPin className="w-3.5 h-3.5 text-[#5A6F63] shrink-0 mt-0.5" />
                <span>
                  {customer.shippingAddress || customer.billingAddress}, {customer.city}, {customer.state} - {customer.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Account notes if any */}
          {customer.notes && (
            <div className="p-3.5">
              <p className="text-[11px] font-semibold text-[#5A6F63] uppercase mb-1">Clinical & Commercial Notes</p>
              <p className="text-xs text-[#5A6F63] leading-relaxed">{customer.notes}</p>
            </div>
          )}
        </div>

        {/* Sample Purchase History */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#183B32] uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#183B32]" />
              <span>Sample Purchase Order Invoices</span>
            </h4>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EEF6EC] text-[#183B32]">
              Sample Ledger Records
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F7FAF5] border-b border-[#E2EBDD] text-[#183B32] font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">Invoice #</th>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5">Medicines Summary</th>
                  <th className="px-3 py-2.5">Total Amount</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 text-right">Balance Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBDD]">
                {customer.purchaseHistory && customer.purchaseHistory.length > 0 ? (
                  customer.purchaseHistory.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-[#F7FAF5]">
                      <td className="px-3 py-2.5 font-mono font-bold text-[#183B32] whitespace-nowrap">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-3 py-2.5 text-[#5A6F63] whitespace-nowrap">
                        {inv.date}
                      </td>
                      <td className="px-3 py-2.5 text-[#34423A] max-w-[200px] truncate" title={inv.itemsSummary}>
                        {inv.itemsSummary}
                      </td>
                      <td className="px-3 py-2.5 font-bold text-[#183B32] whitespace-nowrap">
                        {formatINR(inv.totalAmount)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            inv.paymentStatus === 'Paid'
                              ? 'bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]'
                              : inv.paymentStatus === 'Partial'
                              ? 'bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A]'
                              : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                          }`}
                        >
                          {inv.paymentStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold whitespace-nowrap text-[#78350F]">
                        {formatINR(inv.balanceDue)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-4 text-center text-[#5A6F63] italic">
                      No purchase orders recorded yet for this customer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sample Payment History */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#183B32] uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#183B32]" />
              <span>Sample Payment Receipt History</span>
            </h4>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EEF6EC] text-[#183B32]">
              Sample Payment Ledger
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F7FAF5] border-b border-[#E2EBDD] text-[#183B32] font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">Receipt #</th>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5">Payment Mode</th>
                  <th className="px-3 py-2.5">Amount Credited</th>
                  <th className="px-3 py-2.5 text-right">Bank / UTR Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2EBDD]">
                {customer.paymentHistory && customer.paymentHistory.length > 0 ? (
                  customer.paymentHistory.map((pmt, idx) => (
                    <tr key={idx} className="hover:bg-[#F7FAF5]">
                      <td className="px-3 py-2.5 font-mono font-bold text-[#183B32] whitespace-nowrap">
                        {pmt.receiptNumber}
                      </td>
                      <td className="px-3 py-2.5 text-[#5A6F63] whitespace-nowrap">
                        {pmt.date}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap font-medium text-[#34423A]">
                        {pmt.mode}
                      </td>
                      <td className="px-3 py-2.5 font-bold text-[#183B32] whitespace-nowrap">
                        {formatINR(pmt.amount)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[11px] text-[#5A6F63] whitespace-nowrap">
                        {pmt.referenceNumber}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-4 text-center text-[#5A6F63] italic">
                      No payments recorded yet for this customer.
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
            onClick={() => onToggleStatus(customer)}
            className={isActive ? 'text-[#991B1B] hover:bg-[#FEE2E2]' : 'text-[#183B32]'}
          >
            {isActive ? 'Deactivate Customer' : 'Activate Customer'}
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
                if (handleEdit) handleEdit(customer);
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

