import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Eye, Edit3, Power, Inbox, MapPin, Mail, Phone, FileText } from 'lucide-react';
import { formatINR } from '../../../data/customerData';

export function CustomerTable({
  customers = [],
  isLoading,
  onViewCustomer,
  onEditCustomer,
  onToggleStatus,
  onClearFilters,
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-8 space-y-3">
        <div className="h-6 w-48 bg-[#F7FAF5] rounded animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-[#F7FAF5] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-12 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center mx-auto mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#183B32]">No Customers Found</h3>
        <p className="text-xs text-[#5A6F63] mt-1 max-w-sm mx-auto">
          No customer account matches your search query, account type, or status filter.
        </p>
        {onClearFilters && (
          <div className="mt-4">
            <button
              type="button"
              onClick={onClearFilters}
              className="px-3.5 py-1.5 rounded-lg bg-[#D7FCD4] text-[#183B32] font-semibold text-xs border border-[#B6CCA1] hover:bg-[#C7E4BB] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden shadow-xs">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Customer / Entity</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Phone & Email</TableHead>
            <TableHead>City & State</TableHead>
            <TableHead>GSTIN</TableHead>
            <TableHead>Balance Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((cust) => {
            const isActive = cust.status === 'Active';

            // Customer Type badge styling
            let typeBadgeVariant = 'default';
            if (cust.type === 'Hospital') typeBadgeVariant = 'forest';
            else if (cust.type === 'Clinic') typeBadgeVariant = 'celadon';
            else if (cust.type === 'Doctor') typeBadgeVariant = 'neutral';

            return (
              <TableRow key={cust.id}>
                {/* Customer Name & Code */}
                <TableCell className="max-w-[220px]">
                  <div>
                    <button
                      type="button"
                      onClick={() => onViewCustomer(cust)}
                      className="font-bold text-sm text-[#183B32] hover:underline text-left block truncate"
                    >
                      {cust.name}
                    </button>
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EEF6EC] text-[#183B32] border border-[#C7E4BB] mt-1 inline-block">
                      {cust.code || cust.id}
                    </span>
                  </div>
                </TableCell>

                {/* Account Type */}
                <TableCell className="whitespace-nowrap">
                  <Badge variant={typeBadgeVariant} size="sm">
                    {cust.type}
                  </Badge>
                </TableCell>

                {/* Contact Person */}
                <TableCell className="whitespace-nowrap">
                  <p className="text-xs font-semibold text-[#34423A]">
                    {cust.contactPerson}
                  </p>
                </TableCell>

                {/* Phone & Email */}
                <TableCell className="whitespace-nowrap">
                  <div className="space-y-0.5 text-xs text-[#5A6F63]">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#5A6F63] shrink-0" />
                      <span className="text-[#34423A] font-medium">{cust.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-[#5A6F63] shrink-0" />
                      <a
                        href={`mailto:${cust.email}`}
                        className="hover:text-[#183B32] hover:underline truncate max-w-[160px]"
                      >
                        {cust.email}
                      </a>
                    </div>
                  </div>
                </TableCell>

                {/* City & State */}
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-1 text-xs text-[#34423A]">
                    <MapPin className="w-3.5 h-3.5 text-[#5A6F63] shrink-0" />
                    <span>
                      {cust.city}, {cust.state}
                    </span>
                  </div>
                </TableCell>

                {/* GSTIN */}
                <TableCell className="whitespace-nowrap">
                  {cust.gstin ? (
                    <span className="font-mono text-xs font-semibold text-[#183B32] px-2 py-0.5 rounded bg-[#F7FAF5] border border-[#E2EBDD]">
                      {cust.gstin}
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#5A6F63] italic">Unregistered</span>
                  )}
                </TableCell>

                {/* Outstanding Balance */}
                <TableCell className="whitespace-nowrap">
                  <span
                    className={`font-bold text-xs ${
                      cust.outstandingBalance > 0 ? 'text-[#78350F]' : 'text-[#183B32]'
                    }`}
                  >
                    {formatINR(cust.outstandingBalance)}
                  </span>
                </TableCell>

                {/* Account Status */}
                <TableCell className="whitespace-nowrap">
                  <Badge variant={isActive ? 'default' : 'neutral'} size="sm" dot>
                    {cust.status}
                  </Badge>
                </TableCell>

                {/* Action Buttons */}
                <TableCell className="text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <button
                      type="button"
                      onClick={() => onViewCustomer(cust)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="View Customer Profile"
                      aria-label={`View profile for ${cust.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditCustomer(cust)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="Edit Customer"
                      aria-label={`Edit ${cust.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(cust)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#5A6F63] hover:text-[#991B1B] hover:bg-[#FEE2E2]'
                          : 'text-[#183B32] hover:bg-[#D7FCD4]'
                      }`}
                      title={isActive ? 'Deactivate Customer' : 'Activate Customer'}
                      aria-label={`${isActive ? 'Deactivate' : 'Activate'} ${cust.name}`}
                    >
                      <Power className="w-4 h-4" />
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

