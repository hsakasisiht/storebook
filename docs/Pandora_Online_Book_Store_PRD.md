# PANDORA — Online Book Store

**Product Requirements Document (PRD)**  
**Project type:** B.Tech / Academic Mini Project  
**Version:** 1.0  
**Prepared on:** 14 November 2026  
**Proposed stack:** ReactJS · Node.js · Express.js · MongoDB  
**Platform:** Responsive web application

> **DISCOVER STORIES. COLLECT WORLDS.**  
> A curated digital bookstore with a warm, deep-vintage visual identity.

---

## Design Direction — Deep Vintage Mood

The visual direction is based on the supplied “Deep Vintage Mood” reference. Pandora should reuse its earthy contrast and cinematic warmth, not copy the reference website or its car imagery.

| Token | Hex | Usage |
|---|---|---|
| Deep Teal | `#244855` | Primary navigation, headings, footer, dark panels |
| Signal Coral | `#E64833` | Primary CTA, active states, small highlights |
| Terracotta | `#874F41` | Secondary accents, category labels, warm emphasis |
| Muted Sage | `#90AEAD` | Soft supporting surfaces, tags, subtle borders |
| Warm Cream | `#FBE9D0` | Hero backgrounds, warm cards, selected sections |

---

## 1. Product Overview

Pandora is a responsive online bookstore where visitors can discover books, explore categories, search and filter the catalogue, add books to a cart, and place orders. Administrators manage the catalogue and monitor customer orders through a protected dashboard.

The experience should feel like an independent editorial bookstore rather than a generic marketplace: strong typography, generous whitespace, warm paper-like surfaces, deep teal navigation, terracotta accents, and carefully framed book covers.

### Product vision

Make browsing and buying books simple, welcoming, and visually memorable—while demonstrating core full-stack concepts expected in a ReactJS and MongoDB mini project.

### Project goals

- Build a working end-to-end bookstore with customer and administrator roles.
- Demonstrate CRUD operations, authentication, protected routes, search, cart state, and order processing.
- Provide a responsive interface that works on desktop, tablet, and mobile.
- Keep the first release small enough to implement, test, and demonstrate as an academic project.

### Success criteria

| Area | Acceptance indicator |
|---|---|
| Catalogue | Books load from MongoDB and can be searched, filtered, and opened in detail. |
| Customer journey | A customer can register/login, add items to cart, and submit an order. |
| Admin operations | An admin can create, edit, remove, and manage book listings and order statuses. |
| Reliability | Validation and clear error states prevent invalid or incomplete submissions. |
| Responsive UI | Core screens remain usable at mobile, tablet, and desktop widths. |

## 2. Users & Roles

| Role | Needs | Permissions |
|---|---|---|
| Guest visitor | Browse books and understand the store before signing in. | View home, catalogue, categories, search, and book details; register/login. |
| Registered customer | Purchase books and track submitted orders. | All guest actions plus cart, checkout, order history, and profile. |
| Administrator | Maintain inventory and fulfil orders. | Protected admin dashboard; manage books, categories, stock, and order status. |

### Role rules

- Only authenticated customers can submit an order and view their own order history.
- Only an administrator can access admin routes and modify catalogue or order records.
- The backend must enforce authorization; hiding UI controls alone is not security.
- For the mini-project demo, an admin account can be seeded manually rather than offering public admin registration.

## 3. Scope & Feature Requirements

### Release 1 — Core mini-project scope

| ID | Feature | Requirement / expected behaviour | Priority |
|---|---|---|---|
| F-01 | Home page | Show hero section, featured books, popular categories, and new arrivals. | Must |
| F-02 | Book catalogue | Display books in a responsive grid with cover, title, author, price, and availability. | Must |
| F-03 | Search & filters | Search by title/author; filter by category and price; sort by price or newest. | Must |
| F-04 | Book details | Show cover, title, author, description, category, price, stock status, and add-to-cart action. | Must |
| F-05 | Authentication | Customer registration, login, logout, password hashing, and protected routes. | Must |
| F-06 | Shopping cart | Add/remove items, change quantity, calculate subtotal, and persist cart for signed-in user. | Must |
| F-07 | Checkout | Collect delivery details, validate cart/stock, show order summary, and place order. | Must |
| F-08 | Order history | Customer can view their orders and current order status. | Must |
| F-09 | Admin book CRUD | Admin can add, edit, view, and delete book records; update stock and featured flag. | Must |
| F-10 | Order management | Admin can view orders and update status: Pending, Confirmed, Shipped, Delivered, Cancelled. | Must |
| F-11 | Responsive design | Navigation, cards, forms, and tables adapt to small screens. | Must |
| F-12 | Feedback states | Show loading, empty, success, validation, and API error states. | Must |

