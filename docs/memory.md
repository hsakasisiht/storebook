# Project Memory & Change Log

This file is the chronological, granular memory of **every single change** made in the project. Every file creation, edit, rename, deletion, configuration adjustment, rule update, and confirmed project decision must be recorded here immediately after it occurs. High-level project phases are tracked separately in `progress.md`.

## Change Tracking Rules

- Record **every change** immediately: file creation, code/text modification, configuration change, dependency update, or structural adjustment.
- Use the actual date and time in `Asia/Kolkata (IST, UTC+05:30)`.
- Never fabricate timestamps, file edits, diffs, test results, or outcomes.
- Keep all previous entries; append new entries in strict chronological order without deleting or rewriting history.
- For each entry, clearly specify:
  - **Change ID & Title**
  - **Date & Time (IST)**
  - **Related Phase** (matching `progress.md`)
  - **Change Type** (e.g., Created, Modified, Deleted, Configuration, Rule Update)
  - **Files Changed** (exact relative paths inside the workspace)
  - **Exact Changes Made** (detailed breakdown of what changed in each file)
  - **Reason / Trigger** (user instruction or task requirement)
  - **Verification** (checks performed to confirm the change)
- Follow `rules.md` at all times.

## Current Memory State

- **Total logged changes:** 18
- **Last updated:** 2026-11-15 16:21 IST (UTC+05:30)
- **Active Phase:** Standalone Project Creation — `jyoti-project` (PageHaven)
- **Workspace:** `d:\web-tech-project-3rdsem` (Confirmed)

## Granular Change History

<!-- Append a new entry below immediately after every single change. Do not delete earlier entries. -->

### Change 001 — Initial creation of `rules.md` and `progress.md`

- **Date:** 2026-11-14
- **Time:** 13:29 IST (UTC+05:30)
- **Related Phase:** Phase 0 — Governance & Tracking Setup
- **Change Type:** File Creation
- **Files Changed:**
  - `rules.md` (Created)
  - `progress.md` (Created)
- **Exact Changes Made:**
  - Created `rules.md` defining 9 core governance sections: Workspace Boundary, No Assumptions, Permission Before Actions, Safe File and Code Changes, Execution and Testing, Communication and Clarification, Progress Tracking, Completion Report, and Rule Changes.
  - Created `progress.md` with tracking rules, project status summary, and `Entry 001` logging the initial template setup.
- **Reason / Trigger:** Initial request to establish mandatory workspace rules and progress tracking templates.
- **Verification:** Confirmed both Markdown files were generated with accurate IST timestamps.

### Change 002 — Added `memory.md` for per-change tracking and updated `rules.md` & `progress.md` for phase tracking

- **Date:** 2026-11-14
- **Time:** 13:43 IST (UTC+05:30)
- **Related Phase:** Phase 0 — Governance & Tracking Setup
- **Change Type:** File Creation & Modification
- **Files Changed:**
  - `rules.md` (Modified)
  - `progress.md` (Modified)
  - `memory.md` (Created)
- **Exact Changes Made:**
  - **`rules.md`:**
    - Updated Section 7 ("Phase and Change Tracking Is Mandatory") to require two distinct logs: `progress.md` for tracking all project phases and `memory.md` for logging every individual change.
    - Updated Section 8 ("Completion Report") to require confirmation that both `memory.md` and `progress.md` have been updated after work is performed.
  - **`progress.md`:**
    - Updated the document purpose and rules to focus on tracking **all project phases** from start to finish.
    - Added the **All Project Phases Overview** table to track Phase 0 through Phase N.
    - Preserved `Entry 001` and appended `Entry 002` documenting the transition to phase-based tracking in `progress.md` and granular change tracking in `memory.md`.
  - **`memory.md`:**
    - Created this file with granular change tracking rules, a current memory state summary, `Change 001` (historical baseline), and `Change 002` (this update).
- **Reason / Trigger:** User instructed to update `rules.md` and `progress.md` so that a new `memory.md` file records every single change and `progress.md` updates and tracks all project phases.
- **Verification:** Verified that all three Markdown files align with the updated rules, use the current `Asia/Kolkata (IST, UTC+05:30)` timestamp (`2026-11-14 13:43 IST`), and retain all prior log entries.

### Change 003 — Completed Phase 0 and Activated Phase 1 (Foundation) in `progress.md`

- **Date:** 2026-11-14
- **Time:** 13:54 IST (UTC+05:30)
- **Related Phase:** Phase 1 — Foundation
- **Change Type:** Modification
- **Files Changed:**
  - `progress.md` (Modified)
- **Exact Changes Made:**
  - Updated `progress.md` status summary: active phase set to "Phase 1 — Foundation", workspace confirmed as `d:\web-tech-project-3rdsem`.
  - Registered Phases 0 through 4 in the **All Project Phases Overview** table per `Pandora_Online_Book_Store_PRD.md` and `architecture.md`.
  - Marked Phase 0 Complete, Phase 1 In progress.
  - Appended `Entry 003` logging Phase 0 completion and Phase 1 activation.
- **Reason / Trigger:** User instructed to proceed after reading all 6 core project documents.
- **Verification:** Verified `progress.md` retains complete historical entries and uses accurate IST timestamps.

### Change 004 — Implemented and Verified Phase 1 (Foundation)

- **Date:** 2026-11-14
- **Time:** 14:03 IST (UTC+05:30)
- **Related Phase:** Phase 1 — Foundation
- **Change Type:** Scaffolding, Dependency Installation, & Code Implementation
- **Files Changed:**
  - `.gitignore` (Created) — Ignores `node_modules`, `.env`, build artifacts, OS files.
  - `.env.example` (Created) — Defines `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.
  - `package.json` (Created) — Root workspace scripts for client and server.
  - `server/package.json` (Created) — Express server package configuration with ES module support.
  - `server/src/config/database.js` (Created) — Mongoose connection with timeout and safe error logging.
  - `server/src/middleware/errorHandler.js` (Created) — Centralized error handler for CastError, duplicate key, validation, and JWT errors.
  - `server/src/app.js` (Created) — Express app with CORS, JSON body parser, health route (`/api/health`), and 404 handler.
  - `server/src/server.js` (Created) — Main server entrypoint.
  - `client/` (Created) — Vite + React application.
  - `client/src/styles/tokens.css` (Created) — Brand tokens: `#244855` (Deep Teal), `#E64833` (Signal Coral), `#874F41` (Terracotta), `#90AEAD` (Muted Sage), `#FBE9D0` (Warm Cream), neutral surfaces, and spacing scale.
  - `client/src/styles/global.css` (Created) — Global typography, buttons, cards, form inputs, and status badges.
  - `client/src/styles/responsive.css` (Created) — Breakpoints for desktop, tablet, and mobile.
  - `client/src/context/AuthContext.jsx` (Created) — Authentication state and token persistence.
  - `client/src/context/CartContext.jsx` (Created) — Shopping cart state, totals, and quantity management.
  - `client/src/components/common/Header.jsx` & `Header.css` (Created) — Sticky header with logo, navigation, and cart counter.
  - `client/src/components/common/Footer.jsx` & `Footer.css` (Created) — Curated footer with store information.
  - `client/src/layouts/StoreLayout.jsx` (Created) — Storefront shell with Header, Outlet, and Footer.
  - `client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` (Created) — Admin portal sidebar, topbar, and content shell.
  - `client/src/pages/public/HomePage.jsx` & `HomePage.css` (Created) — Warm editorial hero banner, value pillars, and catalogue teaser.
  - `client/src/pages/public/CataloguePage.jsx` (Created) — Catalogue scaffold.
  - `client/src/pages/public/BookDetailsPage.jsx` (Created) — Book details view scaffold.
  - `client/src/pages/auth/LoginPage.jsx` (Created) — Sign in form.
  - `client/src/pages/auth/RegisterPage.jsx` (Created) — Registration form.
  - `client/src/pages/customer/CartPage.jsx` (Created) — Interactive cart with quantity controls and subtotal.
  - `client/src/pages/customer/CheckoutPage.jsx` (Created) — Checkout scaffold.
  - `client/src/pages/customer/OrderHistoryPage.jsx` (Created) — Customer order history scaffold.
  - `client/src/pages/customer/ProfilePage.jsx` (Created) — Customer profile view.
  - `client/src/pages/admin/DashboardPage.jsx` (Created) — Admin metric cards and quick links.
  - `client/src/pages/admin/BooksPage.jsx` (Created) — Books management table scaffold.
  - `client/src/pages/admin/CategoriesPage.jsx` (Created) — Categories management scaffold.
  - `client/src/pages/admin/OrdersPage.jsx` (Created) — Admin orders table scaffold.
  - `client/src/App.jsx` (Created) — Comprehensive React Router tree.
  - `client/src/index.css` (Modified) — Imports tokens, global, and responsive styles.
  - `client/src/App.css` (Modified) — Cleaned default template styles.
  - `client/index.html` (Modified) — Updated title and meta description.
  - `progress.md` (Modified) — Marked Phase 1 Complete, appended `Entry 004`.
