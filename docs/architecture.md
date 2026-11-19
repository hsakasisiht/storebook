# PANDORA --- Online Book Store

## System Architecture

**Document:** `architecture.md`\
**Project:** Academic Mini Project --- Online Book Store\
**Version:** 1.0\
**Stack defined in PRD:** ReactJS · Node.js · Express.js · MongoDB\
**Related document:** `Pandora_Online_Book_Store_PRD.md`

> **Architecture principle:** Keep the first release understandable,
> modular, secure at the API boundary, and small enough to build and
> demonstrate as an academic mini project.

------------------------------------------------------------------------

## 1. Architecture Overview

Pandora uses a three-layer client/server architecture:

1.  **Frontend --- ReactJS:** Renders the customer storefront and
    administrator dashboard, manages UI state, validates forms for
    usability, and communicates with the backend through HTTP APIs.
2.  **Backend --- Node.js + Express.js:** Exposes REST endpoints,
    authenticates users, enforces role permissions, validates requests,
    applies bookstore business rules, and coordinates database
    operations.
3.  **Database --- MongoDB + Mongoose:** Persists users, books,
    categories, carts, and orders.

``` text
Guest / Customer / Administrator
              |
              v
      ReactJS Web Application
      - Pages and components
      - Client-side routing
      - Auth / Cart state
      - API service layer
              |
         HTTP / JSON
              |
              v
       Node.js + Express API
      - Routes
      - Authentication middleware
      - Role authorization
      - Request validation
      - Controllers / services
              |
          Mongoose
              |
              v
            MongoDB
      - users
      - books
      - categories
      - carts
      - orders
```

The browser must never connect directly to MongoDB. All reads and writes
pass through the backend API.

## 2. Technology Responsibilities

  -----------------------------------------------------------------------
  Layer                   Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                ReactJS                 Pages, reusable UI,
                                                  routing, forms,
                                                  cart/auth state

  Backend                 Node.js + Express.js    REST API, business
                                                  logic, validation,
                                                  authentication and
                                                  authorization

  Database                MongoDB                 Persistent application
                                                  data

  ODM                     Mongoose                Schemas, model
                                                  validation, references
                                                  and database queries

  Authentication          JWT + bcrypt            Token-based
                                                  authentication and
                                                  password hashing

  Styling                 CSS Modules or plain    Responsive UI and
                          CSS                     design-system
                                                  implementation

  API verification        Postman                 Endpoint, validation
                                                  and authorization
                                                  checks
  -----------------------------------------------------------------------

Use package versions compatible with one another. The exact versions and
any additional libraries must be selected during project setup and
recorded in the project README.

## 3. Repository / Folder Structure

The following is the recommended structure for the project. It is a
proposed organization, not a claim that these folders already exist.

``` text
pandora-bookstore/
│
├── client/
│   ├── public/
│   │   └── images/
│   │       └── book-covers/
│   │
│   └── src/
│       ├── assets/
│       │   ├── images/
│       │   └── icons/
│       │
│       ├── components/
│       │   ├── common/
│       │   ├── navigation/
│       │   ├── books/
│       │   ├── cart/
│       │   └── forms/
│       │
│       ├── layouts/
│       │   ├── StoreLayout.jsx
│       │   └── AdminLayout.jsx
│       │
│       ├── pages/
│       │   ├── public/
│       │   │   ├── HomePage.jsx
│       │   │   ├── CataloguePage.jsx
│       │   │   └── BookDetailsPage.jsx
│       │   ├── auth/
│       │   │   ├── LoginPage.jsx
│       │   │   └── RegisterPage.jsx
│       │   ├── customer/
│       │   │   ├── CartPage.jsx
│       │   │   ├── CheckoutPage.jsx
│       │   │   ├── OrderHistoryPage.jsx
│       │   │   └── ProfilePage.jsx
│       │   └── admin/
│       │       ├── DashboardPage.jsx
│       │       ├── BooksPage.jsx
│       │       ├── BookFormPage.jsx
│       │       ├── CategoriesPage.jsx
│       │       └── OrdersPage.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── CartContext.jsx
│       │
│       ├── hooks/
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── bookService.js
│       │   ├── cartService.js
│       │   └── orderService.js
│       │
│       ├── utils/
│       ├── styles/
│       │   ├── tokens.css
│       │   ├── global.css
│       │   └── responsive.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   └── src/
│       ├── config/
│       │   └── database.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Book.js
│       │   ├── Category.js
│       │   ├── Cart.js
│       │   └── Order.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── books.routes.js
│       │   ├── cart.routes.js
│       │   ├── orders.routes.js
│       │   └── admin.routes.js
│       ├── controllers/
│       ├── services/
│       ├── middleware/
│       │   ├── authenticate.js
│       │   ├── authorizeRole.js
│       │   └── errorHandler.js
│       ├── validators/
│       ├── utils/
│       ├── app.js
│       └── server.js
│
├── .env.example
├── .gitignore
└── README.md
```

