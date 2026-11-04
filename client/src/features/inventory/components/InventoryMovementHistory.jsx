import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Search, History, ArrowDownRight, ArrowUpRight, SlidersHorizontal, Filter, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function InventoryMovementHistory({ movements = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredMovements = useMemo(() => {
    return movements.filter((m) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.medicineName.toLowerCase().includes(q) ||
        m.sku.toLowerCase().includes(q) ||
        m.batchNumber.toLowerCase().includes(q) ||
        m.reason.toLowerCase().includes(q);

      const matchesType =
        selectedType === 'All' ||
        (selectedType === 'Stock In' && m.type === 'Stock In') ||
        (selectedType === 'Stock Out' && m.type === 'Stock Out') ||
        (selectedType === 'Adjustments' && m.type.startsWith('Adjustment'));

      return matchesSearch && matchesType;
    });
  }, [movements, searchQuery, selectedType]);

  const getTypeBadge = (type) => {
    if (type === 'Stock In') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]">
          <ArrowDownRight className="w-3.5 h-3.5 text-[#183B32]" />
          <span>Stock In</span>
        </span>
      );
    }
    if (type === 'Stock Out') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEF6EC] text-[#34423A] border border-[#C7E4BB]">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#5A6F63]" />
          <span>Stock Out</span>
        </span>
      );
    }
    if (type === 'Adjustment (+)') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#183B32] text-white">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#D7FCD4]" />
          <span>Adjust (+)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#991B1B]" />
        <span>Adjust (-)</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header and Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2EBDD] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6F63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movements by medicine, batch, or reason..."
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-[#E2EBDD] bg-[#F7FAF5] text-xs text-[#34423A] placeholder-[#5A6F63] focus:outline-none focus:bg-white focus:border-[#183B32]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6F63] hover:text-[#183B32]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Movement Type Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F7FAF5] border border-[#E2EBDD] text-xs self-start sm:self-auto">
          {['All', 'Stock In', 'Stock Out', 'Adjustments'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedType === t
                  ? 'bg-[#183B32] text-white shadow-xs'
                  : 'text-[#5A6F63] hover:text-[#183B32] hover:bg-[#EEF6EC]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Movement Ledger Table */}
      <div className="bg-white rounded-xl border border-[#E2EBDD] overflow-hidden shadow-xs">
        {filteredMovements.length === 0 ? (
          <div className="p-12 text-center text-[#5A6F63]">
            <History className="w-8 h-8 text-[#B6CCA1] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#183B32]">No Movements Found</p>
            <p className="text-xs mt-1">No inventory ledger entries match your filter criteria.</p>
          </div>
        ) : (
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow hover={false}>
                <TableHead>Date & Time</TableHead>
                <TableHead>Movement Type</TableHead>
                <TableHead>Medicine & Batch</TableHead>
                <TableHead>Qty Changed</TableHead>
                <TableHead>Stock Level Change</TableHead>
                <TableHead>Reason & Audit Note</TableHead>
                <TableHead className="text-right">Operator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((mov) => {
                const isPositive = mov.quantity > 0;
                return (
                  <TableRow key={mov.id}>
                    <TableCell className="text-xs font-medium text-[#5A6F63] whitespace-nowrap">
                      {mov.date}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getTypeBadge(mov.type)}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div>
                        <p className="font-semibold text-xs text-[#183B32] truncate">
                          {mov.medicineName}
                        </p>
                        <p className="font-mono text-[11px] text-[#5A6F63]">
                          {mov.batchNumber} • {mov.sku}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={`font-bold text-xs ${
                          isPositive ? 'text-[#183B32]' : 'text-[#991B1B]'
                        }`}
                      >
                        {isPositive ? `+${mov.quantity}` : mov.quantity} {mov.unit}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-[#5A6F63]">
                      <span className="font-medium text-[#34423A]">{mov.previousStock}</span>
                      <span className="mx-1.5 text-[#B6CCA1]">→</span>
                      <span className="font-bold text-[#183B32]">{mov.newStock} {mov.unit}</span>
                    </TableCell>
                    <TableCell className="max-w-[220px] text-xs text-[#5A6F63]">
                      <p className="truncate" title={mov.reason}>
                        {mov.reason}
                      </p>
                    </TableCell>
                    <TableCell className="text-right text-xs text-[#5A6F63] whitespace-nowrap">
                      {mov.performedBy}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