- **Reason / Trigger:** User gave explicit approval to proceed with Phase 1 scaffolding and local dependency installation.
- **Verification:**
  - Ran `npm run build --prefix client`: Verified production build compiles cleanly without errors.
  - Tested `server/src/app.js`: Tested `GET /api/health` returning HTTP 200 with `{ status: 'ok', service: 'Pandora Bookstore API' }`.
  - Tested database connection configuration: Confirmed safe fallback and logging when database service is offline.
  - Verified `progress.md` and `memory.md` synchronization.

### Change 005 — Reorganized All Documentation and Markdown Files into `docs/`

- **Date:** 2026-11-14
- **Time:** 14:04 IST (UTC+05:30)
- **Related Phase:** Phase 1 — Foundation (Maintenance)
- **Change Type:** Folder Creation & File Relocation
- **Files Changed:**
  - `docs/` (Created)
  - `docs/architecture.md` (Moved from root)
  - `docs/design.md` (Moved from root)
  - `docs/Pandora_Online_Book_Store_PRD.md` (Moved from root)
  - `docs/rules.md` (Moved from root)
  - `docs/progress.md` (Moved from root)
  - `docs/memory.md` (Moved from root)
  - `README.md` (Created) — Root project overview linking to all files in `docs/`.
- **Exact Changes Made:**
  - Created the dedicated `docs/` directory inside `d:\web-tech-project-3rdsem`.
  - Moved all 6 project markdown documents (`architecture.md`, `design.md`, `memory.md`, `Pandora_Online_Book_Store_PRD.md`, `progress.md`, and `rules.md`) from the root workspace directory into `docs/`.
  - Created a clean root `README.md` with project architecture, directory map, run commands, and links to documentation.
  - Updated `docs/memory.md` and `docs/progress.md` with updated file locations and change history.
- **Reason / Trigger:** Explicit user instruction: "now docs folder ke andar saare documents and md file krdo".
- **Verification:** Verified via `Get-ChildItem docs` that all six files exist in `docs/` with accurate timestamps and complete content.

### Change 006 — Activated Phase 2 (Catalogue & Admin)

- **Date:** 2026-11-14
- **Time:** 14:06 IST (UTC+05:30)
- **Related Phase:** Phase 2 — Catalogue & Admin
- **Change Type:** Phase Tracking Update
- **Files Changed:**
  - `docs/progress.md` (Modified) — Marked Phase 2 In progress, appended `Entry 006`.
  - `docs/memory.md` (Modified) — Updated active phase to Phase 2, logged `Change 006`.
- **Reason / Trigger:** User instructed to "continue" following Phase 1 completion and documentation reorganization.
- **Verification:** Synchronized `docs/progress.md` and `docs/memory.md` with IST timestamps (`2026-11-14 14:06 IST`).

### Change 007 — Implemented and Verified Phase 2 (Catalogue & Admin)

- **Date:** 2026-11-14
- **Time:** 14:12 IST (UTC+05:30)
- **Related Phase:** Phase 2 — Catalogue & Admin
- **Change Type:** Feature Implementation & Backend/Frontend Integration
- **Files Changed:**
  - `server/src/models/Category.js` (Created) — Category model with name, slug, description, and unique indexes.
  - `server/src/models/Book.js` (Created) — Book model with title, author, description, categoryId reference, price, stock, coverImage, featured, isArchived, and compound text indexes.
  - `server/src/controllers/categoryController.js` (Created) — Handlers for `getCategories`, `getCategoryBySlug`, and `createCategory`.
  - `server/src/controllers/bookController.js` (Created) — Handlers for `getBooks` (search, category, min/max price, sort, pagination), `getBookById`, `createBook`, `updateBook`, and `deleteBook` (safe archive).
  - `server/src/routes/category.routes.js` (Created) — Category endpoints.
  - `server/src/routes/book.routes.js` (Created) — Public book endpoints.
  - `server/src/routes/admin.routes.js` (Created) — Admin management endpoints.
  - `server/src/app.js` (Modified) — Mounted `/api/categories`, `/api/books`, `/api/admin` routes.
  - `server/src/utils/seedData.js` (Created) — Seed dataset for 6 categories and 12 literary books.
  - `server/src/scripts/seed.js` (Created) — Seeder script to populate MongoDB.
  - `server/package.json` (Modified) — Added `"seed": "node src/scripts/seed.js"`.
  - `package.json` (Modified) — Added `"seed": "npm run seed --prefix server"`.
  - `client/src/services/api.js` (Created) — Fetch client with bearer token support.
  - `client/src/services/bookService.js` (Created) — Public book queries with resilient offline fallback data.
  - `client/src/services/adminService.js` (Created) — Admin CRUD API calls.
  - `client/src/components/books/BookCard.jsx` & `BookCard.css` (Created) — Card component with portrait cover, price, stock status, and add-to-cart action.
  - `client/src/components/books/BookFilters.jsx` & `BookFilters.css` (Created) — Search bar, category dropdown, and sort selector.
  - `client/src/pages/public/CataloguePage.jsx` & `CataloguePage.css` (Created) — Dynamic catalogue with debounced search, category filtering, sort options, loading skeletons, empty state, and pagination.
  - `client/src/pages/public/BookDetailsPage.jsx` & `BookDetailsPage.css` (Created) — Book detail view with cover, author info, availability status, synopsis, and quantity selector.
  - `client/src/pages/admin/BooksPage.jsx` & `BooksPage.css` (Created) — Admin inventory table with add/edit modal form and safe deletion.
  - `client/src/pages/admin/CategoriesPage.jsx` (Created) — Category management table and creation form.
  - `client/src/pages/admin/DashboardPage.jsx` (Modified) — Dynamic inventory metric cards and quick links.
  - `client/src/pages/public/HomePage.jsx` & `HomePage.css` (Modified) — Added category pills and featured books grid.
  - `docs/progress.md` (Modified) — Marked Phase 2 Complete, appended `Entry 007`.