### Folder ownership

  -----------------------------------------------------------------------
  Folder                              Contains
  ----------------------------------- -----------------------------------
  `client/src/components`             Reusable UI elements shared by
                                      multiple pages

  `client/src/pages`                  Route-level screens

  `client/src/context`                Shared authentication and cart
                                      state

  `client/src/services`               API calls; keep HTTP logic out of
                                      page components

  `client/src/styles`                 Global styles, design tokens and
                                      responsive rules

  `server/src/models`                 Mongoose schemas and models

  `server/src/routes`                 HTTP route definitions and
                                      middleware wiring

  `server/src/controllers`            Request/response handling

  `server/src/services`               Business operations such as
                                      checkout and stock updates

  `server/src/middleware`             Authentication, role checks and
                                      error handling

  `server/src/validators`             Request payload validation

  `server/src/config`                 Database and application
                                      configuration
  -----------------------------------------------------------------------

## 4. Frontend Architecture

### 4.1 Route map

  Route                     Access     Page / purpose
  ------------------------- ---------- -----------------------------------------
  `/`                       Public     Home page
  `/books`                  Public     Catalogue, search, filters and sorting
  `/books/:id`              Public     Book details
  `/login`                  Public     Customer login
  `/register`               Public     Customer registration
  `/cart`                   Customer   Shopping cart
  `/checkout`               Customer   Delivery details and order confirmation
  `/orders`                 Customer   Current user's order history
  `/profile`                Customer   Customer profile and delivery details
  `/admin`                  Admin      Dashboard
  `/admin/books`            Admin      Book management
  `/admin/books/new`        Admin      Create book
  `/admin/books/:id/edit`   Admin      Edit book
  `/admin/categories`       Admin      Category management
  `/admin/orders`           Admin      Order management

Route guards improve navigation and user experience, but they are not a
security boundary. The backend must independently enforce authentication
and role authorization on every protected endpoint.

### 4.2 Shared frontend state

-   **AuthContext:** Current authenticated user, authentication status,
    login/logout actions.
-   **CartContext:** Cart items, quantities, item count, subtotal
    display, and cart update actions.
-   **Page-local state:** Search text, selected filters, sort order,
    form state, loading state and temporary UI feedback.

The displayed cart subtotal is for user feedback only. The backend
recalculates all prices and totals when an order is submitted.

### 4.3 Frontend request flow

1.  A page calls the relevant service function.
2.  The service sends a request to the Express API.
3.  The API response is converted into page state.
4.  The page renders loading, success, empty or error states.
5.  Forms show client-side validation for usability; the server repeats
    validation before accepting data.

## 5. Backend Architecture

### 5.1 Request lifecycle

