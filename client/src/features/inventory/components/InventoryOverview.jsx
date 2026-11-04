import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Boxes, DollarSign, AlertTriangle, Clock, XCircle } from 'lucide-react';

export function InventoryOverview({ batchMetrics }) {
  const formattedValuation = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(batchMetrics.totalValue);

  const kpis = [
    {
      id: 'total-units',
      title: 'Total Stock Units',
      value: batchMetrics.totalUnits.toLocaleString(),
      subtext: 'Units across all active batches',
      icon: Boxes,
      iconBg: 'bg-[#D7FCD4] text-[#183B32] border-[#B6CCA1]',
    },
    {
      id: 'inventory-value',
      title: 'Total Inventory Value',
      value: formattedValuation,
      subtext: 'Valued at wholesale cost',
      icon: DollarSign,
      iconBg: 'bg-[#C7E4BB] text-[#183B32] border-[#BFD8AE]',
    },
    {
      id: 'low-stock-batches',
      title: 'Low-Stock Batches',
      value: String(batchMetrics.lowStockBatches),
      subtext: 'Batches below threshold',
      icon: AlertTriangle,
      iconBg: 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]',
      highlight: batchMetrics.lowStockBatches > 0 ? 'text-[#78350F]' : 'text-[#183B32]',
    },
    {
      id: 'expiring-batches',
      title: 'Expiring Batches',
      value: String(batchMetrics.expiringBatches),
      subtext: 'Expired or <= 60 days to expiry',
      icon: Clock,
      iconBg: 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]',
      highlight: batchMetrics.expiringBatches > 0 ? 'text-[#78350F]' : 'text-[#183B32]',
    },
    {
      id: 'out-of-stock-meds',
      title: 'Out of Stock SKUs',
      value: String(batchMetrics.outOfStockMeds),
      subtext: 'Zero balance in catalog',
      icon: XCircle,
      iconBg: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
      highlight: batchMetrics.outOfStockMeds > 0 ? 'text-[#991B1B]' : 'text-[#183B32]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
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

