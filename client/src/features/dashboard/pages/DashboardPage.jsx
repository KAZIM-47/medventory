import React from 'react';
import {
  DASHBOARD_STATS,
  SALES_OVERVIEW_DATA,
  RECENT_TRANSACTIONS,
  LOW_STOCK_ALERTS,
  EXPIRING_MEDICINES,
} from '../data/mockDashboardData';
import { StatCard } from '../components/StatCard';
import { SalesOverviewChart } from '../components/SalesOverviewChart';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { LowStockAlerts } from '../components/LowStockAlerts';
import { ExpiringMedicinesAlerts } from '../components/ExpiringMedicinesAlerts';
import { Button } from '../../../components/ui/Button';
import { Download, RefreshCw, FileText } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title & Operational Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2EBDD]">
        <div>
          <h1 className="text-2xl font-bold text-[#183B32] tracking-tight">
            Operational Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6F63] mt-1">
            Real-time pharmacy inventory intelligence, POS monitoring, and batch surveillance
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" icon={RefreshCw}>
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={Download}>
            Export Summary
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards (4 columns) */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* Primary Analytics Section: Sales Chart & Low Stock Alerts */}
      <section aria-label="Sales and Stock Analytics" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <SalesOverviewChart data={SALES_OVERVIEW_DATA} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <LowStockAlerts alerts={LOW_STOCK_ALERTS} />
        </div>
      </section>

      {/* Secondary Operations Section: Recent Transactions & Expiring Medicines */}
      <section aria-label="Transactions and Expiry Surveillance" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <RecentTransactionsTable transactions={RECENT_TRANSACTIONS} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <ExpiringMedicinesAlerts items={EXPIRING_MEDICINES} />
        </div>
      </section>
    </div>
  );
}