### Release 1.1 — Optional enhancements

- Wishlist / save-for-later functionality.
- Book ratings and reviews from verified customers.
- Discount coupon field with basic server-side validation.
- Related books and recently viewed books.
- Low-stock indicator and simple admin sales summary.

### Explicitly out of scope for the first release

- Real payment gateway integration, refunds, and payment reconciliation.
- Live courier integration, shipment tracking, and automated shipping labels.
- Multi-vendor seller onboarding, subscriptions, e-books, and digital downloads.
- AI recommendations, chat support, and production-scale analytics.

> **Checkout decision:** Use a demo payment option (e.g., Cash on Delivery / Pay on Delivery) or a clearly labelled simulated payment confirmation. Do not collect or store real card, UPI PIN, or banking credentials in this academic project.

## 4. Main User Journeys & Screens

### Customer journey

| Step | Action | System response |
|---|---|---|
| 1 | Open Home / Browse | Show featured books and navigation to catalogue. |
| 2 | Search or filter catalogue | Return matching books; show an empty state if none match. |
| 3 | Open a book detail page | Display full information and current availability. |
| 4 | Add to cart | Validate stock and update cart count and subtotal. |
| 5 | Sign in / Register if required | Authenticate user and return them to the pending checkout/cart flow. |
| 6 | Enter delivery details and place order | Revalidate stock, create order, reduce stock safely, and show confirmation. |
| 7 | Open My Orders | Show order number, date, total, items, and status. |

### Administrator journey

- Admin signs in through the designated admin account.
- Dashboard shows total books, active orders, and low-stock items (basic counts only).
- Admin creates or edits a book listing and updates stock.
- Admin opens an order and changes its status; the customer sees the updated status in My Orders.

### Required screens

**Public / customer screens**

- Home
- Catalogue / search results
- Book details
- Register / Login
- Cart
- Checkout / order confirmation
- My Orders / order detail
- Profile / delivery details

**Admin screens**

- Admin dashboard
- Manage books (list, create, edit)
- Manage categories (basic)
- Manage orders / order detail

## 5. Functional Details & Business Rules

### Catalogue and inventory

- A book must have a title, author, price, category, and stock quantity before it can be published.
- Price must be a non-negative number; stock must be an integer greater than or equal to zero.
- Out-of-stock books remain viewable but cannot be added to cart or ordered.
- Search should be case-insensitive and match title and author; category and sort filters can be combined.
- Deleting a book referenced by an existing order should be prevented or handled as an inactive/archived listing.

### Cart and order rules

- A cart line contains a book ID and quantity; quantity must be at least 1 and no greater than available stock.
- The backend recalculates prices and totals at checkout. Never trust totals submitted by the browser.
- Order items store a snapshot of title, author, unit price, and quantity so historical orders remain readable if a listing changes.
- Create the order and update stock atomically where supported; otherwise implement safe validation and rollback handling.
- Customer APIs must return only that customer's orders. Admin APIs may access all orders.

## 6. Visual Design System

### Typography & layout

- Use a confident editorial serif for large campaign headlines if available; use a clean sans-serif for body text, navigation, forms, and data.
- Use warm off-white page backgrounds with white or cream content surfaces. Keep deep teal for strong structural elements.
- Book covers are the main visual content. Use consistent portrait aspect ratios, rounded corners, and restrained shadows.
- Use coral for one dominant action per screen; do not use coral for every link or decorative element.
- Use generous spacing, clear hierarchy, readable contrast, and simple transitions. Avoid glossy gradients, neon effects, and excessive animation.

### Component direction

| Component | Visual treatment |
|---|---|
| Header | Deep teal or cream; Pandora wordmark; clear catalogue/search/cart/account navigation. |
| Primary button | Signal coral background, cream/white text, medium radius, clear hover/focus state. |
| Book card | Warm/white surface, portrait cover, title and author, price, compact category tag. |
| Search/filter panel | Cream or pale neutral surface; simple inputs and select controls. |
| Admin tables | Clean white rows, teal header, status pills using muted sage/terracotta/coral. |
| Footer | Deep teal background, cream text, concise navigation and project information. |

