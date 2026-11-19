import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { checkApiHealth } from './services/api';

// Layouts
import StoreLayout from './layouts/StoreLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import CataloguePage from './pages/public/CataloguePage';
import BookDetailsPage from './pages/public/BookDetailsPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Customer Pages
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';
import ProfilePage from './pages/customer/ProfilePage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import BooksPage from './pages/admin/BooksPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import OrdersPage from './pages/admin/OrdersPage';

// Global Styles
import './styles/tokens.css';
import './styles/global.css';
import './styles/responsive.css';

function App() {
  useEffect(() => {
    checkApiHealth().then((health) => {
      if (health.success) {
        console.log(`[Free Book Store Frontend] Connected to Backend: ${health.service} (${health.status})`);
      } else {
        console.info('[Free Book Store Frontend] Backend API is currently offline. Operating in resilient demo mode.');
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Storefront Routes */}
              <Route path="/" element={<StoreLayout />}>
                <Route index element={<HomePage />} />
                <Route path="books" element={<CataloguePage />} />
                <Route path="books/:id" element={<BookDetailsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="orders" element={<OrderHistoryPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Desk Routes (Protected by AdminLayout - renders 404 for non-admins) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="books" element={<BooksPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Catch-all Wildcard Route */}
              <Route
                path="*"
                element={
                  <StoreLayout>
                    <NotFoundPage />
                  </StoreLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