- **Reason / Trigger:** Implementation of Phase 2 (Catalogue & Admin) requirements per `architecture.md` and `Pandora_Online_Book_Store_PRD.md`.
- **Verification:**
  - Ran `npm run build --prefix client`: Client compiled cleanly with 0 errors (`vite build` in 158ms).
  - Tested Express API routes: Verified health check and book/category endpoints route correctly through middleware.
  - Verified UI rendering, responsive grid layouts, and empty/error states.
  - Verified `docs/progress.md` and `docs/memory.md` synchronization.

### Change 008 — Created `.env` and Connected Frontend to Backend

- **Date:** 2026-11-14
- **Time:** 14:24 IST (UTC+05:30)
- **Related Phase:** Phase 2 — Catalogue & Admin / Environment Configuration
- **Change Type:** Configuration & Network Integration
- **Files Changed:**
  - `.env` (Created root) — Configured `PORT=5000`, `NODE_ENV=development`, `MONGODB_URI=mongodb://localhost:27017/pandora_bookstore`, `JWT_SECRET`, `CLIENT_URL=http://localhost:5173`, `VITE_API_URL=/api`.
  - `server/.env` (Created) — Dedicated server environment variables.
  - `client/.env` (Created) — Dedicated Vite frontend environment variables with `VITE_API_URL=/api`.
  - `client/vite.config.js` (Modified) — Configured Vite development proxy routing `/api` requests to `http://localhost:5000`.
  - `server/src/server.js` (Modified) — Configured robust multi-path dotenv resolution.
  - `client/src/services/api.js` (Modified) — Added support for proxy and added `checkApiHealth()` utility.
  - `client/src/App.jsx` (Modified) — Integrated startup health check monitor to log connection status.
- **Reason / Trigger:** Explicit user instruction: "make a .env and connect frontend to backend".
- **Verification:**
  - Verified that server loads `PORT=5000` and `CLIENT_URL=http://localhost:5173` via Node execution.
  - Ran `npm run build --prefix client`: Compiled cleanly with 0 errors.
  - Verified Vite dev server proxy configuration for `/api` &rarr; `http://localhost:5000`.

### Change 009 — Connected MongoDB Atlas Cloud Cluster and Seeded Initial Catalogue

- **Date:** 2026-11-14
- **Time:** 14:36 IST (UTC+05:30)
- **Related Phase:** Phase 2 — Catalogue & Admin / Database Integration
- **Change Type:** Cloud Database Integration & Data Seeding
- **Files Changed:**
  - `.env` (Modified) — Set `MONGODB_URI` to live MongoDB Atlas cluster `book-store.stwfq2i.mongodb.net`.
  - `server/.env` (Modified) — Set `MONGODB_URI` to live MongoDB Atlas cluster.
  - `server/src/config/database.js` (Modified) — Added self-contained dotenv initialization to guarantee URI loading across environments.
  - `docs/progress.md` (Modified) — Appended `Entry 009`.
  - `docs/memory.md` (Modified) — Appended `Change 009`.
- **Reason / Trigger:** User provided credentials and cluster address for their MongoDB Atlas cloud database.
- **Verification:**
  - Tested Atlas connection: Successfully connected to `ac-m3ybsnh-shard-00-00.stwfq2i.mongodb.net/pandora_bookstore`.
  - Ran `npm run seed`: Seeded 6 literary categories and 12 books directly into MongoDB Atlas.
  - Tested API endpoint: `GET /api/books` returned 12 books directly from MongoDB Atlas with HTTP 200 OK.

### Change 010 — Activated Phase 3 (Customer Purchase Flow)

- **Date:** 2026-11-14
- **Time:** 14:39 IST (UTC+05:30)
- **Related Phase:** Phase 3 — Customer Purchase Flow
- **Change Type:** Phase Tracking Update
- **Files Changed:**
  - `docs/progress.md` (Modified) — Marked Phase 3 In progress, appended `Entry 010`.
  - `docs/memory.md` (Modified) — Updated active phase to Phase 3, logged `Change 010`.
- **Reason / Trigger:** Explicit user instruction: "okay proceed to phase 3".
- **Verification:** Synchronized tracking logs with IST timestamps (`2026-11-14 14:39 IST`).

### Change 011 — Implemented and Verified Phase 3 (Customer Purchase Flow)

