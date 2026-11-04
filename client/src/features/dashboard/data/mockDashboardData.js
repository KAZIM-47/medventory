import {
  calculateInventoryMetrics,
  WEEKLY_SALES_DATA,
  RECENT_TRANSACTIONS,
  EXPIRING_MEDICINES,
} from '../../../data/mockData';

export {
  WEEKLY_SALES_DATA,
  RECENT_TRANSACTIONS,
  EXPIRING_MEDICINES,
};

/**
 * Derives Dashboard KPI stat cards directly from calculated inventory metrics.
 * Eliminates disconnected hardcoded values.
 */
export function getDashboardKPIs(metrics) {
  const formattedValuation = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(metrics.totalInventoryValue);

  return [
    {
      id: 'total-medicines',
      title: 'Total Medicines',
      value: String(metrics.totalMedicines),
      change: `${metrics.inStockCount} in stock`,
      changeType: 'positive',
      subtext: 'Master catalog active items',
      icon: 'Pill',
    },
    {
      id: 'inventory-value',
      title: 'Total Inventory Value',
      value: formattedValuation,
      change: 'Calculated at cost',
      changeType: 'neutral',
      subtext: 'Current stock × purchase cost',
      icon: 'DollarSign',
    },
    {
      id: 'today-sales',
      title: "Today's Sales (Sample)",
      value: '$4,280.75',
      change: '+12.5% vs yesterday',
      changeType: 'positive',
      subtext: '142 sample prescriptions',
      icon: 'TrendingUp',
    },
    {
      id: 'low-stock',
      title: 'Stock Alerts',
      value: String(metrics.totalAlertsCount),
      change: `${metrics.outOfStockCount} out of stock`,
      changeType: metrics.totalAlertsCount > 0 ? 'warning' : 'positive',
      subtext: `${metrics.lowStockCount} below threshold`,
      icon: 'AlertTriangle',
    },
  ];
}
