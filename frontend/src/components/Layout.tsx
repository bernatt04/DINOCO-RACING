// components/Layout.tsx

import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Crearemos este componente más adelante

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
