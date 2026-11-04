import React from 'react';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt } from 'lucide-react';

export function RecentTransactionsTable({ transactions }) {
  return (
    <Card>
      <CardHeader
        title="Recent Transactions & Dispensing"
        subtitle="Latest point-of-sale prescriptions and sales ledger records"
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

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Patient / Customer</TableHead>
            <TableHead>Items Dispensed</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell className="font-semibold text-[#183B32] whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-[#5A6F63]" />
                  <span>{txn.id}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium whitespace-nowrap">
                <div>
                  <p className="text-[#34423A]">{txn.customer}</p>
                  <p className="text-[11px] text-[#5A6F63]">{txn.prescriptionId}</p>
                </div>
              </TableCell>
              <TableCell className="text-xs text-[#5A6F63] max-w-[220px] truncate">
                {txn.items}
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap text-[#5A6F63]">
                {txn.method}
              </TableCell>
              <TableCell className="font-bold text-[#183B32] whitespace-nowrap">
                {txn.total}
              </TableCell>
              <TableCell className="text-xs text-[#5A6F63] whitespace-nowrap">
                {txn.time}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge variant="default" size="sm" dot>
                  {txn.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