``` text
Incoming HTTP request
        |
        v
Express route
        |
        v
Authentication middleware (if protected)
        |
        v
Role authorization (if admin-only)
        |
        v
Request validation
        |
        v
Controller
        |
        v
Service / business rules
        |
        v
Mongoose model
        |
        v
MongoDB
        |
        v
JSON response / centralized error handler
```

### 5.2 Responsibility boundaries

-   **Routes:** Define HTTP methods, paths and middleware.
-   **Middleware:** Verify identity, permissions and common request
    conditions.
-   **Validators:** Check request body, query parameters and
    identifiers.
-   **Controllers:** Read request inputs, call services and format
    responses.
-   **Services:** Apply domain rules, including stock checks and order
    creation.
-   **Models:** Define persisted data structure, indexes and model-level
    constraints.
-   **Error handler:** Return consistent, safe error responses without
    leaking secrets or stack traces to users.

## 6. Database Architecture

MongoDB collections proposed by the PRD:

### 6.1 `users`

  Field            Purpose
  ---------------- ---------------------------------------
  `_id`            MongoDB document identifier
  `name`           Customer/admin display name
  `email`          Unique login email
  `passwordHash`   bcrypt password hash; never plaintext
  `role`           `customer` or `admin`
  `phone`          Optional contact number
  `addresses[]`    Saved delivery addresses
  `createdAt`      Creation timestamp

### 6.2 `books`

  Field                      Purpose
  -------------------------- ------------------------------------------------
  `_id`                      Book identifier
  `title`                    Book title
  `author`                   Author name
  `description`              Book description
  `categoryId`               Reference to category
  `price`                    Non-negative selling price
  `stock`                    Integer inventory quantity, zero or greater
  `coverImage`               Image URL or project-managed static asset path
  `featured`                 Whether the book appears in featured sections
  `createdAt`, `updatedAt`   Timestamps

### 6.3 `categories`

  Field           Purpose
  --------------- --------------------------------
  `_id`           Category identifier
  `name`          Unique category name
  `slug`          Unique URL-friendly identifier
  `description`   Optional category description

### 6.4 `carts`

  Field         Purpose
  ------------- --------------------------------------------
  `_id`         Cart identifier
  `userId`      Unique reference to customer
  `items[]`     Each item contains `bookId` and `quantity`
  `updatedAt`   Last update timestamp

### 6.5 `orders`

  -----------------------------------------------------------------------
  Field                               Purpose
  ----------------------------------- -----------------------------------
  `_id`                               Order identifier

  `orderNumber`                       Unique human-readable order number

  `userId`                            Customer reference

  `items[]`                           Book reference, title/author
                                      snapshots, unit price and quantity

  `shippingAddress`                   Address snapshot for this order

  `subtotal`, `total`                 Server-calculated amounts

  `paymentMethod`                     Demo payment method selected

  `paymentStatus`                     Demo payment state, where
                                      applicable

  `status`                            Pending, Confirmed, Shipped,
                                      Delivered or Cancelled

  `createdAt`                         Order creation timestamp
  -----------------------------------------------------------------------

### 6.6 Relationships

``` text
User 1 -------- 1 Cart
User 1 -------- N Orders
Category 1 ---- N Books
Order 1 ------- N Order Items (embedded snapshots)
Cart 1 -------- N Cart Items (book references)
```

### Data integrity requirements

-   Unique index on user email.
-   Unique index on category slug.
-   Unique index on order number.
-   Validate MongoDB ObjectIds before querying.
-   Preserve order-item title, author and price snapshots.
-   Do not hard-delete a book in a way that breaks historical order
    records; archive/deactivate it or prevent deletion when referenced.

## 7. REST API Architecture

