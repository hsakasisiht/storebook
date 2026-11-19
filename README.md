# PANDORA — Online Book Store

> **Discover Stories. Collect Worlds.**  
> A full-stack MERN digital bookstore crafted with a warm, editorial *Deep Vintage Mood* visual identity.  
> *Academic Web Technology Project — 3rd Semester*

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Visual Design System](#-visual-design-system)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Pre-Seeded Demo Accounts](#-pre-seeded-demo-accounts)
6. [Getting Started & Installation](#-getting-started--installation)
7. [REST API Documentation](#-rest-api-documentation)
8. [Acceptance Criteria & Verification (AT-01 to AT-12)](#-acceptance-criteria--verification)
9. [Documentation Directory](#-documentation-directory)

---

## 🌟 Project Overview

**Pandora** is a complete, production-ready full-stack online bookstore application developed in the MERN stack (MongoDB, Express.js, ReactJS, Node.js). It bridges literary elegance with robust engineering, featuring:

- **Customer Journey:** Search by title/author, category browsing, live stock tracking, persistent shopping cart, address capture, Cash on Delivery (COD) checkout, and immutable order history with price snapshots.
- **Admin Desk:** Secure inventory management (add/edit books, update stock, safe archive), category taxonomy controls, order lifecycle fulfillment (Pending &rarr; Confirmed &rarr; Shipped &rarr; Delivered &rarr; Cancelled), and real-time dashboard analytics.
- **Data Protection & Reliability:** Atomic stock decrements (`$inc: -qty`) preventing race conditions, server-side price revalidation, cross-user order ownership isolation (AT-07), and automatic stock restoration upon order cancellation.

---

## 🎨 Visual Design System & Dark Mode

Pandora features a dual-theme system rooted in the **Deep Vintage Mood** design philosophy:

| Role | Light Mode (*Warm Vintage*) | Dark Mode (*Deep Nocturne*) | Purpose |
| :--- | :--- | :--- | :--- |
| **Page Canvas** | `#F7F4EE` (Warm Off-White) | `#121C21` (Nocturne Slate) | Main page background |
| **Card Surface** | `#FFFFFF` (Pure Paper) | `#1B2B32` (Deep Teal Surface) | Cards, inputs, table bodies |
| **Primary Structure** | `#244855` (Deep Teal) | `#82AAB5` / `#0E181D` | Navigation, structural framing, headings |
| **Dominant Accent** | `#E64833` (Signal Coral) | `#F0614D` (Vibrant Coral) | Primary buttons, active badges |
| **Warm Anchor** | `#874F41` (Terracotta) | `#B97666` (Warm Clay) | Categories, pricing, accent borders |
| **Muted Support** | `#90AEAD` (Muted Sage) | `#90AEAD` (Muted Sage) | Subheadings, subtle tags, borders |
| **Typography Heading** | `#244855` (Deep Teal) | `#FBE9D0` (Warm Cream) | Serif editorial headlines |

- **Theme Toggle:** Available via a toggle button (☀️ / 🌙) in the storefront navigation bar and the admin desk topbar. Persists user preference across visits in `localStorage` and respects the OS `prefers-color-scheme`.
- **Typography:** Serif headlines for editorial character (`Playfair Display` / `Cinzel` / `Georgia`) paired with clean, accessible sans-serif for body copy and interactive controls.
- **Layout:** Generous whitespace, card surfaces with subtle borders, portrait book covers, and fluid mobile breakpoints.

---

## 💻 Technology Stack

- **Frontend:** React 19, React Router v7, Vite, Native CSS Custom Properties (Design Tokens), Context API (`AuthContext`, `CartContext`).
- **Backend:** Node.js (v24.14.0), Express.js, JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS.
- **Database:** MongoDB Atlas (Cloud Cluster: `pandora_bookstore`), Mongoose 8.
- **Tooling:** Vite Dev Proxy (`/api` &rarr; `http://localhost:5000`), Dotenvx / Dotenv.

---

## 📁 Project Structure

```text
pandora-bookstore/
├── client/                              # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── books/                   # BookCard, BookFilters
│   │   │   └── common/                  # Header, Footer
│   │   ├── context/                     # AuthContext, CartContext
│   │   ├── layouts/                     # StoreLayout, AdminLayout
│   │   ├── pages/
│   │   │   ├── admin/                   # DashboardPage, BooksPage, CategoriesPage, OrdersPage
│   │   │   ├── auth/                    # LoginPage, RegisterPage
│   │   │   ├── customer/                # CartPage, CheckoutPage, OrderHistoryPage
│   │   │   └── public/                  # HomePage, CataloguePage, BookDetailsPage
│   │   ├── services/                    # api, authService, bookService, cartService, orderService
│   │   └── styles/                      # tokens.css, global.css, responsive.css
│   └── vite.config.js                   # Development proxy config
├── server/                              # Backend REST API
│   ├── src/
│   │   ├── config/                      # database.js (Mongoose connection)
│   │   ├── controllers/                 # auth, book, category, cart, order controllers
│   │   ├── middleware/                  # authenticate, authorizeRole, errorHandler
│   │   ├── models/                      # User, Book, Category, Cart, Order
│   │   ├── routes/                      # auth, book, category, cart, orders, admin
│   │   ├── scripts/                     # seed.js, runAcceptanceTests.js
│   │   ├── utils/                       # generateToken, seedData
│   │   ├── app.js                       # Express middleware & route mounting
│   │   └── server.js                    # HTTP listener
│   └── package.json
├── docs/                                # Project Specifications & Logs
│   ├── Pandora_Online_Book_Store_PRD.md # Product Requirements Document
│   ├── architecture.md                  # System architecture & endpoint definitions
│   ├── design.md                        # Visual Design System guide
│   ├── rules.md                         # Mandatory workspace rules & tracking policy
│   ├── progress.md                      # Phase-by-phase progress log
│   └── memory.md                        # Granular change log
├── .env.example                         # Environment configuration template
├── package.json                         # Workspace-level convenience scripts
└── README.md                            # Complete Project Manual
```

---

## 🔑 Pre-Seeded Demo Accounts

The database comes pre-seeded with dedicated demonstration accounts. The login screen also features **Fast Demo Fill** buttons for 1-click access:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@pandora.com` | `Admin@123` | Inventory CRUD, Category controls, Order status management, Dashboard analytics |
| **Customer** | `reader@pandora.com` | `Reader@123` | Catalogue browsing, Cart operations, Checkout, Personal Order History |

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.14.0)
- **npm**: v9+ (tested on 11.9.0)
- **MongoDB**: Live MongoDB Atlas cluster or local MongoDB instance

### 2. Environment Setup
The project uses root `.env` and `server/.env`. A `.env.example` template is provided:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pandora_bookstore?retryWrites=true&w=majority
JWT_SECRET=pandora_super_secret_jwt_key_2026_academic_project
CLIENT_URL=http://localhost:5173
VITE_API_URL=/api
```

### 3. Install Dependencies
```bash
# Install backend dependencies
npm install --prefix server

# Install frontend dependencies
npm install --prefix client
```

### 4. Seed Catalogue & Initial Accounts
Populates 6 literary categories, 12 classic & contemporary books, and demo accounts:
```bash
npm run seed
# Or directly inside server/:
npm run seed --prefix server
```

### 5. Run the Application
In separate terminals:

```bash
# Terminal 1: Start Express API server (Port 5000)
npm run server:dev

# Terminal 2: Start Vite React Client (Port 5173)
npm run client:dev
```

Open your browser at **`http://localhost:5173`**.

---

## 📡 REST API Documentation

### Public Endpoints
- `GET /api/health` — Server health status and uptime.
- `GET /api/categories` — List all active book categories.
- `GET /api/books` — Query catalogue (supports `search`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`).
- `GET /api/books/:id` — Retrieve book details by ID.
- `POST /api/auth/register` — Create a new customer account.
- `POST /api/auth/login` — Authenticate and receive JWT token.

### Customer Protected Endpoints (Requires `Bearer <JWT>`)
- `GET /api/auth/me` — Retrieve current authenticated profile.
- `GET /api/cart` — Retrieve user's current shopping cart and calculated totals.
- `POST /api/cart/items` — Add book or increment quantity in cart.
- `PUT /api/cart/items/:bookId` — Set exact item quantity in cart.
- `DELETE /api/cart/items/:bookId` — Remove an item from cart.
- `DELETE /api/cart` — Clear entire cart.
- `POST /api/orders` — Validate cart and place order with shipping address.
- `GET /api/orders/my` — Retrieve authenticated user's order history.
- `GET /api/orders/:id` — View specific order details (restricted to order owner).

### Administrator Protected Endpoints (Requires `Bearer <Admin JWT>`)
- `GET /api/admin/books` — Retrieve full inventory table including archived books.
- `POST /api/admin/books` — Create new book entry.
- `PATCH /api/admin/books/:id` — Update book details, price, or stock.
- `DELETE /api/admin/books/:id` — Safe archive or permanent book deletion.
- `POST /api/admin/categories` — Create a new category.
- `GET /api/admin/orders` — List all orders across all customers with status filters.
- `PATCH /api/admin/orders/:id/status` — Update order fulfillment status (restores stock if cancelled).

---

## ✅ Acceptance Criteria & Verification

All acceptance scenarios specified in [docs/Pandora_Online_Book_Store_PRD.md](docs/Pandora_Online_Book_Store_PRD.md) have been executed and verified:

| Test ID | Scenario | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **AT-01** | Register with valid details | Account created; password securely hashed with bcrypt | ✅ **PASSED** |
| **AT-02** | Register with existing email | Rejected with status 400 and clear message | ✅ **PASSED** |
| **AT-03** | Search by title or author | Returns only matching books from database | ✅ **PASSED** |
| **AT-04** | Add more quantity than available stock | Blocked with status 400 and available stock warning | ✅ **PASSED** |
| **AT-05** | Submit checkout with empty cart | Order creation blocked with status 400 | ✅ **PASSED** |
| **AT-06** | Submit valid order | Order created with server totals, snapshot items, and atomic stock deduction | ✅ **PASSED** |
| **AT-07** | Customer requests another user's order | Access denied with HTTP 403 Forbidden | ✅ **PASSED** |
| **AT-08** | Customer attempts admin route | Access denied with HTTP 403 Forbidden | ✅ **PASSED** |
| **AT-09** | Admin updates book stock | New stock saved and accurately reflected in catalogue | ✅ **PASSED** |
| **AT-10** | Admin updates order status | Status change reflected in customer's order history | ✅ **PASSED** |
| **AT-11** | Mobile viewport usability | Responsive header toggle, fluid grid, adaptive checkout | ✅ **PASSED** |
| **AT-12** | API / DB error handling | Malformed IDs caught safely, returns structured JSON errors | ✅ **PASSED** |

To run the automated acceptance test suite locally:
```bash
node server/src/scripts/runAcceptanceTests.js
```

---

## 📚 Documentation Directory

- [rules.md](docs/rules.md) — Mandatory Workspace Rules & Permission Policies
- [Pandora_Online_Book_Store_PRD.md](docs/Pandora_Online_Book_Store_PRD.md) — Product Requirements Document (PRD)
- [architecture.md](docs/architecture.md) — System Architecture, Data Models, & API Specification
- [design.md](docs/design.md) — Visual Design System (Deep Vintage Mood)
- [progress.md](docs/progress.md) — Comprehensive Phase-by-Phase Progress Log
- [memory.md](docs/memory.md) — Granular Change Log (All 12 logged changes)
