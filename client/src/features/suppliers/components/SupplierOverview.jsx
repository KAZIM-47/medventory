import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Truck, CheckCircle2, XCircle, DollarSign } from 'lucide-react';

export function SupplierOverview({ metrics }) {
  const formattedOutstanding = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(metrics.totalOutstandingBalance);

  const kpis = [
    {
      id: 'total-suppliers',
      title: 'Total Suppliers',
      value: String(metrics.totalSuppliers),
      subtext: 'Contracted pharmaceutical distributors',
      icon: Truck,
      iconBg: 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
    },
    {
      id: 'active-suppliers',
      title: 'Active Suppliers',
      value: String(metrics.activeSuppliers),
      subtext: 'Authorized for purchase orders',
      icon: CheckCircle2,
      iconBg: 'bg-[#C7E4BB] text-[#183B32] border-[#BFD8AE]',
    },
    {
      id: 'inactive-suppliers',
      title: 'Inactive Suppliers',
      value: String(metrics.inactiveSuppliers),
      subtext: 'Suspended or dormant accounts',
      icon: XCircle,
      iconBg: 'bg-[#F7FAF5] text-[#5A6F63] border-[#E2EBDD]',
    },
    {
      id: 'outstanding-balance',
      title: 'Outstanding Payables',
      value: formattedOutstanding,
      subtext: 'Unsettled supplier invoices',
      icon: DollarSign,
      iconBg: metrics.totalOutstandingBalance > 0 ? 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]' : 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
      highlight: metrics.totalOutstandingBalance > 0 ? 'text-[#78350F]' : 'text-[#183B32]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.id} className="p-4 hover:border-[#C7E4BB] transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-[#5A6F63] uppercase tracking-wider">
                  {kpi.title}
                </p>
                <h3 className={`text-xl font-bold mt-1 tracking-tight ${kpi.highlight || 'text-[#183B32]'}`}>
                  {kpi.value}
                </h3>
              </div>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${kpi.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-[#5A6F63] mt-2 truncate">
              {kpi.subtext}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

