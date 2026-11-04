# Medventory — Agent Guidelines & Engineering Standards

Welcome to the **Medventory** project codebase. Medventory is a production-oriented Pharmacy Management & Inventory Intelligence System. All AI agents, contributors, and developers working on this project must strictly adhere to the standards, architectural principles, and constraints set forth in this document.

---

## 1. Technology Stack & Language Standards

- **Frontend (`client/`)**:
  - React 19
  - Vite (build tool and dev server)
  - Tailwind CSS (styling)
  - React Router (client-side routing)
- **Backend (`server/`)**:
  - Node.js (runtime environment)
  - Express (REST API framework)
  - PostgreSQL (relational database engine)
  - Prisma (ORM / data access layer)
- **Primary Language**:
  - **JavaScript** initially across client and server.
  - Follow modern ECMAScript standards (ES modules, async/await, clean functional and object-oriented patterns).

---

## 2. Architecture & System Design

- **Modular Monolith**:
  - Organize features into coherent, modular domains (e.g., inventory, sales, purchasing, authentication, analytics).
  - High cohesion within modules; low coupling across modules.
  - **No Microservices**: Do not split into distributed microservices or separate service deployments. Medventory is strictly a modular monolith.
- **REST Conventions**:
  - Follow standard HTTP methods (`GET`, `POST`, `PUT`/`PATCH`, `DELETE`) with meaningful HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`, `409`, `422`, `500`).
  - Use clear, predictable resource naming (plural nouns, kebab-case or standard REST hierarchy, e.g., `/api/v1/inventory/items`).
  - Provide uniform JSON response payloads for both success and error responses.

---

## 3. Financial & Inventory Integrity

- **Never Trust Frontend Calculations**:
  - The client is considered untrusted.
  - All pricing, discounts, taxes, sub-totals, grand totals, stock availability, reorder quantities, and financial balances must be calculated, validated, and finalized server-side.
  - Frontend calculations are for display and instant UI feedback only.
- **Database Transactions for Related Operations**:
  - Every business flow involving multiple related record changes (e.g., billing a customer, updating stock batches, generating an audit ledger entry) must be wrapped inside a database transaction (`prisma.$transaction`).
  - Maintain data consistency across concurrent requests: prevent race conditions, negative inventory, or partial order state writes.

---

## 4. Input Validation & Security

- **Validate Incoming API Data**:
  - Validate all request inputs (route params, query strings, request bodies) at the API boundary before passing them to services or database queries.
  - Reject malformed or unauthorized fields using strict validation schemas.
- **Authentication & Role-Based Authorization (RBAC)**:
  - Enforce authentication for protected endpoints.
  - Implement granular role-based access control (e.g., Pharmacist, Cashier, Inventory Manager, Administrator).
  - Explicitly guard sensitive routes and data access policies.
- **Secrets & Configuration**:
  - **Never commit secrets**, API keys, passwords, database credentials, or tokens to the repository.
  - Manage all sensitive configuration via environment variables (`.env`) loaded through server configuration modules.
- **Flag Security Concerns**:
  - Proactively identify and flag security implications (e.g., SQL injection vulnerabilities, CORS misconfigurations, SSRF, XSS, rate-limiting deficits) during development and code reviews.

---

## 5. Engineering Principles & Scope Management

- **Maintainable, Reusable, and Testable Code**:
  - Write clean, self-documenting code with clear separation of concerns (routes, controllers, services, database access).
  - Design functions to be deterministic, decoupled, and easy to unit and integration test.
- **Avoid Unnecessary Dependencies & Premature Abstractions**:
  - Keep dependency footprint minimal. Evaluate whether a utility or library is truly necessary before adding packages.
  - Avoid premature abstractions, complex generic layers, or speculative generalization. Build for current concrete requirements first.
- **No Unassigned Features**:
  - Strictly limit implementations to the assigned task and scope.
  - Do not implement unassigned features, extraneous configurations, or speculative modules ahead of time.
- **Explain Architectural Decisions**:
  - Document the rationale behind non-obvious architecture choices, data models, and critical business logic in commit descriptions, pull requests, or `docs/`.
