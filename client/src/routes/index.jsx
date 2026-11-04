import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { MedicinesPage } from '../features/medicines/pages/MedicinesPage';
import { PlaceholderPage } from '../components/ui/PlaceholderPage';
import {
  Pill,
  Boxes,
  Truck,
  ShoppingCart,
  Receipt,
  BarChart3,
  Settings,
} from 'lucide-react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'medicines',
        element: <MedicinesPage />,
      },
      {
        path: 'inventory',
        element: (
          <PlaceholderPage
            title="Inventory & Batch Management"
            moduleName="Inventory"
            description="Monitor real-time warehouse stock, batch expiration dates, lot numbers, and stock level thresholds."
            icon={Boxes}
          />
        ),
      },
      {
        path: 'suppliers',
        element: (
          <PlaceholderPage
            title="Supplier Management"
            moduleName="Suppliers"
            description="Maintain authorized pharmaceutical distributors, contact records, payment terms, and lead times."
            icon={Truck}
          />
        ),
      },
      {
        path: 'purchases',
        element: (
          <PlaceholderPage
            title="Purchases & Orders"
            moduleName="Purchases"
            description="Issue purchase orders, track incoming supplier shipments, and log goods received notes (GRN)."
            icon={ShoppingCart}
          />
        ),
      },
      {
        path: 'sales-billing',
        element: (
          <PlaceholderPage
            title="Point of Sale & Billing"
            moduleName="Sales & Billing"
            description="High-velocity prescription dispensing, verified server-side taxation, multi-tender payments, and receipts."
            icon={Receipt}
          />
        ),
      },
      {
        path: 'reports',
        element: (
          <PlaceholderPage
            title="Financial & Inventory Reports"
            moduleName="Reports"
            description="Generate audit logs, stock valuation summaries, expiry liability analyses, and turnover reports."
            icon={BarChart3}
          />
        ),
      },
      {
        path: 'settings',
        element: (
          <PlaceholderPage
            title="System Settings & Security"
            moduleName="Settings"
            description="Configure role-based access control, store profiles, tax rates, and database backup preferences."
            icon={Settings}
          />
        ),
      },
      {
        path: '*',
        element: (
          <PlaceholderPage
            title="Page Not Found"
            moduleName="404"
            description="The requested route does not exist in Medventory."
          />
        ),
      },
    ],
  },
]);