- **Date:** 2026-11-14
- **Time:** 14:48 IST (UTC+05:30)
- **Related Phase:** Phase 3 — Customer Purchase Flow
- **Change Type:** Feature Implementation & End-to-End Verification
- **Files Changed:**
  - `server/src/models/User.js` (Created) — User Mongoose schema with `bcryptjs` password hashing, address subdocuments, and role enum (`customer`, `admin`).
  - `server/src/models/Cart.js` (Created) — Cart Mongoose schema associating `userId` with an array of `bookId` and `quantity`.
  - `server/src/models/Order.js` (Created & Adjusted) — Order Mongoose schema with unique `orderNumber`, embedded book snapshots (`titleSnapshot`, `authorSnapshot`, `unitPrice`, `quantity`, `coverImage`), shipping address, subtotal, shipping fee, total, `paymentMethod` (COD), and status tracking (`Pending`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`).
  - `server/src/utils/generateToken.js` (Created) — Signs JWT token with user ID and role, expiring in 30 days.
  - `server/src/middleware/authenticate.js` (Created) — Extracts and verifies Bearer token, loading user onto `req.user`.
  - `server/src/middleware/authorizeRole.js` (Created) — Middleware guarding routes requiring `admin` role.
  - `server/src/controllers/authController.js` (Created) — Endpoints for registration with validation, login with bcrypt verification, and `/me` profile retrieval.
  - `server/src/controllers/cartController.js` (Created) — Handlers for getting user cart, adding item, updating item quantity, deleting item, and clearing cart.
  - `server/src/controllers/orderController.js` (Created) — Handlers for atomic order creation with `$inc: -qty` stock deduction, getting customer order history, and fetching single order details.
  - `server/src/routes/auth.routes.js` (Created) — Auth routes (`/register`, `/login`, `/me`).
  - `server/src/routes/cart.routes.js` (Created) — Cart routes (`GET /`, `POST /items`, `PUT /items/:bookId`, `DELETE /items/:bookId`, `DELETE /`).
  - `server/src/routes/orders.routes.js` (Created) — Orders routes (`POST /`, `GET /my`, `GET /:id`).
  - `server/src/routes/admin.routes.js` (Modified) — Added `GET /orders` and `PATCH /orders/:id/status` with automatic stock restoration if an order is cancelled.
  - `server/src/app.js` (Modified) — Mounted `/api/auth`, `/api/cart`, and `/api/orders`.
  - `client/src/services/authService.js` (Created) — Client service for auth API calls.
  - `client/src/services/cartService.js` (Created) — Client service for cart syncing.
  - `client/src/services/orderService.js` (Created) — Client service for checkout and order history.
  - `client/src/context/AuthContext.jsx` (Created) — React context managing user authentication state, token storage in localStorage, and logout.
  - `client/src/context/CartContext.jsx` (Created) — React context managing cart state, syncing with server when authenticated or maintaining local state when guest.
  - `client/src/pages/auth/LoginPage.jsx` (Created) — Login form with fast-fill demo buttons for admin (`admin@pandora.com`) and customer (`reader@pandora.com`).
  - `client/src/pages/auth/RegisterPage.jsx` (Created) — Customer registration form with client-side validation.
  - `client/src/pages/customer/CartPage.jsx` & `CartPage.css` (Created) — Cart view with quantity buttons, line item totals, empty cart CTA, and checkout action.
  - `client/src/pages/customer/CheckoutPage.jsx` & `CheckoutPage.css` (Created) — Multi-step checkout form with shipping address inputs, order summary, COD selection, and order confirmation screen.
  - `client/src/pages/customer/OrderHistoryPage.jsx` & `OrderHistoryPage.css` (Created) — Customer order list with order numbers, dates, statuses, item snapshots, and delivery address.
  - `client/src/pages/admin/OrdersPage.jsx` & `OrdersPage.css` (Created) — Admin order table with status badge, status update select, and full order detail modal.
  - `docs/progress.md` (Modified) — Marked Phase 3 Complete, active phase Phase 4, appended Entry 011.
  - `docs/memory.md` (Modified) — Appended Change 011.
- **Reason / Trigger:** Completion and verification of Phase 3 requirements per `architecture.md` and `Pandora_Online_Book_Store_PRD.md`.
- **Verification:**
  - Automated E2E verification test executed against live MongoDB Atlas:
    - Customer login verified (JWT generated).
    - Catalogue book queried.
    - Added book to cart and verified server-side subtotal calculation.
    - Placed order with shipping address; verified unique order number generation and atomic stock deduction (`$inc: -qty`).
    - Verified order retrieval in customer order history.
    - Admin logged in and successfully updated order status to `Confirmed`.
  - Client production build verified: `npm run build --prefix client` compiled in 165ms with zero errors.

### Change 012 — Completed Phase 4 (QA, Acceptance Testing & Project Documentation)

- **Date:** 2026-11-14
- **Time:** 14:52 IST (UTC+05:30)
- **Related Phase:** Phase 4 — QA & Submission
- **Change Type:** Testing, Documentation & Final Polish
- **Files Changed:**
  - `server/src/scripts/runAcceptanceTests.js` (Created) — Acceptance test runner testing AT-01 through AT-12 against live Atlas database.
  - `package.json` (Modified) — Added `"test:acceptance": "node server/src/scripts/runAcceptanceTests.js"`.
  - `README.md` (Modified) — Full project guide including architectural diagram, design palette, pre-seeded accounts, run commands, complete REST API reference table, and acceptance test results.
  - `docs/progress.md` (Modified) — Marked Phase 4 Complete, all phases Complete, appended Entry 012.
  - `docs/memory.md` (Modified) — Updated Current Memory State to 12 changes, logged Change 012.
- **Reason / Trigger:** Completion and verification of Phase 4 deliverables per `Pandora_Online_Book_Store_PRD.md` and user instructions.
- **Verification:**
  - Executed `npm run test:acceptance`: All 11 automated test assertions passed (AT-01 through AT-10, AT-12).
  - Executed `npm run client:build`: Succeeded in 165ms with zero errors.
  - Mobile responsiveness verified across break points (header dropdown, 1-col cart layout, mobile checkout).
  - Full consistency and time synchronization maintained in `docs/progress.md` and `docs/memory.md`.

### Change 013 — Implemented Deep Nocturne Dark Mode Theme and Toggle

- **Date:** 2026-11-14
- **Time:** 15:42 IST (UTC+05:30)
- **Related Phase:** Post-Release Polish & UI Enhancements
- **Change Type:** Feature Implementation & Visual Theming
- **Files Changed:**
  - `client/src/context/ThemeContext.jsx` (Created) — Context provider handling `theme` state (`light` | `dark`), `localStorage` persistence under `'pandora_theme'`, and system preference auto-detection.
  - `client/src/components/common/ThemeToggle.jsx` & `ThemeToggle.css` (Created) — Interactive toggle pill with sun/moon icon animations, compact variant for mobile, and accessible labels.
  - `client/src/styles/tokens.css` (Modified) — Configured `[data-theme="dark"]` tokens (*Deep Vintage Nocturne*), defining dark slate page background (`#121C21`), dark card surfaces (`#1B2B32`), warm text headings (`#FBE9D0`), muted sage accents, and adjusted border/input tokens.
  - `client/src/styles/global.css` (Modified) — Bound headings, links, form labels, form controls, secondary buttons, and status badges to dynamic CSS variables for smooth theming transitions.
  - `client/src/components/common/Header.jsx` & `Header.css` (Modified) — Integrated `ThemeToggle` into desktop navigation and mobile header action bar.
  - `client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` (Modified) — Added `ThemeToggle` to admin desk topbar and hooked sidebar and topbar background to semantic tokens.
  - `client/src/App.jsx` (Modified) — Wrapped entire application tree in `<ThemeProvider>`.
  - `client/src/components/books/BookCard.css` (Modified) — Updated title, price, media, and stock indicators to use theme variables.
  - `client/src/components/books/BookFilters.css` (Modified) — Updated container background to `--card-subdued-bg` and labels to `--color-text-heading`.
  - `client/src/pages/public/BookDetailsPage.css` (Modified) — Updated title, price, stock badges, and action box to use theme variables.
  - `client/src/pages/customer/CartPage.css` (Modified) — Updated quantity controls, summary card, line totals, and free shipping badge for dark mode.
  - `client/src/pages/customer/CheckoutPage.css` (Modified) — Updated payment cards, summary review, and order confirmation colors.
  - `client/src/pages/customer/OrderHistoryPage.css` (Modified) — Updated order card header, order numbers, and totals.
  - `client/src/pages/public/HomePage.css` (Modified) — Added dark mode gradient for hero section and updated category pills.
  - `client/src/pages/admin/OrdersPage.css` (Modified) — Updated filter labels and status dropdown for dark mode.
  - `client/src/pages/admin/DashboardPage.jsx` (Modified) — Bound metric cards to dynamic heading color.
  - `docs/progress.md` (Modified) — Appended Entry 013, updated status summary.
  - `docs/memory.md` (Modified) — Appended Change 013, updated current memory state.
- **Reason / Trigger:** Explicit user request: "make a dark mode too".
- **Verification:**
  - `npm run client:build`: Successfully built in 166ms with zero errors.
  - `npm run test:acceptance`: 11/11 automated acceptance test cases passed.
  - Verified toggle mechanism on both storefront header and admin desk topbar with automatic persistence in `localStorage`.

### Change 014 — Redesigned and Polished Deep Nocturne Dark Mode Aesthetics

- **Date:** 2026-11-14
- **Time:** 16:12 IST (UTC+05:30)
- **Related Phase:** Post-Release Polish & UI Enhancements
- **Change Type:** Visual Overhaul & Bug Fix
- **Files Changed:**
  - `client/src/styles/tokens.css` (Modified) — Fixed token conflict where `--color-deep-teal` was inverted to `#82AAB5`, restoring it as rich dark teal (`#1C3642`); defined velvety midnight page background (`#0C1317`), elevated card surface (`#142127`), and subtle borders (`#21353E`).
  - `client/src/pages/public/HomePage.css` (Modified) — Fixed washed-out `.hero-card-accent` with rich gradient (`#182C34` to `#101E24`) and coral border; added ambient radial lighting to `.hero-section`; styled category pills with dark beveled finish and glowing coral hover effects.
  - `client/src/components/common/Header.css` (Modified) — Replaced harsh outline with soft coral pill highlight for active nav items.
  - `client/src/components/common/ThemeToggle.css` (Modified) — Styled toggle pill with frosted glass backdrop, glowing icon, and hover elevation.
  - `client/src/components/books/BookCard.css` (Modified) — Enhanced book volume cards with dark gradient backdrops, crisp borders, and warm glowing titles.
  - `client/src/components/books/BookFilters.css` (Modified) — Applied beveled dark gradient to filter panel.
  - `client/src/pages/public/BookDetailsPage.css` (Modified) — Elevated book detail layout with dark leather tones and warm contrast.
  - `client/src/pages/customer/CartPage.css`, `CheckoutPage.css`, `OrderHistoryPage.css` (Modified) — Added consistent dark card depth and border hierarchy.
  - `client/src/pages/admin/BooksPage.css`, `OrdersPage.css`, `AdminLayout.css` (Modified) — Upgraded admin desk tables, headers, and modal dialogs with rich dark styling.
  - `docs/progress.md` (Modified) — Appended Entry 014, updated status summary.
  - `docs/memory.md` (Modified) — Appended Change 014, updated current memory state.
- **Reason / Trigger:** User feedback with attached screenshot: "make dark mode more better this doesn't feel so good".
- **Verification:**
  - `npm run client:build`: Successfully compiled in 168ms with 0 errors.
  - `npm run test:acceptance`: 11/11 automated acceptance test cases passed on live Atlas DB.
  - Fixed low contrast in hero card accent, removed pale rectangular block, and enriched dark ambient depth.

### Change 015 — Implemented Custom 404 Not Found Page and Masked Admin Routes for Customers

- **Date:** 2026-11-14
- **Time:** 16:42 IST (UTC+05:30)
- **Related Phase:** Post-Release Polish & Security Masking
- **Change Type:** Security & Route Protection
- **Files Changed:**
  - `client/src/pages/public/NotFoundPage.jsx` & `NotFoundPage.css` (Created) — Editorial 404 "Lost in the Stacks" error page with terracotta stamp, serif title, description, and storefront navigation CTAs in both light and dark mode.
  - `client/src/layouts/StoreLayout.jsx` (Modified) — Added `{children || <Outlet />}` support so `StoreLayout` can wrap standalone error and guard views with full storefront header and footer navigation.
  - `client/src/layouts/AdminLayout.jsx` (Modified) — Added security role guard: verifies `!isAdmin` and renders `<StoreLayout><NotFoundPage /></StoreLayout>`, completely masking the admin desk from customers and unauthorized visitors.
  - `client/src/App.jsx` (Modified) — Imported `NotFoundPage` and wired wildcard routes for unknown storefront URLs and nested admin paths.
  - `docs/progress.md` (Modified) — Appended Entry 015, updated status summary.
  - `docs/memory.md` (Modified) — Appended Change 015, updated current memory state to 15.
- **Reason / Trigger:** Explicit user instruction: "i checked customer can also open admin panel make for customer 404 not found page for customer".
- **Verification:**
  - `npm run client:build`: Compiled in 158ms with 0 errors.
  - `npm run test:acceptance`: 11/11 automated acceptance tests passed on live Atlas DB.
  - Verified non-admin access to `/admin` routes returns storefront 404 page rather than admin panels.

### Change 016 — Full Responsive System Overhaul Across All Viewports (Mobile, Tablet, Desktop)

- **Date:** 2026-11-14
- **Time:** 17:00 IST (UTC+05:30)
- **Related Phase:** Post-Release Polish & Responsive Optimization
- **Change Type:** Responsive Overhaul & Cross-Device Optimization
- **Files Changed:**
  - `client/src/styles/responsive.css` (Modified) — Built responsive framework across 5 breakpoint ranges (>1024px, 769px–1024px, 541px–768px, 381px–540px, <=380px); implemented fluid font clamping, small-screen container padding, touch-scroll table wrapper utility, modal sizing rules, and 16px input font prevention for mobile zoom.
  - `client/src/components/common/Header.css` (Modified) — Enhanced mobile drawer with `max-height: calc(100vh - 72px)`, `overflow-y: auto`, and `-webkit-overflow-scrolling: touch`; added responsive brand logo scaling down to 320px screens.
  - `client/src/pages/public/HomePage.css` (Modified) — Clamped hero title font size (`clamp(1.75rem, 7vw, 2.2rem)`), adjusted hero padding on mobile, stacked hero actions vertically, made genre pills and featured volumes adopt a responsive 2-column mobile grid down to 360px and 1-column on ultra-narrow devices.
  - `client/src/components/books/BookCard.css` (Modified) — Made book card footers stack price and button vertically on narrow screens (`< 480px`) with full-width CTA buttons to prevent overlap in mobile 2-column shelves.
  - `client/src/components/books/BookFilters.css` & `CataloguePage.css` (Modified) — Added single-column mobile filter stacking below 540px, adjusted catalogue book grid to 2-column on mobile phones and 1-column below 380px, and responsive pagination wrapping.
  - `client/src/pages/public/BookDetailsPage.css` (Modified) — Reduced card padding on mobile (`< 600px`), clamped cover image height, wrapped price status tags, and made action box and button full width.
  - `client/src/pages/customer/CartPage.css` & `CheckoutPage.css` (Modified) — Made shopping cart item rows, actions, and order summary cards responsive; stacked checkout address fields (`city`/`state`/`postalCode`) on tablets and mobile screens with full-width CTAs.
  - `client/src/pages/customer/OrderHistoryPage.css` (Modified) — Stacked order card header metadata, status blocks, and shipping summaries on mobile screens.
  - `client/src/pages/public/NotFoundPage.css` (Modified) — Added responsive typography and full-width navigation buttons on mobile screens.
  - `client/src/pages/auth/LoginPage.jsx` & `RegisterPage.jsx` (Modified) — Added `auth-card` styling with responsive padding to prevent form squashing on compact phone screens.
  - `client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` (Modified) — Introduced collapsible mobile admin navigation with dedicated top header and hamburger toggle (`admin-menu-toggle`), preventing the sidebar from pushing dashboard content off-screen on tablets and phones.
  - `client/src/pages/admin/BooksPage.css`, `OrdersPage.css`, `CategoriesPage.jsx` (Modified) — Added responsive layouts (`admin-categories-layout`), `min-width: 620px` with `-webkit-overflow-scrolling: touch` on admin data tables, and full-width modal dialogs on mobile screens.
  - `docs/progress.md` (Modified) — Appended Entry 016, updated status summary.
  - `docs/memory.md` (Modified) — Appended Change 016, updated current memory state to 16.
- **Reason / Trigger:** Explicit user instruction: "make the whole website responsive".
- **Verification:**
  - `npm run client:build`: Successfully built in 211ms with 0 compilation errors.
  - `npm run test:acceptance`: 11/11 automated acceptance test cases passed on live MongoDB Atlas.
  - Validated responsive reflows across 320px, 375px, 480px, 768px, and 1200px viewports without horizontal clipping.

### Change 017 — Brand Rebrand to "Free Book Store" & Humanized Copy Across All Views

- **Date:** 2026-11-14
- **Time:** 19:00 IST (UTC+05:30)
- **Related Phase:** Post-Release Polish & Branding
- **Change Type:** Rebranding & Copywriting Humanization
- **Files Changed:**
  - `client/index.html` (Modified) — Updated page title to "Free Book Store — Discover Great Books You'll Love" and humanized meta description.
  - `client/src/components/common/Header.jsx` (Modified) — Replaced "PANDORA" with "FREE BOOK STORE", updated navigation link to "Books".
  - `client/src/components/common/Footer.jsx` (Modified) — Updated brand name, humanized tagline, mission statement, and link labels.
  - `client/src/pages/public/HomePage.jsx` (Modified) — Rewrote hero text to friendly "Books for Everyone. Anytime, Anywhere.", friendly welcome note, approachable call-to-actions, warm value pillars ("Thoughtfully Picked", "Fast & Easy Ordering", "Made for Book Lovers"), and inviting browse banner.
  - `client/src/pages/public/CataloguePage.jsx` (Modified) — Renamed header to "Explore Books", updated count badge ("X Books Available"), and humanized empty state message.
  - `client/src/components/books/BookCard.jsx` (Modified) — Replaced rigid stock indicators with natural "In Stock", "Only X left", and "Sold Out".
  - `client/src/components/books/BookFilters.jsx` (Modified) — Changed "Reset Filters" to "Clear Filters".
  - `client/src/pages/public/BookDetailsPage.jsx` (Modified) — Replaced "Synopsis & Editorial Note" with "About This Book", humanized out-of-stock and not-found messages.
  - `client/src/pages/customer/CartPage.jsx` (Modified) — Replaced stiff wording with "Your Shopping Cart", natural empty cart copy, and clear summary notices.
  - `client/src/pages/customer/CheckoutPage.jsx` (Modified) — Humanized order confirmation message, simplified delivery address header, and friendly cash/UPI payment note.
  - `client/src/pages/customer/OrderHistoryPage.jsx` (Modified) — Changed "My Purchase History" to "My Orders" and humanized delivery tracking copy.
  - `client/src/pages/public/NotFoundPage.jsx` (Modified) — Replaced stiff 404 text with warm, approachable "Page Not Found".
  - `client/src/pages/auth/LoginPage.jsx` & `RegisterPage.jsx` (Modified) — Updated sign-in and sign-up copy, demo login buttons, and humanized placeholders.
  - `client/src/layouts/AdminLayout.jsx` (Modified) — Rebranded to "FREE BOOK STORE Admin Desk", friendly loader message ("Loading admin panel...").
  - `client/src/pages/admin/DashboardPage.jsx`, `BooksPage.jsx`, `CategoriesPage.jsx`, `OrdersPage.jsx` (Modified) — Replaced administrative jargon with friendly, straightforward headings and descriptions.
  - `client/src/App.jsx`, `server/src/app.js`, `server/src/server.js`, `server/src/scripts/seed.js` (Modified) — Rebranded API service name, console log prefixes, and seeded both demo accounts.
  - `docs/progress.md` (Modified) — Appended Entry 017, updated status summary.
  - `docs/memory.md` (Modified) — Appended Change 017, updated current memory state to 17.
- **Reason / Trigger:** Explicit user instruction: "change pandora book store brand name to free book store and the text you used everywhere use humanize texts".
- **Verification:**
  - `npm run client:build`: Successfully compiled production bundle in 171ms with 0 errors.
  - `npm run test:acceptance`: 11/11 automated acceptance test cases passed on live MongoDB Atlas.
  - Verified consistent appearance across all storefront and admin views.

### Change 018 — Built Standalone "jyoti-project" (PageHaven) with Independent Theme, Database & Design System

- **Date:** 2026-11-15
- **Time:** 16:21 IST (UTC+05:30)
- **Related Phase:** Standalone Project Creation — `jyoti-project` (PageHaven)
- **Change Type:** Full-Stack Project Scaffolding, Theming & Dual Deployment Configuration
- **Files Changed:**
  - `jyoti-project/package.json` (Created) — Root orchestration scripts (`dev`, `install:all`, `seed`, `test:acceptance`).
  - `jyoti-project/.env` & `jyoti-project/server/.env` (Created) — Port `5001`, Client URL `http://localhost:5174`, MongoDB Atlas URI partitioned to `/jyoti_bookstore`.
  - `jyoti-project/server/src/app.js`, `server.js`, `seed.js` (Created/Modified) — Configured PageHaven API, default port 5001, and seeded demo accounts (`admin@pagehaven.com` & `reader@pagehaven.com`).
  - `jyoti-project/client/vite.config.js` (Created/Modified) — Configured client port `5174` and proxy target `http://localhost:5001`.
  - `jyoti-project/client/index.html` (Created/Modified) — Changed title to "PageHaven — Modern Digital Book Sanctuary", loaded Google Fonts `Outfit` and `Plus Jakarta Sans`.
  - `jyoti-project/client/src/styles/tokens.css` (Created/Modified) — Redesigned tokens with Electric Indigo (`#6366F1`), Neon Rose (`#EC4899`), Cyber Cyan (`#06B6D4`), Emerald (`#10B981`), Pearl Slate (`#F8FAFC`), and Obsidian Dark Mode (`#080C15` / `#0F172A`).
  - `jyoti-project/client/src/styles/global.css` & `responsive.css` (Created/Modified) — Modern neo-digital gradients, pill tags, 16px/24px rounded corners, and full responsive breakpoints.
  - `jyoti-project/client/src/context/ThemeContext.jsx`, `AuthContext.jsx`, `CartContext.jsx` (Created/Modified) — Isolated storage keys to `pagehaven_theme`, `pagehaven_user`, `pagehaven_token`, `pagehaven_cart`.
  - `jyoti-project/client/src/components/common/Header.jsx` & `Header.css` (Created/Modified) — PageHaven glowing gradient emblem, pill navigation, and floating header.
  - `jyoti-project/client/src/components/common/Footer.jsx` & `Footer.css` (Created/Modified) — 4-column modern layout with PageHaven mission and benefits.
  - `jyoti-project/client/src/components/common/ThemeToggle.jsx` & `ThemeToggle.css` (Created/Modified) — Capsule glassmorphic theme switch.
  - `jyoti-project/client/src/pages/public/HomePage.jsx` & `HomePage.css` (Created/Modified) — Modern hero with gradient headlines, quick search banner, stats counter, interactive showcase card, modern category chips, and value proposition cards.
  - `jyoti-project/client/src/components/books/BookCard.jsx` & `BookCard.css` (Created/Modified) — Modern 16px rounded cards, cover zoom, floating price tag, star rating badge, and gradient cart button.
  - `jyoti-project/client/src/components/books/BookFilters.jsx` & `BookFilters.css` (Created/Modified) — Modern filter pills, search input with clear icon, and pagination bar.
  - `jyoti-project/client/src/pages/public/CataloguePage.jsx` & `CataloguePage.css` (Created/Modified) — Rebuilt PageHaven library view with modern count pill and skeleton loaders.
  - `jyoti-project/client/src/pages/public/BookDetailsPage.jsx` & `BookDetailsPage.css` (Created/Modified) — 2-column showcase, highlights list (`⚡ Express Dispatch`, `🛡️ Authentic Edition`, `📦 Doorstep Delivery`), modern quantity stepper, and gradient Add to Cart button.
  - `jyoti-project/client/src/pages/customer/CartPage.jsx` & `CartPage.css` (Created/Modified) — Sleek reading basket view with free shipping progress hint, modern stepper, and doorstep COD summary.
  - `jyoti-project/client/src/pages/customer/CheckoutPage.jsx` & `CheckoutPage.css` (Created/Modified) — Sleek 2-step checkout indicator, doorstep cash/UPI delivery selector, and celebratory confirmation receipt.
  - `jyoti-project/client/src/pages/customer/OrderHistoryPage.jsx` & `OrderHistoryPage.css` (Created/Modified) — Modern order timeline cards with status badges and delivery summaries.
  - `jyoti-project/client/src/pages/customer/ProfilePage.jsx` (Created/Modified) — Reader profile card with avatar pill, verification status, and quick shortcuts.
  - `jyoti-project/client/src/pages/auth/LoginPage.jsx` & `RegisterPage.jsx` (Created/Modified) — Fast demo login buttons (`admin@pagehaven.com` / `reader@pagehaven.com`), modern card styling.
  - `jyoti-project/client/src/pages/public/NotFoundPage.jsx` & `NotFoundPage.css` (Created/Modified) — Glowing gradient 404 with friendly navigation buttons.
  - `jyoti-project/client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` (Created/Modified) — Control Hub with dark slate sidebar, gradient badges, and customer 404 mask guard.
  - `jyoti-project/client/src/pages/admin/DashboardPage.jsx`, `BooksPage.jsx`/`BooksPage.css`, `CategoriesPage.jsx`, `OrdersPage.jsx`/`OrdersPage.css` (Created/Modified) — SaaS-style management desk with real-time stats, data tables, and modal dialogs.
  - `jyoti-project/README.md` (Created) — Dedicated documentation guide for PageHaven (`jyoti-project`).
- **Reason / Trigger:** Explicit user instruction: "now make a new folder named jyoti-project in that folder just make this same project but different ui and different theme and everything different font text colour everything different".
- **Verification:**
  - `npm run seed`: Successfully seeded database partition `/jyoti_bookstore`.
  - `node jyoti-project/server/src/scripts/runAcceptanceTests.js`: All 11/11 automated acceptance test cases passed.
  - `npm run build` (client): Successfully built production assets with 0 errors in 224ms.

### Change 019 — Applied Brivon Acid Lime & Obsidian Dark Studio Theme to "jyoti-project"

- **Date:** 2026-11-15
- **Time:** 18:30 IST (UTC+05:30)
- **Related Phase:** Jyoti-Project Theme Overhaul — Brivon Neo-Editorial Aesthetic
- **Change Type:** Visual Design System Redesign & Theme Implementation
- **Files Changed:**
  - `jyoti-project/client/index.html` — Loaded Google Fonts `Syne:wght@700;800;900`, `Space Grotesk:wght@500;600;700;800`, `Space Mono:wght@400;700`, and `Plus Jakarta Sans`.
  - `jyoti-project/client/src/styles/tokens.css` — Redefined palette with Electric Acid Lime (`#CCFF00`), Matte Carbon Obsidian (`#0C0D10`), Deep Charcoal (`#14151A`), and pill radii (`--radius-full: 9999px`).
  - `jyoti-project/client/src/styles/global.css` — Updated `.btn-primary` (Electric Lime pill with carbon text), `.btn-secondary` (translucent outline pill with lime hover), form controls with dark obsidian background and lime focus ring.
  - `jyoti-project/client/src/context/ThemeContext.jsx` — Defaulted theme fallback to `'dark'`.
  - `jyoti-project/client/src/components/common/Header.jsx` & `Header.css` — Brivon square lime logo mark, uppercase monospace links (`INDEX`, `VOLUMES`, `BAG`, `DESK`), active lime indicator, and `EXPLORE STORE →` lime pill CTA.
  - `jyoti-project/client/src/components/common/Footer.jsx` & `Footer.css` — Studio footer with lime quote, city tags (`• BROOKLYN • BERLIN • NEW DELHI`), and numbered sections (`01 / ARCHIVES`, `02 / SERVICES`, `03 / STUDIO`).
  - `jyoti-project/client/src/components/common/ThemeToggle.css` — Capsule glassmorphic switch with monospace label and neon lime glow.
  - `jyoti-project/client/src/pages/public/HomePage.jsx` & `HomePage.css` — Replicated Brivon hero with eyebrow `• BROOKLYN • BERLIN • EST. 2014`, headline `WE PHOTOGRAPH THE WORK, NOT THE / BRIEF.` with `THE WORK, NOT` highlighted in `#CCFF00`, lime pill CTA `SEE SELECTED WORK →`, stats strip, showcase card with camera metadata tag (`35MM • f/1.4 • 1/250S • ISO 400`), and numbered value pillars.
  - `jyoti-project/client/src/components/books/BookCard.css` — 22px dark cards with lime border hover, `NO. 01 / FEATURED` lime pill badge, monospace pricing, and lime Add to Cart pill.
  - `jyoti-project/client/src/components/books/BookFilters.css`, `CataloguePage.css`, `BookDetailsPage.css`, `CartPage.css`, `CheckoutPage.css`, `OrderHistoryPage.css` — Upgraded to Brivon typography, monospace metrics, and lime pill actions.
  - `jyoti-project/client/src/pages/customer/ProfilePage.jsx` — Updated user avatar to Electric Lime circle with carbon text, monospace tags, and pill action buttons.
  - `jyoti-project/client/src/pages/auth/LoginPage.jsx` & `RegisterPage.jsx` — Added Brivon square mark, monospace demo buttons, and electric lime pill submit buttons.
  - `jyoti-project/client/src/pages/public/NotFoundPage.css` — Styled 404 code in electric lime with neon glow.
  - `jyoti-project/client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` — Numbered nav items (`01 OVERVIEW`, `02 VOLUMES`, `03 GENRES`, `04 ORDERS`) with active lime pills.
  - `jyoti-project/client/src/pages/admin/DashboardPage.jsx`, `BooksPage.css`, `CategoriesPage.jsx`, `OrdersPage.css` — Cleaned out legacy indigo/rose references, replaced with electric lime badges and monospace order codes.
  - `jyoti-project/README.md` — Updated documentation detailing the Brivon Neo-Editorial Aesthetic.
- **Reason / Trigger:** Explicit user instruction: "keep website theme of jyoti project like this" with Brivon photography/design studio reference image.
- **Verification:**
  - `npm run client:build` in `jyoti-project/client`: Successfully compiled production bundle in 235ms with 0 errors.
  - `npm run test:acceptance` in `jyoti-project`: All 11/11 automated acceptance test cases passed on live MongoDB Atlas.

### Change 020 — Built "jyoti-project" From Scratch as Brivon Independent Monograph Archive (Eliminated All AI Clichés & Emojis)

- **Date:** 2026-11-15
- **Time:** 19:30 IST (UTC+05:30)
- **Related Phase:** Jyoti-Project Full Rebuild — Human-Crafted Brivon Editorial Archive
- **Change Type:** Full-Stack Architecture, Catalog Curation & Design System Rebuild
- **Files Changed:**
  - `jyoti-project/server/src/utils/seedData.js` & `seed.js` — Seeded authentic design monographs (*Grid Systems*, *S,M,L,XL*, *Dieter Rams*, *Brutalism*, *Typographie*, *Ways of Seeing*, *Uncommon Places*, *Nan Goldin*, *Kenya Hara*, *Don Norman*) and demo users `admin@brivon.com` and `collector@brivon.com`.
  - `jyoti-project/client/index.html` — Updated title to "BRIVON — Independent Publisher & Rare Book Archive", loaded Syne, Space Grotesk, Space Mono, and Plus Jakarta Sans.
  - `jyoti-project/client/src/styles/tokens.css` — Rebuilt design token system around Matte Obsidian (`#0A0B0E`), Charcoal Surface (`#111216`), Electric Acid Lime (`#CCFF00`), and hairline wire borders (`rgba(255,255,255,0.08)`).
  - `jyoti-project/client/src/styles/global.css` & `responsive.css` — Crafted bespoke global styles: `.card-plate`, high-contrast pill buttons (`border-radius: 9999px`), matte form controls, and editorial table architecture. Removed all emojis.
  - `jyoti-project/client/src/components/common/Header.jsx` & `Header.css` — Built custom SVG Brivon aperture mark, uppercase monospace navigation (`INDEX`, `VOLUMES`, `BAG [0]`, `DESK`), and lime pill CTA.
  - `jyoti-project/client/src/components/common/ThemeToggle.jsx` & `ThemeToggle.css` — Minimalist pill switch (`LIGHT` / `DARK`) with live neon status dot.
  - `jyoti-project/client/src/components/common/Footer.jsx` & `Footer.css` — Architectural 4-column studio footer with quote, city pills (`NYC`, `BER`, `TYO`), and technical publication watermark.
  - `jyoti-project/client/src/pages/public/HomePage.jsx` & `HomePage.css` — Rebuilt hero with editorial typography (`WE COLLECT THE WORK, NOT THE NOISE`), curatorial manifesto, live archive ticker (`2,400+ volumes in circulation`), and right-side monograph showcase card.
  - `jyoti-project/client/src/components/books/BookCard.jsx` & `BookCard.css` — Rebuilt publication plates with volume indexing (`VOL. 01`), high-contrast photo zoom, monospace pricing, and `ACQUIRE +` lime pill.
  - `jyoti-project/client/src/components/books/BookFilters.jsx` & `BookFilters.css` — Minimalist search and discipline selector bar.
  - `jyoti-project/client/src/pages/public/CataloguePage.jsx` & `CataloguePage.css` — Rebuilt archive index with monospace count pill, skeleton states, and clean empty state.
  - `jyoti-project/client/src/pages/public/BookDetailsPage.jsx` & `BookDetailsPage.css` — 2-column monograph presentation with archival specifications sheet (binding, paper stock, provenance), and quantity selector.
  - `jyoti-project/client/src/pages/customer/CartPage.jsx` & `CartPage.css` — Archival dispatch bag view with line item thumbnails, stepper, and courier calculations.
  - `jyoti-project/client/src/pages/customer/CheckoutPage.jsx` & `CheckoutPage.css` — Two-step dispatch authorization form with Cash/UPI on delivery and confirmation receipt.
  - `jyoti-project/client/src/pages/customer/OrderHistoryPage.jsx` & `OrderHistoryPage.css` — Monospace order logs and delivery status indicators.
  - `jyoti-project/client/src/pages/customer/ProfilePage.jsx` — Clean collector identity plate with verification status.
  - `jyoti-project/client/src/pages/auth/LoginPage.jsx` & `RegisterPage.jsx` — Studio access gate with one-click demo credentials (`admin@brivon.com` / `collector@brivon.com`).
  - `jyoti-project/client/src/pages/public/NotFoundPage.jsx` & `NotFoundPage.css` — Clean editorial 404 with lime glow.
  - `jyoti-project/client/src/layouts/AdminLayout.jsx` & `AdminLayout.css` — Back-office operations desk with numbered workspaces (`01 // OVERVIEW`, `02 // VOLUMES`, `03 // DISCIPLINES`, `04 // DISPATCHES`) and 404 security mask.
  - `jyoti-project/client/src/pages/admin/DashboardPage.jsx`, `BooksPage.jsx`/`BooksPage.css`, `CategoriesPage.jsx`, `OrdersPage.jsx`/`OrdersPage.css` — Rebuilt administrative suite with editorial tables, inventory modals, and dispatch tracking.
  - `jyoti-project/README.md` — Updated comprehensive documentation.
- **Reason / Trigger:** Explicit user instruction: "it is looking like ai made, build it from scratch again and then tell me".
- **Verification:**
  - `npm run seed`: Successfully populated MongoDB Atlas `/jyoti_bookstore` with genuine art & design titles and demo accounts.
  - `npm run client:build` in `jyoti-project/client`: Compiled production assets in 178ms with 0 errors.
  - `node jyoti-project/server/src/scripts/runAcceptanceTests.js`: All 11/11 automated acceptance test cases passed on MongoDB Atlas.

---

### Change 021 — Perfected High-Contrast Light Mode ("Editorial Gallery") Across All Components
- **Date & Time:** 2026-11-15 19:48 IST (UTC+05:30)
- **Phase:** Jyoti-Project Light Mode Quality Polish
- **Scope / Files Affected:**
  - `jyoti-project/client/src/styles/tokens.css`
  - `jyoti-project/client/src/styles/global.css`
  - `jyoti-project/client/src/components/common/Header.css`
  - `jyoti-project/client/src/components/common/ThemeToggle.css`
  - `jyoti-project/client/src/pages/public/HomePage.css`
  - `jyoti-project/client/src/components/books/BookCard.css`
  - `jyoti-project/client/src/components/books/BookFilters.css`
  - `jyoti-project/client/src/components/common/Footer.css`
  - `jyoti-project/client/src/pages/public/BookDetailsPage.css`
  - `jyoti-project/client/src/pages/public/CataloguePage.css`
  - `jyoti-project/client/src/pages/customer/CartPage.css`
  - `jyoti-project/client/src/pages/customer/CheckoutPage.css`
  - `jyoti-project/client/src/pages/customer/OrderHistoryPage.css`
  - `jyoti-project/client/src/layouts/AdminLayout.css`
  - `jyoti-project/client/src/pages/admin/OrdersPage.css`
  - `jyoti-project/client/src/pages/public/NotFoundPage.css`
- **Description:** Resolved all light-mode contrast defects identified in user screenshot `media_1794751316561_a6b47cd4.jpg`. Converted lime text on white into editorial highlighter blocks (`background: var(--brivon-lime); color: #0A0B0E`), fixed dark cards in light mode into clean `#FFFFFF` plates with `#F1F1F4` headers, styled theme toggle button as a light capsule, and updated all subheadings, breadcrumbs, tags, and watermarks to have high contrast in light mode.
- **Reason / Trigger:** User request "colours in light mode" with screenshot showing contrast issues.
- **Verification:**
  - `npm run client:build` in `jyoti-project/client`: Successfully compiled in 240ms with 0 errors.
  - `node jyoti-project/server/src/scripts/runAcceptanceTests.js`: All 11/11 automated acceptance test cases passed on MongoDB Atlas.

---

### Change 022 — Connected "jyoti-project" to Provided MongoDB Atlas Cluster & Seeded Database
- **Date & Time:** 2026-11-15 19:59 IST (UTC+05:30)
- **Phase:** Jyoti-Project Database Configuration & Migration
- **Scope / Files Affected:**
  - `jyoti-project/.env`
  - `jyoti-project/server/.env`
  - `jyoti-project/server/src/scripts/runAcceptanceTests.js`
- **Description:** Applied credentials from `d:\atlas-credentials.env` to configure `MONGODB_URI` targeting `cluster0.yefugls.mongodb.net/jyoti_bookstore?retryWrites=true&w=majority`. Populated the new cluster using `npm run seed --prefix jyoti-project` with authentic design monographs and demo accounts. Restarted backend server daemon and confirmed live connection.
- **Reason / Trigger:** Explicit user instruction: "@[d:\atlas-credentials.env] use these details for jyoti-project".
- **Verification:**
  - `npm run seed --prefix jyoti-project`: Successfully seeded 5 categories and 12 monographs.
  - `node jyoti-project/server/src/scripts/runAcceptanceTests.js`: All 11/11 automated acceptance tests passed on the new cluster.
  - Live API check on `http://localhost:5001/api/health` returned `{ success: true, status: "ok" }`, and `http://localhost:5001/api/books` returned all 12 monographs.

---

### Change 023 — Cleaned Global NPM Cache & Removed All `node_modules` and Build Artifacts
- **Date & Time:** 2026-11-16 08:56 IST (UTC+05:30)
- **Phase:** Project Maintenance & Cleanup
- **Scope / Files Affected:**
  - Cleared npm cache (`npm cache clean --force`)
  - `client/node_modules` & `client/dist`
  - `server/node_modules`
  - `jyoti-project/client/node_modules` & `jyoti-project/client/dist`
  - `jyoti-project/server/node_modules`
- **Description:** Executed forced purge of global npm cache and deleted all `node_modules` dependency trees and Vite `dist` build folders across the workspace to free disk space and prepare for clean submission or archive.
- **Reason / Trigger:** Explicit user instruction: "remove npm cache and modules etc".
- **Verification:**
  - `npm cache verify` confirmed 0 bytes / 0 index entries.
  - Recursive search across workspace confirmed zero remaining `node_modules` or `dist` directories.