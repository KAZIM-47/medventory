import React from 'react';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt, CreditCard } from 'lucide-react';

export function RecentTransactionsTable({ transactions = [] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Recent Dispensing Transactions"
        subtitle="Sample point-of-sale customer ledger entries"
        action={
          <Link
            to="/sales-billing"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#183B32] hover:underline"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        }
      />

      {/* Overflow wrapper with minimum width to guarantee readable, non-cramped columns */}
      <div className="w-full overflow-x-auto flex-1">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead className="bg-[#F7FAF5] border-b border-[#E2EBDD] text-xs font-semibold text-[#183B32] uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 w-32">Invoice ID</th>
              <th className="px-4 py-3 min-w-[140px]">Customer / Patient</th>
              <th className="px-4 py-3 min-w-[180px]">Items Dispensed</th>
              <th className="px-4 py-3 w-28">Payment</th>
              <th className="px-4 py-3 w-24 text-right sm:text-left">Total</th>
              <th className="px-4 py-3 w-24">Time</th>
              <th className="px-4 py-3 w-24 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EBDD] bg-white">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-[#F7FAF5] transition-colors">
                <td className="px-4 py-3 text-xs font-semibold text-[#183B32] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-[#5A6F63] shrink-0" />
                    <span>{txn.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs">
                  <div>
                    <p className="font-semibold text-[#34423A]">{txn.customer}</p>
                    <p className="text-[11px] text-[#5A6F63]">{txn.prescriptionId}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-[#5A6F63] max-w-[200px]">
                  <p className="truncate" title={txn.items}>
                    {txn.items}
                  </p>
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap text-[#5A6F63]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F7FAF5] border border-[#E2EBDD]">
                    {txn.method}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-bold text-[#183B32] whitespace-nowrap text-right sm:text-left">
                  {txn.total}
                </td>
                <td className="px-4 py-3 text-xs text-[#5A6F63] whitespace-nowrap">
                  {txn.time}
                </td>
                <td className="px-4 py-3 text-xs text-right whitespace-nowrap">
                  <Badge variant="default" size="sm" dot>
                    {txn.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