### Accessibility

- Maintain WCAG-aware text contrast, visible keyboard focus, semantic headings, and labelled form controls.
- Provide meaningful alt text for book-cover images; decorative images should have empty alt text.
- Do not rely on color alone to communicate order status or validation errors.

## 7. Technical Architecture

### Recommended stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | ReactJS | Pages, reusable components, routing, forms, cart state, API integration. |
| Backend | Node.js + Express.js | REST API, authentication, validation, authorization, business logic. |
| Database | MongoDB + Mongoose | Users, books, categories, carts, and orders. |
| Authentication | JWT + bcrypt | Signed access token and password hashing; secure token handling. |
| Styling | CSS Modules / plain CSS | Responsive layout and reusable design tokens. |
| Testing | Postman + manual UI checks | API validation, role checks, and customer/admin journeys. |

### High-level architecture

```text
Customer / Admin Browser
        React UI • Router • State
                 |
                 v
              REST API
 Express routes • Controllers • Middleware • Validation
                 |
                 v
              MongoDB
 Users • Books • Categories • Carts • Orders
```

**Request flow:** React sends HTTPS requests to the Express API. Middleware verifies authentication and role permissions. Controllers validate input and execute business rules through Mongoose models. MongoDB stores the resulting records; the API returns structured JSON responses.

### Suggested project structure

```text
pandora-bookstore/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── context/          # Auth / Cart state
│       ├── hooks/
│       ├── services/         # API client
│       ├── utils/
│       └── styles/
├── server/
│   └── src/
│       ├── config/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       ├── validators/
│       ├── services/
│       └── utils/
├── .env.example
└── README.md
```

## 8. Data Model (Proposed)

| Collection | Important fields |
|---|---|
| `users` | `_id`, `name`, `email` (unique), `passwordHash`, `role` (customer/admin), `phone`, `addresses[]`, `createdAt` |
| `books` | `_id`, `title`, `author`, `description`, `categoryId`, `price`, `stock`, `coverImage`, `featured`, `createdAt`, `updatedAt` |
| `categories` | `_id`, `name` (unique), `slug`, `description` |
| `carts` | `_id`, `userId` (unique), `items[{ bookId, quantity }]`, `updatedAt` |
| `orders` | `_id`, `orderNumber`, `userId`, `items[{ bookId, titleSnapshot, authorSnapshot, unitPrice, quantity }]`, `shippingAddress`, `subtotal`, `total`, `paymentMethod`, `paymentStatus`, `status`, `createdAt` |

### Data integrity notes

- Store password hashes only; never store plaintext passwords.
- Use unique indexes for user email, category slug, and order number.
- Validate ObjectIds and request payloads before database operations.
- Use references for relationships and order-item snapshots for historical purchase data.
- Store image URLs or local asset paths in the database; do not store large image binaries directly in book documents for this project.

## 9. API Requirements (Proposed REST Endpoints)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create customer account. |
| POST | `/api/auth/login` | Public | Authenticate and return session/token. |
| GET | `/api/books` | Public | List books; supports search, category, sort, pagination. |
| GET | `/api/books/:id` | Public | Get book details. |
| POST | `/api/cart/items` | Customer | Add a book or update its quantity. |
| GET | `/api/cart` | Customer | Get current user's cart. |
| DELETE | `/api/cart/items/:bookId` | Customer | Remove a cart item. |
| POST | `/api/orders` | Customer | Validate cart and create order. |
| GET | `/api/orders/my` | Customer | Get current user's order history. |
| GET | `/api/admin/books` | Admin | List catalogue for management. |
| POST | `/api/admin/books` | Admin | Create a book. |
| PATCH | `/api/admin/books/:id` | Admin | Update a book. |
| DELETE | `/api/admin/books/:id` | Admin | Archive or delete a book safely. |
| GET | `/api/admin/orders` | Admin | List all orders. |
| PATCH | `/api/admin/orders/:id/status` | Admin | Update order status. |

### API conventions

- Return JSON with consistent success/error structure and suitable HTTP status codes.
- Validate and sanitize user input on the server; use pagination for catalogue and admin lists.
- Protect customer and admin routes with authentication and role middleware.
- Keep secrets in environment variables and provide only a safe `.env.example` template.