The following endpoints are defined by the PRD.

  --------------------------------------------------------------------------------------
  Method            Endpoint                         Access            Responsibility
  ----------------- -------------------------------- ----------------- -----------------
  `POST`            `/api/auth/register`             Public            Create customer
                                                                       account

  `POST`            `/api/auth/login`                Public            Authenticate
                                                                       customer/admin

  `GET`             `/api/books`                     Public            List books;
                                                                       search, category,
                                                                       sort and
                                                                       pagination

  `GET`             `/api/books/:id`                 Public            Get book details

  `POST`            `/api/cart/items`                Customer          Add item or
                                                                       update quantity

  `GET`             `/api/cart`                      Customer          Get current
                                                                       user's cart

  `DELETE`          `/api/cart/items/:bookId`        Customer          Remove cart item

  `POST`            `/api/orders`                    Customer          Validate cart and
                                                                       create order

  `GET`             `/api/orders/my`                 Customer          Get own order
                                                                       history

  `GET`             `/api/admin/books`               Admin             List books for
                                                                       management

  `POST`            `/api/admin/books`               Admin             Create book

  `PATCH`           `/api/admin/books/:id`           Admin             Update book

  `DELETE`          `/api/admin/books/:id`           Admin             Safely
                                                                       archive/delete
                                                                       book

  `GET`             `/api/admin/orders`              Admin             List all orders

  `PATCH`           `/api/admin/orders/:id/status`   Admin             Update order
                                                                       status
  --------------------------------------------------------------------------------------

### API conventions

-   Use JSON request and response bodies.
-   Return suitable HTTP status codes.
-   Validate and sanitize inputs on the server.
-   Use pagination for catalogue and admin lists.
-   Return only the authenticated customer's own cart and orders.
-   Keep admin APIs behind authentication and admin-role middleware.
-   Use a consistent error response shape; exact response schema can be
    finalized during implementation.

## 8. Core Business Flows

### 8.1 Registration and login

1.  Customer submits registration details.
2.  Backend validates required fields and email uniqueness.
3.  Password is hashed using bcrypt.
4.  User is saved with the `customer` role.
5.  Login verifies the password hash and issues a signed JWT.
6.  Protected API requests authenticate the token and load the user's
    identity/role.

The PRD proposes a seeded admin account for the academic demo rather
than public admin registration.

### 8.2 Catalogue search

1.  React sends search, category, sort and pagination parameters.
2.  Backend validates query parameters.
3.  Backend queries books by title/author and applies requested filters.
4.  API returns matching records and pagination information.
5.  UI renders results or an empty state.

Search should be case-insensitive and match title and author. Category
and sort filters can be combined.

### 8.3 Add to cart

1.  Customer selects a book and quantity.
2.  Backend verifies the book exists and is available.
3.  Backend checks the requested quantity against stock.
4.  Cart item is created or updated.
5.  UI refreshes cart count and subtotal.

Out-of-stock books cannot be added to cart.

### 8.4 Checkout and order creation

1.  Customer opens checkout with a non-empty cart.
2.  Customer supplies delivery details and selects the available demo
    payment method.
3.  Backend loads the cart and current book records.
4.  Backend revalidates stock and recalculates prices/totals;
    browser-supplied totals are not trusted.
5.  Backend creates the order with item snapshots and updates stock
    safely.
6.  Cart is cleared after successful order creation.
7.  Customer receives an order confirmation and can view the order in
    history.

Use an atomic database transaction where supported. If transactions are
not available in the chosen development environment, implement explicit
safe validation and rollback handling.

### 8.5 Admin order management

1.  Admin opens the protected order list.
2.  Backend verifies admin role.
3.  Admin views order details.
4.  Admin updates the order status.
5.  Customer sees the current status in their order history.

Allowed statuses: `Pending`, `Confirmed`, `Shipped`, `Delivered`,
`Cancelled`.

## 9. Security Architecture

-   Hash passwords with bcrypt; never store plaintext passwords.
-   Sign and verify JWTs using a secret stored in environment variables.
-   Enforce authentication and authorization on the backend.
-   Enforce ownership checks for cart and customer order resources.
-   Never trust browser-supplied price, subtotal, total, role or stock
    values.
