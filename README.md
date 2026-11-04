# Medventory

A production-oriented Pharmacy Management & Inventory Intelligence System designed to streamline pharmacy operations, guarantee inventory and financial data integrity, and deliver actionable operational intelligence.

---

## Status

**Current Status:** Initial setup

The repository structure, foundational standards, and configuration baseline have been established. Application logic, database migrations, and client interface will be introduced systematically in upcoming tasks.

---

## Technology Stack

- **Frontend:**
  - React 19
  - Vite
  - Tailwind CSS
  - React Router
- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Prisma ORM
- **Language:**
  - JavaScript (ES Modules)
- **Architecture:**
  - Modular Monolith

---

## High-Level Repository Structure

```
medventory/
├── client/         # Frontend web application (React, Vite, Tailwind CSS)
├── server/         # Backend REST API and database layer (Node.js, Express, Prisma)
├── docs/           # Architecture notes, API specifications, and project documentation
├── .gitignore      # Git exclusion rules for artifacts, logs, dependencies, and environments
├── AGENTS.md       # Project guidelines and engineering rules for AI agents & contributors
└── README.md       # Project overview, tech stack, and setup status
```

---

## Planned Core Features

1. **Inventory Management & Batch Tracking**
   - Comprehensive SKU and drug catalog with dosage, brand, and generic classifications.
   - Batch-level tracking with manufacturing and expiration date monitoring.
   - Real-time stock balance alerts, minimum thresholds, and expiry risk notifications.

2. **Point of Sale (POS) & Billing**
   - High-throughput billing interface supporting prescription validation.
   - Server-calculated financial operations (discounts, taxes, line items, and totals).
   - Multi-tender payment capture and itemized receipt printing.

3. **Purchasing & Supplier Management**
   - Vendor directory, purchase order generation, and goods received note (GRN) reconciliation.
   - Cost tracking and automatic stock adjustments upon goods receipt.

4. **Inventory Intelligence & Reporting**
   - Stock valuation, fast/slow-moving inventory analysis, and demand forecasting insights.
   - Audit logs tracking inventory write-offs, returns, adjustments, and user actions.

5. **Security, Authentication & Role-Based Access Control (RBAC)**
   - Granular authorization for administrators, pharmacists, cashiers, and inventory managers.
   - Secure session handling, audit trailing, and transactional consistency across all operations.