## 10. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Catalogue should use pagination and optimized image sizes; avoid loading the entire inventory at once. |
| Security | Hash passwords, validate inputs, enforce server-side role checks, protect secrets, and use HTTPS in deployment. |
| Usability | Clear navigation, readable typography, predictable forms, and useful empty/error/success states. |
| Responsiveness | Support common mobile, tablet, and desktop viewport sizes. |
| Maintainability | Separate routes, controllers, models, middleware, and reusable React components. |
| Reliability | Handle missing records, invalid IDs, duplicate emails, empty carts, and insufficient stock gracefully. |
| Compatibility | Target current versions of major evergreen browsers. |

## 11. Validation & Acceptance Tests

| Test ID | Scenario | Expected result |
|---|---|---|
| AT-01 | Register with valid details | Account is created; password is stored as a hash. |
| AT-02 | Register with an existing email | Request is rejected with a clear validation message. |
| AT-03 | Search by book title or author | Only matching catalogue results are shown. |
| AT-04 | Add more quantity than stock | System blocks the update and explains availability. |
| AT-05 | Submit checkout with empty cart | Order is not created. |
| AT-06 | Submit a valid order | Order is created with server-calculated totals and correct item snapshots. |
| AT-07 | Customer requests another user's order | API denies access. |
| AT-08 | Customer opens admin route/API | Access is denied. |
| AT-09 | Admin updates book stock | New stock value is saved and shown in catalogue. |
| AT-10 | Admin updates order status | Updated status is visible in the customer's order history. |
| AT-11 | Use app on narrow mobile viewport | Core navigation and purchase flow remain usable. |
| AT-12 | API/database failure | User receives a safe, understandable error state. |

## 12. Implementation Plan

A suggested four-phase plan for a small academic team. Adjust the duration to match the actual submission deadline and team size.

| Phase | Work items | Deliverable |
|---|---|---|
| 1. Foundation | Create client/server apps, connect MongoDB, configure routing, base layout, design tokens, and seed data. | Running application shell and database connection. |
| 2. Catalogue & Admin | Build book/category models, public catalogue and detail pages, search/filter, admin CRUD. | Books can be managed and browsed. |
| 3. Customer Purchase Flow | Implement auth, cart, checkout, order creation, stock checks, and order history. | End-to-end demo order journey. |
| 4. QA & Submission | Test roles and edge cases, responsive polish, seed demo data, README, screenshots, and project report. | Demo-ready mini project and documentation. |

## 13. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Scope grows beyond mini-project timeline | Keep Release 1 mandatory features separate from optional enhancements. |
| Stock becomes incorrect during checkout | Revalidate stock on the server immediately before order creation; use safe database update patterns. |
| Admin endpoints are exposed | Enforce role authorization in backend middleware and test direct API access. |
| Book images are missing or slow | Use optimized image assets, fixed aspect-ratio placeholders, and fallback images. |
| Payment feature creates security/compliance work | Use a clearly labelled simulated payment or Cash on Delivery; do not collect sensitive payment credentials. |
| Secrets are committed to Git | Use environment variables, `.env.example`, and a `.gitignore` entry for `.env`. |

## 14. Proposed Assumptions & Decisions to Confirm

The following are implementation recommendations made to keep the mini project achievable. They are not claims about requirements from the course or institution.

| Topic | Proposed default | Confirm before implementation if different |
|---|---|---|
| Backend | Node.js + Express.js | If the course mandates a different backend. |
| Payment | Cash on Delivery / simulated payment only | If a real payment gateway is explicitly required. |
| Images | Book cover image URL or project-managed static assets | If image upload/storage is required. |
| Admin account | Seeded admin account; no public admin signup | If admin creation must be supported through UI. |
| Deployment | Local development and demo first | If hosting or a specific platform is required. |
| Reviews / wishlist | Optional Release 1.1 | If these are mandatory rubric items. |

## 15. Definition of Done

- All Release 1 mandatory features are implemented and connected to MongoDB.
- Customer and admin journeys work from the UI and are protected by backend authorization.
- The app handles invalid input, missing data, insufficient stock, and API errors.
- The interface follows the approved Deep Vintage Mood palette and is responsive.
- Acceptance tests are executed and results are recorded.
- README includes setup instructions, environment variables, seed/admin setup, and run commands.
- The final demonstration uses sample data and does not expose real user credentials or payment information.

---

**PANDORA — DISCOVER STORIES. COLLECT WORLDS.**  
*End of Product Requirements Document.*
