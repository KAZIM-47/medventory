import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Eye, Edit3, Power, Inbox, MapPin, Mail, Phone, Truck } from 'lucide-react';

export function SupplierTable({
  suppliers = [],
  isLoading,
  onViewSupplier,
  onEditSupplier,
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

  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E2EBDD] p-12 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#D7FCD4] border border-[#B6CCA1] text-[#183B32] flex items-center justify-center mx-auto mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#183B32]">No Suppliers Found</h3>
        <p className="text-xs text-[#5A6F63] mt-1 max-w-sm mx-auto">
          No pharmaceutical supplier or distributor matches your search query or filter selection.
        </p>
        {onClearFilters && (
          <div className="mt-4">
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden shadow-xs">
      <Table className="min-w-[850px]">
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Company & Code</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email & Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Supplied Categories</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payables</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => {
            const isActive = supplier.status === 'Active';

            return (
              <TableRow key={supplier.id}>
                {/* Company Name & Code */}
                <TableCell className="max-w-[220px]">
                  <div>
                    <button
                      type="button"
                      onClick={() => onViewSupplier(supplier)}
                      className="font-bold text-sm text-[#183B32] hover:underline text-left block truncate"
                    >
                      {supplier.name}
                    </button>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EEF6EC] text-[#183B32] border border-[#C7E4BB]">
                        {supplier.code || supplier.id}
                      </span>
                      <span className="text-[11px] text-[#5A6F63]">
                        {supplier.paymentTerms}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Contact Person & Role */}
                <TableCell className="whitespace-nowrap">
                  <div>
                    <p className="text-xs font-semibold text-[#34423A]">
                      {supplier.contactPerson}
                    </p>
                    <p className="text-[11px] text-[#5A6F63] mt-0.5 truncate max-w-[150px]">
                      {supplier.role || 'Sales Rep'}
                    </p>
                  </div>
                </TableCell>

                {/* Email & Phone */}
                <TableCell className="whitespace-nowrap">
                  <div className="space-y-0.5 text-xs text-[#5A6F63]">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#5A6F63] shrink-0" />
                      <a
                        href={`mailto:${supplier.email}`}
                        className="hover:text-[#183B32] hover:underline truncate max-w-[170px]"
                      >
                        {supplier.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Phone className="w-3 h-3 text-[#5A6F63] shrink-0" />
                      <span>{supplier.phone}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-1 text-xs text-[#34423A]">
                    <MapPin className="w-3.5 h-3.5 text-[#5A6F63] shrink-0" />
                    <span>
                      {supplier.city}, {supplier.state || supplier.country}
                    </span>
                  </div>
                </TableCell>

                {/* Supplied Categories */}
                <TableCell className="max-w-[200px]">
                  <div className="flex flex-wrap gap-1">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Status Badge */}
                <TableCell className="whitespace-nowrap">
                  <Badge variant={isActive ? 'default' : 'neutral'} size="sm" dot>
                    {supplier.status}
                  </Badge>
                </TableCell>

                {/* Outstanding Balance */}
                <TableCell className="whitespace-nowrap">
                  <span
                    className={`font-bold text-xs ${
                      supplier.outstandingBalance > 0 ? 'text-[#78350F]' : 'text-[#183B32]'
                    }`}
                  >
                    ${Number(supplier.outstandingBalance || 0).toFixed(2)}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <button
                      type="button"
                      onClick={() => onViewSupplier(supplier)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="View Supplier Profile & Purchase History"
                      aria-label={`View ${supplier.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditSupplier(supplier)}
                      className="p-1.5 rounded-lg text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC] transition-colors"
                      title="Edit Supplier Information"
                      aria-label={`Edit ${supplier.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(supplier)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#5A6F63] hover:text-[#991B1B] hover:bg-[#FEE2E2]'
                          : 'text-[#183B32] hover:bg-[#D7FCD4]'
                      }`}
                      title={isActive ? 'Deactivate Supplier' : 'Activate Supplier'}
                      aria-label={`${isActive ? 'Deactivate' : 'Activate'} ${supplier.name}`}
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

