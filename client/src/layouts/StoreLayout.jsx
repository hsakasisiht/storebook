import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

export const StoreLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: '1 0 auto' }}>
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
