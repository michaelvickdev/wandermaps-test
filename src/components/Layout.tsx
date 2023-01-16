import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-4'>
        {children}
      </main>
    </>
  );
}

export default Layout;