-   Validate and sanitize all user input.
-   Do not expose database credentials, JWT secrets or stack traces in
    API responses.
-   Do not commit `.env` files; maintain `.env.example` with placeholder
    variable names only.
-   Do not collect real card details, UPI PINs or banking credentials in
    this mini project.
-   Use HTTPS when deployed.

Token storage and refresh-token strategy should be selected during
implementation after considering the deployment environment; this PRD
does not prescribe a specific browser token-storage mechanism.

## 10. Error Handling

The backend should handle at least:

-   Invalid request body or query parameters.
-   Invalid MongoDB identifiers.
-   Duplicate email or category slug.
-   Missing book, user, cart or order.
-   Empty cart at checkout.
-   Insufficient stock.
-   Unauthorized or forbidden access.
-   Database connection or query failures.

The frontend should provide readable loading, empty, validation, success
and API error states. User-facing errors must not expose internal stack
traces or secrets.

## 11. Non-Functional Architecture Requirements

  -----------------------------------------------------------------------
  Area                                Requirement
  ----------------------------------- -----------------------------------
  Performance                         Paginate catalogue results and
                                      optimize book-cover images

  Security                            Password hashing, input validation,
                                      backend authorization and secret
                                      management

  Usability                           Clear navigation and helpful
                                      form/error states

  Responsiveness                      Mobile, tablet and desktop support

  Maintainability                     Separate routes, controllers,
                                      services, models and reusable React
                                      components

  Reliability                         Handle invalid IDs, missing
                                      records, empty carts, duplicate
                                      emails and stock conflicts

  Compatibility                       Current major evergreen browsers
  -----------------------------------------------------------------------

## 12. Development Phases

  -----------------------------------------------------------------------
  Phase                   Architecture work       Exit condition
  ----------------------- ----------------------- -----------------------
  1\. Foundation          Create client/server    Application shell and
                          apps, configure         database connection
                          MongoDB, base routing   work
                          and shared layout       

  2\. Catalogue & Admin   Book/category models,   Books can be created
                          catalogue APIs, detail  and browsed
                          page, search/filter and 
                          admin CRUD              

  3\. Customer Purchase   Auth, cart, checkout,   End-to-end demo order
  Flow                    order creation, stock   works
                          checks and history      

  4\. QA & Submission     Role/edge-case testing, Demo-ready mini project
                          responsive polish, seed 
                          data and README         
  -----------------------------------------------------------------------

## 13. Architecture Decisions Still Open

These are explicitly proposed defaults from the PRD, not confirmed
external requirements:

  -----------------------------------------------------------------------
  Topic                   PRD proposal            Confirm if different
  ----------------------- ----------------------- -----------------------
  Backend                 Node.js + Express.js    Course-mandated backend

  Payment                 Cash on Delivery /      Real payment gateway
                          simulated payment       requirement

  Book images             Image URL or            Upload/storage
                          project-managed static  requirement
                          assets                  

  Admin                   Seeded admin account    Admin creation UI
                                                  requirement

  Deployment              Local development and   Hosting/platform
                          demo first              requirement

  Reviews / wishlist      Optional Release 1.1    Whether required by
                                                  rubric
  -----------------------------------------------------------------------

Do not silently add a payment gateway, cloud storage, external service,
or deployment platform. Confirm scope before implementing such
additions.

## 14. Definition of Architecture Complete

-   Frontend, backend and database responsibilities are separated.
-   Every protected API has backend authentication and role checks.
-   Customer data access is scoped to the authenticated customer.
-   Checkout recalculates totals and validates stock on the server.
-   Order records preserve item snapshots.
-   Environment secrets are kept out of source control.
-   Required API and customer/admin flows are testable.
-   The implementation and setup instructions are documented in
    `README.md`.

------------------------------------------------------------------------

**PANDORA --- DISCOVER STORIES. COLLECT WORLDS.**
