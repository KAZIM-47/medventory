import React from 'react';
import { useMedicines } from '../../../context/MedicineContext';
import { getDashboardKPIs } from '../data/mockDashboardData';
import { StatCard } from '../components/StatCard';
import { SalesOverviewChart } from '../components/SalesOverviewChart';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { LowStockAlerts } from '../components/LowStockAlerts';
import { ExpiringMedicinesAlerts } from '../components/ExpiringMedicinesAlerts';
import { Button } from '../../../components/ui/Button';
import { RefreshCw, Download, Database } from 'lucide-react';

export function DashboardPage() {
  const {
    metrics,
    weeklySales,
    recentTransactions,
    expiringMedicines,
    resetSampleData,
  } = useMedicines();

  // KPIs derived dynamically from shared medicines catalog
  const kpis = getDashboardKPIs(metrics);

  return (
    <div className="space-y-6 min-w-0">
      {/* Page Title & Operational Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2EBDD]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#D7FCD4] text-[#183B32] border border-[#B6CCA1]">
              Sample Data Mode
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Simulated pharmacy inventory metrics, POS transaction overview, and surveillance alerts
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={resetSampleData}
            title="Reset simulated data to initial state"
          >
            Reset Sample Data
          </Button>
          <Button variant="primary" size="sm" icon={Download}>
            Export Summary
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards (4 columns) */}
      <section
        aria-label="Key Performance Indicators"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* Primary Analytics Section: Sales Chart & Low Stock Alerts */}
      <section
        aria-label="Sales and Stock Analytics"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0"
      >
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <SalesOverviewChart data={weeklySales} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 min-w-0">
          <LowStockAlerts alerts={metrics.lowStockItems} />
        </div>
      </section>

      {/* Secondary Operations Section: Recent Transactions & Expiring Medicines */}
      <section
        aria-label="Transactions and Expiry Surveillance"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0"
      >
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <RecentTransactionsTable transactions={recentTransactions} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 min-w-0">
          <ExpiringMedicinesAlerts items={expiringMedicines} />
        </div>
      </section>
    </div>
  );
}
